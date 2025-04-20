<template>
  <p>
    <span>
      <slot></slot>
    </span>
  </p>
</template>

<script setup lang="js">
import { computed } from 'vue'
import TextUnderlinedType from './type.ts'

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
 *   fontColor="#333"
 *   :underlineColor="['#ff0000', '#00ff00']"
 *   :transitionTime="1.5"
 * >
 *   自定义文本
 * </UnderlineText>
 */
const props = defineProps<TextUnderlinedType>()

/**
 * 计算属性：生成线性渐变的CSS值
 * @returns {string} linear-gradient CSS字符串
 * @private
 */
const linearGradient = computed(() => {
  return `linear-gradient(to right, ${props.underlineColor.join(', ')})`
})
</script>

<style scoped>
p {
  line-height: v-bind(lineHeight);
}
span {
  color: v-bind(fontColor);
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
