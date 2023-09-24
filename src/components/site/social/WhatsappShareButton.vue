<template>
  <div
    target="_blank"
    @click="shareOnWhatsApp"
    class="fb-xfbml-parse-ignore cursor-pointer hover:text-blue-500"
  >
    <i class="fab fa-whatsapp text-5xl ml-4"></i>
    <!-- <span class="text-sm pl-2 pb-2 p-0">Compartir</span> -->
  </div>
</template>
<script>
  export default {
    methods: {
      shareOnWhatsApp() {
        // Texto que deseas compartir en WhatsApp
        const textToShare = '¡Echa un vistazo a esto en WhatsApp!';

        // URL opcional para compartir (puede ser la URL de tu sitio web)
        const urlToShare = window.location.href;

        // Combina el texto y la URL en un mensaje de WhatsApp
        const whatsappMessage = `${textToShare} ${urlToShare}`;

        // Crea un enlace con el protocolo "whatsapp://" para abrir WhatsApp
        const whatsappLink = `whatsapp://send?text=${encodeURIComponent(
          whatsappMessage,
        )}`;

        // Redirige a WhatsApp para compartir el mensaje
        window.location.href = whatsappLink;
      },
    },
  };
</script>
