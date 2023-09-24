<template>
  <div>
    <button @click="compartirEnTwitter">Compartir en Twitter</button>
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
