import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'url';
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      srcDir: './',
      filename: 'sw.js',
      // injectManifest: {
      //   // swSrc: './sw.js',
      //   // swDest: './dist/site.webmanifest.js',
      // },
      registerType: 'autoUpdate',
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
      devOptions: {
        enabled: false,
        type: 'module',
      },
      strategies: 'injectManifest',
      injectRegister: 'auto',
      manifest: true,
      injectManifest: {
        injectionPoint: null,
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
      // { find: '@assets', replacement: fileURLToPath(new URL('./src/shared/assets', import.meta.url)) },
      // { find: '@cmp', replacement: fileURLToPath(new URL('./src/shared/cmp', import.meta.url)) },
      // { find: '@stores', replacement: fileURLToPath(new URL('./src/shared/stores', import.meta.url)) },
      // { find: '@use', replacement: fileURLToPath(new URL('./src/shared/use', import.meta.url)) },
    ],
  },
});
