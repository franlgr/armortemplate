<!-- Modelo para crear una vista nueva dentro de admin -->
<template>
    <div>
        <div>
            <AdminHeader title="Components"></AdminHeader>

            <div class=" m-4 2xl:container">
                <div class="">
                    Text Editor
                    <br>
                    <Ckeditor></Ckeditor>
                    <br> Tabla Default
                    <TableDefault></TableDefault>
                    <br>
                    Card Modelo Example
                    <div class="card w-96 bg-base-100 shadow-xl my-8">
                        <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                        <div class="card-body">
                            <h2 class="card-title">
                                Shoes!
                                <div class="badge badge-secondary">NEW</div>
                            </h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div class="card-actions justify-end">
                                <div class="badge badge-outline">Fashion</div>
                                <div class="badge badge-outline">Products</div>
                            </div>
                        </div>
                    </div>
                    <br>
    
                    <!-- Se pueden buscar componentes en https://daisyui.com/components/ -->
    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BreadCrumbs from '@/components/admin/Breadcrumbs.vue';
import AdminHeader from '@/components/admin/AdminHeader.vue';

import Ckeditor from '@/components/Ckeditor.vue';
import TableDefault from '@/components/TableDefault.vue';


export default {
    //logout
    // name: "AdminDashboard",
    layout: "AdminLayout",
    components: {
        BreadCrumbs,
        AdminHeader,
        Ckeditor,
        TableDefault

    },
    methods: {},
}
</script>

<style>

</style>