<template>
  <div class="loading-overlay">
    <span class="loading loading-spinner loading-lg"></span>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-spinner {
    z-index: 99999;
  /* Estilos para tu spinner, puedes personalizarlos según tus necesidades */
}
</style>
