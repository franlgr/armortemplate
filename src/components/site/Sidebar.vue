<template>
  <div>
    <div class="">
      <div class="px-8">
      <div v-if="getSettings.siteViews.users">
          <h1 class="mb-4 text-xl font-bold text-gray-700">Last Users</h1>
        <LastUsers ></LastUsers>
      </div>
      </div>
      <ProductsCategories v-if="getSettings.siteViews.product"></ProductsCategories>
      <EventsCategories v-if="getSettings.siteViews.event"></EventsCategories>

      <div class="px-8 mt-10" v-if="getSettings.siteViews.blog">
        <h1 class="mb-4 text-xl font-bold text-gray-700">Blogs Categories</h1>
        <div
          class="flex flex-col max-w-sm px-4 py-6 mx-auto bg-white rounded-lg shadow-md"
        >
          <ul>
            <li>
              <a
                href="#"
                class="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline"
                >- AWS</a
              >
            </li>
            <li class="mt-2">
              <a
                href="#"
                class="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline"
                >- Laravel</a
              >
            </li>
            <li class="mt-2">
              <a
                href="#"
                class="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline"
                >- Vue</a
              >
            </li>
            <li class="mt-2">
              <a
                href="#"
                class="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline"
                >- Design</a
              >
            </li>
            <li class="flex items-center mt-2">
              <a
                href="#"
                class="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline"
                >- Django</a
              >
            </li>
            <li class="flex items-center mt-2">
              <a
                href="#"
                class="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline"
                >- PHP</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import LastUsers from '@/components/site/LastUsers.vue';
  import ProductsCategories from '@/components/site/market/ProductsCategories.vue';
  import EventsCategories from '@/components/site/events/EventsCategories.vue';
  import { mapGetters } from 'vuex';
  export default {
    components: {
      LastUsers,
      ProductsCategories,
      EventsCategories,
    },
    computed: {
      ...mapGetters(['getSettings']),
    },
  };
</script>
