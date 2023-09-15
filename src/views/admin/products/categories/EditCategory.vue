<!-- Modelo para crear una vista nueva dentro de admin -->
<template>
  <div>
    <div>
      <AdminHeader title="Edit Category"></AdminHeader>

        <div class="my-4">
              <label for="image" class="font-bold p-4">Image</label>
              <UploadImg :ignore="true" class="my-4" v-on:links="links"></UploadImg>
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
          <br>
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
        category: {},
        editor: ClassicEditor,
        editorData: '<p>Content of the editor.</p>',
        editorConfig: {
          // The configuration of the editor.
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
        FeathersClient.service('products-categories')
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

        FeathersClient.service('products-categories')
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
            this.$router.push({ name: 'admin-products-categories' });
            console.log('res', res);
          });

        // After the request is complete, set submitted to true
        // this.submitted = true;
      },
      links(links) {
        this.category.image = links;
        console.log('links', links);
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
