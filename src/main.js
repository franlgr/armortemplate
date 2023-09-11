import { createApp } from 'vue';
import App from './App.vue';
import './style.css';


// import router from '@/router/index.js';
import router from './router';
import store from '@/store';

// import './assets/tailwind.css';
createApp(App).use(router).use(store).mount('#app');
