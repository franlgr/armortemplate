<template>
    <div>
      <div style="background: hsl(153, 12%, 17%); opacity: 0.8;" class="text-white p-2">
        <div class="flex items-center justify-center">
          <!-- Logotipo de Bitcoin (BTC) -->
          <img src="https://www.logolynx.com/images/logolynx/2f/2f2bf77a908dc0a450711736d24ca407.png" alt="Logo Bitcoin" class="w-5 m-2">
          <!-- Precio de Bitcoin (BTC) -->
          <h2 class="mb-0">1.00 BTC = </h2>
          <!-- Logotipo de Tether (USDT) -->
          <img src="https://cryptologos.cc/logos/tether-usdt-logo.png" alt="Logo Tether" class="w-5 m-2">
          <!-- Precio de Tether (USDT) -->
          <h2 class="mb-0">USDT ${{ precioBTCUSDT }}</h2>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        precioBTCUSDT: null,
      };
    },
    mounted() {
      this.obtenerPrecioBTCUSDT();
  
      // Actualizar el precio cada segundo
      setInterval(() => {
        this.obtenerPrecioBTCUSDT();
      }, 1500); // Cambié 10000 a 1000 para que se actualice cada segundo
    },
    methods: {
      obtenerPrecioBTCUSDT() {
        // Realizar una solicitud a la API de Binance
        axios
          .get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT')
          .then((response) => {
            this.precioBTCUSDT = response.data.price;
            console.log('BTC/USDT: ', this.precioBTCUSDT);
          })
          .catch((error) => {
            console.error('Error al obtener el precio de BTC/USDT', error);
          });
      },
    },
  };
  </script>
  