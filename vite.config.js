import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Puerto fijo: la API central lo tiene registrado como dominio del panel de la empresa demo.
  server: { port: 5174 },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
      },
    },
  },
});