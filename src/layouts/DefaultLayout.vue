<template>
  <div>
    <header>
      <!-- Coloca aquí tu encabezado común a todas las páginas -->
    </header>

    <main>
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
export default {
  name: 'DefaultLayout'
}
</script>
