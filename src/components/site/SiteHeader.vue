<template>
    <nav class="px-6 py-4 bg-white shadow text-lg">
        <div class="container flex flex-col mx-auto md:flex-row md:items-center md:justify-between">
            <div class="flex items-center justify-between">
                <div>
                    <a href="http://localhost:5173" class="text-xl font-bold text-gray-800 md:text-2xl">Warrior</a>
                </div>
                <div class="md:hidden">
                    <button @click="toggleMobileMenu"
                        class="block text-gray-800 hover:text-gray-600 focus:text-gray-600 focus:outline-none">
                        <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                            <path
                                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
            <div :class="mobileMenuVisible ? 'block' : 'hidden'" class="md:flex md:flex-row md:-mx-4">
                <!-- Menú de dispositivos de escritorio (sin cambios) -->
                <div class="hidden md:flex md:flex-row md:-mx-4">
                    <router-link to="/" class="my-1  text-gray-800 hover:text-blue-500 md:mx-4 md:my-0"><i class="fa-solid fa-house"></i><span class="ml-2">Home</span></router-link>
                    <router-link to="/blog" class="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0 ">
                        <i class="fa-solid fa-blog w-4"></i><span class="ml-2">Blog</span>
                    </router-link>
                    <router-link to="/products" class="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0">
                        <i class="fa-solid fa-cart-shopping text-black"></i><span class="ml-2">Market</span>
                    </router-link>
                    <router-link to="/events" class="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0">
                       <i class="fa-solid fa-calendar-days"></i><span class="ml-2">Events</span>
                    </router-link>
                    <router-link to="/admin" class="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0">
                        <i class="fa-solid fa-lock"></i><span class="ml-2">Admin</span>
                    </router-link>
                </div>
                <!-- Menú de dispositivos móviles (sin cambios) -->
                <div class="md:hidden">
                    <router-link to="/"
                        class="block my-2  hover:text-blue-500 text-3xl "><i class="fa-solid fa-house"></i><span class="ml-5">Home</span></router-link>
                    <router-link to="/blog" class="block my-2  hover:text-blue-500 text-3xl ">
                        <i class="fa-solid fa-blog "></i><span class="ml-6">Blog</span>
                    </router-link>
                    <router-link to="/products" class="block my-2 text-gray-800 hover:text-blue-500 text-3xl ">
                        <i class="fa-solid fa-cart-shopping "></i><span class="ml-6">Market</span>
                    </router-link>
                    <router-link to="/events" class="block my-2 text-gray-800 hover:text-blue-500 text-3xl ">
                       <i class="fa-solid fa-calendar-days"></i><span class="ml-6">Events</span>
                    </router-link>
                    <router-link to="/admin" class="block my-2  hover:text-blue-500 text-3xl ">
                        <i class="fa-solid fa-lock"></i><span class="ml-8">Admin</span>
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            mobileMenuVisible: false,
        };
    },
    methods: {
        toggleMobileMenu() {
            this.mobileMenuVisible = !this.mobileMenuVisible;
        },
    },
};
</script>
