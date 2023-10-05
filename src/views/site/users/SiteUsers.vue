<template>
  <div class="bg-white rounded-lg shadow-xl">
    
            
             <div class="flex flex-col">
        <div class="flex flex-col justify-center">
          <div class="relative">
            <div
              class="background-container parallax flex justify-center items-center"
            >
              <!-- Aquí está el fondo de degradado -->
              <img class="h-64 w-64" src="@/assets/AuthLogo.svg" alt="Logo" />
            </div>

            <div
              class="absolute sm:bottom-8 bottom-4 pr-10 sm:pr-0 left-4 sm:left-8 flex justify-start items-start"
            >
              <p
                class="text-3xl sm:text-4xl font-semibold leading-9 text-white"
              >
                Blog
              </p>
            </div>
          </div>
        </div>
      </div>
    <div class="flex items-center justify-between px-8 mt-4">
      <h4 class="text-xl text-gray-900 font-bold">Users ({{ total }})</h4>
      
    </div>
    
    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-8 mt-8"
    >
    
      <router-link
        :to="{ name: 'site-user', params: { id: user._id } }"
        v-for="user in users"
        :key="user.index"
        href="#"
        class="flex flex-col items-center justify-center text-gray-800 hover:text-blue-600"
        title="View Profile"
      >
        <img :src="user.image" class="w-16 rounded-full" />
        <p class="text-center font-bold text-sm mt-1">
          {{ user.name }} {{ user.lastname }}
        </p>
        <p class="text-xs text-green-600 text-center">
          <p
            v-for="permission in user.permissions"
            :key="permission.index"
            >{{ permission }}</p
          >
        </p>
      </router-link>
    </div>
    <!-- Paginación -->
    <div class="join grid grid-cols-2 pagination w-64 m-auto py-8">
      <button
        class="join-item btn btn-outline"
        @click="prevPage"
        :disabled="currentPage === 1"
      >
        Previous
      </button>
      <button
        class="join-item btn btn-outline"
        @click="nextPage"
        :disabled="users.length < perPage"
      >
        Next
      </button>
    </div>
    <!-- Fin Paginación -->
  </div>
</template>
<script>
  import FeathersClient from '@/FeathersClient';
  import { mapActions } from 'vuex';
  export default {
    data() {
      return {
        users: [],
        currentPage: 1, // Página actual
        perPage: 20, // Cantidad de elementos por página
        total: 0, // Total
      };
    },
    mounted() {
      this.getUsers();
    },
    methods: {
      ...mapActions(['setLoading']),
      async getUsers() {
        this.setLoading(true);
        try {
          const users = await FeathersClient.service('users').find({
            query: {
              $limit: this.perPage,
              $skip: (this.currentPage - 1) * this.perPage,
            },
          });
          this.users = users.data;
          this.total = users.total;
        } catch (error) {
          console.log(error);
        }
        this.setLoading(false);
      },
      //pagination
      nextPage() {
        this.currentPage++;
        this.getUsers();
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.getUsers();
        }
      },
      goToPage(pageNumber) {
        this.currentPage = pageNumber;
        this.getUsers();
      },
    },
  };
</script>
