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
      'fe52f788f938a04e5e99a0c32ecef1d0.serveo.net', // сюда записать адрес из https://serveo.net/
      'localhost',
    ],
  },
});
