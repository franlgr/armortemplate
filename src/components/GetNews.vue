<template>
  <div>
    <div class="mx-auto">
      <!-- header -->
      <!-- header ends here -->
      <div class="flex items-center justify-center">{{ fechaActual }}</div>
<div class="flex items-center justify-center">
    <PriceBtc />
  </div>
      <main class="mt-10 max-w-screen-lg m-auto">
        <div v-if="latestNews && latestNews.length > 0">
          <div v-for="(news, index) in latestNews" :key="index" class="mt-10 max-w-screen-lg m-auto" >
            <h2 class="text-4xl font-semibold text-gray-800 leading-tight">{{ news.title }}</h2>
            <p class="text-gray-700 text-lg leading-relaxed pb-6">{{ news.description }}</p>
            <p class="text-gray-700">Published by {{ news.source.name }}</p>
            <a :href="news.url" class="py-2 text-green-700 inline-flex items-center justify-center mb-2 break-all">
              {{ news.url }}
            </a>
            <img :src="news.urlToImage" alt="News Image" class="mt-4 max-w-full" />
            <p class="text-gray-700 mt-4">Author: {{ news.author }}</p>
            <p class="text-gray-700">Published at: {{ news.publishedAt }}</p>
            <div class="text-gray-700 mt-4">
              {{ news.content }}
            </div>
            <button @click="createBlog(news)" style="color:white" class="mt-1 max-w-screen-lg m-auto">Crear este Blog</button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import FeathersClient from '@/FeathersClient';
import { mapActions, mapGetters } from 'vuex';
import PriceBtc from './PriceBtc.vue';
export default {
  components:{
      PriceBtc
    },
  data() {
    return {
      latestNews: [],
      countries: ['us', 'ar'],
      currentCountryIndex: 0,
      fechaActual:'',
      category: {},
    };
  },
  async mounted() {
    
    this.fetchLatestNewsForAllCountries();
    this.fetchCategories();
  },
  created() {
      this.obtenerFechaActual();
    },
    computed: {
      ...mapGetters(['isLoading', 'getUser']),
    },
  methods: {
    ...mapActions(['loadingSet']),
    async fetchLatestNewsForAllCountries() {
      this.loadingSet(true);
      for (let i = 0; i < this.countries.length; i++) {
        try {
          const country = this.countries[i];
          const response = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
              country: country,
              apiKey: 'aa39167d1dd44071a9d9345cfaa3e05b',
            },
          });

          if (response.data.articles.length > 0) {
            this.latestNews.push(...response.data.articles);
            console.log('News for', country, ':', response.data.articles);
          }
          this.loadingSet(false);
        } catch (error) {
          console.error('Error al obtener noticias para', country, ':', error);
        }
      }
    },
    removeCharsPlaceholder(content) {
      return content.replace(/\[\+\d+ chars\]/, '');
    },
    async createBlog(news) {
      try {

        // Realiza la solicitud POST usando Axios o tu cliente de servicios.
        // Reemplaza 'url_de_tu_backend' por la URL de tu servicio para crear blogs.
        FeathersClient.service('blogs')
            .create({
              title: news.title,
              content:
                      `<img src="${news.urlToImage}" alt="News Image" class="mt-4 max-w-full" />`+
                      `<p class="text-gray-700 text-lg leading-relaxed pb-6">${news.description}</p>`+
                      `<a href="${news.url}" class="py-2 text-green-700 inline-flex items-center justify-center mb-2 break-all">${news.url}</a>`+
                      `<p class="text-gray-700 mt-4">Author: ${news.source.name}</p>
                        <p class="text-gray-700">Published at: ${news.publishedAt}</p>
                        <div class="text-gray-700 mt-4">
                          ${news.content}
                        </div>`,
              images: news.urlToImage,
              ubication: news.url,
              th: this.fechaActual,
              images: news.urlToImage,
              imgUser: this.getUser.image,
              user: this.getUser,
              user_id: this.getUser._id,
              category: this.category,
              category_id: this.category._id,
              metaData: {
                title: news.title,
                content: news.description,
                img: news.urlToImage
              }
              // title: this.formData.title,
              // content: this.editorData,
              // ubication: this.formData.ubication,
              // th: this.fechaActual,
              // images: this.images,
              // imgUser: this.getUser.image,
              // user: this.getUser,
              // user_id: this.getUser._id,
              // category: this.newBlog.category,
              // category_id: this.newBlog.category._id,
              // metaData: {
              //   title:'',
              //   content: '',
              //   img:'',
              // }
       });

        this.$snotify.success('Blog Created', 'Success', {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
        });
        // this.$router.push({ name: 'admin-blogs' });
      } catch (error) {
        console.error(error);
        this.$snotify.error(error, 'Error', {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
        });
      }
    },
    obtenerFechaActual() {
        const fechaActual = new Date();
        const day = fechaActual.getDate();
        const month = fechaActual.getMonth() + 1;
        const year = fechaActual.getFullYear();

        this.fechaActual = `${day}/${month}/${year}`;
      },
      async fetchCategories() {
          try {
            const res = await FeathersClient.service('blogs-categories').find();
            this.categories = res.data;
            console.log('fetchCategories', res);
            // Buscar la categoría "International News" en la lista de categorías
            const internationalNewsCategory = this.categories.find(category => category.title === "International News");
            // Si se encuentra la categoría, asignarla a la propiedad 'category'
            if (internationalNewsCategory) {
              this.category = internationalNewsCategory;
              console.log('Category selected: ', internationalNewsCategory)
            }
          } catch (error) {
            console.error(error);
   
          }
        },

  },
};
</script>
