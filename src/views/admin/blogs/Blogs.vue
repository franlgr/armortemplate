<template>
  <div>
    <div>
      <AdminHeader title="Blogs" icon="fa-solid fa-blog fa-beat" :count="blogs.length"></AdminHeader>
<div class="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3" role="alert">
    <p class="font-bold">My Blogs</p>
    <p>Here, you can manage and view your published blog posts.</p>
</div>

      <div class="m-4 2xl:container">
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
                <tr>
                  <th>
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
                  <th>User</th>
                  <th>TH</th>
                  <th>Actions</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>

                <!-- row 1 -->
                <tr v-for="blog in blogs" :key="blog.index">

                  <th>
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
                        <div class="font-bold">{{ blog.title }}</div>
                      </div>
                    </div>
                  </td>
                  <td>
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
                    <br />
                  </td>
                  <td>
                    <div class="text-sm opacity-50">{{ blog.th }}</div>
                  </td>
                  <td>
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
  import AdminHeader from '@/components/admin/AdminHeader.vue'; // Asegúrate de tener esta importación correcta
  import FeathersClient from '@/FeathersClient.js';

  export default {
    layout: 'AdminLayout',
    data() {
      return {
        blogs: [],
        selectAll: false,
        showDeleteButton: false,
        currentPage: 1, // Página actual
        perPage: 10,
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

      deleteSelectedBlogs() {
        const selectedBlogs = this.blogs.filter((blog) => blog.selected);
        if (selectedBlogs.length > 0) {
          const confirmationMessage =
            'Are you sure you want to delete selected blogs?';
          const toastId = this.$snotify.info(
            confirmationMessage,
            'Deleted Blogs',
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
                    this.$snotify.remove(toast.id);
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
        }
      },

      hideDeleteConfirmationModal() {
        // Agrega tu lógica para ocultar el modal de confirmación aquí si es necesario
      },

      async fetchBlogs() {
        this.loadingSet(true);
        try {
          // Reemplaza 'getUser._id' con el valor correcto de tu usuario
          const res = await FeathersClient.service('blogs').find({
            query: {
              user_id: this.getUser._id, // Asegúrate de tener el valor correcto aquí
              $limit: 10, // Cambia la cantidad según tu necesidad
              $sort: {
                createdAt: -1,
              },
            },
          });
          this.loadingSet(false);
          this.blogs = res.data;
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
      },

      selectAllBlogs() {
        this.blogs.forEach((blog) => {
          blog.selected = this.selectAll;
        });
        this.checkDeleteButtonState();
      },

      checkDeleteButtonState() {
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
        return Math.ceil(this.blogs.length / 10); // Cambia 10 por la cantidad por página que desees
      },
      isAdmin() {
        return this.getUser.permissions.includes('admin');
      },
    },
  };
</script>

<style></style>
