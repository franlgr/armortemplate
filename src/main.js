import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import snotify from 'vue3-snotify';

import 'mapbox-gl/dist/mapbox-gl.css';
import CKEditor from '@ckeditor/ckeditor5-vue';

import { plugin, defaultConfig } from "@formkit/vue";


// import router from '@/router/index.js';
import router from './router';
import store from '@/store';
import 'vue3-snotify/style';
// import './assets/tailwind.css';

import io from 'socket.io-client';


const socket = io('http://localhost:3000', {
    transports: ['websocket'],
    cors: {
      origin: '*',
    },
  });

// Usa el plugin Snotify

//hay que agregar feathers aca para usarlo globalmente

const app = createApp(App);

app.config.globalProperties.$socket = socket;

app.use(router);
app.use(store);
app.use(snotify);
app.use(CKEditor);
app.use(plugin, defaultConfig);

app.mount('#app');
