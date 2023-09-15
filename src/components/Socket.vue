<template>
  <div>
    <h1>Socket.IO Integration in Vue 3</h1>
    <button @click="sendMessage">Send Message</button>
    <ul>
      <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
    </ul>
  </div>
</template>

<script>

export default {
  mounted() {
    // alert('Socket.vue mounted');

    this.$socket.on('message', () => {
      console.log('hola hola hola');
    });


    // Aquí puedes escuchar y emitir eventos Socket.io según tus necesidades
  },
};
</script>
