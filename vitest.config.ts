/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJSX from '@vitejs/plugin-vue-jsx'
import VueMacros from 'vue-macros/vite'

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
        vueJsx: vueJSX(),
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
