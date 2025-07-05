<template>
  <div
    class="sp-switch"
    :class="{
      [`sp-switch--${size}`]: size,
      'is-disabled': disabled,
      'is-checked': checked,
    }"
    @click="switchValue"
  >
    <input
      id="checkbox"
      ref="input"
      class="sp-switch__input"
      type="checkbox"
      role="switch"
      :name="name"
      :disabled="disabled"
      @keydown.enter="switchValue"
    />
    <div class="sp-switch__core">
      <div class="sp-switch__core-inner">
        <span v-if="activeText || inactiveText" class="sp-switch__core-inner-text">
          {{ checked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="sp-switch__core-action"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import type { SwitchEmits, SwitchProps, SwitchValueType } from "./type";

defineOptions({
  name: "SpSwitch",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false,
});
const emits = defineEmits<SwitchEmits>();

const innerValue = defineModel<SwitchValueType>();
const checked = computed(() => {
  return innerValue.value === props.activeValue;
});

const input = ref<HTMLInputElement>();

const switchValue = () => {
  if (props.disabled) return;
  // 切换开关状态
  const newValue = checked.value ? props.inactiveValue : props.activeValue;
  innerValue.value = newValue;
  emits("change", innerValue.value);
};

watch(checked, (val) => {
  input.value!.checked = val as boolean;
});
</script>
<style scoped>
/* .sp-switch {
  border: 1px solid red;
} */
</style>
