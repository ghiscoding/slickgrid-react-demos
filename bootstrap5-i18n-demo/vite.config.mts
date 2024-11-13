import dns from 'node:dns';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

dns.setDefaultResultOrder('verbatim');

export default defineConfig(() => {
  return {
    base: './',
    build: {
      chunkSizeWarningLimit: 3000,
      emptyOutDir: true,
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          quietDeps: true
        },
      },
    },
    plugins: [react()],
    preview: {
      port: 8080
    },
    server: {
      port: 8080,
      cors: true,
      host: 'localhost',
      hmr: {
        clientPort: 8080,
      },
      watch: {
        followSymlinks: false,
      }
    },
  };
});
