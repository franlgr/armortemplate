<!-- Modelo para crear una vista nueva dentro de admin -->
<template>
  <div>
    <div>
    <AdminHeader title="Create App" icon="fa-solid fa-star"></AdminHeader>
    
    <div class=" m-4 2xl:container ">
        <div class=" pb-24 " >
          <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
        <div>
            <img class="mx-auto h-24 w-auto" src="@/assets/logoAlone.svg" alt="Logo">
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Create a New App
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
                Fill in the following fields to generate the application.
            </p>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="createApp()">
            <input type="hidden" name="remember" value="true">
            <div class="rounded-md shadow-sm -space-y-px">
               <div class="relative">
    <label for="subdomain" class="sr-only">Subdomain</label>
    <input id="subdomain" name="subdomain" type="text" autocomplete="subdomain" required v-model="subdomain"
        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder="Subdomain">
    <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">.armortemplate.site</span>
</div>

                <div>
                    <label for="title" class="sr-only">Title</label>
                    <input id="title" name="title" type="text" autocomplete="title" required v-model="title"
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Title">
                </div>
                <div>
                    <label for="description" class="sr-only">Description</label>
                    <input id="description" name="description" type="text" autocomplete="description" required v-model="description"
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Description">
                </div>
                <div>
                    <label for="logo" class="sr-only">Logo</label>
                    <input id="logo" name="logo" type="text" autocomplete="logo" required v-model="logo"
                        class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Logo URL">
                </div>
                <!-- Other fields here -->
            </div>
<button type="submit"
                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Generate App
                </button>
            <div>
               
            </div>
        </form>
         
    </div>
</div>


        </div>
    </div>
</div>
  </div>
</template>
<script>

// import BreadCrumbs from '@/components/admin/Breadcrumbs.vue';
import AdminHeader from '@/components/admin/AdminHeader.vue';
/* modelo 
{
    "subdomain": "carlo6",
    "logo": "https://cdn.worldvectorlogo.com/logos/tesla-motors.svg", //svg
    "title": "Sitio Web de Tesla Motors",
    "description":"Introducing Armor Template, a robust and feature-rich web theme that combines the power of modern technologies to kickstart your next online project. Crafted with Vue3, Vuex, Tailwind CSS, Express.js (SSR), Node.js, and Socket.io, Feathers.js (rest) this versatile template offers everything you need to create a dynamic web presence.",
    "theme": "dark",
    "plugins": ["mercadopago", "paypal", "strapi"],
    "user": {}

}
*/
import { mapActions, mapGetters } from 'vuex';
import FeathersClient from '@/FeathersClient'
export default {
    data() {
        return {
            subdomain: '',
            logo: '',
            title: '',
            description: '',
            theme: 'dark',
            plugins: [],
            user: {}
        }
    },
    components: {
        // BreadCrumbs,
        AdminHeader

    },
    methods: {
        ...mapActions(['loadingSet', 'getUser']),
        async createApp(){
             event.preventDefault();
            // if(this.subdomain == '' || this.logo == '' || this.title == '' || this.description == ''){
            //     alert('Please fill all the fields')
            //     return
            // }
            this.loadingSet(true)
            try {
                const app = {
                    subdomain: this.subdomain,
                    logo: this.logo,
                    title: this.title,
                    description: this.description,
                    theme: this.theme,
                    plugins: this.plugins,
                    user: this.getUser
                }
                const response = await FeathersClient.service('applications').create(app)
                console.log(response)
                this.loadingSet(false)
                this.$router.push({name: 'admin-applications'})
            } catch (error) {
                console.log(error)
                this.loadingSet(false)
            }
        }
    },
}
</script>
<style>
</style>