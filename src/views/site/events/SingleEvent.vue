<template>
  <div>
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
            <p class="text-3xl sm:text-4xl font-semibold leading-9 text-white">
              Event: "{{ event.title }}"
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto p-4 mt-8">
      <!-- This is an example component -->

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <img
            v-if="event.images"
            :src="event.images[0]"
            alt="Evento"
            class="w-full h-auto md:h-96 rounded-lg"
          />
        </div>
        <div>
          <h1 class="text-2xl font-semibold">{{ event.title }}</h1>
          <p class="text-gray-600">{{ event.date }}</p>
          <p class="text-gray-700 mt-4" v-html="event.content"></p>
          <div class="mt-4">
            <p class="text-gray-600">Lugar: {{ event.placeName }}</p>
            <p class="text-gray-600">Precio: ${{ event.price }}</p>
            <p class="text-gray-600" v-if="event.category">
              Categoría: {{ event.category.title }}
            </p>
          </div>
          <!-- Puedes agregar más detalles del evento aquí -->
        </div>
      </div>
      <div class="flex mt-4">
        <div class="flex pb-4 m-auto mt-8">
          <FacebookShareButton></FacebookShareButton>
          <TwitterShareButton></TwitterShareButton>
          <LinkedinShareButton></LinkedinShareButton>
          <WhatsappShareButton></WhatsappShareButton>
        </div>
      </div>
      <MapBoxEventMarker
        class="pt-0 rounded-md mt-12 mb-12"
        :event="event"
      ></MapBoxEventMarker>
    </div>
  </div>
</template>

<script>
  import FeathersClient from '@/FeathersClient';
  import MapBoxEventMarker from '@/components/MapBoxEventMarker.vue';
  import FacebookShareButton from '@/components/site/social/FacebookShareButton.vue';
  import TwitterShareButton from '@/components/site/social/TwitterShareButton.vue';
  import LinkedinShareButton from '@/components/site/social/LinkedinShareButton.vue';
  import WhatsappShareButton from '@/components/site/social/WhatsappShareButton.vue';
  export default {
    name: 'EventDetail',
    data() {
      return {
        event: {},
      };
    },
    created() {
      this.fetchEvent();
    },
    methods: {
      async fetchEvent() {
        //buscar evento single
        const id = this.$route.params.id;
        try {
          const res = await FeathersClient.service('events').get(id);
          this.event = res;
        } catch (error) {
          console.error('Error al obtener el evento:', error);
        }
      },
    },
    components: {
      MapBoxEventMarker,
      FacebookShareButton,
      TwitterShareButton,
      LinkedinShareButton,
      WhatsappShareButton,
    },
  };
</script>

<style scoped>
  /* Estilos específicos de este componente utilizando Tailwind CSS */
</style>
