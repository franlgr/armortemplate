import path from 'path';
import { defineConfig } from 'vite';
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';
import vue from '@vitejs/plugin-vue';
export default defineConfig({
  plugins: [
    vue(),
    ckeditor5({ theme: require.resolve('@ckeditor/ckeditor5-theme-lark') }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
