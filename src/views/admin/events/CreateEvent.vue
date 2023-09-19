<template>
    <div>
        <div>
            <AdminHeader title="Create Event"></AdminHeader>

            <div class="mt-6">
                <router-link to="/admin/events"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-3 ml-4 rounded ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block -ml-1" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18">
                        </path>
                    </svg>
                    Volver Atrás
                </router-link>
            </div>
            <div class=" m-4 2xl:container ">
                <div class="pb-4 m-8 ">
                    <FormKit type="date" value="2011-01-01" label="Birthday" help="Enter your birth day"
                        validation="required|date_before:2010-01-01" validation-visibility="live" />
                    <MapBox class=""></MapBox>
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
