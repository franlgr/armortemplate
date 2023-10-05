<!-- Modelo para crear una vista nueva dentro de admin -->
<template>
  <div>
    <div>
      <AdminHeader
        title="Edit Category Blogs"
        class="mb-8"
        icon="fa-solid fa-blog fa-beat"
      ></AdminHeader>
      <router-link
        to="/admin/blogs/categories"
        class="bg-[#2c7b60] text-white font-bold px-4 py-3 ml-4 rounded mt-24"
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
      <div class="my-4">
        <label for="image" class="font-bold p-4">Image</label>
        <UploadImg :ignore="true" class="my-4" v-on:link="link"></UploadImg>
        <img
          class="px-24 m-auto"
          :src="category.image"
          alt="Avatar Tailwind CSS Component"
        />
      </div>

      <div class="m-4 2xl:container my-4">
        <div class="">
          <FormKit
            type="form"
            id="comprar-example"
            submit-label="Guardar"
            @submit="submitHandler"
            :actions="true"
            #default="{ value }"
            v-model="formData"
          >
            <FormKit
              v-model="category.title"
              class="mt-4"
              type="text"
              name="name"
              label="Title Category"
              placeholder="Category Title"
              help="What is your title Category ?"
              validation="required"
            />
            <ckeditor
              class="my-4"
              :editor="editor"
              v-model="editorData"
              :config="editorConfig"
            ></ckeditor>
            <!-- <FormKit class="mt-4" type="text" name="name" label="Your name" placeholder="Jane"
                          help="What is your name?" validation="required" /> -->

            <FormKit
              v-model="category.slug"
              class="mt-4"
              type="text"
              name="name"
              label="Slug Category"
              placeholder="Slug Category"
              help="Slug Category ?"
              validation="required"
            />
            <!-- <FormKit type="submit" label="Guardar" /> -->
            <!-- <pre wrap>{{ value }}</pre> -->
          </FormKit>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions, mapGetters } from 'vuex';
  // import BreadCrumbs from '@/components/admin/Breadcrumbs.vue';
  import AdminHeader from '@/components/admin/AdminHeader.vue';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  import UploadImg from '@/components/admin/UploadImg.vue';
  import FeathersClient from '@/FeathersClient';

  export default {
    data() {
      return {
        category: {
          image: '',
          title: '',
          slug: '',
        },
        editor: ClassicEditor,
        editorData: '<p>Content of the editor.</p>',
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
            // 'imageUpload',
          ],
        },
      };
    },
    mounted() {
      const id = this.$route.params.id;
      if (id) {
        this.fetchCategory(id);
      }
    },
    methods: {
      fetchCategory(id) {
        FeathersClient.service('blogs-categories')
          .get(id)
          .then((res) => {
            this.category = res;
            this.editorData = res.description;
          });
      },
      async submitHandler() {
        // Simulate an AJAX request (replace with actual AJAX call)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Submitted!');

        FeathersClient.service('blogs-categories')
          .patch(this.category._id, {
            title: this.category.title,
            description: this.editorData,
            image: this.category.image,
            slug: this.category.slug,
          })
          .then((res) => {
            this.$snotify.success('Category Updated', 'Success', {
              timeout: 2000,
              showProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
            });
            this.$router.push({ name: 'admin-blogs-categories' });
            console.log('res', res);
          });

        // After the request is complete, set submitted to true
        // this.submitted = true;
      },
      link(link) {
        this.category.image = link;
        console.log('linkIMG', link);
      },
    },
    components: {
      // BreadCrumbs,
      AdminHeader,
      UploadImg,
    },
  };
</script>
<style></style>
