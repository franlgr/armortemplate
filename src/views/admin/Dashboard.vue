<template>
    <div>
        <div>
            <AdminHeader title="Dashboard" icon="fa-solid fa-chart-line"></AdminHeader>
            <!-- <div class="stats shadow mx-4 mt-4">

                <div class="stat">
                    <div class="stat-figure text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="inline-block w-8 h-8 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                            </path>
                        </svg>
                    </div>
                    <div class="stat-title">Total Likes</div>
                    <div class="stat-value text-primary">25.6K</div>
                    <div class="stat-desc">21% more than last month</div>
                </div>

                <div class="stat">
                    <div class="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="inline-block w-8 h-8 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <div class="stat-title">Page Views</div>
                    <div class="stat-value text-secondary">2.6M</div>
                    <div class="stat-desc">21% more than last month</div>
                </div>

                <div class="stat">
                    <div class="stat-figure text-secondary">
                        <div class="avatar online">
                            <div class="w-16 rounded-full">
                                <img src="https://picsum.photos/200/300" />
                            </div>
                        </div>
                    </div>
                    <div class="stat-value">86%</div>
                    <div class="stat-title">Tasks done</div>
                    <div class="stat-desc text-secondary">31 tasks remaining</div>
                </div>


            </div> -->

            <div class=" m-4 2xl:container ">
                <div class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3  pb-24 ">
                    <div class="md:col-span-2 lg:col-span-1 ">
                        <div class="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
                            <div class="mb-8">
                                <h1 class="text-5xl font-bold text-gray-800">ChartLine</h1>
                                <h1 class="text-5xl font-bold text-gray-800">64,5%</h1>
                                <span class="text-gray-500">Compared to last week $13,988</span>
                            </div>
                            <ChartLine></ChartLine>
                            <!-- <div>
                                <h5 class="text-xl text-gray-600 text-center">Global Activities</h5>
                                <div class="mt-2 flex justify-center gap-4">
                                    <h3 class="text-3xl font-bold text-gray-700">$23,988</h3>
                                    <div class="flex items-end gap-1 text-green-500">
                                        <svg class="w-3" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.00001 0L12 8H-3.05176e-05L6.00001 0Z" fill="currentColor" />
                                        </svg>
                                        <span>2%</span>
                                    </div>
                                </div>
                                <span class="block text-center text-gray-500">Compared to last week $13,988</span>
                            </div> -->
                        </div>
                    </div>
                    <div>
                        <div class="h-full p-4 px-6 rounded-xl border border-gray-200 bg-white">

                            <div class="mb-8">
                                <h1 class="text-5xl font-bold text-gray-800">Doughnut</h1>
                                <h1 class="text-5xl font-bold text-gray-800">64,5%</h1>
                                <span class="text-gray-500">Compared to last week $13,988</span>
                            </div>
                            <Doughnut> </Doughnut>
                            <!-- <h5 class="text-xl text-gray-700">Downloads</h5> -->



                        </div>
                    </div>
                    <div>
                        <div class="lg:h-full  px-6 p-4  text-gray-600 rounded-xl border border-gray-200 bg-white">
                            <div class="mb-8">
                                <h1 class="text-5xl font-bold text-gray-800">Bar</h1>
                                <h1 class="text-5xl font-bold text-gray-800">64,5%</h1>
                                <span class="text-gray-500">Compared to last week $13,988</span>
                            </div>
                            <Bar> </Bar>

                        </div>
                    </div>
                    <div>
                        <div class="h-full p-4 px-6 rounded-xl border border-gray-200 bg-white">

                            <div class="mb-8">
                                <h1 class="text-5xl font-bold text-gray-800">Polar</h1>
                                <h1 class="text-5xl font-bold text-gray-800">64,5%</h1>
                                <span class="text-gray-500">Compared to last week $13,988</span>
                            </div>
                            <Polar> </Polar>
                            <!-- <h5 class="text-xl text-gray-700">Downloads</h5> -->



                        </div>
                    </div>
                    <div>
                        <div class="h-full p-4 px-6 rounded-xl border border-gray-200 bg-white">

                            <div class="mb-8">
                                <h1 class="text-5xl font-bold text-gray-800">FloatingBars</h1>
                                <h1 class="text-5xl font-bold text-gray-800">64,5%</h1>
                                <span class="text-gray-500">Compared to last week $13,988</span>
                            </div>
                            <FloatingBars> </FloatingBars>
                            <!-- <h5 class="text-xl text-gray-700">Downloads</h5> -->



                        </div>
                    </div>
                    <div>
                        <div class="h-full p-4 px-6 rounded-xl border border-gray-200 bg-white">

                            <div class="mb-8">
                                <h1 class="text-5xl font-bold text-gray-800">Radar</h1>
                                <h1 class="text-5xl font-bold text-gray-800">64,5%</h1>
                                <span class="text-gray-500">Compared to last week $13,988</span>
                            </div>
                            <Radar> </Radar>
                            <!-- <h5 class="text-xl text-gray-700">Downloads</h5> -->



                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import BreadCrumbs from '@/components/admin/Breadcrumbs.vue';
import AdminHeader from '@/components/admin/AdminHeader.vue';
import FeathersClient from '@/FeathersClient.js';
import ChartLine from '@/components/admin/charts/Line.vue';
import Doughnut from '@/components/admin/charts/Doughnut.vue';
import Bar from '@/components/admin/charts/Bar.vue';
import Polar from '@/components/admin/charts/Polar.vue';
import FloatingBars from '@/components/admin/charts/FloatingBars.vue';
import Radar from '@/components/admin/charts/Radar.vue';

export default {
    //logout
    // name: "AdminDashboard",
    layout: "AdminLayout",

    components: {
        BreadCrumbs,
        AdminHeader,
        ChartLine,
        Doughnut,
        Bar,
        Polar,
        FloatingBars,
        Radar


    },
    created() {
        // app.authenticate().then(() => {
        //   this.user.authenticated = true
        // })
        // We will also see when new users get created in real-time

        // On errors we just redirect back to the login page
        // .catch(error => {
        //   console.log('Error authenticating!', error)
        // });
    },
    mounted() {

    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
        }
    },
}
</script>
<style>
.fix {
    position: relative;

}

.fix-search {
    position: relative;

}
</style>