import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueMacros from 'vue-macros/vite'
import postcssNormalize from 'postcss-normalize'

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
        // vueJsx: VueJsx(), // 如有需要
        // vueRouter: VueRouter({ // 如有需要
        //   extensions: ['.vue', '.setup.tsx']
        // })
      },
      // 覆盖插件选项
    }),
  ],
  css: {
    postcss: {
      plugins: [
        postcssNormalize({
          forceImport: true,
          // 其他配置...
        }),
        // 其他 PostCSS 插件...
      ],
    },
  },
})
