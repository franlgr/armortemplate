<template>
    <div>
      <div>
        <AdminHeader
          title="All Blogs"
          icon="fa-solid fa-blog fa-beat"
          :count="blogs.length"
        ></AdminHeader>
        <div class="2xl:container">
          <div class="">
            <div class="overflow-x-auto">
              <table class="table">
                <!-- head -->
                <thead>
                    <button :disabled="!showDeleteButton" @click="deleteSelectedBlogs()" class="border w-12 h-12 border-red-500 hover:border-red-700 rounded-full p-2">
                    <i class="fas fa-trash-alt text-red-500"></i>
                  </button>
                  <tr>
                    <th>
                        <div><span>Select All</span></div>
                      <label>
                        <input type="checkbox" class="checkbox"  v-model="selectAll" @change="selectAllBlogs"/>
                      </label>
                    </th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- row 1 -->
                  <tr v-for="blog in blogs" :key="blog._id">
                    <th>
                      <label>
                        <input type="checkbox" class="checkbox" v-model="blog.selected" @change="checkDeleteButtonState"/>
                      </label>
                    </th>
                    <td>
                      <div class="flex items-center space-x-3">
                        <div class="avatar">
                          <div
                            class="mask mask-squircle w-12 h-12"
                            v-if="blog.images"
                          >
                            <img
                              :src="blog.images[0]"
                              alt="Blog Image"
                            />
                          </div>
                        </div>
                        <div>
                          <div class="font-bold">{{ blog.title }}</div>
                          <div class="text-sm opacity-50" v-if="blog.user">
                            {{ blog.user }}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td v-if="blog.category">{{ blog.category.title }}</td>
                    <td>
                        <div class="flex justify-between">
                        <router-link to="/" class="flex items-center">
                          <button class="border w-12 h-12 border-blue-500 hover:border-blue-700 rounded-full p-2">
                            <i class="fas fa-eye text-blue-500"></i>
                          </button>
                        </router-link>
                        <router-link :to="{ name: 'admin-blogs-edit', params: { id: blog._id } }" class="flex items-center">
                          <button class="border w-12 h-12 border-yellow-500 hover:border-yellow-700 rounded-full p-2">
                            <i class="fas fa-edit text-yellow-500"></i>
                          </button>
                        </router-link>
                        <div class="flex items-center">
                          <!-- <button @click="deleteCategoryConfirm(category._id)" class="border w-12 h-12 border-red-500 hover:border-red-700 rounded-full p-2">
                            <i class="fas fa-trash-alt text-red-500"></i>
                          </button> -->
                        </div>
                      
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
  
              <!-- Pagination -->
              <div class="join grid grid-cols-2 pagination w-64 m-auto py-8">
                <button
                  class="join-item btn btn-outline"
                  @click="prevPage"
                  :disabled="currentPage === 1"
                >
                  Previous
                </button>
                <button
                  class="join-item btn btn-outline"
                  @click="nextPage"
                  :disabled="blogs.length < perPage"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  import AdminHeader from '@/components/admin/AdminHeader.vue';
  import FeathersClient from '@/FeathersClient.js';
  
  export default {
    layout: 'AdminLayout',
    data() {
      return {
        blogs: [],
        currentPage: 1,
        perPage: 10,
        selectedBlog: null,
        selectAll: false,
        showDeleteButton: false,
      };
    },
    components: {
      AdminHeader,
    },
    mounted() {
      this.fetchBlogs();
    },
    methods: {
      ...mapActions(['loadingSet']),
      async fetchBlogs() {
        this.loadingSet(true);
        try {
          if (this.isAdmin) {
            const res = await FeathersClient.service('blogs').find({
              query: {
                $limit: this.perPage,
                $skip: (this.currentPage - 1) * this.perPage,
                $sort: {
                  createdAt: -1,
                },
              },
            });
            this.loadingSet(false);
            this.blogs = res.data;
          }
        } catch (error) {
          this.loadingSet(false);
          this.$snotify.error(error, 'Error', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });
          console.error(error);
        }
        this.loadingSet(false);
      },
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

    // showDeleteConfirmationModal(blog) {
    //   this.selectedBlog = blog;
    //   const deleteConfirmationModal = document.getElementById("delete_confirmation_modal");
    //   deleteConfirmationModal.showModal();
    // },
    deleteSelectedBlogs() {
  const selectedBlogs = this.blogs.filter(blog => blog.selected);
  if (selectedBlogs.length > 0) {
    const confirmationMessage = 'Are you sure you want to delete selected blogs?';
    const toastId = this.$snotify.info(confirmationMessage, 'Delete Blogs', {
      timeout: 0,
      showProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      buttons: [
        {
          text: 'Yes',
          action: (toast) => {
            selectedBlogs.forEach(blog => {
              this.deleteBlog(blog._id);
            });
            this.$snotify.remove(toast.id); // Remove the confirmation toast
          },
          bold: false,
        },
        {
          text: 'Close',
          action: (toast) => {
            console.log('Clicked: No');
            this.$snotify.remove(toast.id);
          },
          bold: true,
        },
      ],
    });

    // this.selectedBlog = null;
    // this.showDeleteButton = false;
  }
},

    hideDeleteConfirmationModal() {
      const deleteConfirmationModal = document.getElementById("delete_confirmation_modal");
      deleteConfirmationModal.close();
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
    },
    computed: {
      ...mapGetters(['getUser']),
      totalPages() {
        return Math.ceil(this.blogs.length / this.perPage);
      },
      isAdmin() {
        return this.getUser.permissions.includes('admin');
      },
    },
  };
  </script>
  
  <style></style>
  