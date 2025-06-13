import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';


export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  server: {
    allowedHosts: [
      'd2817a60daabc15c6f7aaedbd5069736.serveo.net', // сюда записать адрес из https://serveo.net/
      'localhost',
    ],
  },
});
