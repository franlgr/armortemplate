<!-- Modelo para crear una vista nueva dentro de admin -->
<template>
  <div>
    <div>
      <AdminHeader
        title="Create Product"
        icon="fa-solid fa-square-plus"
      ></AdminHeader>
      <!-- {{getUser}} -->
      <div class="mt-6">
        <router-link
          to="/admin/products"
          class="bg-[#2c7b60] text-white font-bold px-4 py-3 ml-4 rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 inline-block -ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Go back
        </router-link>
      </div>
      <div class="carousel carousel-end rounded-box fix">
        <div
          class="carousel-item m-auto"
          v-for="image in images"
          :key="image.index"
        >
          <div>
            <img class="w-24 m-auto" :src="image" alt="Drink" />
            <button
              class="bg-white m-auto mt-2 text-sm"
              @click="deleteImage(image.index)"
            >
              X
            </button>
          </div>
        </div>
      </div>
      <div class="2xl:container md:w-2/3 m-auto px-8">
        <div class="">
          <!-- componente para subir muchas imagenes  -->
          <UploadImages
            title="Upload Product Images"
            class="my-4"
            v-on:links="links"
          ></UploadImages>

          <!-- Este es el framework formkit fijate que hay otros adentro de uno pero este es el 
                        importante porque es el que tiene la funcion a disparar cuando se le da al boton. -->
          <FormKit
            type="form"
            id="guardar-example"
            :form-class="submitted ? 'hide' : 'show'"
            submit-label="Register"
            @submit="submitHandler"
            :actions="false"
            v-model="formData"
          >
            <FormKit
              class="mt-4"
              type="text"
              name="name"
              label="Title Product"
              placeholder="Leather jacket like new"
              help="What is your title product ?"
              validation="required"
            />
            <!-- <ckeditor
              class="my-4"
              id="editor"
              :editor="editor"
              v-model="editorData"
              :config="editorConfig"
            ></ckeditor> -->
            <!-- <ckeditor
              :editor="editor"
              v-model="editorData"
              :config="editorConfig"
            ></ckeditor> -->
            <div>
              <MdEditor
                htmlPreview
                language="en-US"
                :toggleHtmlPreview="true"
                :toolbars="[
                  // 'code',
                  // 'link',
                  // 'image',
                  // 'table',
                  // 'mermaid',
                  // 'katex',
                  // '-',
                  // 'revoke',
                  // 'next',
                  // 'save',
                  // '=',
                  'pageFullscreen',
                  'fullscreen',
                  'preview',
                  'htmlPreview',
                  'catalog',
                  'github',
                ]"
                width="auto"
                :tabWidth="1"
                noMermaid
                :sanitize="sanitize"
                theme="white"
                v-model="editorData"
              />
            </div>

            <br />
            <FormKit
              class="mt-4"
              type="number"
              name="price"
              label="USD PRICE"
              placeholder="800"
              help="What is your price for this product ?"
              validation="required"
            />
            <br />

            <!-- {{ newProduct }} -->
            <ProductSelectCategory
              label="What is your product category ?"
              v-on:category="setCategory"
            />
            <br />
            <p class="text-lg font-bold">Meta Data Description</p>

            <br />

            <br />
            <FormKit
              class="mt-4"
              type="text"
              name="title"
              label="title for meta"
              placeholder="red jacket like new"
              help="product title for meta seo"
              validation="required"
            />
            <FormKit
              class="mt-4"
              type="text"
              name="content"
              label="content for meta"
              placeholder="It is very well cared for, I used it very little."
              help="Describe your product ?"
              validation="required"
            />
            <FormKit type="submit" label="Create Product" />
          </FormKit>
          <div name="metaData" style="padding-bottom: 50px">
            <img
              class="w-24 m-auto"
              v-if="metaData.img"
              :src="metaData.img"
              alt="IMG"
            />
            <!-- componente para subir una imagen -->
            <UploadImg
              title="Upload Meta Image"
              class="my-4"
              v-on:link="linkImgMeta"
            ></UploadImg>
          </div>
          <!-- {{ newProduct.category }} -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  // import BreadCrumbs from '@/components/admin/Breadcrumbs.vue';
  import AdminHeader from '@/components/admin/AdminHeader.vue';
  // import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import UploadImages from '@/components/admin/UploadImages.vue';
  import UploadImg from '@/components/admin/UploadImg.vue';
  import ProductSelectCategory from '@/components/admin/ProductSelectCategory.vue';
  import FeathersClient from '@/FeathersClient';
  // import { ClassicEditor as ClassicEditorBase } from '@ckeditor/ckeditor5-editor-classic';
  // import html from '@ckeditor/ckeditor5-html-embed/src/htmlembed';

  import { ref } from 'vue';
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  export default {
    setup() {
      const text = ref('# Hello Editor');

      const updateText = (newText) => {
        text.value = newText;
      };

      return {
        text,
        updateText,
      };
    },
    data() {
      return {
        // editor: ClassicEditor,
        editorData: '<p>Content of the editor.</p>',
        editorConfig: {
          // The configuration of the editor.
        },
        options: [],

        images: [],
        metaData: {
          title: 'Meta Título',
          content: 'Meta Descripción',
          img: 'URL de la imagen de meta',
        },
        //hay que ordenar la data en este objeto
        newProduct: {
          // "title": "Título del producto",
          // "content": "Descripción del producto",
          // "price": "Precio del producto",
          // "images": "URL de las imágenes del producto",
          // "category": "ID de la categoría del producto",
          // "metaData": "Objeto con los datos de meta"
          category: {
            _id: '6504a738c0eb3e6684d12b30',
            title: "Men's Clothing ",
            description:
              '<p>A wide selection of fashionable clothing for men.&nbsp;</p>',
            image:
              'https://res.cloudinary.com/doznjtpmk/image/upload/v1694807104/admin-web/qlvmqmwni5iye6iy3xqq.webp',
            slug: 'mens-clothing',
            createdAt: '2023-09-15T18:49:28.188Z',
            updatedAt: '2023-09-16T11:31:52.308Z',
            __v: 0,
          },
        },
      };
    },
    components: {
      // BreadCrumbs,
      AdminHeader,
      UploadImages,
      UploadImg,
      ProductSelectCategory,
      MdEditor,
    },
    mounted() {
      // ClassicEditor.create(document.querySelector('#editor'), {
      //   plugins: [this.MediaEmbed /* ... */],
      //   toolbar: ['mediaEmbed' /* ... */],
      //   mediaEmbed: {
      //     // Configuration
      //     // ...
      //   },
      // })
      //   .then(/* ... */)
      //   .catch(/* ... */);
      // this.editor;
      // .create(document.querySelector('#editor'), {
      //   plugins: [HtmlEmbed /* ... */],
      //   toolbar: ['htmlEmbed' /* ... */],
      //   htmlEmbed: {
      //     showPreviews: true,
      //     sanitizeHtml: (inputHtml) => {
      //       // Strip unsafe elements and attributes, e.g.:
      //       // the `<script>` elements and `on*` attributes.
      //       const outputHtml = sanitize(inputHtml);
      //       return {
      //         html: outputHtml,
      //         // true or false depending on whether the sanitizer stripped anything.
      //         hasChanged: true,
      //       };
      //     },
      //   },
      // })
      // .then(/* ... */)
      // .catch(/* ... */);
    },
    methods: {
      ...mapActions(['loadingSet']),
      async submitHandler() {
        //esta funcion se dispara cuando se hace click en el boton del form y todos los datos estan validados

        //esto hace que haga un loader al lado del boton por 1 segundo
        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log('Submitted!');

        //llamamos a la funcion para crear el producto
        this.createProduct();
      },
      //esta funcion recibe los links de las imagenes que se suben al componente UploadImages
      links(links) {
        console.log('links', links);
        this.images.push(links);
      },
      //esta funcion recibe el link de la imagen que se sube al componente UploadImg
      linkImgMeta(link) {
        console.log('linkImgMeta', link);
        this.metaData.img = link;
      },
      //eliminar imagen del array de imagenes
      deleteImage(id) {
        this.images.splice(id, 1);
      },
      async createProduct() {
        try {
          //creamos el producto en feathers
          const res = await FeathersClient.service('products').create({
            title: this.formData.name,
            content: this.editorData,
            price: this.formData.price,
            images: this.images,
            category: this.newProduct.category,
            category_id: this.newProduct.category._id,
            metaData: this.metaData,
            user_id: this.getUser._id,
            user: this.getUser,
          });

          //notificacion de exito
          this.$snotify.success('Product Created', 'Success', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });
          this.$router.push({ name: 'admin-products' });
        } catch (error) {
          //imprimimos y notificamos si hay error
          console.error(error);
          this.$snotify.error(error, 'Error', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });
        }
      },
      //funcion que se dispara cuando el componente ProductSelectCategory emite el evento category (hay que hacer otro para blog y para events)
      setCategory(category) {
        this.newProduct.category = category;
      },
    },

    computed: {
      //traemos del store el usuario logueado y el estado de loading ya lo tenemos automaticamente en el componente
      ...mapGetters(['isLoading', 'getUser']), // Map Vuex getters to computed properties
    },
  };
</script>

<style>
  .fix {
    margin: auto;
    margin-top: auto;
    margin-bottom: auto;
    display: flex;

    justify-content: center;
    right: 10px;
  }
</style>
