<!-- Modelo para crear una vista nueva dentro de admin -->
<template>
  <div>
    <div>
    <AdminHeader title="Users"></AdminHeader>

    <div class=" m-4 2xl:container ">
        <div class="grid gap-6  " >
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
                <tr v-for="user in users" :key="user.index">
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
    </div>
</div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import BreadCrumbs from '@/components/admin/BreadCrumbs.vue';
import AdminHeader from '@/components/admin/AdminHeader.vue';
import FeathersClient from '@/FeathersClient';

export default {
    //logout
    // name: "AdminDashboard",
    layout: "AdminLayout",
    data: () => ({
        users: [],
    }),
    components: {
        BreadCrumbs,
        AdminHeader,

    },
    mounted() {
        // this.$store.dispatch('admin/getUsers');
        FeathersClient.service('users').find({
            query: {
                $limit: 100,
                // skip: 1,
            }
        }).then((res) => {
            console.log(res.data    );
            this.users = res.data;
        })
    },
    methods: {
    },
}
</script>
<style>
</style>