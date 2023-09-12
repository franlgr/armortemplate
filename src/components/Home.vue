<template>
  <div>HOME</div>
</template>
<script>
  import axios from 'axios';

  export default {
    components: {},
    data() {
      return {
        settings: {
          arrows: true,
          slidesToShow: 1,
          lazyLoad: 'ondemand',
          autoplay: true,
        },
        // settings: {
        //     "dots": true,
        //     "focusOnSelect": false,
        //     "autoplay": true,
        //     "infinite": true,
        //     "speed": 300,

        // },
        sorteos: [],
      };
    },
    mounted() {
      this.fetchSorteos();
    },
    methods: {
      async fetchSorteos() {
        try {
          const response = await axios.get('http://localhost:3030/sorteos');
          this.sorteos = response.data.data;
        } catch (error) {
          console.error('Error fetching sorteos:', error);
        }
      },
    },
  };
</script>
