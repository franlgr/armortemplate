<template>
  <div>
    <div>
      <AdminHeader
        title="Create Product"
        icon="fa-brands fa-product-hunt"
      ></AdminHeader>
      <div class="bg-indigo-100 border-t border-b border-indigo-500 text-indigo-700 px-4 py-3" role="alert">
    <p class="font-bold">Create Product</p>
    <p>Here, you can write and publish new product posts.</p>
</div>

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
          Back
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
      <div class="2xl:container m-auto px-8">
        <div class="">
          <UploadImages
            title="Upload Products Images"
            class="my-4"
            v-on:links="links"
          ></UploadImages>
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
              name="title"
              label="Title Product"
              placeholder="Leather jacket like new"
              help="What is your title product ?"
              validation="required"
            />
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
            <br />
            <FormKit
              class="mt-4"
              type="number"
              name="price"
              label="price"
              placeholder="Price: $0.00"
              help="What is your price ?"
              validation=""
            />
            <br />
            <BlogSelectCategory
              v-if="options.length > 0"
              :options="options"
              v-on:category="setCategory"
            />
            <br />
            <p class="text-lg font-bold">Meta Data Description</p>
            <br />
            <FormKit
              :value="metaData.title"
              v-model="metaData.title"
              class="mt-4"
              type="text"
              name="metaTitle"
              label="title for meta"
              placeholder="red jacket like new"
              help="product title for meta seo"
              validation="required"
              v-on:input="updateMetaTitle"
            />
            <FormKit
              :value="metaData.content"
              v-model="metaData.content"
              class="mt-4"
              type="text"
              name="metaContent"
              label="content for meta"
              placeholder="It is very well cared for, I used it very little."
              help="Describe your blog ?"
              validation="required"
              v-on:input="updateMetaContent"
            />
            <!-- <FormKit
              :value="metaData.img"
              class="mt-4"
              type="text"
              name="metaImg"
              label="image for meta"
              placeholder="Meta Image URL"
              help="URL of the image for meta seo"
              validation="required"
              v-on:input="updateMetaImg"
            /> -->
            <FormKit type="submit" label="Create Product" />
          </FormKit>
          <div name="metaData" style="padding-bottom: 50px">
            <img
              class="w-24 m-auto"
              v-if="metaData.img"
              :src="metaData.img"
              alt="IMG"
            />
            <UploadImg
              title="Upload Meta Image"
              class="my-4"
              v-on:link="linkImgMeta"
            ></UploadImg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import AdminHeader from '@/components/admin/AdminHeader.vue';
  // import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import UploadImages from '@/components/admin/UploadImages.vue';
  import UploadImg from '@/components/admin/UploadImg.vue';
  import ProductSelectCategory from '@/components/admin/ProductSelectCategory.vue';
  import FeathersClient from '@/FeathersClient';
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  export default {
    data() {
      return {
        // editor: ClassicEditor,
        editorData: '<p>Content of the editor.</p>',
        editorConfig: {
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
          ],
        },
        options: [],
        formData: {},
        fechaActual: '',
        images: [],
        metaData: {
          title: '',
          content: '',
          img: '',
        },
        newBlog: {
          category: {
            _id: '6504a738c0eb3e6684d12b30',
            title: "Men's Clothing",
            description:
              '<p>A wide selection of fashionable clothing for men.</p>',
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
      AdminHeader,
      UploadImages,
      UploadImg,
      ProductSelectCategory,
      MdEditor,
    },
    mounted() {
      this.fetchCategories();
    },
    created() {
      this.obtenerFechaActual();
    },
    methods: {
      ...mapActions(['loadingSet']),
      async submitHandler() {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Submitted!');
        this.createBlog();
      },
      async fetchCategories() {
        this.loadingSet(true);
        try {
          const res = await FeathersClient.service('products-categories').find();
          this.categories = res.data;
          console.log('fetchCategories', res);
          this.setCategories();
          this.loadingSet(false);
        } catch (error) {
          console.error(error);
          this.loadingSet(false);
        }
      },
      setCategories() {
        this.categories.forEach((category) => {
          this.options.push({
            value: category._id,
            label: category.title,
          });
        });
      },
      links(links) {
        console.log('links', links);
        this.images.push(links);
      },
      linkImgMeta(link) {
        console.log('linkImgMeta', link);
        this.metaData.img = link;
      },
      deleteImage(id) {
        this.images.splice(id, 1);
      },
      obtenerFechaActual() {
        const fechaActual = new Date();
        const day = fechaActual.getDate();
        const month = fechaActual.getMonth() + 1;
        const year = fechaActual.getFullYear();

        this.fechaActual = `${day}/${month}/${year}`;
      },
      createBlog() {
        try {
          FeathersClient.service('products')
            .create({
              // title: { type: String, required: true },
              // content: { type: String, required: true },
              // price: { type: Number, required: true },
              // images: { type: Array, required: true },
              // metaData: { type: Object, required: true },
              // category: { type: Object, required: true },
              // user_id: { type: String, required: true },
              // user: { type: Object, required: true },
              title: this.formData.title,
              content: this.editorData,
              price: this.formData.price,
              // th: this.fechaActual,
              images: this.images,
              // imgUser: this.getUser.image,
              metaData: this.metaData,
              category: this.newBlog.category,
              user_id: this.getUser._id,
              user: this.getUser,

              // category_id: this.newBlog.category._id,

            })
            .then(() => {
              this.$snotify.success('Product Created', 'Success', {
                timeout: 2000,
                showProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
              });
              this.$router.push({ name: 'admin-products' });
            })
            .catch((error) => {
              console.error(error);
              this.$snotify.error(error, 'Error', {
                timeout: 2000,
                showProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
              });
            });
        } catch (error) {
          console.error(error);
          this.$snotify.error(error, 'Error', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });
        }
      },
      setCategory(category) {
        this.newBlog.category = category;
      },
      updateMetaTitle(value) {
        this.metaData.title = value;
      },
      updateMetaContent(value) {
        this.metaData.content = value;
      },
      updateMetaImg(value) {
        this.metaData.img = value;
      },
    },
    computed: {
      ...mapGetters(['isLoading', 'getUser']),
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
