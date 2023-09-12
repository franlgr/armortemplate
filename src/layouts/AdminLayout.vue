<template>
    <div>
        <div>
            <aside :class="[!getMenuState ? 'ml-[-100%]' : '']"
                class="fixed top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] menu">
                <div class="contenido">
                    <button class="text-white lg:hidden m-4" @click="toggleMenu()">Close</button>
                    <div class="-mx-6 px-6 py-4">
                        <a href="#" title="home">
                            <img src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
                                class="w-32 mx-8 mt-2 m-auto" alt="tailus logo">
                        </a>
                    </div>
                    <div class="mt-8 text-center">
                        <img :src="getUser.image" alt=""
                            class="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28">
                        <h5 class="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{{ getUser.name }} {{ getUser.lastname }}</h5>
                        <p>{{ getUser.email }}</p>
                        <span class="hidden text-gray-400 lg:block">Admin</span>
                    </div>
                    <ul class="space-y-2 mt-8 tracking-wide bg-white p-4">
                        <li>
                            <router-link @click="hiddenMenu()" to="/admin/dashboard" href="#" aria-label="dashboard"
                                v-bind:class="{ 'from-sky-600 to-cyan-400': $route.path === '/admin/dashboard' || $route.path === '/admin' }"
                                class="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-black bg-gradient-to-r bg-white">
                                <svg class="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
                                        class="fill-current text-cyan-400 dark:fill-slate-600"></path>
                                    <path d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
                                        class="fill-current text-cyan-200 group-hover:text-cyan-300"></path>
                                    <path d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
                                        class="fill-current group-hover:text-sky-300"></path>
                                </svg>
                                <span class="-mr-1 font-medium">Dashboard</span>
                            </router-link>
                        </li>
                        <li>

                            <router-link @click="hiddenMenu()" to="/admin/categories"
                                v-bind:class="{ 'from-sky-600 to-cyan-400': $route.path === '/admin/categories' }"
                                class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group bg-gradient-to-r">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path class="fill-current text-gray-300 group-hover:text-cyan-300" fill-rule="evenodd"
                                        d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                                        clip-rule="evenodd" />
                                    <path class="fill-current text-gray-600 group-hover:text-cyan-600"
                                        d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                                </svg>
                                <span class="group-hover:text-gray-700">Categories</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link @click="hiddenMenu()" to="/admin/products"
                                v-bind:class="{ 'from-sky-600 to-cyan-400': $route.path === '/admin/products' }"
                                class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group bg-gradient-to-r">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path class="fill-current text-gray-300 group-hover:text-cyan-300" fill-rule="evenodd"
                                        d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
                                        clip-rule="evenodd" />
                                    <path class="fill-current text-gray-600 group-hover:text-cyan-600"
                                        d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                                </svg>
                                <span class="group-hover:text-gray-700">Products</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link @click="hiddenMenu()" to="/admin/blogs"
                                v-bind:class="{ 'from-sky-600 to-cyan-400': $route.path === '/admin/blogs' }"
                                class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group bg-gradient-to-r">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path class="fill-current text-gray-600 group-hover:text-cyan-600" fill-rule="evenodd"
                                        d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                                        clip-rule="evenodd" />
                                    <path class="fill-current text-gray-300 group-hover:text-cyan-300"
                                        d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                                </svg>
                                <span class="group-hover:text-gray-700">Blogs</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link @click="hiddenMenu()" to="/admin/components"
                                v-bind:class="{ 'from-sky-600 to-cyan-400': $route.path === '/admin/components' }"
                                class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group bg-gradient-to-r">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path class="fill-current text-gray-600 group-hover:text-cyan-600" fill-rule="evenodd"
                                        d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                                        clip-rule="evenodd" />
                                    <path class="fill-current text-gray-300 group-hover:text-cyan-300"
                                        d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                                </svg>
                                <span class="group-hover:text-gray-700">Components</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link @click="hiddenMenu()" to="/admin/users"
                                v-bind:class="{ 'from-sky-600 to-cyan-400': $route.path === '/admin/users' }"
                                class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group bg-gradient-to-r">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path class="fill-current text-gray-600 group-hover:text-cyan-600"
                                        d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                                    <path class="fill-current text-gray-300 group-hover:text-cyan-300"
                                        d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                                </svg>
                                <span class="group-hover:text-gray-700">Users</span>
                            </router-link>
                            <router-link @click="hiddenMenu()" to="/admin/profile"
                                v-bind:class="{ 'from-sky-600 to-cyan-400': $route.path === '/admin/profile' }"
                                class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group bg-gradient-to-r">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path class="fill-current text-gray-600 group-hover:text-cyan-600"
                                        d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                                    <path class="fill-current text-gray-300 group-hover:text-cyan-300"
                                        d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                                </svg>
                                <span class="group-hover:text-gray-700">Profile</span>
                            </router-link>
                            <router-link @click="hiddenMenu()" to="/admin/default"
                                v-bind:class="{ 'from-sky-600 to-cyan-400': $route.path === '/admin/default' }"
                                class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group bg-gradient-to-r">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path class="fill-current text-gray-600 group-hover:text-cyan-600"
                                        d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                                    <path class="fill-current text-gray-300 group-hover:text-cyan-300"
                                        d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                                </svg>
                                <span class="group-hover:text-gray-700">Default</span>
                            </router-link>
                        </li>
                        <li>
                            <a href="#" class="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path class="fill-current text-gray-300 group-hover:text-cyan-300"
                                        d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                    <path class="fill-current text-gray-600 group-hover:text-cyan-600" fill-rule="evenodd"
                                        d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="group-hover:text-gray-700">Finance</span>
                            </a>
                        </li>
                        <li>
                            <router-link @click="hiddenMenu()" to="/admin/chat"
                                v-bind:class="{ 'from-sky-600 to-cyan-400': $route.path === '/admin/chat' }">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path class="fill-current text-gray-300 group-hover:text-cyan-300"
                                        d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                    <path class="fill-current text-gray-600 group-hover:text-cyan-600" fill-rule="evenodd"
                                        d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                                        clip-rule="evenodd" />
                                </svg>
                                <span class="group-hover:text-gray-700">Chat</span>
                            </router-link>
                        </li>
                    </ul>
                    <div class="px-6  pt-4 flex justify-between items-center border-t pb-4">
                        <button class="px-4 py-3 flex items-center space-x-4 rounded-md text-white group" @click="logout()">
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
            <router-view class=" ml-auto scroll lg:w-[75%] xl:w-[80%] 2xl:w-[85%] bg-gray-100 "></router-view>

        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
// import BreadCrumbs from '/components/admin/Breadcrumbs.vue';

import Loading from '@/components/Loading.vue';

export default {
    name: 'AdminLayout',
    components: {
        // BreadCrumbs, // Import and include the BreadCrumbs component
        Loading,
    },
    created() {
        // Check for and authenticate with the stored token
        this.authenticateWithStoredToken(); // Calls the method to authenticate with a stored token

    },
    methods: {
        ...mapActions(['logout', 'authenticateWithStoredToken', 'toggleMenu', 'hiddenMenu']), // Map Vuex actions to component methods
        selectMenu() {
            this.hiddenMenu();
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


<style>
.contenedor {
    overflow: hidden;
    position: auto;
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
</style>