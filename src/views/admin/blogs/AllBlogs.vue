<template>
  <div>
    <div>
      <AdminHeader
        title="All Blogs"
        icon="fa-solid fa-blog fa-beat"
        :count="blogs.length"
      ></AdminHeader>
      <div class="m-4 sm:container mx-auto ml-2">
        <div class="">
          <div class="overflow-x-auto">
            <table class="table">
              <!-- head -->
              <thead>
                <div class="flex items-center">
                  <button @click="deleteSelectedBlogs()" class="border w-12 h-12 border-red-500 hover:border-red-700 rounded-full p-2">
                      <i class="fas fa-trash-alt text-red-500"></i>
                     </button>
                        
                  </div>
                  <button v-if="selectDelete" @click="selectDelete=false" class="border border-red-500 hover:border-red-700 text-white p-2">
                      Cancel
                     </button>
                <tr>
                  <th v-if="selectDelete" class="m-0 p-0">
                    <div><span>Select All</span></div>
                    <label>
                      <input
                        type="checkbox"
                        class="checkbox"
                        v-model="selectAll"
                        @change="selectAllBlogs"
                      />
                    </label>
                  </th>
                  <th>Title</th>
                  <th v-if="!isMobile">Category</th>
                  <!-- <th v-if="!isMobile">TH</th> -->
                  <th>Actions</th>
                  <!-- <th></th> -->
                </tr>
              </thead>

              <tbody>

                <!-- row 1 -->
                <tr v-for="blog in blogs" :key="blog.index">

                  <th v-if="selectDelete">
                    <label>
                      <input
                        type="checkbox"
                        class="checkbox"
                        v-model="blog.selected"
                        @change="checkDeleteButtonState"
                      />
                    </label>
                  </th>
                  <td>
                    <div class="flex items-center space-x-3">
                      <div class="avatar">
                        <div class="avatar">
                          <div
                            class="mask mask-squircle w-12 h-12"
                            v-for="(image, index) in blog.images"
                            :key="index"
                          >
                            <img
                              :src="image"
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="text-xs font-bold">{{ blog.title }}</div>
                      </div>
                    </div>
                  </td>
                  <td v-if="!isMobile">
                    <button
                      class="flex flex-row items-center bg-white rounded-xl p-2 text-gray-500"
                    >
                      <div
                        class="flex items-center justify-center h-8 w-8 bg-purple-300 rounded-full"
                      >
                        <img
                          v-if="blog.category.image"
                          :src="blog.category.image"
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
                        {{ blog.category.title}} 
                      </div>
                    </button>
                    <br />
                  </td>
                  <!-- <td v-if="!isMobile">
                    <div class="text-sm opacity-50">{{ blog.th }}</div>
                  </td> -->
                  <td v-if="isMobile">
                    <div class="flex items-center space-x-1">
              <router-link :to="{ name: 'site-blog', params: { id: blog._id } }">
                <button class="border w-8 h-8 border-blue-500 hover:border-blue-700 rounded-full p-1">
                  <i class="fas fa-eye text-blue-500 text-xs"></i>
                </button>
              </router-link>
              <router-link :to="{ name: 'admin-blogs-edit', params: { id: blog._id } }">
                <button class="border w-8 h-8 border-yellow-500 hover:border-yellow-700 rounded-full p-1">
                  <i class="fas fa-edit text-yellow-500 text-xs"></i>
                </button>
              </router-link>
            </div>
              </td>
                  <td v-if="!isMobile">
                    <div class="flex justify-between">
                      <router-link
                        :to="{ name: 'site-blog', params: { id: blog._id } }"
                        class="flex items-center"
                      >
                        <button
                          class="border w-12 h-12 border-blue-500 hover:border-blue-700 rounded-full p-2"
                        >
                          <i class="fas fa-eye text-blue-500"></i>
                        </button>
                      </router-link>
                      <router-link
                        :to="{
                          name: 'admin-blogs-edit',
                          params: { id: blog._id },
                        }"
                        class="flex items-center"
                      >
                        <button
                          class="border w-12 h-12 border-yellow-500 hover:border-yellow-700 rounded-full p-2"
                        >
                          <i class="fas fa-edit text-yellow-500"></i>
                        </button>
                      </router-link>
                    </div>
                  </td>
                </tr>
              </tbody>

              <!-- foot -->
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
        windowWidth: window.innerWidth,
        selectDelete:false,
      };
    },
    components: {
      AdminHeader,
    },
    beforeDestroy() {
  window.removeEventListener('resize', this.updateWindowWidth);
},
    mounted() {
      this.fetchBlogs();
      window.addEventListener('resize', this.updateWindowWidth);
      this.updateWindowWidth(); // Llama al método para inicializar el valor
    
    },
    methods: {
      ...mapActions(['loadingSet']),

      updateWindowWidth() {
    this.windowWidth = window.innerWidth;
  },
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
          this.blogs = this.blogs.filter((blog) => blog._id !== blogId);
          console.log('Blog eliminado con éxito.');
          this.$snotify.success('Blog eliminado con éxito', 'Éxito', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });
          // this.hideDeleteConfirmationModal();
        } catch (error) {
          console.error('Error al eliminar el blog:', error);
          this.$snotify.error('Error al eliminar el blog', 'Error', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });
        }
      },

      // showDeleteConfirmationModal(blog) {
      //   this.selectedBlog = blog;
      //   const deleteConfirmationModal = document.getElementById("delete_confirmation_modal");
      //   deleteConfirmationModal.showModal();
      // },
      deleteSelectedBlogs() {
        this.selectDelete=true;
        const selectedBlogs = this.blogs.filter((blog) => blog.selected);
        if (selectedBlogs.length > 0) {
          const confirmationMessage =
            'Are you sure you want to delete selected blogs?';
          const toastId = this.$snotify.info(
            confirmationMessage,
            'Delete Blogs',
            {
              timeout: 0,
              showProgressBar: true,
              closeOnClick: false,
              pauseOnHover: true,
              buttons: [
                {
                  text: 'Yes',
                  action: (toast) => {
                    selectedBlogs.forEach((blog) => {
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
            },
          );

          // this.selectedBlog = null;
          // this.showDeleteButton = false;
        }
      },

      hideDeleteConfirmationModal() {
        const deleteConfirmationModal = document.getElementById(
          'delete_confirmation_modal',
        );
        deleteConfirmationModal.close();
      },

      // Función para manejar la selección de todos
      selectAllBlogs() {
        this.blogs.forEach((blog) => {
          blog.selected = this.selectAll;
        });
        this.checkDeleteButtonState();
      },

      // Función para comprobar el estado del botón "Delete"
      checkDeleteButtonState() {
        // Comprueba si al menos un blog está seleccionado
        this.showDeleteButton = this.blogs.some((blog) => blog.selected);
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
      isMobile() {
    return this.windowWidth <= 768; // Puedes ajustar este valor según tus necesidades
  },
    },
  };
</script>

<style></style>
