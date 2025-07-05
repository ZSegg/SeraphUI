import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import VueMacros from 'vue-macros/vite'
import VueJSX from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [
    vueDevTools(),
    VueMacros({
      plugins: {
        vue: vue(),
        vueJsx: VueJSX(), // 如有需要
      },
    }),
  ],
  build: {
    outDir: 'dist/umd',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SeraphUI',
      fileName: 'seraphui',
      formats: ['umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
        assetFileNames: (chunkInfo) => {
          if (
            chunkInfo.name === 'seraphui.css' ||
            chunkInfo.name === 'style.css' ||
            chunkInfo.name === 'index.css'
          ) {
            return 'index.css' // 输出为 index.css
          }
          return chunkInfo.name
        },
      },
    },
  },
  publicDir: false,
})
