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



// Importa el socket desde el archivo socket.js
import socket from './plugins/socket.js';

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
