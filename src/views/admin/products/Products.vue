<template>
    <div>
        <div>
            <AdminHeader title="My Products"></AdminHeader>

            <div class=" 2xl:container ">
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
                                    <th>Precio</th>
                                    <th>Category</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- row 1 -->
                                <tr v-for="product in products" :key="product.index">
                                    <th>
                                        <label>
                                            <input type="checkbox" class="checkbox" />
                                        </label>
                                    </th>
                                    <td>
                                        <div class="flex items-center space-x-3">
                                            <div class="avatar">
                                                <div class="mask mask-squircle w-12 h-12" v-for="image in product.images"
                                                    :key="image.index">
                                                    <img :src="image" alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                                <div class="font-bold">{{ product.title }}</div>
                                                <div class="text-sm opacity-50">United States</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        $ {{ product.price }}
                                        <br />

                                    </td>

                                    <!-- <td v-html="getCategory(product.category)"></td> -->
                                    <td>{{ product.category.title }}</td>
                                    <th>
                                        <!-- <button class="btn btn-sm border-solid border-black bg-green-400">show</button> -->
                                        <!-- { path: '/admin/products/edit/:id', component: EditProduct}, -->
                                        <router-link class="btn btn-sm border-solid border-black bg-green-400"
                                            :to="{ name: 'site-product', params: { id: product._id } }">SHOW</router-link>
                                        <router-link :to="{ name: 'admin-products-edit', params: { id: product._id } }"
                                            class="btn btn-sm border-solid border-black bg-blue-400 mx-2">edit</router-link>

                                        <button @click="deleteProductConfirm(product._id)"
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
                                :disabled="products.length < perPage">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import BreadCrumbs from '@/components/admin/Breadcrumbs.vue';
import AdminHeader from '@/components/admin/AdminHeader.vue';
import FeathersClient from '@/FeathersClient.js';

export default {
    //logout
    // name: "AdminDashboard",
    layout: "AdminLayout",
    data() {
        return {
            products: [],
            currentPage: 1, // Página actual
            perPage: 10,   // Cantidad de elementos por página
        }
    },
    components: {
        BreadCrumbs,
        AdminHeader

    },
    mounted() {


        this.fetchProducts();


        // this.$snotify.success('Example body content', 'Example title', {
        //     timeout: 2000,
        //     showProgressBar: false,
        //     closeOnClick: false,
        //     pauseOnHover: true
        // });

    },
    methods: {
        ...mapActions(['loadingSet']),
        async fetchProducts() {
            this.loadingSet(true);
            try {
                const res = await FeathersClient.service('products').find({
                    query: {
                        user_id: this.getUser._id,
                        // $limit: this.perPage,
                        // $skip: (this.currentPage - 1) * this.perPage,
                        $limit: this.perPage,
                        $skip: (this.currentPage - 1) * this.perPage,
                    }
                });
                this.loadingSet(false);
                this.products = res.data;


                // this.setCategory(res.data.products)

                console.log('fetchProduct', res);
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
        async deleteProductConfirm(id) {
            this.$snotify.confirm('Are you sure you want to delete this product ?', 'Delete Product', {
                timeout: 5000,
                showProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                buttons: [
                    { text: 'Yes', action: (toast) => this.deleteProduct(id, toast.id), bold: false },
                    { text: 'Close', action: (toast) => { console.log('Clicked: No'); this.$snotify.remove(toast.id); }, bold: true },
                ]
            });
        },
        async deleteProduct(id, toastId) {
            console.log('deleteProduct', id);
            this.$snotify.remove(toastId);
            FeathersClient.service('products').remove(id)
                .then(res => {
                    console.log('deleteProduct', res);
                    this.$snotify.success('Product deleted', 'Success', {
                        timeout: 2000,
                        showProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true
                    });
                    this.fetchProducts();
                })
                .catch(err => {
                    console.error(err);

                    this.$snotify.error(err, 'Error', {
                        timeout: 2000,
                        showProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true
                    });
                })
        },
        nextPage() {
            this.currentPage++;
            this.fetchProducts();
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.fetchProducts();
            }
        },
        goToPage(pageNumber) {
            this.currentPage = pageNumber;
            this.fetchProducts();
        },
        //hay que resolver devolver el nombre de la categoria segun el id 

        // async getCategory(id) {
        //     console.log('getCategory', id);
        //     return "res";
        //     const res = await FeathersClient.service('products-categories').get(id)



        //     // try {
        //     //     const res = await FeathersClient.service('products-categories').get(id);
        //     //     console.log('getCategory', res.title);
        //     //     return res.title;
        //     // } catch (error) {
        //     //     console.error(error);
        //     // }

        // },

    },
    // watch get category
    // watch: {
    //     async getCategory(id) {
    //         console.log('getCategory', id);
    //         const res = await FeathersClient.service('products-categories').get(id);
    //         console.log('getCategory', res.title);
    //         return res.title;
    //     },
    computed: {

        ...mapGetters(['getUser']),
        totalPages() {
            return Math.ceil(this.products / this.perPage);
        },

    }
}
</script>

<style></style>