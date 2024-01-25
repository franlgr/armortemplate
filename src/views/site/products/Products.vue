<template>
  <div class="bg-white">
    <SiteHeader></SiteHeader>


    <div class="flex flex-col">
      <div class="flex flex-col justify-center">
        <div class="relative">
          <div
            class="background-container parallax flex justify-center items-center"
          >
            <!-- Aquí está el fondo de degradado -->
            <img class="h-64 w-64" src="@/assets/AuthLogo.svg" alt="Logo" />
          </div>
          <div
            class="absolute sm:bottom-8 bottom-4 pr-10 sm:pr-0 left-4 sm:left-8 flex justify-start items-start"
          >
            <p class="text-3xl sm:text-4xl font-semibold leading-9 text-white">
              Products of all kinds
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="pb-16 items-start container justify-between mx-auto mt-2">
      <div class="md:flex">
        <!-- Columna 1 (a pantalla completa en pantallas pequeñas) -->
        <div class="lg:w-1/4">
          <!-- ./sidebar -->
          <div class=" ">
            <div class="divide-y divide-gray-200 space-y-5 p-4 mb:p-0">
              <MarketCategories
                :categories="categories"
                :tag="tag"
              ></MarketCategories>
              <div class="p-2">

              </div>
            </div>
          </div>
        </div>
      
        <!-- Columna 2 (a pantalla completa en pantallas pequeñas) -->
        <div class="lg:w-3/4">
          <!-- <div>
    <h2>Carrito de compras</h2>
    <ul>
      <li v-for="item in cartItems" :key="item.product._id">
        {{ item.product.title}} - Cantidad: {{ item.quantity }} - Precio: ${{ item.product.price }}
      </li>
      <li>
        Total price: ${{ calculateTotalPrice() }}
      </li>
    </ul>
  </div> -->
   
          <div class="">
            <div class="float-right">
                <CartNoty />
              </div>
            <div class="flex items-center mb-4 p-4">
              <select
                v-model="sortOption"
                name="sort"
                id="sort"
                class="w-44 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary"
              >
                <option value="">Default sorting</option>
                <option value="price-low-to-high">Price low to high</option>
                <option value="price-high-to-low">Price high to low</option>
                <option value="latest">Latest product</option>
              </select>

             
              <div class="flex gap-2 ml-auto">
                <div
                  class="border border-primary w-10 h-9 flex items-center justify-center text-white bg-primary rounded cursor-pointer"
                >
                  <i class="fa-solid fa-grip-vertical"></i>
                </div>
                <div
                  class="border border-gray-300 w-10 h-9 flex items-center justify-center text-gray-600 rounded cursor-pointer"
                >
                  <i class="fa-solid fa-list"></i>
                </div>
              </div>
            </div>
            <div
              class="bg-gray-100 p-4 text-center p-4"
              v-if="products.length < 1"
            >
              No hay productos en esta categoría
            </div>
  
            <div
              class="grid md:grid-cols-1 sm:grid-cols-2 grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4"
            >
              <div
                class="rounded overflow-hidden group"
                v-for="product in sortedOrFilteredProducts"
                :key="products.index"
              >
                <div class="relative bg-gray-300">
                  <div class="w-full h-64">
                    <div
                      class="w-full h-full"
                      :style="backgroundImageStyle(product.images[0])"
                    ></div>
                  </div>

                  <div
                    class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
                  >
                    <router-link
                      :to="{
                        name: 'site-product',
                        params: { id: product._id },
                      }"
                      class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                      title="view product"
                    >
                      <i class="fa-solid fa-magnifying-glass"></i>
                    </router-link>
                    <a
                      href="#"
                      class="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                      title="add to wishlist"
                    >
                      <i class="fa-solid fa-heart"></i>
                    </a>
                  </div>
                </div>
                <div class="pt-4 pb-3 px-4" style="min-height: 240px">
                  <a href="#">
                    <!-- //aca -->
                    <router-link
                      :to="{
                        name: 'site-product',
                        params: { id: product._id },
                      }"
                      class=""
                      title="view product"
                    >
                      <h4
                        class="uppercase hover:text-blue-500 font-medium text-xl mb-2 text-gray-800 hover:text-primary transition"
                      >
                        {{ product.title }}
                      </h4>
                    </router-link>
                  </a>
                  <div v-if="product.category">
                    <p class="text-blue-600">{{ product.category.title }}</p>
                  </div>

                  <div class="flex items-baseline mb-1 space-x-2">
                    <p class="text-xl text-primary font-semibold">
                      ${{ product.price }}
                    </p>
                    <p class="text-sm text-gray-400 line-through">
                      {{ product.price + 500 }}
                    </p>
                  </div>
                  <div class="flex items-center">
                    <div class="flex gap-1 text-sm text-yellow-400">
                      <span><i class="fa-solid fa-star"></i></span>
                      <span><i class="fa-solid fa-star"></i></span>
                      <span><i class="fa-solid fa-star"></i></span>
                      <span><i class="fa-solid fa-star"></i></span>
                      <span><i class="fa-solid fa-star"></i></span>
                    </div>
                    <div class="text-xs text-gray-500 ml-3">(150)</div>
                  </div>
                </div>
                <button
                  @click="handleCartAction(product)"
                  v-bind:class="{
                    'bg-red-300 text-black': isInCart(product._id),
                    'text-primary': !isInCart(product._id),
                  }"
                  class="block w-full bg-green-300 py-1 text-center border-solid border-2 border-black text-black bg-primary border border-primary rounded-b hover:text-primary transition"
                >
                  {{
                    isInCart(product._id) ? 'Remove from cart' : 'Add to Cart'
                  }}
                </button>
              </div>
            </div>
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
            <!-- Fin Paginación -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import FeathersClient from '@/FeathersClient';
  import SiteHeader from '@/components/site/SiteHeader.vue';
  import MarketCategories from '@/components/site/market/MarketCategories.vue';
  import CartNoty from '@/components/CartNoty.vue';

  export default {
    data() {
      return {
        tag: '',
        products: [],
        categories: [],
        currentPage: 1, // Página actual
        perPage: 12, // Cantidad de elementos por página
        sortOption: '',
      };
    },
    components: {
      SiteHeader,
      MarketCategories,
      CartNoty,
    },
    created() {
      const urlParams = new URLSearchParams(window.location.search);
      this.tag = urlParams.get('tag');
      this.variableDeURL = this.$route.query.slug;
      this.fetchProducts();
      this.fetchCategories();

      console.log(this.variableDeURL);
      console.log(this.products);
    },
    methods: {
      ...mapActions(['loadingSet', 'addToCart']),
      backgroundImageStyle(imageUrl) {
        return {
          backgroundImage: `url('${imageUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
      },

      calculateTotalPrice() {
      return this.cartItems.reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0);
    },

      async fetchProducts() {
        try {
          this.loadingSet(true);
          if (this.tag) {
            const response = await FeathersClient.service('products').find({
              query: {
                $limit: this.perPage,
                $skip: (this.currentPage - 1) * this.perPage,
                'category._id': this.tag,
              },
            });
            this.products = response.data;
            this.loadingSet(false);
            return;
          } else {
            const response = await FeathersClient.service('products').find({
              query: {
                $limit: this.perPage,
                $skip: (this.currentPage - 1) * this.perPage,
              },
            });
            this.products = response.data;
            this.loadingSet(false);
            return;
          }

          this.products = response.data;
          this.loadingSet(false);
        } catch (error) {
          console.log(error);
        }
      },
      fetchCategories() {
        FeathersClient.service('products-categories')
          .find({
            query: {
              $limit: 100,
            },
          })
          .then((categories) => {
            console.log(categories);
            this.categories = categories.data;
          });
      },
      //pagination
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
      //finish pagination
      handleCartAction(product) {
        if (this.isInCart(product._id)) {
          this.$snotify.error('Product removed from cart', 'Success', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });
          this.removeFromCart(product);
          product.isInCart = this.isInCart(product._id);
        } else {
          this.addToCart(product);
          product.isInCart = this.isInCart(product._id);
          this.$snotify.success('Product added to cart', 'Success', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });
        }
      },
      removeFromCart(product) {
        if (this.isInCart(product._id)) {
          this.$store.dispatch('removeFromCart', product); // Llama a la acción Vuex
          product.isInCart = false; // Actualiza el estado de isInCart
          this.isInCart(product._id);
        }
      },
    },
    computed: {
      filteredItems() {
        return this.items.filter((item) => item.category === this.tag);
        
      },
      cartItems() {
      return this.$store.getters.cartItems;
    },
      sortedOrFilteredProducts() {
        // Lógica para ordenar o filtrar productos según sortOption
        if (this.sortOption === 'price-low-to-high') {
          return this.products.sort((a, b) => a.price - b.price);
        } else if (this.sortOption === 'price-high-to-low') {
          return this.products.sort((a, b) => b.price - a.price);
        } else if (this.sortOption === 'latest') {
          // Agrega tu lógica para ordenar por productos más recientes
          // Por ejemplo, si tus productos tienen una propiedad 'createdAt'

          return this.products.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
              return -1;
            } else if (a.createdAt < b.createdAt) {
              return 1;
            } else {
              return 0;
            }
          });
        } else {
          // Si no se ha seleccionado ninguna opción de ordenación, muestra los productos tal como están
          return this.products;
        }
      },
      ...mapGetters(['cartProducts', 'isInCart', 'isAuthenticated']),
    },
    watch: {
      $route(to, from) {
        const urlParams = new URLSearchParams(to.query);
        this.tag = urlParams.get('tag');
        this.fetchProducts();
      },
    },
  };
</script>
