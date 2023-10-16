<!-- Modelo para crear una vista nueva dentro de admin -->
<template>
    <div>
        <div>
            <AdminHeader title="Applications" icon="fa-solid fa-laptop"></AdminHeader>
    
            <div class=" m-4 2xl:container ">
                <!-- <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 pb-24 " > -->
                <div class="grid gap-6 pb-24 ">
                    {{applications}}
                    <div class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                        <p class="font-bold">Applications</p>
                        <p>Using the same CMS model, applications are created. These apps are automatically generated using Docker based on the main model. A subdomain is also automatically generated and mounted for each app. The creation process for each app
                            takes approximately 1 minute.</p>
                    </div>
    
                    <table class="table">
                        <!-- head -->
                        <thead>
                            <tr>
                                <th>
                                    <label>
                        <input type="checkbox" class="checkbox" />
                      </label>
                                </th>
                                <th>Logo</th>
                                <th>Title</th>
                                <th>Plugins</th>
                                <th>LINK SUBDOMAIN</th>
                                <th>Actions</th>
                                
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
                                        <!-- <div>
                                            <div class="font-bold">Hart Hagerty</div>
                                            <div class="text-sm opacity-50">United States</div>
                                        </div> -->
                                    </div>
                                </td>
                                <td>
                                    Zemlak, Daniel and Leannon
                                    <br/>
    
                                </td>
                                <!-- <td>Purple</td> -->
                                <td><a href="#">Mercadopago, Paypal, Strapi</a></td>
                                <td><a href="#">argentina.armortemplate.site</a></td>
                                <th class="w-48">
                                    <!-- <button class="p-1  border-solid border-black bg-green-400">show</button> -->
                                    <!-- <button class="p-1  border-solid border-black mx-1 bg-blue-400">edit</button> -->
                                    <button class="p-1  border-solid border-black bg-red-400 ml-2">delete</button>
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