import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/svc': {
        target: 'http://localhost:8080', // Backend adresi
        changeOrigin: true, // Origin'i backend'e göre değiştir
        secure: false, // HTTPS için güvenlik kontrolünü devre dışı bırak
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // ✅ "@" alias'ı tanımlandı
    },
  },
});
