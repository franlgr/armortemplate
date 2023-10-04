<template>
  <div>
    <AdminHeader title="Edit Blog"></AdminHeader>
    <div class="mt-6">
      <router-link
        to="/admin/blogs"
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
      <div class="carousel-item" v-for="(image, index) in images" :key="index">
        <div class="m-auto">
          <img class="w-24" :src="image" alt="Image" />
          <button
            class="bg-white m-auto mt-2 text-sm"
            @click="deleteImage(index)"
          >
            X
          </button>
        </div>
      </div>
    </div>
    <UploadImages
      title="Upload Blog Images"
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
            label="Title Blog"
            placeholder="Mark Zuckerberg confirms Facebook will release its long-awaited Ray-Ban 'smart glasses'"
            help="What is your title blog ?"
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
            type="text"
            name="ubication"
            label="Ubication"
            placeholder="New York"
            help="Location of the blog"
            validation="required"
          />
          <br />
          <BlogSelectCategory
            :category="editBlog.category"
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
            placeholder="Meta Title"
            help="Blog title for meta SEO"
            validation="required"
          />
          <FormKit
            class="mt-4"
            type="text"
            name="contentMeta"
            label="content for meta"
            placeholder="Meta Description"
            help="Describe your blog for SEO"
            validation="required"
          />
          <FormKit type="submit" label="Save Blog" />
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
  import BlogSelectCategory from '@/components/admin/BlogSelectCategory.vue';
  import UploadImages from '@/components/admin/UploadImages.vue';
  import UploadImg from '@/components/admin/UploadImg.vue';

  export default {
    data() {
      return {
        editor: ClassicEditor,
        editorData: '',
        editorConfig: {
          // The configuration of the editor.
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
        blog: {},
        metaData: {
          img: '',
        },
        options: [],
        images: [],
        data: {},
        category: {},
        editBlog: {
          category: {},
        },
      };
    },
    mounted() {
      const id = this.$route.params.id;
      console.log('_ID BLOG: ', id)
      if (id) {
        this.fetchBlog(id);
      }
    },
    components: {
      AdminHeader,
      BlogSelectCategory,
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

      async fetchBlog(id) {
        this.loadingSet(true);
        try {
          const res = await FeathersClient.service('blogs').get(id);
          this.blog = res;
          this.category = res.category;
          this.editBlog.category = res.category;
          this.editorData = res.content;
          this.metaData = {
            title: res.metaData.title,
            content: res.metaData.content,
            img: res.metaData.img,
          };
          this.images = res.images;
          this.data = {
            title: res.title,
            ubication: res.ubication,
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
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Submitted!');
        this.updateBlog();
      },
      async updateBlog() {
        try {
          const res = await FeathersClient.service('blogs').patch(
            this.blog._id,
            {
              title: this.data.title,
              content: this.editorData,
              ubication: this.data.ubication,
              category: this.editBlog.category,
              category_id: this.editBlog.category._id,
              metaData: {
                title: this.data.titleMeta,
                content: this.data.contentMeta,
                img: this.metaData.img,
              },
              images: this.images,
            },
          );
          this.$snotify.success('Blog Updated', 'Success', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });

          this.$router.push({ name: 'admin-blogs' });
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
        this.editBlog.category = category;
      },
    },
  };
</script>
