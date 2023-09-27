<template>
  <div>
    <div
      :class="cartMenu ? 'translate-x-0 ease-out' : 'translate-x-full ease-in'"
      style="z-index: 99999"
      class="fixed right-0 top-0 max-w-xs w-full h-full px-6 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300"
    >
      <div class="flex items-center justify-between pt-4">
        <h3 class="text-2xl font-medium text-gray-700">Your cart</h3>
        <button
          @click="cartMenuToggle()"
          class="text-gray-600 focus:outline-none"
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
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      <hr class="my-3" />
      <div
        class="flex justify-between mt-6"
        v-for="item in cartItems"
        :key="item.product.id"
      >
        <div class="flex">
          <img
            class="h-20 w-20 object-cover rounded"
            :src="item.product.images[0]"
            alt=""
          />

          <div class="mx-3">
            <h3 class="text-sm text-gray-600">{{ item.product.title }}</h3>
            <!-- <h3 class="text-sm text-gray-600">{{ item.d }}</h3> -->
            <div class="flex items-center mt-2">
              <button
                class="text-gray-500 focus:outline-none focus:text-gray-600"
                @click="add(item.product._id)"
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
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </button>
              <span class="text-gray-700 mx-2">{{ item.quantity }}</span>
              <button
                class="text-gray-500 focus:outline-none focus:text-gray-600"
                @click="subtract(item.product._id)"
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
                  <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <span class="text-gray-600">{{ item.product.price }}$</span>
      </div>

      <button @click="clearCart" class="mt-4" v-if="cartItems.length > 0">
        Empty Cart
      </button>
      <a
        v-if="cartItems.length > 0"
        class="flex items-center justify-center mt-4 px-3 py-2 my-4 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-black hover:text-white focus:outline-none focus:bg-hover-500 cursor-pointer"
      >
        <span>Chechout</span>
        <svg
          class="h-5 w-5 mx-2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
        </svg>
      </a>

      <!-- {{ cartItems }} -->
      <div class="text-gray-600 ml-4" v-if="!cartItems.length > 0">
        <p>Your cart is empty.</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    data() {
      return {
        cartOpen: true,
      };
    },
    computed: {
      ...mapGetters(['cartItems', 'cartMenu', 'isInCart', 'cartCount']),
      products() {
        // Esto es un array de productos de prueba. Reemplázalo con tus propios datos.
        return [];
      },
    },
    methods: {
      ...mapActions([
        'addToCart',
        'removeFromCart',
        'clearCart',
        'cartMenuToggle',
        'subtract',
        'add',
      ]),
      removeFromCart(product) {
        if (product.isInCart) {
          this.$store.dispatch('removeFromCart', product); // Llama a la acción Vuex
          product.isInCart = false; // Actualiza el estado de isInCart
        }
      },
    },
  };
</script>
