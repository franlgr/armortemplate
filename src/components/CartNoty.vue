<template>
    <div>
        <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle">
                  <div class="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span class="badge badge-sm indicator-item">{{ calculateTotalQuantity() }}</span>
                  </div>
                </label>
                <div
                  tabindex="0"
                  class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
                >
                  <div class="card-body">
                    <span class="font-bold text-lg">{{ calculateTotalQuantity() }} Items</span>
                    <span class="text-info">Subtotal: ${{ calculateTotalPrice() }}</span>
                    <div class="card-actions">
                      <router-link
                    to="/products/cart"
                    class="w-full btn btn-primary btn-block p-4 float-left cursor-pointer rounded hover:text-white text-black grid grid-cols-2 items-center"
                  >
                    <p class="col-span-1">View Cart</p>
                    <i 
                      class="fa-solid fa-cart-shopping col-span-1 justify-self-end"
                    ></i>
                  </router-link>
                    </div>
                  </div>
                </div>
              </div>

    </div>
</template>

<script>


export default{
  data(){
    return{

    }
  },
  methods: {
    calculateTotalPrice() {
      return this.cartItems.reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0);
    },
    calculateTotalQuantity() {
      return this.cartItems.reduce((total, item) => {
        return total + item.quantity;
      }, 0);
    },
  },
  computed:{
    cartItems() {
      return this.$store.getters.cartItems;
    },
  }
}

</script>