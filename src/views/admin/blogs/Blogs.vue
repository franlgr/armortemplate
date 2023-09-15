<template>
    <div>
      <div>
        <AdminHeader title="Blogs"></AdminHeader>
        <!-- {{ blogs }} -->
        <router-link :to="{ name: 'admin-blogs-create'}" class="btn btn-sm border-solid border-black bg-blue-400 mx-2">New Blog</router-link>
         <!-- Modal principal para mostrar detalles del blog -->
      <dialog  v-if="selectedBlog" id="my_modal_2" class="modal bg-opacity-800">
        <div class="modal-box">
            <form method="dialog">
      <button @click="selectedBlog=null" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
          <h3 class="font-bold text-lg">Blog Preview</h3>
          <!-- Sección para mostrar la información del blog -->
          <div>
            <!-- Contenido del blog aquí ... -->
            <div class="max-w-md mx-auto mb-4">
                <div class="bg-white rounded-lg shadow-lg">
                  <div class="p-4">
                    <h2 class="text-xl font-semibold">{{ selectedBlog.title }}</h2>
                    <p  style="word-wrap: break-word;" class="text-gray-600">{{ selectedBlog.content }}</p>
                  </div>
                  <div class="carousel w-full max-w-md max-h-auto mx-auto">
                    <div class="carousel-container">
                      <div class="carousel w-full max-w-md max-h-auto mx-auto">
                        <div
                          v-for="(image, index) in selectedBlog.images"
                          :key="index"
                          :id="'slide' + (index + 1)"
                          class="carousel-item relative w-full"
                        >
                          <img :src="image" class="w-full" />
                          <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a :href="'#slide' + (index === 0 ? selectedBlog.images.length : index)" class="btn btn-circle">❮</a>
                            <a :href="'#slide' + (index === selectedBlog.images.length - 1 ? 1 : index + 2)" class="btn btn-circle">❯</a>
                          </div>
                          <div class="absolute bottom-0 left-0 right-0 bg-white p-4">
                            <button class="flex flex-row items-center bg-white rounded-xl p-2 text-gray-500">
                            <div class="flex items-center justify-center h-8 w-8 bg-purple-300 rounded-full">
                                <img v-if="selectedBlog.imgUser" :src="selectedBlog.imgUser" alt="User Image" class="h-8 w-8 rounded-full">
                                <img v-if="!selectedBlog.imgUser" src="https://picsum.photos/200/300" alt="User Image" class="h-8 w-8 rounded-full">
                            </div>
                            <div class="ml-2 text-sm font-semibold">{{ selectedBlog.user }}</div>
                            </button>
                            <p class="text-gray-500"> {{ selectedBlog.th }}</p>
                            <p class="text-gray-500">Ubication: {{ selectedBlog.ubication }}</p>
                          
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <router-link :to="{ name: 'admin-blogs-edit', params: { id: selectedBlog._id } }" class="btn btn-sm border-solid border-black bg-blue-400 mx-2">edit</router-link>
            <button @click="showDeleteConfirmationModal()" class="btn btn-sm border-solid border-black bg-red-400">Eliminar</button>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button @click="selectedBlog = null">Cerrar</button>
        </form>
      </dialog>

           <!-- Modal de confirmación para eliminar -->
           <dialog id="delete_confirmation_modal" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <h3 class="font-bold text-lg">Confirmar eliminación</h3>
          <p class="py-4">¿Estás seguro de que deseas eliminar este blog?</p>
          <div class="modal-action">
            <form method="dialog">
              <button @click="deleteBlog(selectedBlog._id)" class="btn btn-sm border-solid border-black bg-red-400">Confirmar</button>
              <button @click="hideDeleteConfirmationModal()" class="btn btn-sm border-solid border-black">Cancelar</button>
            </form>
          </div>
        </div>
      </dialog>
  
        <div class=" m-4 2xl:container ">
          <div class="">
            <div class="overflow-x-auto">
              <table class="table">
                <!-- head -->
                <thead>
                  <tr>
                    <th>
                      <label>
                        <input type="checkbox" class="checkbox" />
                      </label>
                    </th>
                    <th>Titulo</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <!-- row 1 -->
                  <tr v-for="blog in blogs" :key="blog.index">
                    <th>
                      <label>
                        <input type="checkbox" class="checkbox" />
                      </label>
                    </th>
                    <td>
                      <div class="flex items-center space-x-3">
                        <div class="avatar">
                          <div class="avatar">
                            <div class="mask mask-squircle w-12 h-12" v-for="image in blog.images" :key="image.index">
                              <img :src="image" alt="Avatar Tailwind CSS Component" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <div class="font-bold">{{ blog.title }}</div>
                          <div class="text-sm opacity-50">{{ blog.th }}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                        <button class="flex flex-row items-center bg-white rounded-xl p-2 text-gray-500">
                            <div class="flex items-center justify-center h-8 w-8 bg-purple-300 rounded-full">
                                <img v-if="blog.imgUser" :src="blog.imgUser" alt="User Image" class="h-8 w-8 rounded-full">
                                <img v-if="!blog.imgUser" src="https://picsum.photos/200/300" alt="User Image" class="h-8 w-8 rounded-full">
                            </div>
                            <div class="ml-2 text-sm font-semibold">{{ blog.user }}</div>
                            </button>
                      <br/>
                    </td>
                    <td>{{ blog.content.slice(-25) }}...</td>
                    <th>
                      <button @click="showBlogModal(blog)" class="btn btn-sm border-solid border-black bg-green-400">show</button>
                      
                      <!-- <button @click="deleteBlog(blog._id)" class="btn btn-sm border-solid border-black bg-red-400">delete</button> -->
                    </th>
                  </tr>
                </tbody>
                <!-- foot -->
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  import BreadCrumbs from '@/components/admin/Breadcrumbs.vue';
  import AdminHeader from '@/components/admin/AdminHeader.vue';
  import FeathersClient from '@/FeathersClient.js';
  
  export default {
    layout: "AdminLayout",
    data() {
      return {
        blogs: [],
        selectedBlog: null,
      }
    },
    components: {
      BreadCrumbs,
      AdminHeader
    },
    mounted() {
      this.fetchBlogs();
    },
    methods: {
      ...mapActions(['loadingSet']),

      async deleteBlog(blogId) {
   
        try {
          await FeathersClient.service('blogs').remove(blogId);
          this.selectedBlog= null
          this.blogs = this.blogs.filter(blog => blog._id !== blogId);
          console.log('Blog eliminado con éxito.');
         
          this.$snotify.success('Blog eliminado con éxito', 'Éxito', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            
          });
          this.hideDeleteConfirmationModal();
        } catch (error) {
          console.error('Error al eliminar el blog:', error);
          this.$snotify.error('Error al eliminar el blog', 'Error', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true
          });
        }
     
    },
  
    showBlogModal(blog) {
      this.selectedBlog = blog;
      const modal = document.getElementById("my_modal_2");
      modal.showModal();
    },
    showDeleteConfirmationModal() {
      const deleteConfirmationModal = document.getElementById("delete_confirmation_modal");
      deleteConfirmationModal.showModal();
    },  hideDeleteConfirmationModal() {
      const deleteConfirmationModal = document.getElementById("delete_confirmation_modal");
      deleteConfirmationModal.close();
    },
  
      async fetchBlogs() {
        this.loadingSet(true);
        try {
          const res = await FeathersClient.service('blogs').find({
            query: {
              // $limit: this.perPage,
              // $skip: (this.currentPage - 1) * this.perPage,
            }
          });
          this.loadingSet(false);
          this.blogs = res.data;
        } catch (error) {
          this.loadingSet(false);
          console.error(error);
        }
      },
    },
  }
  </script>
  

<style>

</style>