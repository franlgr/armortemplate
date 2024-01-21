<template>
    <div class="p-2 py-4">
      <h3 class="text-xl text-gray-800 mb-3 uppercase font-medium">Categories</h3>
      <div class="flex items-center mt-8">
        <div class="space-y-2 w-full">
          <!-- quitar filtro -->
          <router-link class="flex items-center" :to="{ name: 'site-blogs' }">
            <div class="text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                :checked="!$route.query.tag"
                class="checkbox mr-2 mb-2"
              />
              <span class="float-right"> All</span>
            </div>
            <div class="ml-auto text-gray-600 text-sm">(15)</div>
          </router-link>
          <router-link
            class="flex items-center"
            v-for="category in categories"
            :key="category.index"
            :to="{ name: 'site-blogs', query: { tag: category._id } }"
          >
            <div class="text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                :disabled="category._id === selectedCategory"
                :checked="$route.query.tag === category._id"
                class="checkbox mr-2 mb-2"
              />
              <span class="float-right"> {{ category.title }}</span>
            </div>
            <div class="ml-auto text-gray-600 text-sm">
              (
              <CountBlogsInCategory
                v-if="category"
                :category_id="category._id"
              />)
            </div>
          </router-link>
        </div>
        <div></div>
      </div>
    </div>
  </template>
  
  <script>
    /*
  http://127.0.0.1:5173/products?slug=6504a738c0eb3e6684d12b30
  a este componente le va a llegar un id de categoria si le llega uno tiene que seleccionar 
  */
    import FeathersClient from '@/FeathersClient';
    import CountBlogsInCategory from '@/components/site/blogs/CountBlogsInCategory.vue';
    export default {
      data() {
        return {
          data: [],
          selectedCategory: this.tag,
          categoryBlogs: {},
        };
      },
      components: {
        CountBlogsInCategory,
      },
      props: ['categories', 'tag'],
      async created() {},
      methods: {},
      watch: {
        tag: function (val) {
          console.log('tag', val);
          this.selectedCategory = val;
        },
      },
    };
  </script>
  <style>
    .checkbox:checked + label::before {
      content: '\2713';
      /* Unicode para la marca de verificación */
      display: inline-block;
      font-size: 16px;
      /* Tamaño de fuente deseado */
      /* Espaciado entre la marca de verificación y el texto (ajusta según sea necesario) */
    }
  
    /* Estilo adicional para resaltar el texto del label */
    label {
      font-weight: bold;
      /* O cualquier otro estilo que desees */
    }
  </style>
  