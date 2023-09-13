<template>
    <div>
      <AdminHeader title="Edit Blog"></AdminHeader>
      <div class="p-4">
        <!-- {{ blogs }} -->
      </div>
      <div class="m-4 2xl:container">
        <div>
          <!-- FORM EDIT -->
          <div class="flex flex-col-reverse md:flex-row justify-center items-center h-full w-full">
            <div class="md:w-1/2 p-4">
              <!-- {{ formData }} -->
              <FormKit
                type="form"
                id="edit-blog-form"
                :form-class="submitted ? 'hide' : 'show'"
                submit-label="Edit Blog"
                @submit="editBlog"
                :actions="false"
                #default="{ value }"
                v-model="formData"
              >
                <h1 class="mb-5">Edit Blog</h1>
                <hr />
                <FormKit 
                  type="text"
                  name="title"
                  label="Title *"
                  :value="blogs.title"
                  placeholder="Title of blog"
                  help="Put a title blog"
                  validation="required"
                />
                <FormKit
                  type="text"
                  name="content"
                  label="Description *"
                  :value="blogs.content"
                  placeholder="Description of blog"
                  help="Put a content blog"
                  validation="required"
                />
                <FormKit
                  type="text"
                  name="ubication"
                  label="Ubication (Optional)"
                  :value="blogs.ubication"
                  validation=""
                />
                <FormKit
                  type="submit"
                  label="Edit Blog"
                />
                <!-- <pre wrap>{{ value }}</pre> -->
              </FormKit>
            </div>
            <div class="md:w-1/2">
              <!-- EDIT END -->
              <br>
              <div class="max-w-md mx-auto mb-4">
                <div class="bg-white rounded-lg shadow-lg">
                  <!-- Título y Descripción -->
                  <div class="p-4">
                    <h2 class="text-xl font-semibold">{{ blogs.title }}</h2>
                    <p class="text-gray-600">{{ blogs.content }}</p>
                  </div>
                  <!-- Carousel Blog -->
                  <div v-for="blog in blogs.images" :key="blog.index">
                    <!-- {{ blog }} -->
                  </div>
                  <div class="carousel w-full max-w-md max-h-auto mx-auto">
                    <div class="carousel-container">
                      <div class="carousel w-full max-w-md max-h-auto mx-auto">
                        <div
                          v-for="(blog, index) in blogs.images"
                          :key="index"
                          :id="'slide' + (index + 1)"
                          class="carousel-item relative w-full"
                        >
                          <img :src="blog" class="w-full" />
                          <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                            <a :href="'#slide' + (index === 0 ? blogs.images.length : index)" class="btn btn-circle">❮</a>
                            <a :href="'#slide' + (index === blogs.images.length - 1 ? 1 : index + 2)" class="btn btn-circle">❯</a>
                          </div>
                          <div  class="absolute bottom-0 left-0 right-0 bg-white p-4">
                            <!-- Información adicional debajo de la imagen -->
                            <p class="text-gray-500"> {{ blogs.th }}</p>
                            <p class="text-gray-500">Ubication: {{ blogs.ubication }}</p>
                            <p class="text-gray-500">User: {{ blogs.user }}</p>
                            <!-- Agrega más datos de usuario u otra información aquí -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  import FeathersClient from '@/FeathersClient';
  import AdminHeader from '@/components/admin/AdminHeader.vue';
  
  export default {
    layout: "AdminLayout",
    data() {
      return {
        fechaActual: "",
        blogs: {},
        formData: {},
        submitted: false,
      };
    },
    components: {
      AdminHeader,
    },
    computed: {
      ...mapGetters(["getUser"]),
    },
  
    mounted() {
      const id = this.$route.params.id;
      if (id) {
        this.fetchBlog(id);
      }
      this.obtenerFechaActual();
    },
    methods: {
      ...mapActions(["loadingSet"]),
      obtenerFechaActual() {
        const fecha = new Date();
        const fechaFormateada = fecha.toISOString().split("T")[0];
        this.fechaActual = fechaFormateada;
      },
      async fetchBlog(id) {
        this.loadingSet(true);
        try {
          const res = await FeathersClient.service("blogs").get(id);
          this.blogs = res;
          this.formData = res;
          console.log("fetchBlog", res);
          this.loadingSet(false);
        } catch (error) {
          console.error(error);
          this.loadingSet(false);
          this.$snotify.error(error, "Error", {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });
        }
      },
      async editBlog() {
        this.submitted = true;
        try {
          // Incluye los campos th, ubication y user en la solicitud PATCH
          const updatedBlog = await FeathersClient.service("blogs").patch(this.blogs._id, {
            ...this.formData,
            th: this.fechaActual,
            user: this.getUser.name +' '+this.getUser.lastname,
          });
          console.log("editBlog", updatedBlog);
          // Actualiza los datos del blog con los datos editados
          this.blogs = updatedBlog;
          this.$snotify.success("Blog edited successfully", "Success", {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });
        } catch (error) {
          console.error(error);
          this.$snotify.error("Error editing blog", "Error", {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });
        }
      },
    },
  };
  </script>
  