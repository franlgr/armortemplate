<!-- Modelo para crear una vista nueva dentro de admin -->
<template>
  <div>
    <div>
      <AdminHeader title="Profile" icon="fa-solid fa-user"></AdminHeader>
      <!-- {{getUser}} -->
      <div class="mt-6">
        <router-link
          v-if="!edit"
          to="/admin/"
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

      <div class="2xl:container md:w-1/2 m-auto px-8">
        <div class=" ">
          <div>
            <div class="mb-4 mt-4">
              <img
                v-if="edit"
                :src="formData.image"
                alt=""
                class="w-64 h-64 m-auto rounded-full object-cover"
              />
            </div>

            <div class="text-center mt-12" v-if="!edit">
              <!-- img redounde full -->
              <img
                alt="..."
                :src="formData.image"
                class="shadow-md rounded-full max-w-full mx-auto"
                style="max-width: 120px"
              />
              <h3
                class="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2"
              >
                {{ getUser.name + ' ' + getUser.lastname }}
              </h3>
              <div
                class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase"
              >
                <i
                  class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"
                ></i>
                {{ getUser.city }}
              </div>
              <div
                class="mb-2 text-blueGray-600"
                v-for="permission in getUser.permissions"
                :key="permission.index"
              >
                <i class="fa-solid fa-key mr-2 text-lg text-blueGray-400"></i
                >{{ permission }}
              </div>
              <p class="text-sm p-1">{{ getUser.telephone }}</p>
              <p class="text-sm p-1">{{ getUser.address }}</p>
              <p class="text-sm p-1">{{ getUser.city }}</p>
              <p class="text-sm p-1">{{ getUser.country }}</p>
              <p class="mb-4" v-html="getUser.content"></p>
              <button
                class="bg-red-500 hover:bg-red-700 text-white font-bold px-4 py-3 mt-2 rounded"
                @click="edit = !edit"
                v-if="!edit"
              >
                Cancel
              </button>
              <button
                class="bg-blue-500 ml-2 hover:bg-blue-700 text-white font-bold px-4 py-3 mt-2 rounded"
                @click="edit = !edit"
              >
                Edit Profile
              </button>
            </div>

            <div v-if="edit">
              <UploadImg
                class=""
                title="Upload Image"
                v-on:link="link"
              ></UploadImg>
              <FormKit
                type="form"
                id="registration-example"
                :form-class="submitted ? 'hide' : 'show'"
                submit-label="Register"
                @submit="submitHandler"
                :actions="false"
                #default="{ value }"
                v-model="formData"
              >
                <h1>Profile</h1>
                <p>
                  You can put any type of element inside a form, not just
                  FormKit inputs (although only FormKit inputs are included with
                  the submission).
                </p>

                <hr />

                <FormKit
                  type="text"
                  name="name"
                  label="Your name"
                  placeholder="Jane"
                  help="What is your name?"
                  validation="required"
                />
                <FormKit
                  type="text"
                  name="lastname"
                  label="Your Last Name"
                  placeholder="Doe"
                  help="What is your first name?"
                  validation="required"
                />
                <FormKit
                  type="text"
                  name="email"
                  label="Your email"
                  placeholder="jane@example.com"
                  help="What email should we use?"
                  validation="required|email"
                />
                <FormKit
                  type="number"
                  name="telephone"
                  label="Your Telephone"
                  placeholder="+54 3548 639432"
                  help="What is your Telephone?"
                  validation="required|number"
                />
                <FormKit
                  type="text"
                  name="address"
                  label="Your Address"
                  placeholder="Av. Libertador 1421"
                  help="What is address?"
                  validation="required"
                />
                <FormKit
                  type="text"
                  name="city"
                  label="Your City"
                  placeholder="Las Vegas, EEUU"
                  help="What is your City?"
                  validation="required"
                />
                <label for="description"
                  >Describe something about yourself</label
                >
                <!-- <ckeditor
                  id="ckeditor"
                  class="my-4"
                  v-model="formData.content"
                  :placeholder="editorData"
                  label="description"
                  :editor="editor"
                  :config="editorConfig"
                ></ckeditor> -->

                <!-- <div class="double">
          <FormKit
            type="password"
            name="password"
            label="Password"
            validation="required|length:6|matches:/[^a-zA-Z]/"
            :validation-messages="{
              matches: 'Please include at least one symbol',
            }"
            placeholder="Your password"
            help="Choose a password"
          />
          <FormKit
            type="password"
            name="password_confirm"
            label="Confirm password"
            placeholder="Confirm password"
            validation="required|confirm"
            help="Confirm your password"
          />
        </div> -->

                <FormKit type="submit" label="Save" style="margin-top: 10px" />
                <!-- <pre wrap>{{ value }}</pre> -->
              </FormKit>
            </div>
          </div>
          <!-- <div v-if="submitted">
                        <h2>Submission successful!</h2>
                    </div> -->
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import BreadCrumbs from '@/components/admin/Breadcrumbs.vue';
  import AdminHeader from '@/components/admin/AdminHeader.vue';
  import FeathersClient from '@/FeathersClient';
  import UploadImg from '@/components/admin/UploadImg.vue';
  // import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
  export default {
    data: () => ({
      submitted: false,
      formData: {},
      edit: false,
      // editor: ClassicEditor,
      editorData: '<p>Enter event details here...</p>',
      editorConfig: {
        height: '500px !important',
        // The configuration of the editor.
        // height: 800,
      },
    }),
    mounted() {
      this.formData = this.getUser;
    },
    components: {
      BreadCrumbs,
      AdminHeader,
      UploadImg,
    },
    methods: {
      ...mapActions(['setUser', 'loadingSet']),
      async submitHandler() {
        // Simulate an AJAX request (replace with actual AJAX call)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.loadingSet(true);
        // Send the form data to the server

        FeathersClient.service('users')
          .patch(this.getUser._id, this.formData)
          .then((res) => {
            console.log(res);

            this.$snotify.success('Profile Save', 'Save', {
              timeout: 2000,
              showProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
            });
            this.loadingSet(false);
            this.setUser(res);
            this.edit = false;
            this.$router.push({ name: 'admin-profile' });
          })
          .catch((error) => {
            console.log(error);
            this.loadingSet(false);
            this.$snotify.error(error, 'Error', {
              timeout: 2000,
              showProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
            });
          });

        this.submitted = true;
      },
      link(url) {
        console.log(url);
        this.formData.image = url;
      },
    },
    computed: {
      ...mapGetters(['getUser']),
    },
  };
</script>

<style>
  @import '@formkit/themes/genesis';
</style>
