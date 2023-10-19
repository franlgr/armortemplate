<template>
  <div
    class=""
    :style="{
      'font-family': getSettings.adminViews.fontStyle,
    }"
  >
    <div>
      <aside
        :class="[!getMenuState ? 'ml-[-100%]' : '']"
        class="fixed top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-black transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] menu"
      >
        <div class="contenido menuAdmin">
          <div class="grid lg:flex grid-cols-2 gap-4">
            <div class="p-4">
              <button
                class="text-white bg-black m-4 mt-10 lg:hidden border-green-500"
                @click="toggleMenu()"
              >
                Close
              </button>
            </div>
            <div class="p-4">
              <div class="-mx-6 px-6 m-auto text-center">
                <router-link to="/" title="home" class="mb-4">
                  <img
                    src="@/assets/AuthLogo.svg"
                    class="w-17 mx-12 mt-2 logo hover:animate-pulse"
                    alt="tailus logo"
                  />
                </router-link>
              </div>
            </div>
          </div>

          <div class="text-center p-4">
            <img
              v-if="getUser.image"
              :src="getUser.image"
              alt=""
              class="w-32 h-32 m-auto rounded-full object-cover"
            />
            <img
              v-if="!getUser.image"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1024px-Windows_10_Default_Profile_Picture.svg.png?20221210150350"
              alt=""
              class="w-32 h-32 m-auto rounded-full object-cover"
            />

            <h5 class="hidden mt-4 text-1xl font-semibold text-white lg:block">
              {{ getUser.name }} {{ getUser.lastname }}
            </h5>
            <p class="text-1xl mt-2 text-white">{{ getUser.email }}</p>
            <p class="hidden lg:block mt-4 font-bold text-white">Permissions</p>
            <span
              class="hiddenlg:block text-green-500"
              v-for="permission in getUser.permissions"
              :key="permission.index"
            >
              #{{ permission }}
            </span>
          </div>
          <ul class="space-y-2 tracking-wide bg-black p-4">
            <li>
              <router-link
                @click="hiddenMenu()"
                to="/admin/dashboard"
                href="#"
                aria-label="dashboard"
                v-bind:class="{
                  'bg-[#2c7b60] text-white fix-dashboard-active':
                    $route.path === '/admin/dashboard' ||
                    $route.path === '/admin',
                }"
                class="relative px-4 py-1 flex items-center space-x-4 rounded-xl text-black bg-white collapse hover:bg-[#2c7b60] hover:text-white hover:border-2 fix-dashboard"
              >
                <i class="fa-solid fa-chart-line w-4"></i>
                <span class="-mr-1 font-medium">Dashboard</span>
              </router-link>
            </li>
            <!-- <li>

                            <router-link @click="hiddenMenu()" to="/admin/categories"
                                v-bind:class="{ 'from-sky-600 to-cyan-400': $route.path === '/admin/categories' }"
                                class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group bg-gradient-to-r">
                                <i class="fa-regular fa-rectangle-list"></i>
                                <span class="group-hover:text-gray-700">Categories</span>
                            </router-link>
                        </li> -->
            <li v-if="getSettings.products">
              <details class="collapse">
                <summary
                  v-bind:class="{
                    activeMenu:
                      $route.path === '/admin/products' ||
                      $route.path === '/admin/products/create' ||
                      $route.path === '/admin/products/categories',
                  }"
                  class="py-3 text-md bg-white hover:bg-[#2c7b60] border-b-4 border-[#2c7b60] hover:text-white"
                >
                  <i class="fa-brands fa-product-hunt fa-beat"></i>
                  <span class="px-6">Product</span>
                </summary>
                <div>
                  <router-link
                    @click="hiddenMenu()"
                    to="/admin/products/create"
                    class="w-full p-4 float-left cursor-pointer hover:bg-[#2c7b60] bg-white hover:text-white text-black grid grid-cols-2 items-center"
                    v-bind:class="{
                      activeMenu: $route.path === '/admin/products/create',
                    }"
                  >
                    <p class="col-span-1">Create</p>
                    <i
                      class="fa-solid fa-square-plus col-span-1 justify-self-end"
                    ></i>
                  </router-link>

                  <router-link
                    @click="hiddenMenu()"
                    to="/admin/products"
                    v-bind:class="{
                      activeMenu: $route.path === '/admin/products',
                    }"
                    class="collapse-content w-full p-4 float-left cursor-pointer hover:bg-[#2c7b60] bg-white hover:text-white text-black grid grid-cols-2 items-center"
                  >
                    <p class="col-span-1">My Products</p>
                    <i
                      class="fa-solid fa-cart-shopping col-span-1 justify-self-end"
                    ></i>
                  </router-link>

                  <router-link
                    @click="hiddenMenu()"
                    to="/admin/products/all"
                    v-if="admin == true"
                    v-bind:class="{
                      'from-sky-600 to-cyan-400':
                        $route.path === '/admin/products/all',
                    }"
                    class="collapse-content w-full p-4 float-left group-hover:text-cyan-600 bg-gradient-to-r cursor-pointer bg-gray-200"
                  >
                    <p>
                      <span class="text-black">
                        <i class="fa-solid fa-cart-shopping text-black"></i>
                        All Products
                      </span>
                      <i class="fa-solid fa-lock text-black ml-2"></i>
                    </p>
                  </router-link>
                  <router-link
                    @click="hiddenMenu()"
                    to="/admin/products/categories"
                    v-if="admin == true"
                    v-bind:class="{
                      'from-sky-600 to-cyan-400':
                        $route.path === '/admin/products/categories',
                    }"
                    class="collapse-content w-full p-4 float-left group-hover:text-cyan-600 bg-gradient-to-r cursor-pointer bg-gray-200"
                  >
                    <p>
                      <i class="fa-regular fa-rectangle-list text-black"></i
                      ><span class="ml-8 text-black">Categories</span>
                      <i class="fa-solid fa-lock text-black ml-2"></i>
                    </p>
                  </router-link>
                </div>
              </details>
            </li>
            <li v-if="getSettings.events">
              <details class="collapse">
                <summary
                  v-bind:class="{
                    activeMenu:
                      $route.path === '/admin/events' ||
                      $route.path === '/admin/events/create' ||
                      $route.path === '/admin/events/events',
                  }"
                  class="py-3 text-md bg-white hover:bg-[#2c7b60] hover:text-white border-b-4 border-[#2c7b60]"
                >
                  <i class="fa-solid fa-calendar-days fa-beat"></i>
                  <span class="px-6">Events</span>
                </summary>
                <div>
                  <router-link
                    @click="hiddenMenu()"
                    to="/admin/events/create"
                    class="w-full p-4 float-left cursor-pointer hover:bg-[#2c7b60] bg-white hover:text-white text-black grid grid-cols-2 items-center"
                    :class="{
                      activeMenu: $route.path === '/admin/events/create',
                    }"
                  >
                    <p class="col-span-1">Create</p>
                    <i
                      class="fa-solid fa-square-plus col-span-1 justify-self-end"
                    ></i>
                  </router-link>
                  <router-link
                    @click="hiddenMenu()"
                    to="/admin/events"
                    class="w-full p-4 float-left cursor-pointer hover:bg-[#2c7b60] bg-white hover:text-white text-black grid grid-cols-2 items-center"
                    :class="{
                      activeMenu: $route.path === '/admin/events',
                    }"
                  >
                    <p class="col-span-1">My Events</p>
                    <i
                      class="fa-solid fa-calendar-days col-span-1 justify-self-end"
                    ></i>
                  </router-link>

                  <router-link
                    @click="hiddenMenu()"
                    to="/admin/events/categories"
                    v-if="admin == true"
                    v-bind:class="{
                      'from-sky-600 to-cyan-400':
                        $route.path === '/admin/events/categories',
                    }"
                    class="collapse-content w-full p-4 float-left group-hover:text-cyan-600 bg-gradient-to-r cursor-pointer bg-gray-200"
                  >
                    <p>
                      <i class="fa-regular fa-rectangle-list text-black"></i
                      ><span class="ml-8 text-black">Categories</span>
                      <i class="fa-solid fa-lock text-black ml-2"></i>
                    </p>
                  </router-link>
                </div>
              </details>
            </li>
            <li v-if="getSettings.blog">
              <details class="collapse">
                <summary
                  v-bind:class="{
                    activeMenu:
                      $route.path === '/admin/blogs' ||
                      $route.path === '/admin/blogs/create' ||
                      $route.path === '/admin/blogs/categories',
                  }"
                  class="py-3 text-md bg-white hover:bg-[#2c7b60] hover:text-white border-b-4 border-[#2c7b60]"
                >
                  <i class="fa-solid fa-blog fa-beat"></i>
                  <span
                    class="px-6"
                    v-bind:class="{
                      'font-bold':
                        $route.path === '/admin/blogs' ||
                        '/admin/blogs/create' ||
                        '/admin/blogs/categories',
                    }"
                    >Blogs</span
                  >
                </summary>
                <div>
                  <router-link
                    @click="hiddenMenu()"
                    to="/admin/blogs/create"
                    :class="{
                      activeMenu: $route.path === '/admin/blogs/create',
                    }"
                    class="w-full p-4 float-left cursor-pointer hover:bg-[#2c7b60] bg-white hover:text-white text-black grid grid-cols-2 items-center"
                  >
                    <p class="col-span-1">Create</p>
                    <i
                      class="fa-solid fa-square-plus col-span-1 justify-self-end"
                    ></i>
                  </router-link>

                  <router-link
                    @click="hiddenMenu()"
                    to="/admin/blogs"
                    :class="{ activeMenu: $route.path === '/admin/blogs' }"
                    class="w-full p-4 float-left cursor-pointer hover:bg-[#2c7b60] bg-white hover:text-white text-black grid grid-cols-2 items-center"
                  >
                    <p class="col-span-1">My Blogs</p>
                    <i
                      class="fa-solid fa-cart-shopping col-span-1 justify-self-end"
                    ></i>
                  </router-link>

                  <router-link
                    @click="hiddenMenu()"
                    to="/admin/blogs/allblogs"
                    v-if="admin == true"
                    :class="{
                      'from-sky-600 to-cyan-400':
                        $route.path === '/admin/blogs/allblogs',
                    }"
                    class="collapse-content w-full p-4 float-left group-hover:text-cyan-600 bg-gradient-to-r cursor-pointer bg-gray-200"
                  >
                    <p>
                      <i class="fa-solid fa-cart-shopping text-black"></i>
                      <span class="ml-8 text-black"> All Blogs</span>
                      <i class="fa-solid fa-lock text-black ml-2"></i>
                    </p>
                  </router-link>

                  <router-link
                    @click="hiddenMenu()"
                    to="/admin/blogs/categories"
                    v-if="admin == true"
                    v-bind:class="{
                      'from-sky-600 to-cyan-400':
                        $route.path === '/admin/blogs/categories',
                    }"
                    class="collapse-content w-full p-4 float-left group-hover:text-cyan-600 bg-gradient-to-r cursor-pointer bg-gray-200"
                  >
                    <p>
                      <i class="fa-regular fa-rectangle-list text-black"></i
                      ><span class="ml-8 text-black">Categories</span>
                      <i class="fa-solid fa-lock text-black ml-2"></i>
                    </p>
                  </router-link>
                </div>
              </details>
            </li>
            <li>
              <router-link
                @click="hiddenMenu()"
                to="/admin/components"
                v-bind:class="{
                  activeMenu: $route.path === '/admin/components',
                }"
                class="relative px-4 py-2 flex items-center space-x-4 rounded-xl text-black bg-white collapse hover:bg-[#2c7b60] hover:text-white"
              >
                <i class="fa-solid fa-screwdriver-wrench w-4"></i>
                <span class="ml-4">Components</span>
              </router-link>
            </li>
            <li v-if="getSettings.users">
              <router-link
                v-if="admin == true"
                @click="hiddenMenu()"
                to="/admin/users"
                v-bind:class="{
                  activeMenu: $route.path === '/admin/users',
                }"
                class="relative px-4 py-2 mb-2 flex items-center space-x-4 rounded-xl text-black bg-white collapse hover:bg-[#2c7b60] hover:text-white"
              >
                <i class="fa-solid fa-users w-4"></i>
                <span class="group-hover:text-gray-700">Users (ADMIN)</span>
              </router-link>
              <router-link
                @click="hiddenMenu()"
                to="/admin/profile"
                v-bind:class="{
                  activeMenu: $route.path === '/admin/profile',
                }"
                class="relative px-4 py-2 flex items-center space-x-4 rounded-xl text-black bg-white collapse hover:bg-[#2c7b60] hover:text-white"
              >
                <i class="fa-solid fa-user w-4"></i>
                <span class="group-hover:text-gray-700">Profile</span>
              </router-link>
              <router-link
                @click="hiddenMenu()"
                to="/admin/default"
                v-bind:class="{
                  activeMenu: $route.path === '/admin/default',
                }"
                class="relative px-4 py-2 mt-2 flex items-center space-x-4 rounded-xl text-black bg-white collapse hover:bg-[#2c7b60] hover:text-white"
              >
                <i class="fa-solid fa-star w-4"></i>
                <span class="group-hover:text-gray-700">Default</span>
              </router-link>
            </li>
            <li>
              <router-link
                @click="hiddenMenu()"
                to="/admin/chat"
                class="relative px-4 py-2 flex items-center space-x-4 rounded-xl text-black bg-white collapse hover:bg-[#2c7b60] hover:text-white"
                v-bind:class="{
                  activeMenu: $route.path === '/admin/chat',
                }"
              >
                <i class="fa-solid fa-comments w-5"></i>
                <span class="group-hover:text-gray-700 ml-3">Chat</span>
              </router-link>
            </li>
            <li>
              <router-link
                @click="hiddenMenu()"
                to="/admin/applications"
                class="relative px-4 py-2 flex items-center space-x-4 rounded-xl text-black bg-white collapse hover:bg-[#2c7b60] hover:text-white"
                v-bind:class="{
                  activeMenu: $route.path === '/admin/applications',
                }"
              >
                <i class="fa-solid fa-laptop"></i>
                <span class="group-hover:text-gray-700"
                  >Applications (adm)</span
                >
              </router-link>
            </li>
            <li>
              <router-link
                @click="hiddenMenu()"
                to="/admin/settings"
                class="relative px-4 py-2 flex items-center space-x-4 rounded-xl text-black bg-white collapse hover:bg-[#2c7b60] hover:text-white"
                v-bind:class="{
                  activeMenu: $route.path === '/admin/settings',
                }"
              >
                <i class="fa-solid fa-gear w-5"></i>
                <span class="group-hover:text-gray-700 ml-3"
                  >Settings (adm)</span
                >
              </router-link>
            </li>
            <li>
              <router-link
                @click="hiddenMenu()"
                to="/admin/scraping"
                class="relative px-4 py-2 flex items-center space-x-4 rounded-xl text-black bg-white collapse hover:bg-[#2c7b60] hover:text-white"
                v-bind:class="{
                  activeMenu: $route.path === '/admin/scraping',
                }"
              >
              <i class="fa-solid fa-business-time w-5"></i>
                <span class="group-hover:text-gray-700 ml-3"
                  >Scraping </span
                >
              </router-link>
            </li>
          </ul>
          <div
            class="px-6 pt-4 flex justify-between items-center border-t pb-4 from-[#1ddd9c] to-black bg-gradient-to-r"
          >
            <button
              class="px-4 py-3 flex items-center space-x-4 rounded-md bg-black text-white"
              @click="logout()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span class="group-hover:text-gray-700">Logout</span>
            </button>
          </div>
        </div>
      </aside>
      <Loading v-if="isLoading" />
      <router-view
        class="ml-auto scroll lg:w-[75%] xl:w-[80%] 2xl:w-[85%] background"
        z-index="99999"
      ></router-view>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  // import BreadCrumbs from '/components/admin/Breadcrumbs.vue';
  import FeathersClient from '@/FeathersClient';
  import Loading from '@/components/Loading.vue';

  export default {
    name: 'AdminLayout',
    data() {
      return {
        admin: false,
      };
    },
    components: {
      // BreadCrumbs, // Import and include the BreadCrumbs component
      Loading,
    },
    created() {
      // Check for and authenticate with the stored token
      this.authenticateWithStoredToken(); // Calls the method to authenticate with a stored token
      this.isAdmin();
      // this.FetchgetSettings();
    },
    methods: {
      ...mapActions([
        'logout',
        'authenticateWithStoredToken',
        'toggleMenu',
        'hiddenMenu',
      ]),
      selectMenu() {
        this.hiddenMenu();
      },
      isAdmin() {
        if (!this.admin) {
          this.getUser.permissions.forEach((role) => {
            const is = role.includes('admin') ? true : false;
            if (is == true) {
              this.admin = true;
            }
          });
        }
      },
    },
    computed: {
      ...mapGetters([
        'isAuthenticated',
        'getMenuState',
        'isLoading',
        'getUser',
        'getSettings',
      ]), // Map Vuex getters to computed properties
      getClassForActiveRoute() {
        // Get the desired route from the router
        const desiredRoute = this.$router.currentRoute.path;

        // Define the Tailwind CSS class to apply when the route is active
        const activeClass = ''; // Adjust this based on your Tailwind CSS configuration

        // Compare the current route with the desired route and apply the class if they match
        return this.$route.path === desiredRoute ? activeClass : '';
      },
    },
  };
</script>

<style scoped>
  /* @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto:ital,wght@0,700;1,300&display=swap'); */
  .menuAdmin {
    /* font-family: 'Bebas Neue', sans-serif; */
    font-size: 20px;
  }

  .background {
    background-color: #f4f6f8 !important;
  }

  .contenedor {
    overflow: hidden;
    position: auto;
  }

  .after ::after {
    float: right !important;
  }

  .contenido {
    scrollbar-width: none;
  }

  .menu :where(li > details[open] > summary)::after {
    /* display: none; */
    float: right;
    margin-top: 7px;

    transform: rotate(225deg);
  }

  .menu :where(li > details > summary)::after {
    /* display: none; */
    float: right;

    margin-top: 7px;
    /* transform: rotate(180deg) */
  }

  .contenido {
    width: 100%;
    /* Asegúrate de que el contenido sea más ancho que el contenedor */
    height: 100%;
    /* Asegúrate de que el contenido sea más alto que el contenedor */
    position: absolute;
    left: 0;
    /* Inicialmente, el contenido no está desplazado horizontalmente */
    top: 0;
    /* Inicialmente, el contenido no está desplazado verticalmente */
    overflow: auto;
    /* Habilita la barra de desplazamiento cuando sea necesario */
    overflow-x: hidden;
  }

  .menu {
    z-index: 9999;
    transition: all 1s;
  }

  .logo {
    margin: auto;
  }

  .collapse {
    border-radius: 10px 20px;
  }

  .menuDefault {
    border-radius: 10px 20px;
  }

  .collapseActive {
    border-radius: 20px 20px;
  }

  .collapse summary {
    border-radius: 0px;
  }

  .activeMenu {
    background-color: #2c7b60 !important;
    color: white !important;
  }
  .menuHover {
    background-color: #16b27e !important;
  }

  .fix-dashboard {
    color: black;
  }
  .fix-dashboard:hover {
    color: white;
  }
  .fix-dashboard-active {
    background: #2c7b60;
    color: white;
  }
</style>
