<template>
  <div class="text-sm breadcrumbs">
    <ul>
      <li v-for="(crumb, index) in breadcrumbs" :key="index">
        <router-link :to="crumb.path">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-4 h-4 mr-2 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
          {{ crumb.label }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    breadcrumbs() {
      const routeParts = this.$route.path.split('/').filter(part => part !== '');
      let breadcrumbs = [];

      for (let i = 0; i < routeParts.length; i++) {
        const routePath = '/' + routeParts.slice(0, i + 1).join('/');
        const routeLabel = routeParts[i]; // Puedes personalizar las etiquetas según tus necesidades

        breadcrumbs.push({ path: routePath, label: routeLabel });
      }

      return breadcrumbs;
    },
  },
};
</script>
