import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/sv': {
        target: 'http://localhost:8080', // Backend adresi
        changeOrigin: true, // Origin'i backend'e göre değiştir
        secure: false, // HTTPS için güvenlik kontrolünü devre dışı bırak
      },
    },
  },
});
