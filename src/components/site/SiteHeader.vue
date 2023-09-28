<template>
  <div></div>
</template>

<script>
  export default {
    data() {
      return {
        mobileMenuVisible: false,
      };
    },
    methods: {
      toggleMobileMenu() {
        this.mobileMenuVisible = !this.mobileMenuVisible;
      },
    },
  };
</script>
