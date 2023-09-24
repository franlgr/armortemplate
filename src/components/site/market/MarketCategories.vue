<template>
    <div class="flex items-center" v-for="category in categories" :key="category.index"
        :to="{ name: 'site-products', query: { tag: category._id } }">
        <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">Categories</h3>
        <div class="space-y-2">
            <router-link class="flex items-center" v-for="category in categories" :key="category.index"
                :to="{ name: 'site-products', query: { tag: category._id } }">
                <div class="text-gray-600  cursor-pointer">
                    <input type="checkbox" :checked="category._id === selectedCategory" class="checkbox mr-2 mb-2" />
                    <span class="float-right"> {{ category.title }}</span>
                </div>
                <div class="ml-auto text-gray-600 text-sm">(15)</div>
            </router-link>
        </div>
    </div>
</template>

<script>
/*
http://127.0.0.1:5173/products?slug=6504a738c0eb3e6684d12b30
a este componente le va a llegar un id de categoria si le llega uno tiene que seleccionar 
*/
export default {
    data() {
        return {
            data: [],
            selectedCategory: null
        }
    },
    props: ['categories', 'tag'],
    watch: {
        tag: function (val) {
            console.log('tag', val)
            this.selectedCategory = val
        }
    },

}
</script>