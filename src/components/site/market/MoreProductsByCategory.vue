atego
<template>
  <div
    x-data="{ cartOpen: false , isOpen: false }"
    class="bg-white m-4 rounded-md"
  >
    <main class="my-8 py-8" v-if="category">
      <div class="container mx-auto px-6">
        <div class="">
          <h3 class="text-gray-600 text-2xl font-medium">
            More Products By {{ category.title }}
          </h3>
          <div
            class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6"
          >
            <div
              v-for="product in products"
              :key="product.index"
              class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden"
            >
              <div
                class="flex items-end justify-end h-56 w-full bg-cover"
                :style="{
                  'background-image': 'url(' + product.images[0] + ')',
                }"
              >
                <button
                  class="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                >
                  <svg
                    class="h-5 w-5"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="px-5 py-3 mt-2">
                <h3 class="text-gray-700 uppercase">{{ product.title }}</h3>
                <span class="text-gray-500 mt-2">u$s {{ product.price }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
  import FeathersClient from '@/FeathersClient';
  import { mapActions } from 'vuex';
  export default {
    name: 'MoreProductsByCategory',
    data() {
      return {
        cartOpen: false,
        isOpen: false,
        products: [],
      };
    },
    props: {
      category: {
        type: String,
        required: true,
      },
    },
    created() {
      this.getProducts();
    },
    methods: {
      ...mapActions(['loadingSet']),
      async getProducts() {
        try {
          if (!this.category) {
            this.loadingSet(true);
            const response = await FeathersClient.service('products').find({
              query: {
                $limit: 4,
                // 'category._id': this.$route.
                //route params
                $sort: {
                  createdAt: -1,
                },
              },
            });
          }
          this.loadingSet(true);
          const response = await FeathersClient.service('products').find({
            query: {
              $limit: 4,
              // 'category._id': this.$route.
              //route params
              'category._id': this.category._id,
              $sort: {
                createdAt: -1,
              },
            },
          });
          this.products = response.data;
          this.loadingSet(false);
        } catch (error) {
          this.loadingSet(false);
          console.log(error);
        }
      },
    },
  };
</script>
