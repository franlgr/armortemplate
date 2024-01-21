<template>
    <div>
      <!-- <div>
        <h2>Carrito de compras</h2>
        <ul>
          <li v-for="item in cartItems" :key="item.product._id">
            {{ item.product.title}} - Cantidad: {{ item.quantity }} - Precio: ${{ calculateTotalItemPrice(item) }}
          </li>
          <li>
            Total price: ${{ calculateTotalPrice(item) }}
          </li>
        </ul>
      </div> -->
      <div class="h-screen bg-gray-100 pt-20">
        <h1 class="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div class="w-full max-h-custom  overflow-y-auto">
                <div v-for="item in cartItems" :key="item.product._id" class="mb-6">
                    <div class="flex items-start rounded-lg bg-white p-6 shadow-md">
                    <img :src="item.product.images[0]" alt="product-image" class="w-24 h-24 object-cover rounded-lg mr-4" />
                    <div class="flex-1">
                        <div class="sm:flex sm:justify-between sm:items-center">
                        <div class="sm:ml-4 sm:w-full">
                            <h2 class="text-lg font-bold text-gray-900">{{ item.product.title }}</h2>
                            <p class="mt-1 font-bold text-xs text-gray-700">${{ item.product.price }}</p>
                        </div>
                        <div class="mt-4 sm:flex sm:items-center sm:space-x-4">
                            <div class="flex items-center border-gray-100">
                            <input
                                class="h-8 w-8 border bg-white text-center text-xs outline-none"
                                type="number"
                                v-model="item.quantity"
                                min="1"
                                @input="updateQuantity(item)"
                            />
                            </div>
                            <div class="flex items-center space-x-4">
                            <p class="text-sm">${{ calculateTotalItemPrice(item) }}</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                                @click="removeFromCart(item.product)"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

  
          <!-- Subtotal -->
          <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div class="mb-2 flex justify-between">
              <p class="text-gray-700">Subtotal</p>
              <p class="text-gray-700">${{ calculateTotalPrice(item) }}</p>
            </div>
            <div class="flex justify-between">
              <p class="text-gray-700">Shipping</p>
              <p class="text-gray-700">${{ shipping }}</p>
            </div>
            <hr class="my-4" />
            <div class="flex justify-between">
              <p class="text-lg font-bold">Total</p>
              <div class="">
                <p class="mb-1 text-lg font-bold">${{ calculateTotalPrice(item) + shipping }}</p>
                <p class="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <router-link
                    to="/products/shipping"
                    class="w-full p-4 float-left cursor-pointer hover:bg-[#2c7b60] bg-gray-300 rounded hover:text-white text-black grid grid-cols-2 items-center"
                  >
                    <p class="col-span-1">Shipping</p>
                    <i 
                      class="fa-solid fa-truck col-span-1 justify-self-end"
                    ></i>
                  </router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        shipping: 4.99,
      };
    },
    methods: {
        ...mapActions(['removeFromCart', 'addToCart', 'updateCartItemQuantity']),
    //   calculateTotalPrice(item) {
    //   return item.product.price * item.quantity;
    // },
    calculateTotalItemPrice(item) {
      return item ? item.product.price * item.quantity : 0;
    },
    calculateTotalPrice() {
      return this.cartItems.reduce((total, item) => {
        return total + this.calculateTotalItemPrice(item);
      }, 0);
    },
    updateQuantity(item) {
      this.updateCartItemQuantity({
        product: item.product,
        quantity: item.quantity,
      });
    },
    calculateTotalQuantity() {
      return this.cartItems.reduce((total, item) => {
        return total + item.quantity;
      }, 0);
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
      isInCart(productId) {
        return this.$store.getters.isInCart(productId);
      },
    },
    computed: {
      cartItems() {
        return this.$store.getters.cartItems;
      },
    },
  };
  </script>
  

  <style>
.max-h-custom {
  max-height: 700px; 
}
</style>