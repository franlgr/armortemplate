<template>
  <div class="text-white text-4xl">
    <SiteHeader></SiteHeader>

    <div class="flex flex-col">
      <div class="flex flex-col justify-center">
        <div class="relative">
          <div
            class="bg-gradient-to-b from-green-700 to-green-500 h-80 sm:h-85 background-container"
          >
            <!-- Aquí está el fondo de degradado -->
            <img
              class="h-64 w-64 m-auto pt-8"
              src="@/assets/AuthLogo.svg"
              alt="Logo"
            />
          </div>
          <div
            class="absolute sm:bottom-8 bottom-4 pr-10 sm:pr-0 left-4 sm:left-8 flex justify-start items-start"
          >
            <p class="text-3xl sm:text-4xl font-semibold leading-9 text-white">
              Events
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col container m-auto mt-8">
      <MapBoxAllEvents :events="events"></MapBoxAllEvents>
    </div>

    <section class="bg-white dark:bg-gray-900">
      <div class="container px-6 py-4 mx-auto">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            class="card-normal shadow-xl my-2 p-2 text-black rounded-md"
            v-for="event in events"
            :key="event.index"
          >
            <figure>
              <img
                :src="event.images[0]"
                style="min-height: 200px; width: 100%"
                alt="Shoes"
                class="mt-2"
              />
            </figure>
            <div class="card-body text-black">
              <h2 class="card-title">
                {{ event.title }}
                <div class="badge badge-secondary">NEW</div>
              </h2>
              <!-- tags -->
              {{ event.tags }}
              <div v-html="event.content"></div>
              <div class="card-actions justify-end">
                <div class="badge badge-outline">Fashion</div>
                <div class="badge badge-outline">Products</div>
              </div>
            </div>
            <!-- <button class="btn btn-wide mt-4 w-full"></button> -->
            <router-link
              :to="{ name: 'site-event', params: { id: event._id } }"
              class="btn w-full mt-4"
              >View</router-link
            >
          </div>
        </div>
      </div>
    </section>
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
      };
    },
    async mounted() {
      await this.fetchEvents();
    },
    methods: {
      ...mapActions(['loadingSet']),
      async fetchEvents() {
        this.loadingSet(true);
        try {
          const events = await FeathersClient.service('events').find({
            query: {
              $sort: {
                createdAt: -1,
              },
            },
          });
          this.events = events.data;
          this.loadingSet(false);
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
  };
</script>
