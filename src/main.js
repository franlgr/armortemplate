import { createApp } from 'vue';
import App from './App.vue';
import './style.css';
import snotify from 'vue3-snotify';
import 'vue3-snotify/style';
import CKEditor from '@ckeditor/ckeditor5-vue';

// import router from '@/router/index.js';
import router from './router';
import store from '@/store';

// import './assets/tailwind.css';

// Usa el plugin Snotify

const app = createApp(App);

app.use(router);
app.use(store);
app.use(snotify);
app.use(CKEditor);

app.mount('#app');
