<template>
  <div>
    <textarea name="" id="" cols="30" rows="10" v-model="html"></textarea>
    <div v-html="html"></div>
    <Test></Test>
  </div>
</template>
<script>
  import '@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css';
  import Mapbox from '@/components/MapBox.vue';
  import Test from '@/components/Test.vue';
  import { ref } from 'vue';
  export default {
    data() {
      return {
        //
        html: '<Test></Test>',
      };
    },
    components: {
      Mapbox,
      Test,
    },
    methods: {
      //
    },
    mounted() {
      //
    },
  };
</script>
