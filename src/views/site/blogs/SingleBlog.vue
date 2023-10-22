<template>
  <div>
    <div class="mx-auto">
      <!-- header -->
      <!-- header ends here -->

      <!-- {{ blog }} -->
      <div class="flex flex-col">
        <div class="flex flex-col justify-center">
          <div class="relative">
            <div
              class="bg-gradient-to-b from-green-700 to-green-500 h-80 sm:h-85 background-container parallax"
            >
              <!-- Aquí está el fondo de degradado -->
              <img
                class="h-64 w-64 m-auto pt-8"
                src="@/assets/AuthLogo.svg"
                alt="Logo"
              />
            </div>
            <div
              class="absolute sm:bottom-8 bottom-4 pr-10 sm:pr-0 left-4 sm:left-8 flex justify-start items-start"
            >
              <p
                class="text-3xl sm:text-4xl font-semibold leading-9 text-white"
              >
                Blog
              </p>
            </div>
          </div>
        </div>
      </div>
      <main class="mt-10 max-w-screen-lg m-auto">
        <div class="mb-4 md:mb-0 w-full mx-auto relative">
          <div class="px-4 lg:px-0">
            <h2 class="text-4xl font-semibold text-gray-800 leading-tight">
              {{ blog.title }}
            </h2>
            <a
              v-if="blog.category"
              href="#"
              class="py-2 text-green-700 inline-flex items-center justify-center mb-2"
            >
              {{ blog.category.title }}
            </a>
          </div>

          <img
            class="w-full object-cover lg:rounded"
            :src="blog.image[0]"
            v-if="blog.image"
            style="height: 28em"
          />
        </div>

        <div class="flex flex-col lg:flex-row lg:space-x-12">
          <div
            class="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4"
          >
            <p class="pb-6" v-html="blog.content"></p>
          </div>
          <!-- {{ blog }} -->
          <div class="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
            <div
              class="p-4 border-t border-b md:border md:rounded"
              v-if="blog.user"
            >
              <div class="flex py-2">
                <img
                  :src="blog.user.image"
                  class="h-10 w-10 rounded-full mr-2 object-cover"
                />
                <div>
                  <p class="font-semibold text-gray-700 text-sm">
                    {{ blog.user.name }} {{ blog.user.lastname }}
                  </p>
                  <p class="font-semibold text-gray-600 text-xs">
                    <span v-for="perm in blog.user.permissions">{{
                      perm
                    }}</span>
                  </p>
                </div>
              </div>
              <p class="text-gray-700 py-3" v-html="blog.user.content"></p>
              <button
                class="px-2 py-1 text-gray-100 bg-green-700 flex w-full items-center justify-center rounded"
              >
                Follow
                <i class="bx bx-user-plus ml-2"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="flex border-b-2 border-gray-400 py-12">
          <div class="flex pb-4">
            <FacebookShareButton></FacebookShareButton>
            <TwitterShareButton></TwitterShareButton>
            <LinkedinShareButton></LinkedinShareButton>
            <WhatsappShareButton></WhatsappShareButton>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
  import FeathersClient from '@/FeathersClient';
  import FacebookShareButton from '@/components/site/social/FacebookShareButton.vue';
  import TwitterShareButton from '@/components/site/social/TwitterShareButton.vue';
  import LinkedinShareButton from '@/components/site/social/LinkedinShareButton.vue';
  import WhatsappShareButton from '@/components/site/social/WhatsappShareButton.vue';
  import PriceBtc from '../../../components/PriceBtc.vue';

  export default {
    data() {
      return {
        blog: {},
      };
    },
    methods: {
      async getBlog() {
        const data = await FeathersClient.service('blogs').get(
          this.$route.params.id,
        );
        this.blog = data;
      },
    },
    mounted() {
      this.getBlog();
    },
    components: {
      FacebookShareButton,
      TwitterShareButton,
      LinkedinShareButton,
      WhatsappShareButton,
      PriceBtc
    },
  };
</script>
