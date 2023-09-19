<!-- Modelo para crear una vista nueva dentro de admin -->
<template>
  <div>

    <AdminHeader title="Events Categories"></AdminHeader>

<div class="my-6">
               <router-link to="/admin/events"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-3 ml-4 rounded ">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block -ml-1" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18">
                </path>
            </svg>
            Volver Atrás
        </router-link></div>


    <div class="overflow-x-auto">
        <table class="table">
            <!-- head -->
            <thead>
                <tr>
                    <th>
                        <label>
                    <input type="checkbox" class="checkbox" />
                  </label>
                    </th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <!-- row 1 -->
                <tr>
                    <th>
                        <label>
                    <input type="checkbox" class="checkbox" />
                  </label>
                    </th>
                    <td>
                        <div class="flex items-center space-x-3">
                            <div class="avatar">
                                <div class="mask mask-squircle w-12 h-12">
                                    <img src="https://picsum.photos/300/300" alt="Avatar Tailwind CSS Component" />
                                </div>
                            </div>
                            <div>
                                <div class="font-bold">Hart Hagerty</div>
                                <div class="text-sm opacity-50">United States</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        Zemlak, Daniel and Leannon
                        <br/>
    
                    </td>
                    <td>Purple</td>
                    <th>
                        <button class="btn btn-sm border-solid border-black bg-green-400">show</button>
                        <button class="btn btn-sm border-solid border-black bg-blue-400 mx-2">edit</button>
                        <button class="btn btn-sm border-solid border-black bg-red-400">delete</button>
                    </th>
                </tr>
            </tbody>
            <!-- foot -->
            <!-- <tfoot>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Job</th>
                                        <th>Favorite Color</th>
                                        <th></th>
                                    </tr>
                                </tfoot> -->
    
        </table>
    </div>




  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
// import BreadCrumbs from '@/components/admin/Breadcrumbs.vue';
import AdminHeader from '@/components/admin/AdminHeader.vue';

export default {
    //logout
    // name: "AdminDashboard",
    layout: "AdminLayout",
    components: {
        // BreadCrumbs,
        AdminHeader

    },
    methods: {
    },
}
</script>
<style>
</style>