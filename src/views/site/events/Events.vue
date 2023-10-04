<template>
  <div class="text-white ">
    <SiteHeader></SiteHeader>

    <!-- This is an example component -->
    <div class="flex flex-col ">
      <div class="flex flex-col justify-center">
        <div class="relative">
          <div
              class="background-container parallax flex justify-center items-center"
            >
              <!-- Aquí está el fondo de degradado -->
              <img class="h-64 w-64" src="@/assets/AuthLogo.svg" alt="Logo" />
            </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="p-4">
        <div class="pb-4">
            <div class="mt-4">
            <router-link :to="{ name: 'home' }" class="btn btn-outline btn-success  ml-8">Go Back</router-link>
          </div>
          <p class="text-3xl p-8 sm:text-4xl font-semibold leading-9 text-black" v-if="!tag">
            All Events in the World
          </p>
        

          <div class=" px-8 pt-4" v-if="tag">
            <div class="mb-2">
              <router-link to="/events" class="focus:outline-none hover:underline text-gray-500 text-sm"><i
                  class="mdi mdi-arrow-left text-gray-400"></i>All Events</router-link>
            </div>
            <div class="mb-2">
              <p class="text-black text-2xl">Category</p>
              <router-link :to="`/events?tag=${category._id}`" class="text-3xl md:text-5xl font-bold text-gray-600"> <span
                  class="text-blue-500"> {{ category.title }}.</span></router-link>
            </div>
            <div class="mb-5 text-gray-400">
              <router-link :to="`/home`"
                class="focus:outline-none hover:underline text-gray-500 hover:text-blue-600">Home</router-link>
              /
              <router-link :to="`/events`"
                class="focus:outline-none hover:underline text-gray-500 hover:text-blue-600">Events</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="p-4">
        <div class="flex flex-col container m-auto mt-8 md:pr-12 px-2">
          <MapBoxAllEvents class="" :events="events"></MapBoxAllEvents>
        </div>
      </div>
    </div>


    <section
      class="grid grid-cols-1 sm:grid-cols-1 gap-4 mx-2 lg:mx-0 md:grid-cols-2 lg:grid-cols-4 max-w-screen-xl p-2 d-block pt-8 px-12"
      style="margin:auto;">
      <!-- Card Component -->
      <div class="transition-all duration-150 flex w-full px-4 md:px-2" v-for="event in events">
        <div
          class="flex flex-col items-stretch min-h-full pb-4 mb-6 transition-all duration-150 bg-white rounded-lg shadow-lg hover:shadow-2xl">
          <div class="md:flex-shrink-0">
            <div class="relative w-full h-56 md:h-56">
              <div class="absolute inset-0">
                <img :src="event.images[0]" alt="Blog Cover"
                  class="object-cover w-full h-full rounded-lg rounded-b-none" />
              </div>
            </div>
          </div>
          <div class="flex items-center justify-between px-4 py-2 overflow-hidden">

            <router-link :to="`/events?tag=${event.category._id}`" class="text-xs font-medium text-blue-600 uppercase">{{
              event.category.title }}.</router-link>
            <div class="flex flex-row items-center">
              <div class="text-xs font-medium text-gray-500 flex flex-row items-center mr-2">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                  </path>
                </svg>
                <span>1.5k</span>
              </div>

              <div class="text-xs font-medium text-gray-500 flex flex-row items-center mr-2">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z">
                  </path>
                </svg>
                <span>25</span>
              </div>

              <div class="text-xs font-medium text-gray-500 flex flex-row items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5">
                  </path>
                </svg>
                <span>7</span>
              </div>
            </div>
          </div>
          <hr class="border-gray-300" />
          <div class="flex flex-wrap items-center flex-1 px-4 py-1 text-center mx-auto">
            <router-link :to="{ name: 'site-event', params: { id: event._id } }" class="hover:underline">
              <h2 class="text-2xl font-bold tracking-normal text-gray-800">
                {{ event.title }}
              </h2>
            </router-link>
            <!-- <a href="#" class="hover:underline">
              <h2 class="text-2xl font-bold tracking-normal text-gray-800">
                Ho to Yawn in 7 Days
              </h2>
            </a> -->
          </div>
          <hr class="border-gray-300" />
          <p class="flex flex-row flex-wrap w-full px-4 py-2 overflow-hidden text-sm text-justify text-gray-700">
          <p v-html="event.content"></p>
          </p>
          <hr class="border-gray-300" />
          <section class="px-4 py-2 mt-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center flex-1">
                <img class="object-cover h-10 rounded-full" :src="event.user.image" alt="Avatar" />
                <div class="flex flex-col mx-2">
                  <a href="" class="font-semibold text-gray-700 hover:underline">
                    {{ event.user.name }} {{ event.user.lastname }}
                  </a>

                  <span class="mx-1 text-xs text-gray-600">28 Sep 2020</span>
                </div>
              </div>
              <p class="mt-1 text-xs text-gray-600">9 minutes read</p>
            </div>
          </section>
        </div>
      </div>
    </section>
    <div class="join grid grid-cols-2 pagination w-64 m-auto py-8">
      <button class="join-item btn btn-outline" @click="prevPage" :disabled="currentPage === 1">
        Previous
      </button>
      <button class="join-item btn btn-outline" @click="nextPage" :disabled="events.length < perPage">
        Next
      </button>
    </div>
  </div>
</template>
<script>
import SiteHeader from '@/components/site/SiteHeader.vue';
import { mapActions, mapGetters } from 'vuex';
import FeathersClient from '@/FeathersClient';
import MapBoxAllEvents from '@/components/site/MapBoxAllEvents.vue';
export default {
  components: {
    SiteHeader,
    MapBoxAllEvents,
  },
  data() {
    return {
      events: [],
      tag: null,
      category: {},
      currentPage: 1, // Página actual
      perPage: 10, // Cantidad de elementos por página
    };
  },
  async mounted() {
    const urlParams = new URLSearchParams(window.location.search);
    this.tag = urlParams.get('tag');
    await this.fetchEvents();


    console.log(this.tag);
  },
  methods: {
    ...mapActions(['loadingSet']),
    async fetchEvents() {
      this.loadingSet(true);
      try {
        if (this.tag) {
          const events = await FeathersClient.service('events').find({
            query: {
              "category._id": this.tag,
              $limit: this.perPage,
              $skip: (this.currentPage - 1) * this.perPage,
              $sort: {
                createdAt: -1,

              },
            },
          });
          this.events = events.data;
          console.log(this.events);
          this.loadingSet(false);


          //traer la categoria con get
          const category = await FeathersClient.service('events-categories').get(this.tag);
          this.category = category;
        } else {
          const events = await FeathersClient.service('events').find({
            query: {
              $limit: this.perPage,
              $skip: (this.currentPage - 1) * this.perPage,
              $sort: {
                createdAt: -1,
              },
            },
          });
          this.events = events.data;
          console.log(this.events);
          this.loadingSet(false);
        }




      } catch (error) {
        console.log(error);
        this.loadingSet(false);
      }
    },
    async deleteEvent(id) {
      this.loadingSet(true);
      try {
        await FeathersClient.service('events').remove(id);
        this.events = this.events.filter((event) => event._id !== id);
        this.loadingSet(false);
      } catch (error) {
        console.log(error);
        this.loadingSet(false);
      }
    },
    //pagination
    nextPage() {
      this.currentPage++;
      this.fetchEvents();
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchEvents();
      }
    },
    goToPage(pageNumber) {
      this.currentPage = pageNumber;
      this.fetchEvents();
    },
    //finish pagination
  },
  computed: {
    primerImagen() {
      if (this.events.images && this.events.images.length > 0) {
        return this.events.images[0];
      }
      // Si el array está vacío o no existe, puedes devolver un valor predeterminado o null
      return null; // Cambia esto según tus necesidades
    },
  },
  watch: {
    $route(to, from) {
      const urlParams = new URLSearchParams(to.query);
      this.tag = urlParams.get('tag');
      this.fetchEvents();
    },
  },
};
</script>
