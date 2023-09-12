<template>
    <div>
        <div>
            <AdminHeader title="Categories"></AdminHeader>
            {{blogs}}
            <div class=" m-4 2xl:container ">
                <div class="">
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
                                    <th>Titulo</th>
                                    <th>Job</th>
                                    <th>Favorite Color</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- row 1 -->
                                <tr v-for="blog in blogs" :key="blog.index">
                                    <th>
                                        <label>
                                <input type="checkbox" class="checkbox" />
                              </label>
                                    </th>
                                    <td>
                                        <div class="flex items-center space-x-3">
                                            <div class="avatar">
                                                <!-- <div class="mask mask-squircle w-12 h-12" v-for="image in blog.images" :key="image.index">
                                                    <img :src="image" alt="Avatar Tailwind CSS Component" />
                                                </div> -->
                                            </div>
                                            <div>
                                                <div class="font-bold">{{blog.title}}</div>
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
                                         <!-- { path: '/admin/products/edit/:id', component: EditProduct}, -->
                                         <router-link :to="{ name: 'admin-blogs-edit', params: { id: blog._id } }" class="btn btn-sm border-solid border-black bg-blue-400 mx-2">edit</router-link>

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
import FeathersClient from '@/FeathersClient.js';

export default {
    //logout
    // name: "AdminDashboard",
    layout: "AdminLayout",
    data() {
        return {
            blogs: []
        }
    },
    components: {
        BreadCrumbs,
        AdminHeader

    },
    mounted() {


        this.fetchBlogs();


        // this.$snotify.success('Example body content', 'Example title', {
        //     timeout: 2000,
        //     showProgressBar: false,
        //     closeOnClick: false,
        //     pauseOnHover: true
        // });

    },
    methods: {
        ...mapActions(['loadingSet']),
        async fetchBlogs() {
            this.loadingSet(true);
            try {
                const res = await FeathersClient.service('blogs').find({
                    query: {
                        // $limit: this.perPage,
                        // $skip: (this.currentPage - 1) * this.perPage,
                    }
                });
                this.loadingSet(false);
                this.blogs = res.data;
                console.log('fetchBlogs', res);
            } catch (error) {
                this.loadingSet(false);
                this.$snotify.error(error, 'Error', {
                        timeout: 2000,
                        showProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true
                    });
                console.error(error);
            }
        },

    },
}
</script>

<style>

</style>