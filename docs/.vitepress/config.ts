import { defineConfig } from 'vitepress'
import path from 'path'
import {
  containerPreview,
  componentPreview,
} from '@vitepress-demo-preview/plugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'SERAPHUI',
  description: '一个模仿Element-plus的组件库',

  srcDir: 'components',
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../../src'), // 根据实际路径调整
      },
    },
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'Basic 基础组件',
        items: [
          { text: 'Alert 提示', link: '/guide/alert' },
          { text: 'Button 按钮', link: '/guide/button' },
          { text: 'Collapse 折叠栏', link: '/guide/collapse' },
          { text: 'Dropdown 下拉菜单', link: '/guide/dropdown' },
          { text: 'Form 表单', link: '/guide/form' },
          { text: 'Icon 图标', link: '/guide/icon' },
          { text: 'Input 输入框', link: '/guide/input' },
          { text: 'Message 消息', link: '/guide/message' },
          { text: 'Select 选择器', link: '/guide/select' },
          { text: 'Switch 开关', link: '/guide/switch' },
          { text: 'Tooltip 文字提示', link: '/guide/tooltip' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
})
