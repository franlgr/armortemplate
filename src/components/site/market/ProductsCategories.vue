<template>
  <div class="px-8 mt-10">
    <h1 class="mb-4 text-xl font-bold text-gray-700">Products Categories</h1>
    <div
      class="flex flex-col max-w-sm px-4 py-6 mx-auto bg-white rounded-lg shadow-md"
    >
      <ul>
        <li v-for="category in categories" :key="category.index" class="mt-2">
          <router-link
            :to="`/products?tag=${category._id}`"
            class="mx-1 font-bold text-gray-700 hover:text-gray-600 hover:underline"
            >- {{ category.title }}</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import FeathersClient from '@/FeathersClient';
  export default {
    data() {
      return {
        categories: [],
      };
    },
    async mounted() {
      const categories = await FeathersClient.service(
        'products-categories',
      ).find({
        query: {
          $limit: 20,
        },
      });
      this.categories = categories.data;
    },
  };
</script>
