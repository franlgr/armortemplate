<template>
    <div>
        <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">Categories</h3>
        <div class="space-y-2">
            {{data}}
            <div class="flex items-center" v-for="category in categories" :key="category.index">
                <input type="checkbox" name="cat-1" id="cat-1" class="text-primary focus:ring-0 rounded-sm cursor-pointer" v-model="data">
                <label for="cat-1" class="text-gray-600 ml-3 cusror-pointer">{{category.title}}</label>
                <div class="ml-auto text-gray-600 text-sm">(15)</div>
            </div>
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
            data: []
        }
    },
    props: ['categories'],

}
</script>