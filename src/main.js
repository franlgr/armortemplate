import { createApp } from 'vue';
import App from './App.vue';
import './style.css';

import snotify from 'vue3-snotify';

import 'mapbox-gl/dist/mapbox-gl.css';
// import CKEditor from '@ckeditor/ckeditor5-vue';

import { createThemePlugin } from '@formkit/themes';
import { plugin, defaultConfig } from '@formkit/vue';

// import router from '@/router/index.js';
import router from './router';
import store from '@/store';
import 'vue3-snotify/style';
// import './assets/tailwind.css';

// Importa el socket desde el archivo socket.js
import socket from './plugins/socket.js';

import mapboxgl from 'mapbox-gl';
import MapboxGLWorker from 'mapbox-gl/dist/mapbox-gl-csp-worker?worker';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.workerClass = MapboxGLWorker;

// Usa el plugin Snotify

//hay que agregar feathers aca para usarlo globalmente
import '@/assets/amor-template-custom.css';
const app = createApp(App);

app.config.globalProperties.$socket = socket;

app.use(router);
app.use(store);
app.use(snotify);
// app.use(CKEditor);
// app.use(plugin, {
//   plugins: [
//     createThemePlugin()
//   ]
// }
app.use(plugin, defaultConfig);

app.mount('#app');
