<template>
  <div
    class="sp-input"
    :class="{
      [`sp-input--${typeValue}`]: typeValue,
      [`sp-input--${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
      'is-focus': isFocus,
    }"
  >
    <!-- input -->
    <template v-if="typeValue !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="sp-input__prepend">
        <slot name="prepend" />
      </div>
      <div class="sp-input__wrapper">
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="sp-input__prefix">
          <slot name="prefix" />
        </span>
        <input
          class="sp-input__inner"
          ref="inputRef"
          v-model="innerValue"
          v-bind="attrs"
          :type="typeValue"
          :disabled="disabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <!-- suffix slot -->
        <span
          v-if="$slots.suffix || showClear || showPasswordArea"
          class="sp-input__suffix"
          @click="keepFocus"
        >
          <slot name="suffix" />
          <SpIcon
            v-if="showClear"
            @click="clearInput"
            @mousedown.prevent
            icon="circle-xmark"
            class="sp-input__clear"
          />
          <SpIcon
            v-if="showPasswordArea"
            @click.prevent="togglePasswordVisible"
            :icon="passwordVisble ? 'eye' : 'eye-slash'"
            class="sp-input__password"
          />
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="sp-input__append">
        <slot name="append" />
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea
        v-model="innerValue"
        v-bind="attrs"
        ref="inputRef"
        class="sp-textarea__wrapper"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </template>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, nextTick, useAttrs, watch, inject } from "vue";
import type { InputProps, InputEmits, InputInstance } from "./type";
import SpIcon from "@/components/Icon/Icon.vue";
import { formItemContextKey } from "@/components/Form/type";

defineOptions({
  name: "spInput",
  inheritAttrs: false,
});

const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
  autocomplete: "off",
});
const attrs = useAttrs();
const emits = defineEmits<InputEmits>();
const innerValue = defineModel<string>();
const isFocus = ref(false);
const passwordVisble = ref(false);
const inputRef = ref<HTMLInputElement>();

const formItemContext = inject(formItemContextKey);

const runValidate = (trigger: string) => {
  formItemContext?.validate(trigger).catch((error) => {
    console.error("validate error in input", error);
  });
};

const typeValue = computed(() => {
  if (props.showPassword) {
    return passwordVisble.value ? "text" : "password";
  } else {
    return props.type;
  }
});

const showClear = computed(() => {
  return props.clearable && !props.disabled && isFocus.value && !!innerValue.value;
});

const showPasswordArea = computed(() => {
  return props.showPassword && !props.disabled && !!innerValue.value;
});

// console.log(showPasswordArea.value);

const keepFocus = async () => {
  await nextTick();
  inputRef.value?.focus();
};

const handleInput = async () => {
  await nextTick();
  emits("input", innerValue.value as string);
  runValidate("input");
};

const handleChange = async () => {
  await nextTick();
  emits("change", innerValue.value as string);
  runValidate("change");
};

const handleFocus = (event: FocusEvent) => {
  isFocus.value = true;
  emits("focus", event);
  runValidate("focus");
};

const handleBlur = (event: FocusEvent) => {
  isFocus.value = false;
  emits("blur", event);
  runValidate("blur");
};

const clearInput = () => {
  innerValue.value = "";
  // console.log(innerValue.value);
  emits("clear");
  emits("change", "");
  emits("input", "");
};

const togglePasswordVisible = () => {
  passwordVisble.value = !passwordVisble.value;
};

watch(innerValue, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    emits("input", newValue ?? "");
    runValidate("input");
  }
});

watch([innerValue, isFocus], (newValue, oldValue) => {
  if (!newValue[1] && newValue[0] !== oldValue[0]) {
    emits("change", newValue[0] ?? "");
    runValidate("change");
  }
});

defineExpose({
  ref: inputRef,
});
</script>
