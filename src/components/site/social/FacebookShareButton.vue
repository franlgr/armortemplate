<template>
  <div>
    <div class="">
      <a target="_blank" :href="shareUrl" class="fb-xfbml-parse-ignore">
        <i class="fab fa-facebook text-5xl ml-4"></i>
        <!-- <span class="text-sm pl-2 pb-2 p-0">Compartir</span> -->
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      shareUrl() {
        // Aquí puedes determinar la URL actual de la página
        // y formatearla como lo necesitas para compartir en Facebook
        const currentUrl = window.location.href;
        const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          currentUrl,
        )}&src=sdkpreparse`;
        return facebookShareUrl;
      },
    },
  };
</script>

<style scoped>
  /* Estilos para tu componente */
</style>
