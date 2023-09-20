<template>
  <div>
    <div>
      <AdminHeader title="Blogs"></AdminHeader>
      <!-- Modal de confirmación para eliminar -->
      <dialog id="delete_confirmation_modal" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <h3 class="font-bold text-lg">Confirm delete</h3>
          <p class="py-4">Are you sure you want to delete this blog right now?</p>
          <div class="modal-action">
            <form method="dialog">
              <button @click="deleteSelectedBlogs" class="btn btn-sm border-solid border-black bg-red-400">Delete</button>
              <button @click="hideDeleteConfirmationModal()" class="btn btn-sm border-solid border-black">Exit</button>
            </form>
          </div>
        </div>
      </dialog>

      <div class="m-4 2xl:container">
        <div class="">
          <div class="overflow-x-auto">
            <table class="table">
              <!-- head -->
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" class="checkbox" v-model="selectAll" @change="selectAllBlogs" />
                    </label>
                  </th>
                  <th>Title</th>
                  <th>User</th>
                  <th>TH</th>
                  <th>
                  <button v-if="showDeleteButton" @click="showDeleteConfirmationModal(blog)" class="btn btn-sm border-solid ml-4 border-black bg-red-400 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-5 h-5 ">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                    </svg>
                  </button>
                </th>
                </tr>
              </thead>
              
              <tbody>
                <!-- row 1 -->
                
                <tr v-for="blog in blogs" :key="blog.index">
                  <th>
                    <label>
                      <input type="checkbox" class="checkbox" v-model="blog.selected" @change="checkDeleteButtonState" />
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
                      </div>
                    </div>
                  </td>
                  <td>
                    <button class="flex flex-row items-center bg-white rounded-xl p-2 text-gray-500">
                      <div class="flex items-center justify-center h-8 w-8 bg-purple-300 rounded-full">
                        <img v-if="blog.imgUser" :src="blog.imgUser" alt="User Image" class="h-8 w-8 rounded-full">
                        <img v-if="!blog.imgUser" src="https://picsum.photos/200/300" alt="User Image" class="h-8 w-8 rounded-full">
                      </div>
                      <div class="ml-1 text-sm font-semibold">{{ blog.user }}</div>
                    </button>
                    <br />
                  </td>
                  <td>
                    <div class="text-sm opacity-50">{{ blog.th }}</div>
                  </td>
                  <th>
                    <router-link class="btn btn-sm border-solid border-black ml-1  bg-green-400"
                      :to="{ name: 'site-blog', params: { id: blog._id } }">SHOW</router-link> 
                     
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
import { mapActions } from 'vuex';
import AdminHeader from '@/components/admin/AdminHeader.vue';
import FeathersClient from '@/FeathersClient.js';

export default {
  layout: "AdminLayout",
  data() {
    return {
      blogs: [],
      selectedBlog: null,
      selectAll: false,
      showDeleteButton: false,
    }
  },
  components: {
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

    showDeleteConfirmationModal(blog) {
      this.selectedBlog = blog;
      const deleteConfirmationModal = document.getElementById("delete_confirmation_modal");
      deleteConfirmationModal.showModal();
    },

    deleteSelectedBlogs() {
      const selectedBlogs = this.blogs.filter(blog => blog.selected);
      if (selectedBlogs.length > 0) {
        selectedBlogs.forEach(blog => {
          this.deleteBlog(blog._id);
        });
        this.selectedBlog = null;
        this.showDeleteButton = false;
      }
    },

    hideDeleteConfirmationModal() {
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

    // Función para manejar la selección de todos
    selectAllBlogs() {
  this.blogs.forEach(blog => {
    blog.selected = this.selectAll;
  });
  this.checkDeleteButtonState();
},

    // Función para comprobar el estado del botón "Delete"
    checkDeleteButtonState() {
      // Comprueba si al menos un blog está seleccionado
      this.showDeleteButton = this.blogs.some(blog => blog.selected);
    },
  },
}
</script>

<style>
</style>
