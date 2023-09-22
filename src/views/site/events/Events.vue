<template>
    <div class="text-white text-4xl">
        <SiteHeader></SiteHeader>

        <p class="text-3xl text-center text-black py-8">Events</p>

        <section class="bg-white dark:bg-gray-900">
            <div class="container px-6 py-10 mx-auto">
                <h1 class="w-48 h-2 mx-auto bg-gray-200 rounded-lg dark:bg-gray-700"></h1>

                <p class="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                <p class="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg sm:w-80 dark:bg-gray-700"></p>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div class="card-normal shadow-xl my-2 p-2 text-black rounded-md" v-for="event in events"
                        :key="event.index">
                        <figure><img :src="event.images[0]" style="min-height: 200px; width: 100%;" alt="Shoes"
                                class="mt-2" />
                        </figure>
                        <div class="card-body text-black">
                            <h2 class="card-title">
                                Shoes!
                                <div class="badge badge-secondary">NEW</div>
                            </h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div class="card-actions justify-end">
                                <div class="badge badge-outline">Fashion</div>
                                <div class="badge badge-outline">Products</div>
                            </div>
                        </div>
                        <!-- <button class="btn btn-wide mt-4 w-full"></button> -->
                        <router-link :to="{ name: 'site-event', params: { id: event._id } }"
                            class="btn w-full mt-4">View</router-link>
                    </div>
                </div>
            </div>
        </section>


    </div>
</template>
<script>
import SiteHeader from '@/components/site/SiteHeader.vue'
import { mapActions, mapGetters } from 'vuex'
import FeathersClient from '@/FeathersClient'
export default {
    components: {
        SiteHeader
    },
    data() {
        return {
            events: []
        }
    },
    async mounted() {
        await this.fetchEvents()
    },
    methods: {
        ...mapActions(['loadingSet']),
        async fetchEvents() {
            this.loadingSet(true)
            try {
                const events = await FeathersClient.service('events').find({
                    query: {
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
        async deleteEvent(id) {
            this.loadingSet(true)
            try {
                await FeathersClient.service('events').remove(id)
                this.events = this.events.filter(event => event._id !== id)
                this.loadingSet(false)
            } catch (error) {
                console.log(error)
                this.loadingSet(false)
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
        }
    }
}
</script>