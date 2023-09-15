<!-- Modelo para crear una vista nueva dentro de admin -->
<template>
    <div>
      <AdminHeader title="Create Blog Post"></AdminHeader>
      <div class="p-4">
        <!-- Vista previa del blog -->
        <div class="bg-white rounded-lg shadow-lg p-4">
          <h2 class="text-xl font-semibold">{{ formData.title }}</h2>
          <p style="word-wrap: break-word;" class="text-gray-600">{{ formData.content }}</p>
          <div class="carousel w-full max-w-md max-h-auto mx-auto">
            <div class="carousel-container">
              <div v-for="(image, index) in blogImages" :key="index" :id="'slide' + (index + 1)" class="carousel-item relative w-full">
                <img :src="image" class="w-full" />
                <!-- Agregar controles del carrusel aquí -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="m-4 2xl:container">
        <div>
          <!-- CKEditor para editar el contenido del blog -->
         
          <!-- Componente para cargar imágenes -->
          <!-- <UploadImages class="p-4" @images="handleImages"></UploadImages> -->
          <br />
          <!-- FORM POST -->
          <div class="flex flex-col-reverse md:flex-row justify-center items-center h-full w-full">
            <div class="md:w-1/2 p-4">
              <FormKit
                type="form"
                id="edit-blog-form"
                :form-class="submitted ? 'hide' : 'show'"
                submit-label="Posting"
                @submit="postBlog()"
                :actions="false"
                #default="{ value }"
                v-model="formData"
              >
                <h1 class="mb-5">Post New Blog</h1>
                <hr />
                <FormKit
                  type="text"
                  name="title"
                  label="Title *"
                  placeholder="Title of blog"
                  help="Put a title blog"
                  validation="required"
                  v-model="formData.title"
                />
                <FormKit
                  type="text"
                  name="ubication"
                  label="Ubication (Optional)"
                  validation=""
                  v-model="formData.ubication"
                />
                
                <FormKit type="submit" label="Post Blog" />
              </FormKit>
              
            </div>
            <ckeditor class="my-4" :editor="editor" v-model="formData.content" :config="editorConfig"></ckeditor>
            <!-- Vista previa del blog -->
            <div class="md:w-1/2">
              <!-- ... Resto de la vista previa ... -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  import AdminHeader from '@/components/admin/AdminHeader.vue';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import UploadImages from "@/components/admin/UploadImages.vue"; 
  
  export default {
    layout: "AdminLayout",
    data() {
      return {
        editor: ClassicEditor,
        editorConfig: {
          // Configuración del editor CKEditor
          toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'imageUpload', // Habilita la opción de subir imágenes
          ],
        },
        formData: {
          title: "", // Inicializa el título vacío
          content: "", // Inicializa el contenido vacío
          ubication: "", // Inicializa la ubicación vacía
        },
        submitted: false,
        blogImages: [],
      };
    },
    components: {
      AdminHeader,
      UploadImages,
    },
    computed: {
      ...mapGetters(["getUser"]),
    },
    methods: {
      ...mapActions(["loadingSet"]),
      
      // Función para manejar las imágenes seleccionadas
      handleImages(images) {
        this.blogImages = images;
      },
      
      // Función para publicar el blog
      async postBlog() {
        this.submitted = true;
        try {
          const { title, content, ubication } = this.formData;
          
          // Construye el objeto del nuevo blog
          const newBlog = {
            title,
            content,
            ubication,
            th: this.fechaActual,
            user: this.getUser.name +' '+this.getUser.lastname,
            images: this.blogImages,
            imgUser: this.getUser.image,
            metaData: {
              titulo: title,
              descripcion: content,
              img: this.blogImages[0]
            }
          };
          
          // Lógica para publicar el blog (aquí debes implementar tu propia lógica)
          // Puedes enviar el objeto newBlog a tu servidor o servicio de backend
          
          console.log("postBlog", newBlog);
          // Mostrar mensaje de éxito
          this.$snotify.success("Blog posted successfully", "Success", {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });
        } catch (error) {
          console.error(error);
          // Mostrar mensaje de error en caso de fallo
          this.$snotify.error("Error posting blog", "Error", {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });
        }
      },
    },
    mounted() {
      this.obtenerFechaActual();
    },
  };
  </script>
  
  <style></style>
  