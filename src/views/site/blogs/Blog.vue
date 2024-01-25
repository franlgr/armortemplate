<template>
  <div id="blogs">
    <div class="overflow-x-hidden bg-gray-100">
      <SiteHeader></SiteHeader>
      <div class="flex flex-col">
        <div class="flex flex-col justify-center">
          <div class="relative">
            <div
              class="background-container parallax flex justify-center items-center parallax"
            >
              <!-- Aquí está el fondo de degradado -->
              <img class="h-64 w-64" src="@/assets/AuthLogo.svg" alt="Logo" />
            </div>

            <div
              class="absolute sm:bottom-8 bottom-4 pr-10 sm:pr-0 left-4 sm:left-8 flex justify-start items-start"
            >
              <p
                class="text-3xl sm:text-4xl font-semibold leading-9 text-white"
              >
                Blogs
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- {{ blogs }} -->
      <div class="px-6 py-8">
        <div class="container flex justify-between mx-auto">
          <div class="w-full lg:w-9/12">
            <div class="flex items-center justify-between">
              <h1 class="text-xl font-bold text-gray-700 md:text-2xl">Post</h1>
              <div>
                <select
                  class="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option>Latest</option>
                  <option>Last Week</option>
                </select>
              </div>
            </div>
            <div
              class="bg-gray-300 p-4 text-center p-4"
              v-if="blogs.length < 1"
            >
              No hay blogs en esta categoría
            </div>
            <div class="mt-6" v-for="blog in blogs" :key="blog.index">
              <div
                class="max-w-4xl px-10 py-6 mx-auto bg-white rounded-lg shadow-md"
              >
                <div class="flex items-center justify-between">
                  <span class="font-light text-gray-600">
                    {{ blog.th }}
                  </span>

                  <div
   
                    class="cursor-pointer px-2 py-1 font-bold text-gray-100 bg-gray-600 rounded hover:bg-gray-500 flex items-center"
                  >                 

                  <img  v-if="blog.category.image"
                          :src="blog.category.image"
                          alt="Category Image"
                          class="h-8 w-8 rounded-full mr-2"
                        />
                        <img
                          v-else
                          src="https://picsum.photos/200/300"
                          alt="Category Image"
                          class="h-8 w-8 rounded-full mr-2"
                        />
                    {{ blog.category.title }}
                      </div>
                </div>
                <div class="mt-2">
                  <router-link
                    :to="{ name: 'site-blog', params: { id: blog._id } }"
                    class="text-2xl font-bold text-gray-700 hover:underline"
                  >
                    {{ blog.title }}.</router-link
                  >
                  <!-- <p>{{ truncatedContent }}</p> -->
                  <p
                    v-html="truncatedContent(blog.content)"
                    class="mt-2 text-gray-600"
                  ></p>
                </div>
                <div class="flex items-center justify-between mt-4">
                  <router-link
                    :to="{ name: 'site-blog', params: { id: blog._id } }"
                    class="text-blue-500 hover:underline"
                    >Read more</router-link
                  >
                  <button
                      class="flex flex-row items-center bg-white rounded-xl p-2 text-gray-500"
                    >
                      <div
                        class="flex items-center justify-center h-8 w-8 bg-purple-300 rounded-full"
                      >
                        <img
                          v-if="blog.user.image"
                          :src="blog.user.image"
                          alt="User Image"
                          class="h-8 w-8 rounded-full"
                        />
                        <img
                          v-else
                          src="https://picsum.photos/200/300"
                          alt="User Image"
                          class="h-8 w-8 rounded-full"
                        />
                      </div>
                      <div class="ml-4 text-sm font-semibold">
                        {{ blog.user.name }} {{ blog.user.lastname }}
                      </div>
                    </button>
                </div>
              </div>
            </div>
            <div class="mt-8">
              <!-- Paginación -->
              <div class="join grid grid-cols-2 pagination w-64 m-auto py-8">
                <button
                  class="join-item btn btn-outline"
                  @click="prevPage()"
                  :disabled="currentPage === 1"
                >
                  Previous
                </button>
                <button
                  class="join-item btn btn-outline"
                  @click="nextPage()"
                  :disabled="blogs.length < perPage"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <Sidebar class="hidden w-3/12 -mx-8 lg:block"></Sidebar>
          <div class="lg:w-1/4">
          <!-- ./sidebar -->
          <div class=" ">
            <div class="divide-y divide-gray-200 space-y-5 p-4 mb:p-0">
              <BlogCategories
                :categories="categories"
                :tag="tag"
              ></BlogCategories>
              <div class="p-2">

              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      <footer class="px-6 py-2 text-gray-100 bg-gray-800">
        <div
          class="container flex flex-col items-center justify-between mx-auto md:flex-row"
        >
          <a href="#" class="text-2xl font-bold">Armor Template</a>
          <p class="mt-2 md:mt-0">All rights reserved 2023.</p>
          <div class="flex mt-4 mb-2 -mx-2 md:mt-0 md:mb-0">
            <a href="#" class="mx-2 text-gray-100 hover:text-gray-400"
              ><svg viewBox="0 0 512 512" class="w-4 h-4 fill-current">
                <path
                  d="M444.17,32H70.28C49.85,32,32,46.7,32,66.89V441.61C32,461.91,49.85,480,70.28,480H444.06C464.6,480,480,461.79,480,441.61V66.89C480.12,46.7,464.6,32,444.17,32ZM170.87,405.43H106.69V205.88h64.18ZM141,175.54h-.46c-20.54,0-33.84-15.29-33.84-34.43,0-19.49,13.65-34.42,34.65-34.42s33.85,14.82,34.31,34.42C175.65,160.25,162.35,175.54,141,175.54ZM405.43,405.43H341.25V296.32c0-26.14-9.34-44-32.56-44-17.74,0-28.24,12-32.91,23.69-1.75,4.2-2.22,9.92-2.22,15.76V405.43H209.38V205.88h64.18v27.77c9.34-13.3,23.93-32.44,57.88-32.44,42.13,0,74,27.77,74,87.64Z"
                ></path></svg></a
            ><a href="#" class="mx-2 text-gray-100 hover:text-gray-400"
              ><svg viewBox="0 0 512 512" class="w-4 h-4 fill-current">
                <path
                  d="M455.27,32H56.73A24.74,24.74,0,0,0,32,56.73V455.27A24.74,24.74,0,0,0,56.73,480H256V304H202.45V240H256V189c0-57.86,40.13-89.36,91.82-89.36,24.73,0,51.33,1.86,57.51,2.68v60.43H364.15c-28.12,0-33.48,13.3-33.48,32.9V240h67l-8.75,64H330.67V480h124.6A24.74,24.74,0,0,0,480,455.27V56.73A24.74,24.74,0,0,0,455.27,32Z"
                ></path></svg></a
            ><a href="#" class="mx-2 text-gray-100 hover:text-gray-400"
            ></a>
          </div>
        </div>
        
      </footer>
    </div>
  </div>
</template>

<script>
  import SiteHeader from '@/components/site/SiteHeader.vue';
  import FeathersClient from '@/FeathersClient';
  import Sidebar from '@/components/site/Sidebar.vue';

  // @ is an alias to /src
  // import HelloWorld from '@/components/HelloWorld.vue';
  import { mapActions, mapGetters } from 'vuex';
  import BlogCategories from '@/components/site/blogs/BlogCategories.vue';


  export default {
    components: {
      SiteHeader,
      Sidebar,
      BlogCategories
    },
    data() {
      return {
        settings: {
          dots: true,
          focusOnSelect: false,
          autoplay: true,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1,
          touchThreshold: 1,
        },
        blogs: {},
        tag: '',
        categories: [],
        currentPage: 1, // Página actual
        perPage: 12, // Cantidad de elementos por página
        sortOption: '',
      };
    },
 

    created() {
      this.fetchBlogs();
      const urlParams = new URLSearchParams(window.location.search);
      this.tag = urlParams.get('tag');
      this.variableDeURL = this.$route.query.slug;
      this.fetchBlogs();
      this.fetchCategories();

      console.log(this.variableDeURL);
      console.log(this.blogs);
    },
    computed: {
      filteredItems() {
        return this.items.filter((item) => item.category === this.tag);
      }
      },
      watch: {
      $route(to, from) {
        const urlParams = new URLSearchParams(to.query);
        this.tag = urlParams.get('tag');
        this.fetchBlogs();
      },
    },

    methods: {
      async fetchBlogs() {
        try {
      
          if (this.tag) {
            const response = await FeathersClient.service('blogs').find({
              query: {
                $limit: this.perPage,
                $skip: (this.currentPage - 1) * this.perPage,
                'category._id': this.tag,
              },
            });
            this.blogs = response.data;
            // this.loadingSet(false);
            return;
          } else {
            const response = await FeathersClient.service('blogs').find({
              query: {
                $limit: this.perPage,
                $skip: (this.currentPage - 1) * this.perPage,
              },
            });
            this.blogs = response.data;
            // this.loadingSet(false);
            return;
          }

          this.products = response.data;
          this.loadingSet(false);
        } catch (error) {
          console.log(error);
        }
      },
      fetchCategories() {
        FeathersClient.service('blogs-categories')
          .find({
            query: {
              $limit: 100,
            },
          })
          .then((categories) => {
            console.log(categories);
            this.categories = categories.data;
          });
      },
      
      nextPage() {
        this.currentPage++;
        this.fetchBlogs();
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.fetchBlogs();
        }
      },
      goToPage(pageNumber) {
        this.currentPage = pageNumber;
        this.fetchBlogs();
      },
      //finish pagination
      truncatedContent: function (content) {
        if (content.length > 500) {
          return content.slice(0, 300) + '...';
        } else {
          return content;
        }
      },
    },
    
  };
</script>
<style>
  .background-container {
    background-color: #010603;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='272' height='272' viewBox='0 0 200 200'%3E%3Cg %3E%3Cpolygon fill='%23003723' points='100 57.1 64 93.1 71.5 100.6 100 72.1'/%3E%3Cpolygon fill='%2300402c' points='100 57.1 100 72.1 128.6 100.6 136.1 93.1'/%3E%3Cpolygon fill='%23003723' points='100 163.2 100 178.2 170.7 107.5 170.8 92.4'/%3E%3Cpolygon fill='%2300402c' points='100 163.2 29.2 92.5 29.2 107.5 100 178.2'/%3E%3Cpath fill='%230A4A35' d='M100 21.8L29.2 92.5l70.7 70.7l70.7-70.7L100 21.8z M100 127.9L64.6 92.5L100 57.1l35.4 35.4L100 127.9z'/%3E%3Cpolygon fill='%2300240b' points='0 157.1 0 172.1 28.6 200.6 36.1 193.1'/%3E%3Cpolygon fill='%23032911' points='70.7 200 70.8 192.4 63.2 200'/%3E%3Cpolygon fill='%23082E16' points='27.8 200 63.2 200 70.7 192.5 0 121.8 0 157.2 35.3 192.5'/%3E%3Cpolygon fill='%23032911' points='200 157.1 164 193.1 171.5 200.6 200 172.1'/%3E%3Cpolygon fill='%2300240b' points='136.7 200 129.2 192.5 129.2 200'/%3E%3Cpolygon fill='%23082E16' points='172.1 200 164.6 192.5 200 157.1 200 157.2 200 121.8 200 121.8 129.2 192.5 136.7 200'/%3E%3Cpolygon fill='%2300240b' points='129.2 0 129.2 7.5 200 78.2 200 63.2 136.7 0'/%3E%3Cpolygon fill='%23082E16' points='200 27.8 200 27.9 172.1 0 136.7 0 200 63.2 200 63.2'/%3E%3Cpolygon fill='%23032911' points='63.2 0 0 63.2 0 78.2 70.7 7.5 70.7 0'/%3E%3Cpolygon fill='%23082E16' points='0 63.2 63.2 0 27.8 0 0 27.8'/%3E%3C/g%3E%3C/svg%3E");
  }
  #blogs {
    font-family: 'Young Serif', serif;
  }
</style>
