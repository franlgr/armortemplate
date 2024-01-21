<template>
  <div>
    <div>
      <AdminHeader
        title="My Products"
        icon="fa-brands fa-product-hunt"
        :count="products.length"
      ></AdminHeader>
       <div class="bg-yellow-100 border-t border-b border-yellow-500 text-yellow-700 px-4 py-3" role="alert">
    <p class="font-bold">My Products</p>
    <p>Here, you can view, edit, or delete your products.</p>
   <!-- {{ getUser._id }}
   {{ products }} -->
</div>
      <div class="2xl:container h-screen">
        <div class="">
          <div class="overflow-x-auto">
         

            <table class="table">
              <!-- head -->
              <thead>
                <div class="flex items-center">
                  <button @click="deleteSelectedProducts()" class="border w-12 h-12 border-red-500 hover:border-red-700 rounded-full p-2">
                      <i class="fas fa-trash-alt text-red-500"></i>
                     </button>
                  </div>
                <tr>
                  <th>
                    <div><span>Select All</span></div>
                    <label>
                      <input
                        type="checkbox"
                        class="checkbox"
                        v-model="selectAll"
                        @change="selectAllProducts"
                      />
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
                      <input
                        type="checkbox"
                        class="checkbox"
                        v-model="product.selected"
                        @change="checkDeleteButtonState"
                      />
                    </label>
                  </th>
                  <td>
                    <div class="flex items-center space-x-3">
                      <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                          <img
                            :src="product.images[0]"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div class="font-bold">{{ product.title }}</div>
                        <!-- <div class="font-bold">{{ product.user }}</div> -->

                        <!-- <div class="text-sm" v-if="getUser">
                          <img
                            :src="getUser.image"
                            alt=""
                            class="w-8 h-8 rounded-full float-left mr-2"
                          />
                          <p class="mt-2 p-1">
                            {{ getUser.name }} {{ getUser.lastname }}
                          </p>
                        </div> -->
                      </div>
                    </div>
                  </td>
                  <td>
                    $ {{ product.price }}
                    <br />
                  </td>

                  <!-- <td v-html="getCategory(product.category)"></td> -->
                  <td v-if="product.category">{{ product.category.title }}</td>
                  <th>
                    <div class="flex justify-between">
                      <router-link
                        :to="{ name: 'site-product', params: { id: product._id } }"
                        class="flex items-center"
                      >
                        <button
                          class="border w-12 h-12 border-blue-500 hover:border-blue-700 rounded-full p-2"
                        >
                          <i class="fas fa-eye text-blue-500"></i>
                        </button>
                      </router-link>
                      <router-link
                        :to="{
                          name: 'admin-products-edit',
                          params: { id: product._id },
                        }"
                        class="flex items-center"
                      >
                        <button
                          class="border w-12 h-12 border-yellow-500 hover:border-yellow-700 rounded-full p-2"
                        >
                          <i class="fas fa-edit text-yellow-500"></i>
                        </button>
                      </router-link>
                    </div>
                    <!-- <button class="btn btn-sm border-solid border-black bg-green-400">show</button> -->
                    <!-- { path: '/admin/products/edit/:id', component: EditProduct}, -->
                    <!-- <router-link
                      class="btn btn-sm border-solid border-black bg-green-400"
                      :to="{
                        name: 'site-product',
                        params: { id: product._id },
                      }"
                      >SHOW</router-link
                    >
                    <router-link
                      :to="{
                        name: 'admin-products-edit',
                        params: { id: product._id },
                      }"
                      class="btn btn-sm border-solid border-black bg-blue-400 mx-2"
                      >edit</router-link
                    > -->

                    <!-- <button
                      @click="deleteProductConfirm(product._id)"
                      class="btn btn-sm border-solid border-black bg-red-400"
                    >
                      delete
                    </button> -->
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
              <button
                class="join-item btn btn-outline"
                @click="prevPage"
                :disabled="currentPage === 1"
              >
                Previous
              </button>
              <button
                class="join-item btn btn-outline"
                @click="nextPage"
                :disabled="products.length < perPage"
              >
                Next
              </button>
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
    layout: 'AdminLayout',
    data() {
      return {
        products: [],
        currentPage: 1, // Página actual
        perPage: 10, // Cantidad de elementos por página
        selectAll: false,
        showDeleteButton: false,
      };
    },
    components: {
      BreadCrumbs,
      AdminHeader,
    },
    mounted() {
      this.fetchProducts();
    },
    methods: {
      ...mapActions(['loadingSet']),
      async fetchProducts() {
        this.loadingSet(true);
        try {
          const res = await FeathersClient.service('products').find({
            query: {
              user_id: this.getUser._id, // Asegúrate de tener el valor correcto aquí
              $limit: 10, // Cambia la cantidad según tu necesidad
              $sort: {
                createdAt: -1,
              },
            },
          });
          this.loadingSet(false);
          this.products = res.data;
        } catch (error) {
          this.loadingSet(false);
          this.$snotify.error(error, 'Error', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });
          console.error(error);
        }
      },

      async deleteProduct(productId) {
        try {
          await FeathersClient.service('products').remove(productId);
          this.products = this.products.filter((product) => product._id !== productId);
          console.log('Producto eliminado con éxito.');
          this.$snotify.success('Producto eliminado con éxito', 'Éxito', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });

        } catch (error) {
          console.error('Error al eliminar el producto:', error);
          this.$snotify.error('Error al eliminar el/los producto/s', 'Error: ', error, {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });
        }
      },

      deleteSelectedProducts() {
        const selectedProducts = this.products.filter((product) => product.selected);
        if (selectedProducts.length > 0) {
          const confirmationMessage =
            'Are you sure you want to delete selected products?';
          const toastId = this.$snotify.info(
            confirmationMessage,
            'Deleted Products',
            {
              timeout: 0,
              showProgressBar: true,
              closeOnClick: false,
              pauseOnHover: true,
              buttons: [
                {
                  text: 'Yes',
                  action: (toast) => {
                    selectedProducts.forEach((product) => {
                      this.deleteProduct(product._id);
                    });
                    this.$snotify.remove(toast.id);
                  },
                  bold: false,
                },
                {
                  text: 'Close',
                  action: (toast) => {
                    console.log('Clicked: No');
                    this.$snotify.remove(toast.id);
                  },
                  bold: true,
                },
              ],
            },
          );
        }
      },

      selectAllProducts() {
        this.products.forEach((product) => {
          product.selected = this.selectAll;
        });
        this.checkDeleteButtonState();
      },

      checkDeleteButtonState() {
        this.showDeleteButton = this.products.some((product) => product.selected);
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
    },
    computed: {
      ...mapGetters(['getUser']),
      totalPages() {
        return Math.ceil(this.products / this.perPage);
      },
      isAdmin() {
        // return this.getUser.role === 'admin'; role es un array
        return this.getUser.permissions.includes('admin');
      },
    },
  };
</script>

<style></style>
