<template>
    <div>
        <div>
            <AdminHeader title="Dashboard"></AdminHeader>

            <div class=" m-4 2xl:container ">
                <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 pb-24 ">
                    <div class="md:col-span-2 lg:col-span-1 ">
                        <div class="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
                            <div class="mb-8">
                                <h1 class="text-5xl font-bold text-gray-800">Users</h1>
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
                                <h1 class="text-5xl font-bold text-gray-800">Users</h1>
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
                            <div class="mt-6">
                                <h5 class="text-xl text-gray-700 text-center">Ask to customize</h5>
                                <div class="mt-2 flex justify-center gap-4">
                                    <h3 class="text-3xl font-bold text-gray-700">28</h3>
                                    <div class="flex items-end gap-1 text-green-500">
                                        <svg class="w-3" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6.00001 0L12 8H-3.05176e-05L6.00001 0Z" fill="currentColor" />
                                        </svg>
                                        <span>2%</span>
                                    </div>
                                </div>
                                <span class="block text-center text-gray-500">Compared to last week 13</span>
                            </div>
                            <table class="mt-6 -mb-2 w-full text-gray-600">
                                <tbody>
                                    <tr>
                                        <td class="py-2">Tailored ui</td>
                                        <td class="text-gray-500">896</td>
                                        <td>
                                            <svg class="w-16 ml-auto" viewBox="0 0 68 21" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <rect opacity="0.4" width="17" height="21" rx="1" fill="#e4e4f2" />
                                                <rect opacity="0.4" x="19" width="14" height="21" rx="1" fill="#e4e4f2" />
                                                <rect opacity="0.4" x="35" width="14" height="21" rx="1" fill="#e4e4f2" />
                                                <rect opacity="0.4" x="51" width="17" height="21" rx="1" fill="#e4e4f2" />
                                                <path
                                                    d="M0 7C8.62687 7 7.61194 16 17.7612 16C27.9104 16 25.3731 9 34 9C42.6269 9 44.5157 5 51.2537 5C57.7936 5 59.3731 14.5 68 14.5"
                                                    stroke="url(#paint0_linear_622:13631)" stroke-width="2"
                                                    stroke-linejoin="round" />
                                                <defs>
                                                    <linearGradient id="paint0_linear_622:13631" x1="68" y1="7.74997"
                                                        x2="1.69701" y2="8.10029" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#E323FF" />
                                                        <stop offset="1" stop-color="#7517F8" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="py-2">Customize</td>
                                        <td class="text-gray-500">1200</td>
                                        <td>
                                            <svg class="w-16 ml-auto" viewBox="0 0 68 21" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <rect opacity="0.4" width="17" height="21" rx="1" fill="#e4e4f2" />
                                                <rect opacity="0.4" x="19" width="14" height="21" rx="1" fill="#e4e4f2" />
                                                <rect opacity="0.4" x="35" width="14" height="21" rx="1" fill="#e4e4f2" />
                                                <rect opacity="0.4" x="51" width="17" height="21" rx="1" fill="#e4e4f2" />
                                                <path
                                                    d="M0 12.929C8.69077 12.929 7.66833 9.47584 17.8928 9.47584C28.1172 9.47584 25.5611 15.9524 34.2519 15.9524C42.9426 15.9524 44.8455 10.929 51.6334 10.929C58.2217 10.929 59.3092 5 68 5"
                                                    stroke="url(#paint0_linear_622:13640)" stroke-width="2"
                                                    stroke-linejoin="round" />
                                                <defs>
                                                    <linearGradient id="paint0_linear_622:13640" x1="34" y1="5" x2="34"
                                                        y2="15.9524" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#8AFF6C" />
                                                        <stop offset="1" stop-color="#02C751" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="py-2">Other</td>
                                        <td class="text-gray-500">12</td>
                                        <td>
                                            <svg class="w-16 ml-auto" viewBox="0 0 68 21" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <rect opacity="0.4" width="17" height="21" rx="1" fill="#e4e4f2" />
                                                <rect opacity="0.4" x="19" width="14" height="21" rx="1" fill="#e4e4f2" />
                                                <rect opacity="0.4" x="35" width="14" height="21" rx="1" fill="#e4e4f2" />
                                                <rect opacity="0.4" x="51" width="17" height="21" rx="1" fill="#e4e4f2" />
                                                <path
                                                    d="M0 6C8.62687 6 6.85075 12.75 17 12.75C27.1493 12.75 25.3731 9 34 9C42.6269 9 42.262 13.875 49 13.875C55.5398 13.875 58.3731 6 67 6"
                                                    stroke="url(#paint0_linear_622:13649)" stroke-width="2"
                                                    stroke-linejoin="round" />
                                                <defs>
                                                    <linearGradient id="paint0_linear_622:13649" x1="67" y1="7.96873"
                                                        x2="1.67368" y2="8.44377" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="#FFD422" />
                                                        <stop offset="1" stop-color="#FF7D05" />
                                                    </linearGradient>
                                                </defs>
                                            </svg>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <div class="h-full p-4 px-6 rounded-xl border border-gray-200 bg-white">

                            <div class="mb-8">
                                <h1 class="text-5xl font-bold text-gray-800">Users</h1>
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
                                <h1 class="text-5xl font-bold text-gray-800">Users</h1>
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
                                <h1 class="text-5xl font-bold text-gray-800">Users</h1>
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
    right: 10px;
}

.fix-search {
    position: relative;
    right: 8px;
}
</style>