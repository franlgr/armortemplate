<template>
  <div
    :style="getImageStyle"
    style="
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      background-position-y: 0;
    "
  >
    <SiteHeader />
    <!-- boton volver atras hay que disenarlo bien para ponerlo en varios sectores -->
    <router-link
      :to="{ name: 'site-events' }"
      class="btn btn-outline btn-success my-2 ml-4"
      >Back</router-link
    >
    <!-- <MapBox></MapBox> -->

    <div class="mx-auto py-8 flex items-center justify-center px-8 pt-24">
      <div
        class="flex flex-col w-full bg-white rounded shadow-lg sm:w-3/4 md:w-2/2 lg:w-3/5"
      >
        <!-- <div class="w-full  bg-top bg-cover rounded-t image" >
                        </div> -->
        <!-- <swiper :spaceBetween="30" :centeredSlides="true" :slides-per-view="2"
                            :autoplay="{ delay: 2500, disableOnInteraction: false }" :pagination="{ clickable: true }"
                            :navigation="true" :modules="modules" class="swiper">
                            <swiper-slide :loop="true" v-for="(image, index) in event.images" :key="index"
                                class="swiper-slider w-full" :style="{ maxHeight: '200px' }">
                                <img :src="image" alt="Event Image">
                            </swiper-slide>
                        </swiper> -->
        <div class="flex flex-col w-full md:flex-row p-8 pt-4">
          <div
            id="background"
            class="flex flex-row justify-around p-4 font-bold leading-none text-gray-800 uppercase my-4 mx-2 rounded md:flex-col md:items-center md:justify-center md:w-2/4"
          >
            <h1
              class="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-800"
            >
              {{ event.title }}
            </h1>
            <p class="leading-normal" v-html="event.content"></p>
          </div>
          <div class="p-4 font-normal text-gray-800 md:w-3/5">
            <div class="flex flex-row items-center mt-4 text-gray-700">
              <div
                class="bg-white p-4 rounded-lg shadow-md m-auto"
                v-if="event.user"
              >
                <div class="flex items-center">
                  <img
                    class="w-12 h-12 rounded-full mr-4"
                    :src="event.user.image"
                    :alt="event.user.name"
                  />
                  <div>
                    <h2 class="text-xl font-semibold">
                      {{ event.user.name }} {{ event.user.lastname }}
                    </h2>
                    <p class="text-gray-600">{{ event.user.email }}</p>
                  </div>
                </div>
                <div class="mt-4 m-auto">
                  <p class="text-gray-700">
                    <!-- <strong>Address:</strong> {{ event.user.address }} -->
                  </p>
                  <p class="text-gray-700">
                    <strong>City:</strong> {{ event.user.city }}
                  </p>
                  <p class="text-gray-700" v-if="false">
                    <strong>Telephone:</strong> {{ event.user.telephone }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <MapBoxEventMarker
          class="pt-0 px-8 rounded-md"
          :event="event"
        ></MapBoxEventMarker>
        <div class="p-4 border rounded-lg shadow-lg m-8">
          <!-- Contenedor del comentario -->
          <div
            class="flex p-4 border-solid"
            v-if="event.user"
            style="margin: 10px !important"
          >
            <!-- Avatar del usuario -->
            <div class="mr-4">
              <img
                :src="event.user.image"
                alt="Avatar"
                class="w-12 h-12 mt-3 rounded-full"
              />
            </div>
            <!-- Contenido del comentario -->
            <div>
              <!-- Nombre del usuario -->
              <h3 class="font-semibold text-lg">Nombre del Usuario</h3>
              <!-- Comentario -->
              <p class="text-gray-700">
                Este es un comentario de ejemplo utilizando Tailwind CSS y Font
                Awesome.
              </p>
              <!-- Icono de Font Awesome (por ejemplo, un corazón) -->
              <i class="fas fa-heart text-red-500"></i>
              <!-- Cantidad de Me gusta -->
              <span class="text-gray-500">123 Me gusta</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SiteHeader from '@/components/site/SiteHeader.vue';
  import FeathersClient from '@/FeathersClient.js';
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  import { Pagination, Navigation, Autoplay } from 'swiper/modules';
  import MapBox from '@/components/MapBox.vue';
  import MapBoxEventMarker from '@/components/MapBoxEventMarker.vue';
  // Import Swiper styles
  import 'swiper/css';
  export default {
    data() {
      return {
        event: {},
        currentPage: 1, // Página actual
        perPage: 10, // Cantidad de elementos por página
      };
    },
    components: {
      SiteHeader,
      FeathersClient,
      Swiper,
      SwiperSlide,
      MapBox,
      MapBoxEventMarker,
    },
    setup() {
      return {
        modules: [Autoplay, Pagination, Navigation],
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
    computed: {
      getImageStyle() {
        if (this.event.images && this.event.images.length > 0) {
          // Obtén el enlace de la primera imagen del array
          const firstImageLink = this.event.images[0];

          // Crea el estilo en línea para la imagen de fondo
          return {
            backgroundImage: `url(${firstImageLink})`,
          };
        } else {
          // Si no hay imágenes, puedes establecer un fondo predeterminado o un color de fondo aquí
          return {
            backgroundColor: 'gray', // Color de fondo predeterminado
          };
        }
      },
    },
  };
</script>

<style>
  #background {
    background-size: cover !important;
    background-position: center !important;
  }

  .image {
    height: 200px;
  }
</style>
