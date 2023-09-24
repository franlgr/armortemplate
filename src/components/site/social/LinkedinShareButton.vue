<template>
  <div
    target="_blank"
    @click="shareOnLinkedIn"
    class="fb-xfbml-parse-ignore cursor-pointer hover:text-blue-500"
  >
    <i class="fab fa-linkedin text-5xl ml-4" style="color: #0a66c2"></i>
    <!-- <span class="text-sm pl-2 pb-2 p-0">Compartir</span> -->
  </div>
</template>

<script>
  export default {
    methods: {
      shareOnLinkedIn() {
        // Obtiene la URL actual de la página
        const currentURL = window.location.href;

        // Abre una nueva ventana emergente para compartir en LinkedIn
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            currentURL,
          )}`,
          'Compartir en LinkedIn',
          'width=600,height=400',
        );
      },
    },
  };
</script>
