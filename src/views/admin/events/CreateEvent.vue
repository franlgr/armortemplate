<template>
  <div>
    <div>
    <AdminHeader title="Create Event"></AdminHeader>

    <div class=" m-4 2xl:container ">
        <div class="" >
             <MapBox></MapBox>
        </div>
    </div>
</div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
// import BreadCrumbs from '@/components/admin/Breadcrumbs.vue';
import AdminHeader from '@/components/admin/AdminHeader.vue';
import MapBox from '@/components/MapBox.vue'

export default {
    components: {
        MapBox,
        AdminHeader
    },
}
</script>

<!-- Modelo para crear una vista nueva dentro de admin -->
