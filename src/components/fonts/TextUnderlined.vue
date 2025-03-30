<template>
  <p>
    <span>
      <slot></slot>
    </span>
  </p>
</template>

<script setup lang="js">
import { computed } from 'vue'

/**
 * 渐变下划线文本组件
 *
 * 这是一个可定制的文本组件，当鼠标悬停时显示渐变色下划线动画效果。
 * 支持自定义字体颜色、下划线渐变色、过渡时间和行高等属性。
 *
 * @example 基本用法
 * <UnderlineText>普通文本</UnderlineText>
 *
 * @example 自定义颜色和过渡
 * <UnderlineText
 *   font_color="#333"
 *   :underline_color="['#ff0000', '#00ff00']"
 *   :transitionTime="1.5"
 * >
 *   自定义文本
 * </UnderlineText>
 */
const props = defineProps({
  /**
   * 文本字体颜色
   * @default 'black'
   * @example '#333' | 'red' | 'var(--primary-color)'
   */
  font_color: {
    type: String,
    default: 'black'
  },
  /**
   * 下划线渐变色数组
   * 至少需要两个颜色值，支持多个颜色渐变
   * @default ['red','blue']
   * @example ['red', 'blue'] | ['#ff0000', '#00ff00', '#0000ff']
   */
  underline_color: {
    type: Array,
    default: ['red', 'blue']
  },
  /**
   * 下划线展开的过渡时间（秒）
   * @default 2
   * @example 0.5 | 1 | 2.5
   */
  transitionTime: {
    type: Number,
    default: 2
  },
  /**
   * 文本行高（无单位，基于字体大小）
   * @default 2
   * @example 1.5 | 2 | 3
   */
  line_height: {
    type: Number,
    default: 2
  }
})

/**
 * 计算属性：生成线性渐变的CSS值
 * @returns {string} linear-gradient CSS字符串
 * @private
 */
const linearGradient = computed(() => {
  return `linear-gradient(to right, ${props.underline_color.join(', ')})`
})
</script>

<style scoped>
p {
  line-height: v-bind(line_height);
}
span {
  color: v-bind(font_color);
  background: v-bind(linearGradient);
  background-size: 0% 1px;
  background-repeat: no-repeat;
  background-position: right bottom;
  transition: background-size v-bind('transitionTime + "s"');
}

span:hover {
  background-size: 100% 1px;
  background-position: left bottom;
}
</style>
