// InstallPrompt.vue
<template>
  <button @click="install">Instalar</button>
</template>

<script>
export default {
  methods: {
    install() {
      // Llamar a la función prompt() del evento para mostrar el mensaje de instalación
      this.$props.promptEvent.prompt();
    },
  },
  props: ['promptEvent'],
};
</script>
