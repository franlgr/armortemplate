<template>
    <div>
        <MapboxMap style="height: 400px" ref="map" access-token="pk.eyJ1IjoiY2hhcmx5ZzQyMCIsImEiOiJja3g4N2hha2ExN2Q4Mm9xdTFwYndwY2VrIn0.JAqUQ1-ik2rlyT4Duj15ZA" map-style="mapbox://styles/mapbox/streets-v12" :center="mapCenter" :zoom="1">
            <MapboxGeocoder @mb-result="resultsHandler" />
        </MapboxMap>
        <!-- s -->
    </div>
</template>

<script>
import { ref } from 'vue';
import { MapboxMap, MapboxGeocoder } from '@studiometa/vue-mapbox-gl';



export default {
    components: {
        MapboxMap,
        MapboxGeocoder,
    },
    data() {
        return {
            mapCenter: ref([0, 0]),
            map: null,
        };
    },
    mounted() {
        this.map = this.$refs.map;
        console.log(this.map);
    },
    methods: {
        async resultsHandler(results) {
            console.log("select map results", results.result);
            //Emit
            this.$emit('location', results.result.geometry.coordinates);
            this.$emit('placeName', results.result.place_name);
            // console.log(results.geometry.coordinates);
        }

    },
};
</script>

<style>
.mapboxgl-ctrl-top-right {
    margin-left: -10px;
    left: 33px;
}
</style>
