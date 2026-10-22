import { fileURLToPath, pathToFileURL, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use 'variables' as *;`,
        importers: [{
          findFileUrl(url: string) {
            return new URL(url, pathToFileURL('src/assets/style/'));
          }
        },
        {
          findFileUrl(url: string) {
            const bulmaUtils = 'node_modules/bulma/sass/utilities/';
            return new URL(url, pathToFileURL(bulmaUtils));
          },
        }],
        silenceDeprecations: ['color-functions',
                              'global-builtin',
                              'if-function']
      },
    }
  },
  build: {
    cssMinify: 'esbuild'
  }
})
