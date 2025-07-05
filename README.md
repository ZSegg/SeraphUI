# SeraphUI

一个仿造 Element-plus 的 Vue3 组件库

## 项目简介

SeraphUI 是一个基于 Vue 3 和 TypeScript 开发的现代化组件库，参考 Element Plus 的设计理念和 API 风格。该项目旨在为开发者提供一套高质量、易用且可扩展的 Vue 3 组件解决方案。

SeraphUI 采用最新的 Vue 3 Composition API 和 TypeScript 技术栈，支持 Tree Shaking，提供完整的类型定义，确保开发体验的流畅性和代码的可维护性。组件库包含常用的 UI 组件，如按钮、表单、输入框、下拉菜单、消息提示等，满足大部分 Web 应用开发需求。

## 项目技术栈

### 核心技术

- **Vue 3.5+** - 使用最新的 Vue 3 框架和 Composition API
- **TypeScript 5.0+** - 完整的类型支持和类型安全
- **Vite 6.3+** - 现代化的构建工具，支持快速开发和构建

### 组件开发

- **Vue SFC** - 单文件组件，支持 `<script setup>` 语法
- **Vue JSX** - 支持 JSX 语法开发组件
- **Vue Macros** - 增强的 Vue 宏功能

### 样式和图标

- **PostCSS** - CSS 后处理器，支持嵌套和变量
- **FontAwesome** - 丰富的图标库支持
- **CSS 变量** - 主题定制和样式管理

### 测试和文档

- **Vitest** - 单元测试框架
- **Vue Test Utils** - Vue 组件测试工具
- **VitePress** - 文档站点生成器

### 构建和发布

- **ES Module** - 支持 ES 模块导入
- **UMD** - 支持传统浏览器环境
- **Tree Shaking** - 支持按需引入，减小打包体积

## 项目特点

### 🚀 现代化技术栈

- 基于 Vue 3 Composition API，提供更好的性能和开发体验
- 完整的 TypeScript 支持，提供智能提示和类型检查
- 使用 Vite 构建，开发热更新快速，构建效率高

### 🎨 设计一致性

- 参考 Element Plus 的设计规范，保持 UI 风格的一致性
- 支持主题定制，通过 CSS 变量轻松实现品牌化定制
- 响应式设计，适配不同屏幕尺寸

### 📦 组件丰富

- **基础组件**: Button、Icon、Input、Select、Switch
- **反馈组件**: Alert、Message、Tooltip
- **布局组件**: Collapse、Dropdown
- **表单组件**: Form、FormItem
- **过渡动画**: 内置多种过渡效果

### 🔧 开发友好

- 完整的 TypeScript 类型定义
- 详细的组件 API 文档
- 支持按需引入，减小打包体积
- 提供多种构建格式（ES Module、UMD）

### 🧪 质量保证

- 完整的单元测试覆盖
- 使用 Vitest 进行测试，测试运行快速
- 代码规范检查，确保代码质量

### 📚 文档完善

- 使用 VitePress 构建文档站点
- 提供组件使用示例和 API 说明
- 支持在线演示和代码预览

### 🌟 扩展性强

- 模块化设计，易于扩展新组件
- 支持插件化开发
- 提供丰富的自定义选项

## 快速开始

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建组件库
npm run build

# 运行测试
npm run test:unit

# 启动文档站点
npm run docs:dev
```

## 许可证

MIT License
