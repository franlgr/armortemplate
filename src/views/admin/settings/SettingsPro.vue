<template>
  <div>
    <div>
      <AdminHeader title="Settings" icon="fa-solid fa-gear"></AdminHeader>
      <div class="m-4 2xl:container">
        {{ data }}
        <div
          class="bg-gray-100 border-t border-b border-gray-500 text-gray-700 px-4 py-3"
          role="alert"
        >
          <p class="font-bold">Settings</p>
          <p>
            Manage and configure your admin settings here. Make sure to save any
            changes you make for them to take effect.
          </p>
        </div>
        <div class="pb-24">
          <div
            class="p-6 mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 mt-4"
          >
            <div class="space-y-2 w-full">
              <div class="flex items-center justify-between">
                <img
                  :src="data.logo"
                  alt="logo"
                  class="flex-none w-64 rounded-full"
                />
                <UploadImg
                  v-if="isEditing"
                  title="Upload Logo"
                  class="my-4"
                  v-on:link="linkLogo"
                ></UploadImg>
              </div>

              <div v-if="isEditing" class="text-sm font-medium text-black">
                <FormKit
                  v-model="data.title"
                  style="color: black"
                  class="mt-4"
                  type="text"
                  name="name"
                  label="Title"
                  placeholder="Title"
                  help="What is the site title ?"
                  validation="required"
                />
              </div>
              <div v-else class="text-xl font-medium text-black">
                {{ data.title }}
              </div>
              <div v-if="isEditing" class="text-gray-500">
                <FormKit
                  v-model="data.description"
                  style="color: black"
                  class="mt-2"
                  type="textarea"
                  name="name"
                  label="Description"
                  placeholder="Description"
                  help="What is the site description ?"
                  validation="required"
                />
                <!-- <textarea v-model="data.description" class="border" rows="4"></textarea> -->
              </div>
              <div v-else class="text-gray-500">{{ data.description }}</div>
              <div class="text-gray-500">Theme: {{ data.theme }}</div>
              <div
                class="p-6 mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 mt-4"
              >
                <div class="text-gray-500">
                  <p class="float-left mr-4 font-bold w-24 text-black">
                    Products: {{ data.products }}
                  </p>
                  <input
                    v-if="isEditing"
                    type="checkbox"
                    v-model="data.products"
                    class="toggle"
                    id="products-toggle"
                  />
                  <label for="products-toggle"></label>
                </div>
                <div class="text-gray-500">
                  <p class="float-left mr-4 font-bold w-24 text-black">
                    Events: {{ data.events }}
                  </p>
                  <input
                    v-if="isEditing"
                    type="checkbox"
                    v-model="data.events"
                    class="toggle"
                    id="events-toggle"
                  />
                  <label for="events-toggle"></label>
                </div>
                <div class="text-gray-500">
                  <p class="float-left mr-4 font-bold w-24 text-black">
                    Blogs: {{ data.blog }}
                  </p>
                  <input
                    v-if="isEditing"
                    type="checkbox"
                    v-model="data.blog"
                    class="toggle"
                    id="blog-toggle"
                  />
                  <label for="blog-toggle"></label>
                </div>
                <div class="text-gray-500">
                  <p class="float-left mr-4 font-bold w-24 text-black">
                    Users: {{ data.users }}
                  </p>
                  <input
                    v-if="isEditing"
                    type="checkbox"
                    v-model="data.users"
                    class="toggle"
                    id="users-toggle"
                  />
                  <label for="users-toggle"></label>
                </div>
                <div class="text-gray-500">
                  <p class="float-left mr-4 font-bold w-24 text-black">
                    Admin: {{ data.admin }}
                  </p>
                  <input
                    v-if="isEditing"
                    type="checkbox"
                    v-model="data.admin"
                    class="toggle"
                    id="admin-toggle"
                  />
                  <label for="admin-toggle"></label>
                </div>
              </div>
              <!--Mid-->
              <div
                class="p-6 mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 mt-4"
              >
                <div class="text-gray-500">
                  <p class="float-left mr-4 font-bold w-24 text-black">
                    Pricing: {{ data.pricing }}
                  </p>
                  <input
                    v-if="isEditing"
                    type="checkbox"
                    v-model="data.pricing"
                    class="toggle"
                    id="pricing-toggle"
                  />
                  <label for="pricing-toggle"></label>
                </div>
                <div class="text-gray-500">
                  <p class="float-left mr-4 font-bold w-24 text-black">
                    Support: {{ data.support }}
                  </p>
                  <input
                    v-if="isEditing"
                    type="checkbox"
                    v-model="data.support"
                    class="toggle"
                    id="support-toggle"
                  />
                  <label for="support-toggle"></label>
                </div>
                <div class="text-gray-500">
                  <p class="float-left mr-4 font-bold w-24 text-black">
                    Documentation: {{ data.documentation }}
                  </p>
                  <input
                    v-if="isEditing"
                    type="checkbox"
                    v-model="data.documentation"
                    class="toggle"
                    id="documentation-toggle"
                  />
                  <label for="documentation-toggle"></label>
                </div>
              </div>
            </div>
          </div>
          <div
            class="p-6 mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 mt-4"
          >
            <!-- <img src="" alt=""> -->
            <div class="text-gray-500 text-black" style="color: black">
              Plugins:
              <ul class="list-disc list-inside">
                <li v-for="(plugin, index) in data.plugins" :key="index">
                  {{ plugin }}
                </li>
              </ul>
            </div>
          </div>
          <div
            class="p-6 mx-auto bg-white rounded-xl shadow-md items-center space-x-4 mt-4"
          >
            <p class="font-bold py-2">Meta Tags General</p>

            <p v-if="!isEditing">
              <span class="font-bold">Title:</span> {{ data.meta.title }}
            </p>
            <p v-if="!isEditing">
              <span class="font-bold">Description:</span>
              {{ data.meta.description }}
            </p>
            <p v-if="!isEditing"><span class="font-bold">IMG:</span></p>
            <UploadImg
              v-if="isEditing"
              title="Upload Meta Img"
              class="my-4"
              v-on:link="linkImgMeta"
            ></UploadImg>
            <div>
              <img :src="data.meta.img" alt="" />
            </div>
            <FormKit
              v-if="isEditing"
              v-model="data.meta.title"
              style="color: black"
              class="mt-2"
              type="text"
              name="name"
              label="Title"
              placeholder="Title"
              help="What is the site title ?"
              validation="required"
            />

            <FormKit
              v-if="isEditing"
              v-model="data.meta.description"
              style="color: black"
              class="mt-2"
              type="textarea"
              name="name"
              label="Description"
              placeholder="Description"
              help="What is the site description ?"
              validation="required"
            />
          </div>
          <div
            class="p-6 mx-auto bg-white rounded-xl shadow-md items-center space-x-4 mt-4"
          >
            <label for="font" class="block text-gray-700 text-sm font-bold mb-2"
              >Select site font:</label
            >
            <select
              v-model="data.siteViews.fontStyle"
              id="font"
              name="font"
              class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option
                value="Abril Fatface"
                style="font-family: 'Abril Fatface', serif"
              >
                Abril Fatface
              </option>
              <option
                value="Bebas Neue"
                style="font-family: 'Bebas Neue', sans-serif"
              >
                Bebas Neue
              </option>
              <option value="Roboto" style="font-family: 'Roboto', sans-serif">
                Roboto
              </option>
              <option
                value="Russo One"
                style="font-family: 'Russo One', sans-serif"
              >
                Russo One
              </option>
              <option
                value="Young Serif"
                style="font-family: 'Young Serif', serif"
              >
                Young Serif
              </option>
            </select>
            <label for="font" class="block text-gray-700 text-sm font-bold mb-2"
              >Select admin font:</label
            >
            <select
              v-model="data.adminViews.fontStyle"
              id="font"
              name="font"
              class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            >
              <option
                value="Abril Fatface"
                style="font-family: 'Abril Fatface', serif"
              >
                Abril Fatface
              </option>
              <option
                value="Bebas Neue"
                style="font-family: 'Bebas Neue', sans-serif"
              >
                Bebas Neue
              </option>
              <option value="Roboto" style="font-family: 'Roboto', sans-serif">
                Roboto
              </option>
              <option
                value="Russo One"
                style="font-family: 'Russo One', sans-serif"
              >
                Russo One
              </option>
              <option
                value="Young Serif"
                style="font-family: 'Young Serif', serif"
              >
                Young Serif
              </option>
            </select>
            <div>
              <div>
                <!-- Number Input -->
                <div class="flex items-center mt-2">
                  <label
                    for="fontSize"
                    class="block text-gray-700 text-sm font-bold mr-2"
                  >
                    Header Font Size:
                  </label>
                  <input
                    type="number"
                    id="fontSize"
                    name="fontSize"
                    class="w-20 p-2 border border-gray-400 rounded"
                    v-model="data.siteViews.headerFontSize"
                  />
                </div>

                <!-- Language Selector -->
                <div class="flex items-center mt-3">
                  <label
                    for="language"
                    class="block text-gray-700 text-sm font-bold mr-2"
                  >
                    Language:
                  </label>
                  <select
                    id="language"
                    name="language"
                    class="p-2 border border-gray-400 rounded"
                    v-model="data.siteViews.lang"
                  >
                    <option value="EN">EN</option>
                    <option value="ES">ES</option>
                  </select>
                </div>
              </div>
            </div>
            <StylePageEdit
              :colors="colors"
              @color-selected="handleColorSelected"
            />
            <div></div>
            ADMINVIEWS: {{ data.adminViews }}
            <div></div>
            SITEVIEWS: {{ data.siteViews }}
          </div>
          <div class="ml-auto m-4">
            <button
              v-if="!isEditing"
              @click="toggleEdit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Edit Settings
            </button>
            <button
              v-if="isEditing"
              @click="saveSettings"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import StylePageEdit from '../../../components/admin/StylePageEdit.vue';
  import EmojiPicker from '../../../components/EmojiPicker.vue';
  import { mapActions, mapGetters } from 'vuex';
  // import BreadCrumbs from '@/components/admin/Breadcrumbs.vue';
  import AdminHeader from '@/components/admin/AdminHeader.vue';
  import UploadImg from '@/components/admin/UploadImg.vue';
  import FeathersClient from '@/FeathersClient';

  export default {
    //logout
    // name: "AdminDashboard",
    data() {
      return {
        isEditing: false,
        colors: {
          backgroundColor: '',
          menuColor: '',
          menuTextColor: '',
          pageTextColor: '',
          coverSiteColor: '',
        },
        data: {
          title: '',
          description: '',
          logo: '',
          theme: '',
          products: false,
          events: false,
          blog: false,
          users: false,
          admin: false,
          pricing: false,
          support: false,
          documentation: false,
          plugins: [],
          meta: {
            title: '',
            description: '',
            img: '',
          },
          siteViews: {
            coverImg: '',
            colorCoverImg: '',
            backNav: '',
            colorFont: '',
            fontStyle: '',
            headerFontSize: 25,
            lang: 'EN',
          },
          adminViews: {
            backMenu: '',
            colorFont: '',
            fontStyle: '',
          },
        },
      };
    },
    async mounted() {
      // console.log('mounted');

      try {
        this.loadingSet(true);
        const response = await FeathersClient.service('settings').find();
        this.data = response.data[0];
        this.loadingSet(false);
      } catch (error) {
        console.log('error', error);
        this.loadingSet(false);
      }
    },
    components: {
      // BreadCrumbs,
      AdminHeader,
      StylePageEdit,
      EmojiPicker,
      UploadImg,
    },
    methods: {
      ...mapActions(['loadingSet', 'fetchSettings']),
      handleColorSelected(selectedColor) {
        // Actualizar el objeto colors con el color seleccionado
        this.colors = { ...this.colors, ...selectedColor };

        this.data.siteViews.colorCoverImg =
          selectedColor.coverSiteColor ?? this.data.siteViews.colorCoverImg;
        this.data.siteViews.backNav =
          selectedColor.backgroundColor ?? this.data.siteViews.backNav;
        this.data.siteViews.colorFont =
          selectedColor.pageTextColor ?? this.data.siteViews.colorFont;
        this.data.adminViews.backMenu =
          selectedColor.menuColor ?? this.data.adminViews.backMenu;
        this.data.adminViews.colorFont =
          selectedColor.menuTextColor ?? this.data.adminViews.colorFont;
      },
      toggleEdit() {
        this.isEditing = !this.isEditing;
      },
      async saveSettings() {
        // Implement logic to save the settings here
        this.loadingSet(true);
        // this.isEditing = false;
        try {
          const response = await FeathersClient.service('settings').patch(
            this.data._id,
            this.data,
          );
          this.loadingSet(false);
          this.isEditing = false;
          this.fetchSettings();
          this.$snotify.success('Settings Save', 'Success', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });
        } catch (error) {
          console.log('error', error);
          this.loadingSet(false);
          this.isEditing = false;
          this.$snotify.error('Error', 'Error', {
            timeout: 2000,
            showProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
          });
        }
        this.isEditing = false;
      },
      //esta funcion recibe el link de la imagen que se sube al componente UploadImg
      linkLogo(link) {
        console.log('LinkLogo', link);
        this.data.logo = link;
      },
      linkImgMeta(link) {
        console.log('linkImgMeta', link);
        this.data.meta.img = link;
      },
    },
  };
</script>

<style></style>
