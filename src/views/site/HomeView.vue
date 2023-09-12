<template>
  <div>
    <p>PAGINA PRINCIPAL DE LA APLICACION WEB PRODUCCION</p>
    <p>Aca va el front con el blog, market, etc</p>
  </div>
</template>

<script>
  // @ is an alias to /src
  // import HelloWorld from '@/components/HelloWorld.vue';

  export default {
    name: 'HomeView',
    layout: 'DefaultLayout',
    components: {
      // HelloWorld,


    },
    data() {
      return {
        settings: {
          dots: true,
          focusOnSelect: false,
          autoplay: true,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1,
          touchThreshold: 1,
        },
      };
    },
  };
</script>
