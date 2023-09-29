<template>
  <div
    class="flex flex-col max-w-sm px-6 py-4 mx-auto bg-white rounded-lg shadow-md"
  >
    <ul class="-mx-4">
      <li
        class="flex items-center py-2"
        v-for="user in users"
        :key="user.index"
      >
        <img
          :src="user.image"
          alt="avatar"
          class="object-cover w-10 h-10 mx-4 rounded-full"
        />
        <div class="flex-grow">
          <!-- Agregamos una clase flex-grow para que este div ocupe todo el espacio restante -->
          <p>
            <router-link
              :to="{ name: 'site-users', params: { id: user._id } }"
              class="mx-1 font-bold text-gray-700 hover:underline"
              >{{ user.name }}</router-link
            >
          </p>
          <p class="mx-1">{{ formatDate(user.createdAt) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import FeathersClient from '@/FeathersClient';
  import { mapActions } from 'vuex';
  import moment from 'moment';
  //   import 'moment/locale/es'; // Opcional: Cambia 'es' al idioma deseado si prefieres un idioma diferente

  export default {
    data() {
      return {
        users: [],
      };
    },
    async mounted() {
      this.loadingSet(true);
      try {
        const users = await FeathersClient.service('users').find({
          query: {
            $limit: 5,
          },
        });
        this.users = users.data;
        this.loadingSet(false);
      } catch (error) {
        console.log(error);
        this.loadingSet(false);
      }
    },
    methods: {
      ...mapActions(['loadingSet']),
      formatDate(date) {
        return moment(date).format('LL'); // Puedes ajustar el formato según tus preferencias
      },
    },
  };
</script>
