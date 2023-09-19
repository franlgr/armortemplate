
<script setup>
import { ref } from 'vue';
import { MapboxMap } from '@studiometa/vue-mapbox-gl';

const mapCenter = ref([0, 0]);
</script>

<template>
    <MapboxMap style="height: 400px"
        access-token="pk.eyJ1IjoiY2hhcmx5ZzQyMCIsImEiOiJja3g4N2hha2ExN2Q4Mm9xdTFwYndwY2VrIn0.JAqUQ1-ik2rlyT4Duj15ZA"
        map-style="mapbox://styles/mapbox/streets-v11" :center="mapCenter" :zoom="1" />
</template>