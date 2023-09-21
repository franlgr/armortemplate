<template>
  <swiper
    :spaceBetween="30"
    :centeredSlides="true"
    :slides-per-view="2"
    :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }"
    :pagination="{
      clickable: true,
    }"
    :navigation="true"
    :modules="modules"
    class="swiper w-64">
    <swiper-slide class="swiper-slider">
      <img src="https://picsum.photos/1000/800" alt="">
    </swiper-slide>
    <swiper-slide class="swiper-slider">
      <img src="https://picsum.photos/1000/801" alt="">
    </swiper-slide>
    <swiper-slide class="swiper-slider">
      <img src="https://picsum.photos/1000/802" alt="">
    </swiper-slide>
    <swiper-slide class="swiper-slider">
      <img src="https://picsum.photos/1000/803" alt="">
    </swiper-slide>
    <swiper-slide class="swiper-slider">
      <img src="https://picsum.photos/1000/804" alt="">
    </swiper-slide>
    <swiper-slide class="swiper-slider">
      <img src="https://picsum.photos/1000/805" alt="">
    </swiper-slide>
    <swiper-slide class="swiper-slider">
      <img src="https://picsum.photos/1000/806" alt="">
    </swiper-slide>
  </swiper>
</template>
<script>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';

  import { Pagination, Navigation, Autoplay } from 'swiper/modules';

  // Import Swiper styles
  import 'swiper/css';


  import './style.css'

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
        setup() {
      return {
        modules: [Autoplay, Pagination, Navigation],
      };
    },
  };
</script>
