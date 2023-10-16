<!-- Modelo para crear una vista nueva dentro de admin -->
<template>
  <div>
    <div>
    <AdminHeader title="Applications" icon="fa-solid fa-laptop"></AdminHeader>

    <div class=" m-4 2xl:container ">
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pb-24 " >
            <p>Este componente es el modelo para crear una nueva vista en el admin</p>
            {{applications}}
        </div>
    </div>
</div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
// import BreadCrumbs from '@/components/admin/Breadcrumbs.vue';
import AdminHeader from '@/components/admin/AdminHeader.vue';
import FeathersClient from '@/FeathersClient'

export default {
    layout: "AdminLayout",
    data() {
        return {
            applications: [],
        };
    },
    components: {
        AdminHeader,
    },
    methods: {
        async fetchApplications() {
            await this.FeathersClient.service('applications').find({
                query: {
                    $sort: {
                        createdAt: -1,
                    },
                },
            }).then((res) => {
                this.applications = res.data;
            });
        },
    },
    
}
</script>
<style>
</style>