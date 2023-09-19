<!-- Modelo para crear una vista nueva dentro de admin -->
<template>
    <div>

        <AdminHeader title="My Events"></AdminHeader>




        <div class="overflow-x-auto">
            <table class="table">
                <!-- head -->
                <thead>
                    <tr>
                        <th>
                            <label>
                                <input type="checkbox" class="checkbox" />
                            </label>
                        </th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <!-- row 1 -->
                    <tr v-for="event in events" :key="event.index">
                        <th>
                            <label>
                                <input type="checkbox" class="checkbox" />
                            </label>
                        </th>
                        <td>
                            <div class="flex items-center space-x-3">
                                <div class="avatar">
                                    <div class="mask mask-squircle w-12 h-12">
                                        <img src="https://picsum.photos/300/300" alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div class="font-bold">Hart Hagerty</div>
                                    <div class="text-sm opacity-50">United States</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            Zemlak, Daniel and Leannon
                            <br />

                        </td>
                        <td>Purple</td>
                        <th>
                            <div class="flex justify-between">
                                <router-link :to="{ name: 'site-event', params: { id: event._id } }"
                                    class="flex items-center">
                                    <button class="border w-12 h-12 border-blue-500 hover:border-blue-700 rounded-full p-2">
                                        <i class="fas fa-eye text-blue-500"></i>
                                    </button>
                                </router-link>
                                <router-link :to="{ name: 'admin-events-edit', params: { id: event._id } }"
                                    class="flex items-center">
                                    <button
                                        class="border w-12 h-12 border-yellow-500 hover:border-yellow-700 rounded-full p-2">
                                        <i class="fas fa-edit text-yellow-500"></i>
                                    </button>
                                </router-link>
                                <div class="flex items-center">
                                    <button @click="deleteCategoryConfirm(event._id)"
                                        class="border w-12 h-12 border-red-500 hover:border-red-700 rounded-full p-2">
                                        <i class="fas fa-trash-alt text-red-500"></i>
                                    </button>
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

        {{ events }}


    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
// import BreadCrumbs from '@/components/admin/Breadcrumbs.vue';
import AdminHeader from '@/components/admin/AdminHeader.vue';
import FeathersClient from '@/FeathersClient'
export default {
    //logout
    // name: "AdminDashboard",
    layout: "AdminLayout",
    components: {
        // BreadCrumbs,
        AdminHeader

    },
    data() {
        return {
            events: []
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
}
</script>
<style></style>