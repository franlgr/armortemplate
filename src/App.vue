<template>
    <div data-theme="retro">

    <Loading v-if="isLoading" />

            <router-view  />
            
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Loading from '@/components/Loading.vue';

export default {
  layout: 'default',
  components: {
    Loading,
  },
  created() {
    // Check for and authenticate with the stored token
    this.authenticateWithStoredToken();

  },
  methods: {
    ...mapActions(['authenticateWithStoredToken']),

  },
  computed: {
    ...mapGetters(['isAuthenticated', 'isLoading']),
  },
};
</script>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
