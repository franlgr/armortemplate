<template>
    <div class="text-white text-4xl">
        <SiteHeader></SiteHeader>
        <section class="bg-white dark:bg-gray-900">
            <div class="container px-6 py-10 mx-auto animate-pulse">
                <h1 class="w-48 h-2 mx-auto bg-gray-200 rounded-lg dark:bg-gray-700"></h1>

                <p class="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                <p class="w-64 h-2 mx-auto mt-4 bg-gray-200 rounded-lg sm:w-80 dark:bg-gray-700"></p>

                <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
                    <div class="w-full ">
                        <div class="w-full h-64 bg-gray-100 rounded-lg "></div>


                        <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                        <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                    </div>

                    <div class="w-full ">
                        <!-- <div class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div> -->
                        <img class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600" src="https://picsum.photos/200/300"
                            alt="">

                        <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                        <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                    </div>
                    <div class="w-full ">
                        <!-- <div class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div> -->
                        <img class="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600" src="https://picsum.photos/200/300"
                            alt="">

                        <h1 class="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
                        <p class="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                    </div>

                </div>
            </div>
        </section>
        {{ events }}
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
    }
}
</script>