<!-- Modelo para crear una vista nueva dentro de admin -->
<template>
    <div>
    
        <AdminHeader title="All Events"></AdminHeader>
        <div class="overflow-x-auto">
        <div class="bg-pink-100 border-t border-b border-pink-500 text-pink-700 px-4 py-3" role="alert">
    <p class="font-bold">My Events</p>
    <p>Here, you can view and manage your events.</p>
</div>

            <table class="table">
                <!-- head -->
                <thead>
                    <tr>
                        <th>
                            <button
                  :disabled="!showDeleteButton"
                  @click="deleteSelectedEvents()"
                  class="border w-12 h-12 border-red-500 hover:border-red-700 rounded-full p-2"
                >
                  <i class="fas fa-trash-alt text-red-500"></i>
                </button>
                <th>
                    <div><span>Select All</span></div>
                    <label>
                      <input
                        type="checkbox"
                        class="checkbox"
                        v-model="selectAll"
                        @change="selectAllEvents"
                      />
                    </label>
                  </th>
                        </th>
                        
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr v-for="event in events" :key="event.index">
                        <th>
                            <label>
                      <input
                        type="checkbox"
                        class="checkbox"
                        v-model="event.selected"
                        @change="checkDeleteButtonState"
                      />
                    </label>
                        </th>
                        <td>
    
                            <div class="flex items-center space-x-3">
                                <div class="avatar">
                                    <div class="mask mask-squircle w-12 h-12">
                                        <img :src="event.images[0]" alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div class="font-bold">{{event.title}}</div>
                                    <div class="text-sm opacity-50">{{event.placeName}}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            u$s {{event.price}}
                            <br />
    
                        </td>
                        <td>{{event.category.title}}</td>
                        <th>
                            <div class="flex justify-between">
                                <router-link :to="{ name: 'site-event', params: { id: event._id } }" class="flex items-center">
                                    <button class="border w-12 h-12 border-blue-500 hover:border-blue-700 rounded-full p-2">
                                            <i class="fas fa-eye text-blue-500"></i>
                                        </button>
                                </router-link>
                                <router-link :to="{ name: 'admin-events-edit', params: { id: event._id } }" class="flex items-center">
                                    <button class="border w-12 h-12 border-yellow-500 hover:border-yellow-700 rounded-full p-2">
                                            <i class="fas fa-edit text-yellow-500"></i>
                                        </button>
                                </router-link>
                                <div class="flex items-center">
                                    <!-- <button @click="deleteEventConfirm(event._id)" class="border w-12 h-12 border-red-500 hover:border-red-700 rounded-full p-2">
                                            <i class="fas fa-trash-alt text-red-500"></i>
                                        </button> -->
                                </div>
                            </div>
                        </th>
                    </tr>
                </tbody>
                <!-- foot -->
                <!-- <tfoot>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Job</th>
                                            <th>Favorite Color</th>
                                            <th></th>
                                        </tr>
                                    </tfoot> -->
    
            </table>
        </div>
    
        <!-- {{ events }} -->
        <!-- Paginación -->
        <div class="join grid grid-cols-2 pagination w-64 m-auto py-8">
            <button class="join-item btn btn-outline" @click="prevPage" :disabled="currentPage === 1">Previous</button>
            <button class="join-item btn btn-outline" @click="nextPage" :disabled="events.length < perPage">Next</button>
        </div>
    
    
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
// import BreadCrumbs from '@/components/admin/Breadcrumbs.vue';
import AdminHeader from '@/components/admin/AdminHeader.vue';
import FeathersClient from '@/FeathersClient'

export default {
    layout: "AdminLayout",
    components: {
        // BreadCrumbs,
        AdminHeader,

    },
    data() {
        return {
            events: [],
            currentPage: 1, // Página actual
            perPage: 10, // Cantidad de elementos por página
            selectAll: false,
            showDeleteButton: false,

        }
    },
    mounted() {
        this.fetchEvents()
    },
    methods: {
        ...mapActions(['loadingSet']),
        async fetchEvents() {
            this.loadingSet(true)
            try {
                const events = await FeathersClient.service('events').find({
                    query: {
                        // user_id: this.getUser._id,
                        $limit: this.perPage,
                        $skip: (this.currentPage - 1) * this.perPage,
                        $sort: {
                            createdAt: -1
                        }
                    }
                })
                this.events = events.data
                this.loadingSet(false)
            } catch (error) {
                console.log(error)
                this.loadingSet(false)
            }
        },

        async deleteEvent(eventId) {
        try {
          await FeathersClient.service('events').remove(eventId);
          this.events = this.events.filter((event) => event._id !== eventId);
          console.log('Evento/s eliminado con éxito.');
          this.$snotify.success('evento/s eliminado/s con éxito', 'Éxito', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });

        } catch (error) {
          console.error('Error al eliminar el evento:', error);
          this.$snotify.error('Error al eliminar el/los evento/s', 'Error: ', error, {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });
        }
      },

      deleteSelectedEvents() {
        const selectedEvents = this.events.filter((event) => event.selected);
        if (selectedEvents.length > 0) {
          const confirmationMessage =
            'Are you sure you want to delete selected events?';
          const toastId = this.$snotify.info(
            confirmationMessage,
            'Deleted Events!',
            {
              timeout: 0,
              showProgressBar: true,
              closeOnClick: false,
              pauseOnHover: true,
              buttons: [
                {
                  text: 'Yes',
                  action: (toast) => {
                    selectedEvents.forEach((event) => {
                      this.deleteEvent(event._id);
                    });
                    this.$snotify.remove(toast.id);
                  },
                  bold: false,
                },
                {
                  text: 'Close',
                  action: (toast) => {
                    console.log('Clicked: No');
                    this.$snotify.remove(toast.id);
                  },
                  bold: true,
                },
              ],
            },
          );
        }
      },

      selectAllEvents() {
        this.events.forEach((event) => {
            event.selected = this.selectAll;
        });
        this.checkDeleteButtonState();
      },

      checkDeleteButtonState() {
        this.showDeleteButton = this.events.some((event) => event.selected);
      },
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
    },
    computed: {
         ...mapGetters(['getUser']),
    }
}
</script>

<style>

</style>