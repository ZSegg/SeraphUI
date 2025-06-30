import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueMacros from 'vue-macros/vite'
import VueJSX from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [
    VueMacros({
      plugins: {
        vue: vue(),
        vueJsx: VueJSX(), // 如有需要
      },
      // 覆盖插件选项
    }),
  ],
  css: {
    postcss: {
      plugins: [],
    },
  },
})
