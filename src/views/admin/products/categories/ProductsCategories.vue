<!-- Modelo para crear una vista nueva dentro de admin -->
<template>
    <div>
        <div>
            <AdminHeader title="Products Categories"></AdminHeader>

            <!-- {{categories}} -->
            <br>

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
                                    <th>Title & Description</th>
                                    <th>Slug</th>
                                    <th>Actions</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- row 1 -->
                                <tr v-for="category in categories" :key="category.index">
                                    <th>
                                        <label>
                                            <input type="checkbox" class="checkbox" />
                                        </label>
                                    </th>
                                    <td>
                                        <div class="flex items-center space-x-3">
                                            <div class="avatar">
                                                <div class="mask mask-squircle w-12 h-12">
                                                    <img :src="category.image" alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div class="font-bold">{{ category.title }}</div>
                                                <!-- <div class="text-sm opacity-50">{{category.description}}</div> -->
                                                <div class="text-sm opacity-50" v-html="category.description"></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{{ category.slug }}</td>
                                    <th>
                                        <button class="btn btn-sm border-solid border-black bg-green-400">show</button>
                                        <router-link
                                            :to="{ name: 'admin-products-categories-edit', params: { id: category._id } }"
                                            class="btn btn-sm border-solid border-black bg-blue-400 mx-2">edit</router-link>
                                        <button @click="deleteCategoryConfirm(category._id)"
                                            class="btn btn-sm border-solid border-black bg-red-400">delete</button>
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
                        <!-- Paginación -->
                        <div class="join grid grid-cols-2 pagination w-64 m-auto py-8">
                            <button class="join-item btn btn-outline" @click="prevPage"
                                :disabled="currentPage === 1">Previous</button>
                            <button class="join-item btn btn-outline" @click="nextPage"
                                :disabled="categories.length < perPage">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
// import BreadCrumbs from '@/components/admin/Breadcrumbs.vue';
import AdminHeader from '@/components/admin/AdminHeader.vue';
import FeathersClient from '@/FeathersClient';

export default {
    data() {
        return {
            categories: [],
            currentPage: 1, // Página actual
            perPage: 10,   // Cantidad de elementos por página
            // title: 'Product Categories',
        }
    },
    components: {
        // BreadCrumbs,
        AdminHeader

    },
    mounted() {
        this.fetchCategories();
    },
    methods: {
        ...mapActions(['loadingSet']),
        fetchCategories() {
            this.loadingSet(true);
            FeathersClient.service('products-categories').find({
                query: {
                    $limit: this.perPage,
                    $skip: (this.currentPage - 1) * this.perPage,

                }
            }).then(res => {
                this.loadingSet(false);
                this.categories = res.data;

            }).catch(err => {
                console.error(err);
                this.loadingSet(false);
            });
        },
        deleteCategoryConfirm(id) {
            this.$snotify.confirm('Are you sure you want to delete this category ?', 'Delete Category', {
                timeout: 5000,
                showProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                buttons: [
                    { text: 'Yes', action: (toast) => this.deleteCategory(id, toast.id), bold: false },
                    {
                        text: 'Close', action: (toast) => {
                            console.log('Clicked: No');
                            this.$snotify.remove(toast.id);
                        }, bold: true
                    },
                ]
            });
        },
        // deleteUser(id, toastId) {
        //     console.log('deleteUser', id);
        //     this.$snotify.remove(toastId);
        //     FeathersClient.service('users').remove(id)
        //         .then(res => {
        //             console.log('deleteUser', res);
        //             this.$snotify.success('User deleted', 'Success', {
        //                 timeout: 2000,
        //                 showProgressBar: false,
        //                 closeOnClick: false,
        //                 pauseOnHover: true
        //             });
        //             this.fetchUsers();
        //         })
        //         .catch(err => {
        //             console.error(err);

        //             this.$snotify.error(err, 'Error', {
        //                 timeout: 2000,
        //                 showProgressBar: false,
        //                 closeOnClick: false,
        //                 pauseOnHover: true
        //             });
        //         });
        // },
        deleteCategory(id, toastId) {
            console.log('deleteCategory', id);
            this.$snotify.remove(toastId);
            this.loadingSet(true);
            FeathersClient.service('products-categories').remove(id)
                .then(res => {
                    console.log('deleteCategory', res);
                    this.$snotify.success('Category deleted', 'Success', {
                        timeout: 2000,
                        showProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true
                    });
                    this.loadingSet(false);
                    this.fetchCategories();
                })
                .catch(err => {
                    console.error(err);
                    this.loadingSet(false);
                    this.$snotify.error(err, 'Error', {
                        timeout: 2000,
                        showProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true
                    });
                });
        },
        nextPage() {
            this.currentPage++;
            this.fetchCategories();
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.fetchCategories();
            }
        },
        goToPage(pageNumber) {
            this.currentPage = pageNumber;
            this.fetchCategories();
        },
    },
    computed: {

        ...mapGetters(['getUser']),
        totalPages() {
            return Math.ceil(this.categories / this.perPage);
        },

    }
}
</script>

<style></style>