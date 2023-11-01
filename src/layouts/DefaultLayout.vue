<template>
  <div>
    <header>
      <!-- Coloca aquí tu encabezado común a todas las páginas -->
      <!-- {{ getSettings }} -->
      <!-- {{ getSettings.siteViews }} -->
      <header
        v-if="getSettings"
        :style="{
          'background-color': getSettings.siteViews.backNav,
          'font-family': getSettings.siteViews.fontStyle,
        }"
      >
        <div class="container mx-auto px-6 py-3">
          <div class="flex items-center justify-between">
            <div
              class="w-full text-gray-700 md:text-center text-2xl font-semibold"
            >
              <img
                :src="getSettings.logo"
                class="w-52 mt-2 logo m-0 md:m-auto"
                alt="tailus logo"
              />
              <!-- <img src="@/assets/logo.svg" class="w-52 mt-2 logo m-0 md:m-auto" alt="tailus logo" /> -->
            </div>
            <div
              class="flex items-center justify-end w-full right-8 button-cart opacity-75 hover:opacity-100 sm:hidden"
            >
              <!-- {{ $route.name site-product }} -->
              <button
                @click="cartMenuToggle()"
                v-if="
                  $route.name == 'site-products' ||
                  $route.name == 'site-product'
                "
                class="text-gray-600 focus:outline-none mx-4 sm:mx-0 flex items-center border-black bg-white"
              >
                <span class="mr-2">{{ cartCount }}</span>
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
              <div>
                <button
                  @click="isOpen = !isOpen"
                  type="button"
                  class="text-white hover:text-gray-500 focus:outline-none focus:text-gray-500"
                  aria-label="toggle menu"
                >
                  <svg viewBox="0 0 24 24" class="h-6 w-6 fill-current">
                    <path
                      fill-rule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <nav
            :class="isOpen ? '' : 'hidden'"
            class="sm:flex sm:justify-center sm:items-center mt-4"
          >
            <div
              class="flex flex-col sm:flex-row text-white"
              :style="{
                'font-size': getSettings.siteViews.headerFontSize + 'px',
              }"
            >
            
              <router-link
              v-if="$route.path != '/'"
              
                to="/"
                class="my-1 hover:text-blue-500 p-2 text-center m-auto md:my-0 text-white"
                ><i class="fa-solid fa-house px-4"></i
                ><span class="">Home</span></router-link
              >
              <router-link
                v-if="getSettings.blog"
                to="/blogs"
                class="my-1 text-white hover:text-blue-500 p-2 text-center m-auto md:my-0"
              >
                <i class="fa-solid fa-blog px-4"></i><span class="">Blogs</span>
              </router-link>
              <router-link
                v-if="getSettings.products"
                to="/products"
                class="my-1 text-white hover:text-blue-500 p-2 text-center m-auto md:my-0"
              >
                <i class="fa-solid fa-cart-shopping px-4"></i
                ><span class="">Market</span>
              </router-link>
              <router-link
                v-if="getSettings.events"
                to="/events"
                class="my-1 text-white hover:text-blue-500 p-2 text-center m-auto md:my-0"
              >
                <i class="fa-solid fa-calendar-days px-4"></i
                ><span class="">Events</span>
              </router-link>

              <router-link
                v-if="getSettings.users"
                to="/users"
                class="my-1 text-white hover:text-blue-500 p-2 text-center m-auto md:my-0"
              >
                <i class="fa-solid fa-user px-4"></i><span class="">Users</span>
              </router-link>
              <router-link
              v-if="getSettings.support"
                to="/support"
                class="my-1 text-white hover:text-blue-500 p-2 text-center m-auto md:my-0"
              >
                <i class="fa-solid fa-circle-info px-4"></i
                ><span class="">Support</span>
              </router-link>
              <a
                v-if="getSettings.documentation"
                href="https://doc.armortemplate.site/"
                class="my-1 text-white hover:text-blue-500 p-2 text-center m-auto md:my-0"
              >
                <i class="fa-solid fa-file px-4"></i
                ><span class="">Documentation</span>
              </a>
              <router-link
                v-if="getSettings.pricing"
                to="/pricing"
                class="my-1 text-white hover:text-blue-500 p-2 text-center m-auto md:my-0"
              >
                <i class="fa-solid fa-handshake-angle"></i
                ><span class="ml-2">Pricing</span>
              </router-link>
              <router-link
                v-if="getSettings.admin"
                to="/admin"
                class="my-1 text-white hover:text-blue-500 p-2 text-center m-auto md:my-0"
              >
                <i class="fa-solid fa-lock px-4"></i
                ><span class="ml-2">Admin</span>
              </router-link>
            </div>
            <!-- Menú de dispositivos móviles (sin cambios) -->
          </nav>
        </div>
      </header>
    </header>

    <main>
      <Loading v-if="isLoading" />
      <router-view></router-view>
      <!-- router-view es donde se renderizarán las páginas específicas -->
    </main>

    <footer class="bg-gray-800 text-white p-4">
      <div class="container mx-auto">
        <div class="flex justify-between items-center">
          <div>
            <p>&copy; 2023 Armor Template</p>
          </div>
          <div>
            <a href="#">Política de Privacidad</a>
            <a href="#">Términos y Condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import Loading from '@/components/Loading.vue';
  import FeathersClient from '@/FeathersClient';
  export default {
    data() {
      return {
        cartOpen: false,
        isOpen: false,

        subdomain: '',
        templateSettings: {},
      };
    },
    created() {
      this.$store.dispatch('fetchSettings');
    },
    methods: {
      ...mapActions(['logout', 'cartMenuToggle', 'setLoading ']), // Map Vuex actions to methods
    },
    components: {
      Loading,
    },
    computed: {
      ...mapGetters([
        'isAuthenticated',
        'isLoading',
        'getUser',
        'cartMenu',
        'cartCount',
        'getSettings',
      ]), // Map Vuex getters to computed properties
    },
  };
</script>

<style>
  .button-cart {
    z-index: 100;
  }

  .parallax {
    /* Set a specific height */
    min-height: 500px;
    /* Create the parallax scrolling effect */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>
