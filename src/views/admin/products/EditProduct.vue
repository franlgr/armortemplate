<template>
  <div>
    <AdminHeader title="Edit Product"></AdminHeader>
    <div class="mt-6">
      <router-link
        to="/admin/products"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-3 ml-4 rounded"
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
    <div class="carousel carousel-end rounded-box fix p-8">
      <div class="carousel-item" v-for="image in images" :key="image.index">
        <div class="m-auto">
          <img class="w-24" :src="image" alt="Drink" />
          <button
            class="bg-white m-auto mt-2 text-sm"
            @click="deleteImage(image.index)"
          >
            X
          </button>
        </div>
      </div>
    </div>
    <UploadImages
      title="Upload Product Images"
      class="my-4"
      v-on:links="links"
    ></UploadImages>
    <div class="m-4 2xl:container my-4">
      <div>
        <FormKit
          type="form"
          :ignore="true"
          @submit="submitHandler"
          v-model="data"
          :actions="false"
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
          <ckeditor
            class="my-4"
            :editor="editor"
            v-model="editorData"
            :config="editorConfig"
          ></ckeditor>
          <br />
          <FormKit
            class="mt-4"
            type="number"
            name="price"
            label="USD PRICE"
            placeholder="800"
            help="What is your title product ?"
            validation="required"
          />
          <br />
          <ProductSelectCategory
            :category="editProduct.category"
            v-on:category="setCategory"
          />
          <br />
          <p class="text-lg font-bold">Meta Data Description</p>

          <br />
          <FormKit
            class="mt-4"
            type="text"
            name="titleMeta"
            label="title for meta"
            placeholder="red jacket like new"
            help="product title for meta seo"
            validation="required"
          />
          <FormKit
            class="mt-4"
            type="text"
            name="contentMeta"
            label="content for meta"
            placeholder="It is very well cared for, I used it very little."
            help="Describe your product ?"
            validation="required"
          />
          <FormKit type="submit" label="Save Product" />
        </FormKit>

        <div name="metaData" style="padding-bottom: 50px">
          <img class="w-24 m-auto" :src="metaData.img" alt="IMG" />
        </div>
      </div>
    </div>
    <UploadImg
      title="Upload Meta Image"
      class="my-4"
      v-on:link="linkImgMeta"
    ></UploadImg>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import FeathersClient from '@/FeathersClient';
  import AdminHeader from '@/components/admin/AdminHeader.vue';

  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import ProductSelectCategory from '@/components/admin/ProductSelectCategory.vue';
  import UploadImages from '@/components/admin/UploadImages.vue';
  import UploadImg from '@/components/admin/UploadImg.vue';

  export default {
    data() {
      return {
        editor: ClassicEditor,
        editorData: '',
        editorConfig: {
          // The configuration of the editor.
        },
        product: {},
        metaData: {
          img: '',
        },
        options: [],
        images: [],
        // links: [],
        ImgMeta: '',
        data: {},
        category: {},
        editProduct: {
          category: {},
        },
      };
    },
    mounted() {
      const id = this.$route.params.id;
      if (id) {
        this.fetchProduct(id);
      }
    },
    components: {
      AdminHeader,
      ProductSelectCategory,
      UploadImages,
      UploadImg,
    },

    methods: {
      ...mapActions(['loadingSet']),

      links(links) {
        console.log('links', links);
        this.images.push(links);
      },
      async linkImgMeta(link) {
        console.log('linkImgMeta', link);
        this.metaData.img = link;
      },
      deleteImage(id) {
        this.images.splice(id, 1);
      },

      async fetchProduct(id) {
        this.loadingSet(true);
        try {
          const res = await FeathersClient.service('products').get(id);
          // console.log('fetchProducts', res.content);
          // this.fetchCategories();
          this.product = res;
          this.category = res.category;
          this.editProduct.category = res.category;
          this.editorData = res.content;
          this.metaData = {
            title: res.metaData.title,
            content: res.metaData.content,
            img: res.metaData.img,
          };
          this.images = res.images;
          this.data = {
            title: res.title,
            price: res.price,
            images: res.images,
            category: res.category._id,
            titleMeta: res.metaData.title,
            contentMeta: res.metaData.content,
          };

          this.loadingSet(false);
        } catch (error) {
          console.error(error);
          this.loadingSet(false);
          this.$snotify.error(error, 'Error', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });
        }
      },
      async submitHandler() {
        // Simulate an AJAX request (replace with actual AJAX call)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Submitted!');
        this.updateProduct();
      },
      async updateProduct() {
        console.log('updateProduct');
        try {
          const res = await FeathersClient.service('products').patch(
            this.product._id,
            {
              title: this.data.title,
              content: this.editorData,
              price: this.data.price,
              category: this.editProduct.category,
              category_id: this.editProduct.category._id,
              metaData: {
                title: this.data.titleMeta,
                content: this.data.contentMeta,
                img: this.metaData.img,
              },

              images: this.images,
            },
          );
          this.$snotify.success('Product Updated', 'Success', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });
          //FINISH

          this.$router.push({ name: 'admin-products' });
          console.log('res', res);
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
        console.log('setCategory', category);
        this.editProduct.category = category;
      },
    },
  };
</script>
