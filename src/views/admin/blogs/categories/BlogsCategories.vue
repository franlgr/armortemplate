<template>
    <div>
      <div>
        <AdminHeader title="Blogs Categories" icon="fa-solid fa-blog fa-beat"></AdminHeader>
  
        <div class="m-4 sm:container mx-auto ml-2">
          <div class="">
            <div class="overflow-x-auto">
              <table class="table">
                <!-- head -->
                <thead>
                  <div>
                    <router-link v-if="isMobile"  :to="{ name: 'admin-blogs-categories-create'}">
                    <button class="m-3 border w-12 h-12 border-green-500 hover:border-green-700 rounded-full p-2">
                      <i class="fas fa-plus text-green-500"></i>
                    </button>
                </router-link>
                  </div>
                  <div>
                    <button @click="deleteSelectedCategories()"  class="m-3 border w-12 h-12 border-red-500 hover:border-red-700 rounded-full p-2" >
                        <i class="fas fa-trash-alt text-red-500"></i>
                    </button>
                  </div>
                    <button v-if="selectDelete" @click="selectDelete=false" class="border border-red-500 hover:border-red-700 text-white p-2">
                      Cancel
                     </button>
                     <!-- Add this new th for the additional button -->

                  
                  <tr>
                    <th class="m-0 p-0" v-if="selectDelete">
                        <div><span>Select All</span></div>
                      <label>
                        <input type="checkbox" class="checkbox" v-model="selectAll" @change="selectAllCategories" />
                      </label>
                    </th>
                    <th>Title & Description</th>
                    <th v-if="!isMobile">Slug</th>
                    <th>Actions</th>
                    <th v-if="!isMobile"> <!-- Add this new th for the additional button -->
                        <router-link  :to="{ name: 'admin-blogs-categories-create'}">
                    <button class="m-3 border w-12 h-12 border-green-500 hover:border-green-700 rounded-full p-2">
                      <i class="fas fa-plus text-green-500"></i>
                    </button>
                </router-link>
                  </th>
                  </tr>
                </thead>
  
                <tbody>
                  <!-- row 1 -->
                  <tr v-for="category in categories" :key="category.index">
                    <th class="p-0" v-if="selectDelete">
                      <label>
                        <input type="checkbox" class="checkbox" v-model="category.selected" @change="checkDeleteButtonState" />
                      </label>
                    </th>
                    <td >
                      <div class="flex items-center space-x-2">
                        <div class="avatar">
                          <div class="mask mask-squircle w-12 h-12">
                            <img :src="category.image" alt="Avatar Tailwind CSS Component" />
                          </div>
                        </div>
                        <div>
                          <div class=" text-xs font-bold">{{ category.title }}</div>
                          <div class="text-sm opacity-50" v-html="category.description"></div>
                        </div>
                      </div>
                    </td>
                    <td v-if="!isMobile">{{ category.slug }}</td>
                    <th>
                      <div v-if="!isMobile" class="flex justify-between">
                        <router-link :to="'/blogs?tag='+ category._id" class="flex items-center">
                          <button class="border w-8 h-8 border-blue-500 hover:border-blue-700 rounded-full p-2">
                            <i class="fas fa-eye text-blue-500"></i>
                          </button>
                        </router-link>
                        <router-link :to="{ name: 'admin-blogs-categories-edit', params: { id: category._id } }" class="flex items-center">
                          <button class="border w-8 h-8 border-yellow-500 hover:border-yellow-700 rounded-full p-2">
                            <i class="fas fa-edit text-yellow-500"></i>
                          </button>
                        </router-link>
                        <div class="flex items-center">
                          <!-- <button @click="deleteCategoryConfirm(category._id)" class="border w-12 h-12 border-red-500 hover:border-red-700 rounded-full p-2">
                            <i class="fas fa-trash-alt text-red-500"></i>
                          </button> -->
                        </div>
                      </div>
                      <div v-if="isMobile" class="flex justify-between">
                        <router-link :to="'/blogs?tag='+ category._id" class="flex items-center">
                          <button class="border w-8 h-8 border-blue-500 hover:border-blue-700 rounded-full p-2">
                            <i class="fas fa-eye text-blue-500"></i>
                          </button>
                        </router-link>
                        <router-link :to="{ name: 'admin-blogs-categories-edit', params: { id: category._id } }" class="flex items-center">
                          <button class="border w-8 h-8 border-yellow-500 hover:border-yellow-700 rounded-full p-2">
                            <i class="fas fa-edit text-yellow-500"></i>
                          </button>
                        </router-link>
                        <div class="flex items-center">
                          <!-- <button @click="deleteCategoryConfirm(category._id)" class="border w-12 h-12 border-red-500 hover:border-red-700 rounded-full p-2">
                            <i class="fas fa-trash-alt text-red-500"></i>
                          </button> -->
                        </div>
                      </div>
                    </th>
                  </tr>
                </tbody>
              </table>
              <div class=" join grid grid-cols-2 pagination w-64 m-auto py-8">
                            <button class="join-item btn btn-outline" @click="prevPage"
                                :disabled="currentPage === 1">Previous</button>
                            <button class="join-item btn btn-outline" @click="nextPage"
                                :disabled="categories.length < perPage">Next</button>
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
  import FeathersClient from '@/FeathersClient';
  
  export default {
    data() {
      return {
        categories: [],
        currentPage: 1,
        perPage: 10,
        selectAll: false,
        // showDeleteButton: false,
        selectedCategories: [], // Nueva propiedad para almacenar las categorías seleccionadas por ID
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
      this.fetchCategories();
      window.addEventListener('resize', this.updateWindowWidth);
      this.updateWindowWidth(); // Llama al método para inicializar el valor
    },
    methods: {
      ...mapActions(['loadingSet']),


      updateWindowWidth() {
    this.windowWidth = window.innerWidth;
  },
  
      checkDeleteButtonState() {
        this.selectedCategories = this.categories.filter((category) => category.selected).map((category) => category._id);
        this.showDeleteButton = this.selectedCategories.length > 0;
      },
  
      fetchCategories() {
        this.loadingSet(true);
        FeathersClient.service('blogs-categories')
          .find({
            query: {
              $limit: this.perPage,
              $skip: (this.currentPage - 1) * this.perPage,
            },
          })
          .then((res) => {
            this.loadingSet(false);
            this.categories = res.data;
          })
          .catch((err) => {
            console.error(err);
            this.loadingSet(false);
          });
      },
  
      deleteSelectedCategories() {
        this.selectDelete=true;
        if (this.selectedCategories.length > 0) {
          const confirmationMessage = 'Are you sure you want to delete selected categories?';
          const toastId = this.$snotify.info(confirmationMessage, 'Delete Categories?', {
            timeout: 0,
            showProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            buttons: [
              {
                text: 'Yes',
                action: (toast) => {
                  this.deleteCategories(this.selectedCategories, toast.id);
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
        }
      },
  
      deleteCategories(ids, toastId) {
       
        console.log('deleteCategories', ids);
        this.loadingSet(true);
  
        // Elimina cada categoría seleccionada en un bucle
        Promise.all(ids.map((id) => FeathersClient.service('blogs-categories').remove(id)))
          .then((res) => {
            console.log('deleteCategories', res);
            this.$snotify.success('Categories deleted', 'Success!', {
              timeout: 2000,
              showProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
            });
            this.loadingSet(false);
            this.fetchCategories();
          })
          .catch((err) => {
            console.error(err);
            this.loadingSet(false);
            this.$snotify.error(err, 'Error', {
              timeout: 2000,
              showProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
            });
          });
      },
  
      nextPage() {
        this.currentPage++;
        this.fetchCategories();
      },
  
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.fetchCategories();
        }
      },
  
      goToPage(pageNumber) {
        this.currentPage = pageNumber;
        this.fetchCategories();
      },
  
      selectAllCategories() {
        this.categories.forEach((category) => {
          category.selected = this.selectAll;
        });
        this.checkDeleteButtonState();
      },
    },
    computed: {
      ...mapGetters(['getUser']),
      totalPages() {
        return Math.ceil(this.categories.length / this.perPage);
      },

      isMobile() {
    return this.windowWidth <= 768; // Puedes ajustar este valor según tus necesidades
  },
    },
  };
  </script>
  