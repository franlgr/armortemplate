<!-- Modelo para crear una vista nueva dentro de admin -->
<template>
  <div>
    <div>
    <AdminHeader title="Default"></AdminHeader>

    <div class=" m-4 2xl:container ">
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pb-24 " >
            Lo correcto para default
        </div>
    </div>
</div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import BreadCrumbs from '@/components/admin/BreadCrumbs.vue';
import AdminHeader from '@/components/admin/AdminHeader.vue';

export default {
    //logout
    // name: "AdminDashboard",
    layout: "AdminLayout",
    components: {
        BreadCrumbs,
        AdminHeader

    },
    methods: {
    },
}
</script>
<style>
</style>