<template>
  <div>
    <div>
      <AdminHeader
        title="All Products"
        icon="fa-brands fa-product-hunt"
        :count="products.length"
      ></AdminHeader>
       <div class="bg-yellow-100 border-t border-b border-yellow-500 text-yellow-700 px-4 py-3" role="alert">
    <p class="font-bold">My Products</p>
    <p>Here, you can view, edit, or delete your products.</p>
   <!-- {{ getUser._id }}
   {{ products }} -->
</div>
      <div class="m-2 sm:container mx-auto ml-1">
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
                  <button v-if="selectDelete" @click="selectDelete=false" class="border border-red-500 hover:border-red-700 text-white p-2">
                      Cancel
                     </button>
                  
                <tr>
                  <th v-if="selectDelete">
                    <div><span>Select All</span></div>
                    <label >
                      <input
                        type="checkbox"
                        class="checkbox"
                        v-model="selectAll"
                        @change="selectAllProducts"
                      />
                    </label>
                  </th>
                  <th>Titulo</th>
                  <th v-if="!isMobile">Precio</th>
                  <th v-if="!isMobile">Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <!-- row 1 -->
                <tr v-for="product in products" :key="product.index">
                  <th v-if="selectDelete">
                    <label >
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
                        <div v-if="!isMobile" class="mask mask-squircle w-12 h-12">
                          <img
                            :src="product.images[0]"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                        <div v-if="isMobile" class="mask mask-squircle w-10 h-10">
                          <img
                            :src="product.images[0]"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div class="text-xs font-bold">{{ product.title }}</div>
                        <span v-if="isMobile" >$ {{ product.price }}</span>
                      </div>
                    </div>
                  </td>
                  <td v-if="!isMobile" class="font-xs">
                     $ {{ product.price }}
                    <br />
                  </td>

                  <!-- <td v-html="getCategory(product.category)"></td> -->
                  <td v-if="!isMobile">{{ product.category.title }}</td>
                  <th>
                    <div v-if="!isMobile" class="flex justify-between">
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
                    <!---->
                    <div v-if="isMobile" class="flex justify-between">
                      <router-link
                        :to="{ name: 'site-product', params: { id: product._id } }"
                        class="flex items-center"
                      >
                        <button
                          class="border w-8 h-8 border-blue-500 hover:border-blue-700 rounded-full p-2"
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
                          class="border w-8 h-8 border-yellow-500 hover:border-yellow-700 rounded-full p-2"
                        >
                          <i class="fas fa-edit text-yellow-500"></i>
                        </button>
                      </router-link>
                    </div>
                  </th>
                </tr>
              </tbody>
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
        windowWidth: window.innerWidth,
        selectDelete:false,
      };
    },
    components: {
      BreadCrumbs,
      AdminHeader,
    },
    beforeDestroy() {
  window.removeEventListener('resize', this.updateWindowWidth);
},
    mounted() {
      this.fetchProducts();
      window.addEventListener('resize', this.updateWindowWidth);
      this.updateWindowWidth(); // Llama al método para inicializar el valor
    },
    methods: {
      ...mapActions(['loadingSet']),

      updateWindowWidth() {
    this.windowWidth = window.innerWidth;
  },

      async fetchProducts() {
        this.loadingSet(true);
        try {
          if (this.isAdmin) {
            const res = await FeathersClient.service('products').find({
              query: {
                $limit: this.perPage,
                $skip: (this.currentPage - 1) * this.perPage,
                $sort: {
                  createdAt: -1,
                },
              },
            });
            this.loadingSet(false);
            this.products = res.data;
          }
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
        this.loadingSet(false);
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
        this.selectDelete=true;
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

      isMobile() {
    return this.windowWidth <= 768; // Puedes ajustar este valor según tus necesidades
  },
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
