<template>
  <button
    ref="_ref"
    class="sp-button"
    :class="{
      [`sp-button--${type}`]: type,
      [`sp-button--${size}`]: size,
      [`sp-button--${shape}`]: shape,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <SpIcon icon="spinner" spin v-if="loading" />
    <SpIcon :icon="icon" v-if="icon" />
    <span><slot /></span>
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { ButtonProps } from "./type";
import SpIcon from "@/components/Icon/Icon.vue";

defineOptions({
  name: "SpButton",
});

// 修改为这种声明方式
const {
  type,
  size,
  shape,
  plain,
  round,
  circle,
  disabled,
  autofocus,
  nativeType = "button",
} = defineProps<ButtonProps>();

const _ref = ref<HTMLButtonElement>();

defineExpose({
  ref: _ref,
});
</script>

<style>
.sp-button {
  background-color: var(--main-bg-color);
}
</style>
