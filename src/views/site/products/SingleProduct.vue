<template>
  <div>
    <SiteHeader></SiteHeader>

    <section
      class="text-gray-700 body-font overflow-hidden bg-white m-4 rounded-md"
    >
      <router-link
        :to="{ name: 'site-products' }"
        class="btn btn-outline btn-success m-4"
        >Back</router-link
      >
      <div class="container px-5 mb-4 mx-auto mt-4">
        <div class="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            class="lg:w-1/2 h-64 w-full object-cover object-center rounded border border-gray-200"
            v-if="image"
            :src="image"
          />
          <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 class="text-sm title-font text-gray-500 tracking-widest">
              <!-- {{ product.category.title }} -->
            </h2>
            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
              {{ product.title }}
            </h1>
            <!-- <div class="flex mb-4">
              <span class="flex items-center">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  ></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  ></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  ></path>
                </svg>
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  ></path>
                </svg>
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-4 h-4 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  ></path>
                </svg>
                <span class="text-gray-600 ml-3">4 Reviews</span>
              </span>
            </div> -->
            <div class="leading-relaxed" v-html="product.content"></div>
            <div
              class="flex mt-6 items-center pb-5 border-b-2 border-gray-400 mb-5"
            >
              <div class="flex">
                <span class="mr-3">Color</span>
                <button
                  class="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"
                ></button>
                <button
                  class="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"
                ></button>
                <button
                  class="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"
                ></button>
              </div>
              <div class="flex ml-6 items-center">
                <span class="mr-3">Size</span>
                <div class="relative">
                  <select
                    class="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10"
                  >
                    <option>SM</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                  </select>
                  <span
                    class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center"
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div class="flex border-b-2 border-gray-400">
              <div class="flex pb-4">
                <FacebookShareButton></FacebookShareButton>
                <TwitterShareButton></TwitterShareButton>
                <LinkedinShareButton></LinkedinShareButton>
                <WhatsappShareButton></WhatsappShareButton>
              </div>
            </div>
            <div class="flex">
              <p class="title-font font-medium text-5xl mt-4 text-gray-900">
                ${{ product.price }}
              </p>
              <!-- <button
                @click="handleCartAction(product)"
                v-bind:class="{
                  'bg-red-300 text-black': isInCart(product._id),
                  'text-primary': !isInCart(product._id),
                }"
                class="ml-auto mt-4 uppercase text-white bg-green-500 border-0 px-6 focus:outline-none hover:bg-green-600 rounded"
              >
                <span class="" @click="handleCartAction(product)">{{
                  isInCart(product._id) ? 'Remove to Cart' : 'Add to Cart'
                }}</span> -->
              <button
                @click="handleCartAction(product)"
                v-bind:class="{
                  'bg-red-500 text-black hover:bg-red-600': isInCart(
                    product._id,
                  ),
                  'text-primary': !isInCart(product._id),
                }"
                class="ml-auto mt-4 transition uppercase text-white bg-green-500 border-0 px-6 focus:outline-none rounded"
              >
                {{ isInCart(product._id) ? 'Remove from cart' : 'Add to Cart' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <MoreProductsByCategory
      :category="product.category"
    ></MoreProductsByCategory>
  </div>
</template>
<script>
  import FeathersClient from '@/FeathersClient';
  import SiteHeader from '@/components/site/SiteHeader.vue';
  import { mapActions, mapGetters } from 'vuex';
  import FacebookShareButton from '@/components/site/social/FacebookShareButton.vue';
  import TwitterShareButton from '@/components/site/social/TwitterShareButton.vue';
  import LinkedinShareButton from '@/components/site/social/LinkedinShareButton.vue';
  import WhatsappShareButton from '@/components/site/social/WhatsappShareButton.vue';
  import MoreProductsByCategory from '@/components/site/market/MoreProductsByCategory.vue';
  export default {
    data() {
      return {
        product: {},
        image: null,
      };
    },
    components: {
      SiteHeader,
      FacebookShareButton,
      TwitterShareButton,
      LinkedinShareButton,
      WhatsappShareButton,
      MoreProductsByCategory,
    },
    mounted() {
      this.fetchProduct();
    },
    methods: {
      async fetchProduct() {
        try {
          const response = await FeathersClient.service('products').get(
            this.$route.params.id,
          );
          this.product = response;
          this.image = response.images[0];
        } catch (error) {
          console.log(error);
        }
      },
      ...mapActions(['addToCart']),
      // handleCartAction() {
      //   if (this.isInCart(this.product._id)) {
      //     // this.$router.push({ name: 'site-cart' });
      //     alert('This product is already in your cart.');
      //   } else {
      //     this.addToCart(this.product);
      //   }
      // },
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
      ...mapGetters(['isInCart']),
    },
    watch: {
      $route(to, from) {
        this.fetchProduct();
      },
    },
  };
</script>
