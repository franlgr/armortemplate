<template>
  <div>
    <MapboxMap
      style="height: 400px"
      ref="map"
      access-token="pk.eyJ1IjoiY2hhcmx5ZzQyMCIsImEiOiJja3g4N2hha2ExN2Q4Mm9xdTFwYndwY2VrIn0.JAqUQ1-ik2rlyT4Duj15ZA"
      map-style="mapbox://styles/mapbox/streets-v11"
      :center="mapCenter"
      :zoom="1"
    >
      <!-- {{ events }} -->
      <MapboxMarker
        :lng-lat="[event.location[0], event.location[1]]"
        popup
        v-for="event in events"
        :key="event.index"
      >
        <template v-slot:popup>
          <div class="p-2 bg-green-200 shadow-xl">
            <figure>
              <img :src="event.images[0]" alt="Shoes" />
            </figure>
            <div class="p-2 text-black">
              <h2 class="card-title">
                {{ event.title }}
                <div class="badge badge-secondary">NEW</div>
              </h2>
              <p v-html="event.content"></p>
              <div class="card-actions justify-end mt-2">
                <div class="badge badge-outline">
                  {{ event.category.title }}
                </div>
              </div>
              <router-link
                :to="{ name: 'site-event', params: { id: event._id } }"
                class="btn w-full mt-4"
                >View</router-link
              >
            </div>
          </div>
        </template>
      </MapboxMarker>
    </MapboxMap>
    <!-- s -->
  </div>
</template>

<script>
  import { ref } from 'vue';
  import {
    MapboxMap,
    MapboxGeocoder,
    MapboxMarker,
  } from '@studiometa/vue-mapbox-gl';

  export default {
    components: {
      MapboxMap,
      MapboxGeocoder,
      MapboxMarker,
    },
    data() {
      return {
        mapCenter: ref([0, 0]),
        map: null,
      };
    },
    props: {
      events: {
        type: Array,
        required: true,
      },
    },
    mounted() {
      this.map = this.$refs.map;
      console.log(this.map);
    },
    methods: {
      async resultsHandler(results) {
        console.log('select map results', results.result);
        //Emit
        this.$emit('location', results.result.geometry.coordinates);
        this.$emit('placeName', results.result.place_name);
        // console.log(results.geometry.coordinates);
      },
    },
  };
</script>

<style>
  .mapboxgl-ctrl-top-right {
    margin-left: -10px;
    left: 33px;
  }
  .mapboxgl-popup-content {
    margin: 0;
    padding: 0;
    border-radius: 50%;
  }
</style>
