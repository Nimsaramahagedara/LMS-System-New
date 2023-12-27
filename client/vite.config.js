// /project/client/vite.config.js
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['mongoose'],
    },
  },
  plugins: [react()],
});
