<template>
  <div>

    <header>
      <!-- Coloca aquí tu encabezado común a todas las páginas -->
    </header>

    <main>
      <Loading v-if="isLoading" />
      <router-view></router-view>
      <!-- router-view es donde se renderizarán las páginas específicas -->
    </main>

    <footer class="bg-gray-800 text-white p-4">
      <div class="container mx-auto">
        <div class="flex justify-between items-center">
          <div>
            <p>&copy; 2023 Mi Sitio Web</p>
          </div>
          <div>
            <a href="#">Política de Privacidad</a>
            <a href="#">Términos y Condiciones</a>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Loading from '@/components/Loading.vue';
export default {
  name: 'DefaultLayout',
  components: {
    Loading
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'isLoading', 'getUser']), // Map Vuex getters to computed properties

  },
}
</script>
