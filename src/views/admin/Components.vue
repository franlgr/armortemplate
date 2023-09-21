<!-- Modelo para crear una vista nueva dentro de admin -->
<template>
    <div>
        <div>
            <AdminHeader title="Components" icon="fa-solid fa-screwdriver-wrench"></AdminHeader>

            <div class=" m-4 2xl:container">
             <vue-awesome-swiper class="my-24"> </vue-awesome-swiper>
                <div class="">
                    Text Editor
                    <br>
                    <Ckeditor></Ckeditor>
                    <br> Tabla Default
                    <TableDefault></TableDefault>
                    <br>
                    Card Modelo Example

                    <div class="card w-100 bg-base-100 shadow-xl my-8 p-4">
                        <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                                alt="Shoes" /></figure>
                        <div class="card-body">
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
                    </div>
                    <br>
                    <Mapbox class="m-8"></Mapbox>
                    <br>

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
                    <!-- <Socket></Socket> -->
                    <!-- Se pueden buscar componentes en https://daisyui.com/components/ -->

                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BreadCrumbs from '@/components/admin/Breadcrumbs.vue';
import AdminHeader from '@/components/admin/AdminHeader.vue';
import Mapbox from '@/components/MapBox.vue';
import ChartLine from '@/components/admin/charts/Line.vue';
import Doughnut from '@/components/admin/charts/Doughnut.vue';
import Bar from '@/components/admin/charts/Bar.vue';
import Polar from '@/components/admin/charts/Polar.vue';
import FloatingBars from '@/components/admin/charts/FloatingBars.vue';
import Radar from '@/components/admin/charts/Radar.vue';
import VueAwesomeSwiper from '@/components/VueAwesomeSwiper.vue';

import Ckeditor from '@/components/Ckeditor.vue';
import TableDefault from '@/components/TableDefault.vue';

// MaboxGeocoder stylesheet needs to be imported manually.
import '@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css';


export default {
    //logout
    // name: "AdminDashboard",
    layout: "AdminLayout",
    components: {
        BreadCrumbs,
        AdminHeader,
        Ckeditor,
        TableDefault,
        Mapbox,
        ChartLine,
        Doughnut,
        Bar,
        Polar,
        FloatingBars,
        Radar,
        VueAwesomeSwiper

    },
    methods: {},
}
</script>

<style></style>