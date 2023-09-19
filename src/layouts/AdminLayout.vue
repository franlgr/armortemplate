<template>
    <div class="">
        <div>
            <aside :class="[!getMenuState ? 'ml-[-100%]' : '']"
                class="fixed top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] menu">
                <div class="contenido menuAdmin">
                    <button class="text-white bg-black lg:hidden m-4 " @click="toggleMenu()">Close</button>
                    <div class="-mx-6 px-6 py-4 mt-8 m-auto text-center">
                        <router-link to="/" title="home" class="mb-4 ">
                            <img src="@/assets/logo.svg" class="w-64 mx-12 mt-2 logo " alt="tailus logo">
                        </router-link>
                        <div class="m-auto mt-12 text-center">
                            <router-link to="/" title="home">
                                <button class="btn btn-sm text-center ">Go Site</button>
                            </router-link>
                        </div>

                    </div>
                    <div class="mt-8 text-center p-4">
                        <img v-if="getUser.image" :src="getUser.image" alt=""
                            class="w-32 h-32 m-auto rounded-full object-cover">
                        <img v-if="!getUser.image"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/1024px-Windows_10_Default_Profile_Picture.svg.png?20221210150350"
                            alt="" class="w-32 h-32 m-auto rounded-full object-cover ">


                        <h5 class="hidden mt-4 text-1xl font-semibold text-gray-600 lg:block">{{ getUser.name }} {{
                            getUser.lastname }}</h5>
                        <p class="text-1xl mt-2">{{ getUser.email }}</p>
                        <p class="hidden lg:block mt-4 font-bold">Permissions</p>
                        <span class="hidden text-gray-400 lg:block" v-for="permission in getUser.permissions">{{ permission
                        }}</span>
                    </div>
                    <ul class="space-y-2 mt-8 tracking-wide bg-white p-4">
                        <li>
                            <router-link @click="hiddenMenu()" to="/admin/dashboard" href="#" aria-label="dashboard"
                                v-bind:class="{ 'from-sky-600 to-cyan-400': $route.path === '/admin/dashboard' || $route.path === '/admin' }"
                                class="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-black bg-gradient-to-r bg-white">
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
                        <li>
                            <details class="collapse ">
                                <summary
                                    v-bind:class="{ 'from-sky-600 to-cyan-400 ': $route.path === '/admin/products' || $route.path === '/admin/products/create' || $route.path === '/admin/products/categories' }"
                                    class="py-3 text-md  group-hover:text-cyan-600  m-0 bg-gradient-to-r">
                                    <i class="fa-brands fa-product-hunt fa-beat"></i>
                                    <span class=" px-6"
                                        v-bind:class="{ 'font-bold': $route.path === '/admin/products' || '/admin/products/create' || '/admin/products/categories' }">Product</span>
                                </summary>
                                <div>
                                    <router-link @click="hiddenMenu()" to="/admin/products/create"
                                        v-bind:class="{ 'from-sky-600 to-cyan-400': $route.path === '/admin/products/create' }"
                                        class="collapse-content w-full p-4 float-left group-hover:text-cyan-600 bg-gradient-to-r cursor-pointer bg-gray-200 mt-2">
                                        <p><i class="fa-solid fa-square-plus text-black "></i><span
                                                class="ml-8 text-black">Create</span></p>
                                    </router-link>

                                    <router-link @click="hiddenMenu()" to="/admin/products"
                                        v-bind:class="{ 'from-sky-600 to-cyan-400': $route.path === '/admin/products' }"
                                        class="collapse-content w-full p-4 float-left group-hover:text-cyan-600 bg-gradient-to-r cursor-pointer bg-gray-200">
                                        <p><i class="fa-solid fa-cart-shopping text-black"></i><span
                                                class="ml-8 text-black">
                                                My Products</span></p>
                                    </router-link>
                                    <router-link @click="hiddenMenu()" to="/admin/products/categories" v-if="admin == true"
                                        v-bind:class="{ 'from-sky-600 to-cyan-400': $route.path === '/admin/products/categories' }"
                                        class="collapse-content w-full p-4 float-left group-hover:text-cyan-600 bg-gradient-to-r cursor-pointer bg-gray-200">
                                        <p><i class="fa-regular fa-rectangle-list text-black"></i><span
                                                class="ml-8 text-black">Categories (admin)</span></p>
                                    </router-link>
                                </div>


                            </details>
                        </li>
                        <li>
                            <details class="collapse ">
                                <summary
                                    v-bind:class="{ 'from-sky-600 to-cyan-400 ': $route.path === '/admin/events' || $route.path === '/admin/events/create' || $route.path === '/admin/events/events' }"
                                    class="py-3 text-md  group-hover:text-cyan-600  m-0 bg-gradient-to-r">
                                    <i class="fa-solid fa-calendar-days fa-beat"></i>
                                    <span class=" px-6"
                                        v-bind:class="{ 'font-bold': $route.path === '/admin/events' || '/admin/events/create' || '/admin/events/categories' }">Events</span>
                                </summary>
                                <div>
                                    <router-link @click="hiddenMenu()" to="/admin/events/create"
                                        v-bind:class="{ 'from-sky-600 to-cyan-400': $route.path === '/admin/events/create' }"
                                        class="collapse-content w-full p-4 float-left group-hover:text-cyan-600 bg-gradient-to-r cursor-pointer bg-gray-200 mt-2">
                                        <p><i class="fa-solid fa-square-plus text-black"></i><span
                                                class="ml-8 text-black">Create Event</span></p>
                                    </router-link>

                                    <router-link @click="hiddenMenu()" to="/admin/events"
                                        v-bind:class="{ 'from-sky-600 to-cyan-400': $route.path === '/admin/events' }"
                                        class="collapse-content w-full p-4 float-left group-hover:text-cyan-600 bg-gradient-to-r cursor-pointer bg-gray-200">
                                        <p><i class="fa-solid fa-cart-shopping text-black"></i><span
                                                class="ml-8 text-black">
                                                My Events</span></p>
                                    </router-link>
                                    <router-link @click="hiddenMenu()" to="/admin/events/categories" v-if="admin == true"
                                        v-bind:class="{ 'from-sky-600 to-cyan-400': $route.path === '/admin/events/categories' }"
                                        class="collapse-content w-full p-4 float-left group-hover:text-cyan-600 bg-gradient-to-r cursor-pointer bg-gray-200">
                                        <p><i class="fa-regular fa-rectangle-list text-black"></i><span
                                                class="ml-8 text-black">Categories (admin)</span></p>
                                    </router-link>
                                </div>


                            </details>
                        </li>
                        <li>
                            <details class="collapse ">
                                <summary
                                    v-bind:class="{ 'from-sky-600 to-cyan-400 ': $route.path === '/admin/blogs' || $route.path === '/admin/blogs/create' || $route.path === '/admin/blogs/categories' }"
                                    class="py-3 text-md  group-hover:text-cyan-600  m-0 bg-gradient-to-r">
                                    <i class="fa-solid fa-blog fa-beat"></i>
                                    <span class=" px-6"
                                        v-bind:class="{ 'font-bold': $route.path === '/admin/blogs' || '/admin/blogs/create' || '/admin/blogs/categories' }">Blogs</span>
                                </summary>
                                <div>
                                    <router-link @click="hiddenMenu()" to="/admin/blogs/create"
                                        v-bind:class="{ 'from-sky-600 to-cyan-400': $route.path === '/admin/blogs/create' }"
                                        class="collapse-content w-full p-4 float-left group-hover:text-cyan-600 bg-gradient-to-r cursor-pointer bg-gray-200 mt-2">
                                        <p><i class="fa-solid fa-square-plus text-black"></i><span
                                                class="ml-8 text-black">Create</span></p>
                                    </router-link>

                                    <router-link @click="hiddenMenu()" to="/admin/blogs"
                                        v-bind:class="{ 'from-sky-600 to-cyan-400': $route.path === '/admin/blogs' }"
                                        class="collapse-content w-full p-4 float-left group-hover:text-cyan-600 bg-gradient-to-r cursor-pointer bg-gray-200">
                                        <p><i class="fa-solid fa-cart-shopping text-black"></i><span
                                                class="ml-8 text-black">
                                                My Blogs</span></p>
                                    </router-link>
                                    <router-link @click="hiddenMenu()" to="/admin/blogs/categories" v-if="admin == true"
                                        v-bind:class="{ 'from-sky-600 to-cyan-400': $route.path === '/admin/blogs/categories' }"
                                        class="collapse-content w-full p-4 float-left group-hover:text-cyan-600 bg-gradient-to-r cursor-pointer bg-gray-200">
                                        <p><i class="fa-regular fa-rectangle-list text-black"></i><span
                                                class="ml-8 text-black">Categories (admin)</span></p>
                                    </router-link>
                                </div>


                            </details>
                        </li>
                        <li>
                            <router-link @click="hiddenMenu()" to="/admin/components"
                                v-bind:class="{ 'from-sky-600 to-cyan-400': $route.path === '/admin/components' }"
                                class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group bg-gradient-to-r">
                                <i class="fa-solid fa-screwdriver-wrench w-4"></i>
                                <span class="group-hover:text-gray-700">Components</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link @click="hiddenMenu()" to="/admin/users"
                                v-bind:class="{ 'from-sky-600 to-cyan-400': $route.path === '/admin/users' }"
                                class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group bg-gradient-to-r">
                                <i class="fa-solid fa-users w-4"></i>
                                <span class="group-hover:text-gray-700">Users</span>
                            </router-link>
                            <router-link @click="hiddenMenu()" to="/admin/profile"
                                v-bind:class="{ 'from-sky-600 to-cyan-400': $route.path === '/admin/profile' }"
                                class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group bg-gradient-to-r">
                                <i class="fa-solid fa-user w-4"></i>
                                <span class="group-hover:text-gray-700">Profile</span>
                            </router-link>
                            <router-link @click="hiddenMenu()" to="/admin/default"
                                v-bind:class="{ 'from-sky-600 to-cyan-400': $route.path === '/admin/default' }"
                                class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group bg-gradient-to-r">
                                <i class="fa-solid fa-star w-4"></i>
                                <span class="group-hover:text-gray-700">Default</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link @click="hiddenMenu()" to="/admin/chat"
                                v-bind:class="{ 'from-sky-600 to-cyan-400': $route.path === '/admin/chat' }">
                                <i class="fa-solid fa-comments w-5"></i>
                                <span class="group-hover:text-gray-700 ml-3">Chat</span>
                            </router-link>
                        </li>
                    </ul>
                    <div
                        class="px-6  pt-4 flex justify-between items-center border-t pb-4 from-sky-600 to-cyan-400 bg-gradient-to-r ">
                        <button class="px-4 py-3 flex items-center space-x-4 rounded-md text-black group" @click="logout()">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span class="group-hover:text-gray-700">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>
            <Loading v-if="isLoading" />
            <router-view class=" ml-auto scroll lg:w-[75%] xl:w-[80%] 2xl:w-[85%] bg-gray-100 "
                z-index="99999"></router-view>

        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
// import BreadCrumbs from '/components/admin/Breadcrumbs.vue';

import Loading from '@/components/Loading.vue';

export default {
    name: 'AdminLayout',
    data() {
        return {
            admin: false,
        }
    },
    components: {
        // BreadCrumbs, // Import and include the BreadCrumbs component
        Loading,
    },
    created() {
        // Check for and authenticate with the stored token
        this.authenticateWithStoredToken(); // Calls the method to authenticate with a stored token
        this.isAdmin();

    },
    methods: {
        ...mapActions(['logout', 'authenticateWithStoredToken', 'toggleMenu', 'hiddenMenu']), // Map Vuex actions to component methods
        selectMenu() {
            this.hiddenMenu();
        },
        isAdmin() {
            if (!this.admin) {
                this.getUser.permissions.forEach((role) => {


                    const is = role.includes('admin') ? true : false;
                    if (is == true) {
                        this.admin = true


                    }


                });
            }
        },

    },
    computed: {
        ...mapGetters(['isAuthenticated', 'getMenuState', 'isLoading', 'getUser']), // Map Vuex getters to computed properties
        getClassForActiveRoute() {
            // Get the desired route from the router
            const desiredRoute = this.$router.currentRoute.path;

            // Define the Tailwind CSS class to apply when the route is active
            const activeClass = 'from-sky-600 to-cyan-400'; // Adjust this based on your Tailwind CSS configuration

            // Compare the current route with the desired route and apply the class if they match
            return this.$route.path === desiredRoute ? activeClass : '';
        },

    },
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto:ital,wght@0,700;1,300&display=swap');

.menuAdmin {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
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
    margin-top: 4px;
    transform: rotate(225deg)
}

.menu :where(li > details > summary)::after {
    /* display: none; */
    float: right;
    margin-top: 4px;
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
</style>