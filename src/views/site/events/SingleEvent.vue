<template>
    <div>
        <SiteHeader />
        <!-- boton volver atras hay que disenarlo bien para ponerlo en varios sectores -->
        <router-link :to="{ name: 'site-events' }" class="btn btn-outline btn-success  m-4">Go Back</router-link>
        <div class="mx-auto mb-24 flex items-center justify-center px-8 mt-2">
            <div class="flex flex-col w-full bg-white rounded shadow-lg sm:w-3/4 md:w-1/2 lg:w-3/5">
                <div class="w-full  bg-top bg-cover rounded-t image" :style="getImageStyle">
                </div>
                <!-- <swiper :spaceBetween="30" :centeredSlides="true" :slides-per-view="2"
                    :autoplay="{ delay: 2500, disableOnInteraction: false }" :pagination="{ clickable: true }"
                    :navigation="true" :modules="modules" class="swiper">
                    <swiper-slide :loop="true" v-for="(image, index) in event.images" :key="index"
                        class="swiper-slider w-full" :style="{ maxHeight: '200px' }">
                        <img :src="image" alt="Event Image">
                    </swiper-slide>
                </swiper> -->
                <div class="flex flex-col w-full md:flex-row">
                    <div
                        class="flex flex-row justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-gray-200 my-4 mx-2 rounded md:flex-col md:items-center md:justify-center md:w-1/4">
                        <div class="md:text-3xl">Jan</div>
                        <div class="md:text-6xl">13</div>
                        <div class="md:text-xl">7 pm</div>
                    </div>
                    <div class="p-4 font-normal text-gray-800 md:w-3/4">
                        <h1 class="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-800">{{ event.title }}</h1>
                        <p class="leading-normal" v-html="event.content"></p>
                        <div class="flex flex-row items-center mt-4 text-gray-700">
                            <div class="w-1/2">
                                Mercedes-Benz Superdome
                            </div>
                            <div class="w-1/2 flex justify-end">
                                <img src="https://collegefootballplayoff.com/images/section_logo.png" alt="" class="w-8">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import SiteHeader from '@/components/site/SiteHeader.vue'
import FeathersClient from '@/FeathersClient.js'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

import { Pagination, Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
export default {
    data() {
        return {
            event: {},
            currentPage: 1, // Página actual
            perPage: 10,   // Cantidad de elementos por página

        }
    },
    components: {
        SiteHeader,
        FeathersClient,
        Swiper,
        SwiperSlide,
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

}
</script>
<style>
.background {
    background-color: #f4f6f8;
}

.image {
    height: 500px;
}
</style>
