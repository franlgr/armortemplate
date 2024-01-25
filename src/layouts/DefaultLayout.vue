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
                :to="authLink"
                class="my-1 text-white hover:text-blue-500 p-2 text-center m-auto md:my-0"
              >
              <i class="fa-solid" :class="{ 'fa-lock': isAuthenticated, 'fa-sign-in': !isAuthenticated, 'px-4': true }"></i>


                <span class="ml-2">{{ authText }}</span>
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
      <div
            class="flex justify-center flex-col m-auto mb-16 text-center text-lg dark:text-slate-200"
          >
            <p class="font-bold mb-1 text-white">
              Built by
              <a
                href="https://www.linkedin.com/in/carlo-gammarota-23493b24/"
                class="underline hover:text-slate-300 transition-all dark:hover:text-slate-700"
                >CG 2023</a
              >
            </p>
            <!-- <p class="text-white">
              Contact me on the different platforms and social networks
            </p> -->
            <div
              class="flex items-center justify-center space-x-2 mt-4 flex-wrap"
            >
              <a
                href="https://www.linkedin.com/in/carlo-gammarota-23493b24/"
                class="flex flex-none items-center justify-center rounded-full w-12 h-12 hover:bg-slate-200 transition-all bg-white mt-6 rounded-lg dark:hover:bg-slate-700"
                ><svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="4.983"
                    cy="5.009"
                    r="2.188"
                    fill="currentColor"
                  ></circle>
                  <path
                    d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z"
                    fill="currentColor"
                  ></path></svg
              ></a>
              <div class="mt-6 justify-between gap-1 md:flex grid">
                <img
                  class="w-12 lg:w-12 m-2 bg-white p-1 rounded-lg"
                  src="https://cdn.worldvectorlogo.com/logos/vue-js-1.svg"
                  loading="lazy"
                  alt="airbnb"
                />
                <img
                  class="w-12 lg:w-12 m-2 bg-white p-1 rounded-lg"
                  src="https://cdn.worldvectorlogo.com/logos/vitejs.svg"
                  loading="lazy"
                  alt="bissell"
                />
                <img
                  class="w-12 lg:w-12 m-2 bg-white p-1 rounded-lg"
                  src="https://cdn.worldvectorlogo.com/logos/tailwindcss.svg"
                  loading="lazy"
                  alt="ge"
                />
                <img
                  class="w-14 lg:w-14 m-2 bg-white p-1 rounded-lg"
                  src="https://cdn.worldvectorlogo.com/logos/express-109.svg"
                  loading="lazy"
                  alt="microsoft"
                />
           
                <br />
                <img
                  class="w-12 lg:w-12 m-2 bg-white p-1 rounded-lg"
                  src="https://cdn.worldvectorlogo.com/logos/socket.svg"
                  loading="lazy"
                  alt="microsoft"
                />
                <img
                  class="w-12 lg:w-12 m-2 bg-white p-1 rounded-lg"
                  src="https://cdn.worldvectorlogo.com/logos/cloudflare-1.svg"
                  loading="lazy"
                  alt="microsoft"
                />
                <img
                  class="w-12 lg:w-12 m-2 bg-white p-1 rounded-lg"
                  src="https://res-1.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1422872537/tiiifcjiquop4k2jf2yf.png"
                  loading="lazy"
                  alt="microsoft"
                />
                <img
                  class="w-12 lg:w-12 m-2 bg-white p-1 rounded-lg"
                  src="https://cdn.worldvectorlogo.com/logos/feathersjs.svg"
                  loading="lazy"
                  alt="microsoft"
                />
                <img
                  class="w-12 lg:w-12 m-2 bg-white p-1 rounded-lg"
                  src="https://cdn.worldvectorlogo.com/logos/nginx-1.svg"
                  loading="lazy"
                  alt="microsoft"
                />
                <img
                  class="w-12 lg:w-12 m-2 bg-white p-1 rounded-lg"
                  src="https://cdn.worldvectorlogo.com/logos/docker.svg"
                  loading="lazy"
                  alt="microsoft"
                />
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
      authLink() {
      return this.isAuthenticated ? '/admin' : '/login';
    },
    authText() {
      return this.isAuthenticated ? 'Admin' : 'Log-In';
    },
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
