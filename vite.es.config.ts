import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
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
      // 覆盖插件选项
    }),
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.build.json',
      outDir: 'dist/types',
    }),
  ],
  build: {
    outDir: 'dist/es',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SeraphUI',
      fileName: 'seraphui',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'vue',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/vue-fontawesome',
        'async-validator',
        'axios',
      ],
      output: {
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
