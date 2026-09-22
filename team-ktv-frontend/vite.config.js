import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import { fileURLToPath, URL } from 'node:url';

// Vite config for the Inertia + Vue 3 frontend.
// Quasar is used as a component library (plugin), not via the Quasar CLI.
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    quasar({
      sassVariables: 'src/css/quasar.variables.scss',
    }),
  ],
  resolve: {
    alias: {
      src: fileURLToPath(new URL('./src', import.meta.url)),
      layouts: fileURLToPath(new URL('./src/layouts', import.meta.url)),
      pages: fileURLToPath(new URL('./src/pages', import.meta.url)),
      components: fileURLToPath(new URL('./src/components', import.meta.url)),
      assets: fileURLToPath(new URL('./src/assets', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    // Allow the Express server (different origin) to load HMR assets.
    cors: true,
    origin: 'http://localhost:5173',
  },
  build: {
    manifest: true,
    outDir: 'dist',
    rollupOptions: {
      input: 'src/main.js',
    },
  },
});
