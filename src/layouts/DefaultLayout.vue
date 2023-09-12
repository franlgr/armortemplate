<template>
  <div>
    <header>
      <!-- Coloca aquí tu encabezado común a todas las páginas -->
    </header>
    
    <main>
      <router-view></router-view>
      <!-- router-view es donde se renderizarán las páginas específicas -->
    </main>
    
    <footer>
      <!-- Coloca aquí tu pie de página común a todas las páginas -->
    </footer>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout'
}
</script>
