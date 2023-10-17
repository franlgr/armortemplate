<template>
  <div class="bg-gray-100 flex items-center justify-center">
    <section class="mx-auto px-4 sm:px-6 lg:px-4">
      <article>
        <h2 class="text-2xl font-extrabold text-gray-900 mt-2">Sites</h2>
        <section
          class="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 mb-8"
        >
          <article
            v-for="site in sites"
            :key="sites.index"
            class="bg-white group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200"
          >
            <div class="relative w-full h-80 md:h-64 lg:h-44">
              <img
                :src="site.logo"
                :alt="site.title"
                class="w-full h-full object-center object-cover"
              />
            </div>
            <div class="px-3 py-4">
              <h3 class="text-sm text-gray-500 pb-2">
                <a
                  class="bg-indigo-600 py-1 px-2 text-white hover:text-white rounded-lg"
                  :href="`https://${site.subdomain}.armortemplate.site`"
                >
                  <span class="absolute inset-0"></span>
                  {{ site.subdomain }}.armortemplate.site
                </a>
              </h3>
              <p
                class="text-base font-semibold-light text-gray-900 group-hover:text-indigo-600"
              >
                {{ site.title }}
              </p>
            </div>
          </article>
        </section>
      </article>
    </section>
  </div>
</template>
<script>
  import FeathersClient from '@/FeathersClient';
  export default {
    name: 'Sites',
    data() {
      return {
        sites: [],
      };
    },
    methods: {
      async getSites() {
        const sites = await FeathersClient.service('applications').find({
          query: {
            $limit: 100,
          },
        });
        this.sites = sites.data;
      },
    },
    mounted() {
      this.getSites();
    },
  };
</script>
