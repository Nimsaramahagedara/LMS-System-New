import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: /^mongoose($|\/)/,
    },
  },
  server: {
    host: '0.0.0.0', // This allows access from outside localhost
    port: 4173, // or any other port you prefer
  },
  plugins: [react()],
});
