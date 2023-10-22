<template>
  <div>
    <div class="mx-auto">
      <!-- header -->
      <!-- header ends here -->
      <div class="flex items-center justify-center">{{ fechaActual }}</div>
      <!-- <select  v-model="currentCountryIndex" @change="fetchLatestNewsForSelectedCountry" class="select select-ghost w-full max-w-xs">
        <option value="0" disabled selected >What country do you want see?</option>
        <option value="2">Argentina (AR)</option>
        <option value="1">Estados Unidos (US)</option>
    </select> -->

    <div class="flex items-center justify-center m-2"> 
    <div>
      <input v-model="countrySearch" @input="filterCountries" placeholder="Buscar país...">
    <div class="custom-dropdown" v-if="showDropdown">
      <div v-if="countrySearch !=''">
        <button  class="flex items-center justify-center m-2" style="color:white" v-for="country in filteredCountries" :key="country.code" @click="selectCountry(country.code)">
        {{ country.name }}
      </button>
      </div>

    </div>
    </div>
  </div>
  <div class="flex items-center justify-center m-2"> 
    <select  v-model="selectedCountry" @change="fetchLatestNewsForSelectedCountry" class="select select-ghost w-full max-w-xs">
      <option value="0" disabled selected >What country do you want see?</option>
      <option
        v-for="country in filteredCountries"
        :key="country.code"
        :value="country.code"  
      >
        {{ country.name }}
      </option>

    </select>
  </div>
    <div v-if="latestNews && latestNews.length > 0" class="flex items-center justify-center m-2">
      <button  @click="postAllBlogs()" style="color: white" class="mt-1 max-w-screen-lg m-auto">Post All Blogs (Individual)</button>
    </div>
    <div v-if="latestNews && latestNews.length > 0" class="flex items-center justify-center m-2">
      <button  @click="createLongBlog()" style="color: white" class="mt-1 max-w-screen-lg m-auto">Post A long Blog (All in one)</button>
    </div>
    <div class="flex items-center justify-center m-2">
      <h2>{{  }}</h2>
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
            <button @click="createBlog(news)" ref="createBlogButton" style="color:white" class="mt-1 max-w-screen-lg m-auto">
              Create this blog
            </button>

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
import countries from './countries'
export default {
  components:{
      PriceBtc
    },
  data() {
    return {
      countrySearch: '',
      latestNews: [],
      countries:countries,
      currentCountryIndex: 0,
      fechaActual:'',
      category: {},
      showDropdown: false,
      selectedCountry: "0",

    };
  },
  async mounted() {
    
    // this.fetchLatestNewsForAllCountries();
    this.fetchCategories();
  },
  created() {
      this.obtenerFechaActual();
    },
    computed: {
      ...mapGetters(['isLoading', 'getUser']),

      filteredCountries() {
      return this.countries.filter(country => {
        return country.name.toLowerCase().includes(this.countrySearch.toLowerCase())  
      })
    }
  
    },
  methods: {
    ...mapActions(['loadingSet']),

     filterCountries() {
      this.showDropdown = true;
    },
    selectCountry(country) {
      this.selectedCountry = country;
      this.showDropdown = false;
      this.fetchLatestNewsForCountry(country)
      // También puedes emitir un evento o realizar otras acciones aquí
    },
  
    async createLongBlog(news) {
      if (this.latestNews.length > 0) {
      try {
        let htmlContent = ''; // Variable para almacenar el HTML de todas las noticias

        // Itera sobre todas las noticias y agrega su HTML al contenido
        for (const newsItem of this.latestNews) {
          // Genera el HTML para cada noticia y agrégalo a la variable htmlContent
          htmlContent += `
            <h2 class="text-4xl font-semibold text-gray-800 leading-tight">${newsItem.title}</h2>
            <p class="text-gray-700 text-lg leading-relaxed pb-6">${newsItem.description}</p>
            <p class="text-gray-700">Published by ${newsItem.source.name}</p>
            <a href="${newsItem.url}" class="py-2 text-green-700 inline-flex items-center justify-center mb-2 break-all">
              ${newsItem.url}
            </a>
            <img src="${newsItem.urlToImage}" alt="News Image" class="mt-4 max-w-full" />
            <p class="text-gray-700 mt-4">Author: ${newsItem.author}</p>
            <p class="text-gray-700">Published at: ${newsItem.publishedAt}</p>
            <div class="text-gray-700 mt-4">
              ${newsItem.content}
            </div>
          `;
        }

        // Realiza la solicitud POST usando Axios o tu cliente de servicios.
        // Agrega el HTML de todas las noticias a la variable content
        FeathersClient.service('blogs').create({
          title: 'International News', // Personaliza el título según tus necesidades
          content: htmlContent, // Agrega el HTML de todas las noticias al campo content
          images: this.latestNews.map(newsItem => newsItem.urlToImage).join(', '), // Concatena las URL de las imágenes
          th: this.fechaActual,
          images: this.latestNews.map(newsItem => newsItem.urlToImage).join(', '), // Concatena las URL de las imágenes
          imgUser: this.getUser.image,
          user: this.getUser,
          user_id: this.getUser._id,
          category: this.category,
          category_id: this.category._id,
          metaData: {
            title: 'International News', // Concatena los títulos de las noticias
            content: 'Armortemplate News', // Concatena las descripciones de las noticias
            img: 'https://i.ibb.co/Wn33HgY/meta.jpg', // Concatena las URL de las imágenes
          }
        });

        console.log('Blog Created');
        this.$snotify.success('Blog Created', 'Success', {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
        });
      } catch (error) {
        console.error(error);
        this.$snotify.error(error, 'Error', {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
        });
      }
    } else {
      this.$snotify.warning('No news available for creating a blog.', 'Warning', {
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
      });
    }
  
},
    async postAllBlogs() {
    this.loadingSet(true);

    for (let i = 0; i < this.latestNews.length; i++) {
      const buttonRef = this.$refs.createBlogButton[i];
      if (buttonRef) {
        buttonRef.click();
        await new Promise((resolve) => setTimeout(resolve, 7000));
      }
    }

    this.loadingSet(false);
  },
    fetchLatestNewsForSelectedCountry() {
      // Obtener el país seleccionado según el índice
      const selectedCountry = this.countries[this.currentCountryIndex];
      // Limpiar las noticias actuales
      this.latestNews = [];
      // Cargar las noticias del país seleccionado
      this.fetchLatestNewsForCountry(selectedCountry);
    },

    async fetchLatestNewsForCountry(country) {
      this.loadingSet(true);
      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${this.selectedCountry}&apiKey=129308da04db484cadd57e3517685e7d`);

        if (response.data.articles.length > 0) {
          this.latestNews.push(...response.data.articles);
          console.log('News for', country, ':', response.data.articles);
        }
        this.loadingSet(false);
      } catch (error) {
        console.error('Error al obtener noticias para', country, ':', error);
      }
    },
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
        console.log('Blog Created')
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
