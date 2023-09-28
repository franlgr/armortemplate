<template>
  <div>
    <div
      target="_blank"
      @click="compartirEnTwitter"
      class="fb-xfbml-parse-ignore cursor-pointer hover:text-blue-500"
    >
      <i class="fab fa-twitter text-5xl ml-4" style="color: #1d9bf0"></i>
      <!-- <span class="text-sm pl-2 pb-2 p-0">Compartir</span> -->
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      compartirEnTwitter() {
        // Obtener la URL actual del router
        const url = window.location.href; // Esto obtiene la URL completa actual

        // Texto del tweet
        const texto = '¡Mira este producto en Armor!';

        // Generar el enlace de compartir en Twitter
        const tweetUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          url,
        )}&text=${encodeURIComponent(texto)}`;

        // Abrir una nueva ventana con el enlace de compartir
        window.open(tweetUrl, '_blank', 'width=550,height=420');
      },
    },
  };
</script>
