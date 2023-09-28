<template>
  <div class="bg-white">
    <SiteHeader></SiteHeader>
    <!-- {{ cartItems }} -->
    <!-- {{ cartProducts }} -->
    <Cart></Cart>
    <div class="flex flex-col">
      <div class="flex flex-col justify-center">
        <div class="relative">
          <div
            class="bg-gradient-to-b from-green-700 to-green-500 h-80 sm:h-85 background-container"
          >
            <!-- Aquí está el fondo de degradado -->
            <img
              class="h-64 w-64 m-auto pt-8"
              src="@/assets/AuthLogo.svg"
              alt="Logo"
            />
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
      <div>
        <router-link
          :to="{ name: 'site-events' }"
          class="btn btn-outline btn-success m-4 ml-8"
          >Go Back</router-link
        >
      </div>
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
                <div>
                  <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">
                    Brands
                  </h3>
                  <div class="space-y-2">
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        name="brand-1"
                        id="brand-1"
                        class="text-primary focus:ring-0 rounded-sm cursor-pointer"
                      />
                      <label
                        for="brand-1"
                        class="text-gray-600 ml-3 cusror-pointer"
                        >Cooking Color</label
                      >
                      <div class="ml-auto text-gray-600 text-sm">(15)</div>
                    </div>
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        name="brand-2"
                        id="brand-2"
                        class="text-primary focus:ring-0 rounded-sm cursor-pointer"
                      />
                      <label
                        for="brand-2"
                        class="text-gray-600 ml-3 cusror-pointer"
                        >Magniflex</label
                      >
                      <div class="ml-auto text-gray-600 text-sm">(9)</div>
                    </div>
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        name="brand-3"
                        id="brand-3"
                        class="text-primary focus:ring-0 rounded-sm cursor-pointer"
                      />
                      <label
                        for="brand-3"
                        class="text-gray-600 ml-3 cusror-pointer"
                        >Ashley</label
                      >
                      <div class="ml-auto text-gray-600 text-sm">(21)</div>
                    </div>
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        name="brand-4"
                        id="brand-4"
                        class="text-primary focus:ring-0 rounded-sm cursor-pointer"
                      />
                      <label
                        for="brand-4"
                        class="text-gray-600 ml-3 cusror-pointer"
                        >M&D</label
                      >
                      <div class="ml-auto text-gray-600 text-sm">(10)</div>
                    </div>
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        name="brand-5"
                        id="brand-5"
                        class="text-primary focus:ring-0 rounded-sm cursor-pointer"
                      />
                      <label
                        for="brand-5"
                        class="text-gray-600 ml-3 cusror-pointer"
                        >Olympic</label
                      >
                      <div class="ml-auto text-gray-600 text-sm">(10)</div>
                    </div>
                  </div>
                </div>

                <div class="pt-4">
                  <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">
                    Price
                  </h3>
                  <div class="mt-4 flex items-center">
                    <input
                      type="text"
                      name="min"
                      id="min"
                      class="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                      placeholder="min"
                    />
                    <span class="mx-3 text-gray-500">-</span>
                    <input
                      type="text"
                      name="max"
                      id="max"
                      class="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                      placeholder="max"
                    />
                  </div>
                </div>

                <div class="pt-4">
                  <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">
                    size
                  </h3>
                  <div class="flex items-center gap-2">
                    <div class="size-selector">
                      <input
                        type="radio"
                        name="size"
                        id="size-xs"
                        class="hidden"
                      />
                      <label
                        for="size-xs"
                        class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                        >XS</label
                      >
                    </div>
                    <div class="size-selector">
                      <input
                        type="radio"
                        name="size"
                        id="size-sm"
                        class="hidden"
                      />
                      <label
                        for="size-sm"
                        class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                        >S</label
                      >
                    </div>
                    <div class="size-selector">
                      <input
                        type="radio"
                        name="size"
                        id="size-m"
                        class="hidden"
                      />
                      <label
                        for="size-m"
                        class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                        >M</label
                      >
                    </div>
                    <div class="size-selector">
                      <input
                        type="radio"
                        name="size"
                        id="size-l"
                        class="hidden"
                      />
                      <label
                        for="size-l"
                        class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                        >L</label
                      >
                    </div>
                    <div class="size-selector">
                      <input
                        type="radio"
                        name="size"
                        id="size-xl"
                        class="hidden"
                      />
                      <label
                        for="size-xl"
                        class="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                        >XL</label
                      >
                    </div>
                  </div>
                </div>
                <div class="pt-4">
                  <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">
                    Color
                  </h3>
                  <div class="flex items-center gap-2">
                    <div class="color-selector">
                      <input
                        type="radio"
                        name="color"
                        id="red"
                        class="hidden"
                      />
                      <label
                        for="red"
                        class="border border-gray-200 rounded-sm h-6 w-6 cursor-pointer shadow-sm block"
                        style="background-color: #fc3d57"
                      ></label>
                    </div>
                    <div class="color-selector">
                      <input
                        type="radio"
                        name="color"
                        id="black"
                        class="hidden"
                      />
                      <label
                        for="black"
                        class="border border-gray-200 rounded-sm h-6 w-6 cursor-pointer shadow-sm block"
                        style="background-color: #000"
                      ></label>
                    </div>
                    <div class="color-selector">
                      <input
                        type="radio"
                        name="color"
                        id="white"
                        class="hidden"
                      />
                      <label
                        for="white"
                        class="border border-gray-200 rounded-sm h-6 w-6 cursor-pointer shadow-sm block"
                        style="background-color: #fff"
                      ></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Columna 2 (a pantalla completa en pantallas pequeñas) -->
        <div class="lg:w-3/4">
          <!-- products -->
          <div class="">
            <div class="flex items-center mb-4 p-4">
              <select
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
                v-for="product in products"
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
                <div class="pt-4 pb-3 px-4">
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
                    <p>{{ product.category.title }}</p>
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
                    isInCart(product._id)
                      ? 'Quitar del carrito'
                      : 'Agregar al carrito'
                  }}
                </button>
              </div>
            </div>
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

      <!-- Paginación -->
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import FeathersClient from '@/FeathersClient';
  import SiteHeader from '@/components/site/SiteHeader.vue';
  import MarketCategories from '@/components/site/market/MarketCategories.vue';
  import Cart from '@/components/site/market/Cart.vue';

  export default {
    data() {
      return {
        tag: '',
        products: [],
        categories: [],
        currentPage: 1, // Página actual
        perPage: 10, // Cantidad de elementos por página
      };
    },
    components: {
      SiteHeader,
      MarketCategories,
      Cart,
    },
    created() {
      const urlParams = new URLSearchParams(window.location.search);
      this.tag = urlParams.get('tag');
      this.fetchProducts();
      this.fetchCategories();
      this.variableDeURL = this.$route.query.slug;
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
      ...mapGetters(['cartProducts', 'isInCart']),
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
