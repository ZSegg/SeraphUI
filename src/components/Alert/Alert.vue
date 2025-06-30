<template>
  <Transition name="alert-fade">
    <div
      class="sp-alert"
      :class="{
        [`sp-alert--${type}`]: type,
        [`sp-alert--${effect}`]: effect,
      }"
      v-show="visiable"
    >
      <SpIcon
        v-if="props['showIcon']"
        :type="iconType"
        :icon="type !== undefined ? typeIconClass[type] : ''"
        :style="iconStyle"
        class="sp-alert__icon"
      >
        <slot name="icon" />
      </SpIcon>

      <div class="sp-alert__main" ref="mainRef">
        <div class="sp-alert__header">
          <div
            :class="{
              'sp-alert__title': center,
            }"
          >
            <slot name="title">
              <span>{{ title }} </span>
            </slot>
          </div>

          <div class="sp-alert__close" @click="handleClose" v-if="closable">
            <span v-if="props['closeText']">{{ props["closeText"] }}</span>
            <SpIcon v-else icon="fa-solid fa-xmark"> </SpIcon>
          </div>
        </div>
        <div class="sp-alert__content" v-if="description">
          <p :class="{ 'content-center': center }">
            {{ description }}
          </p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, withDefaults } from "vue";
import type { AlertProps, AlertEmits } from "./type";
import Button from "@/components/Button/Button.vue";
import SpButton from "@/components/Button/Button.vue";
import SpIcon from "@/components/Icon/Icon.vue";

defineOptions({
  name: "SpAlert",
});

const emit = defineEmits<AlertEmits>();

const props = withDefaults(defineProps<AlertProps>(), {
  "show-icon": true, // 默认值为 true
  closable: false,
});

const visiable = ref<boolean>(true);

const mainRef = ref<HTMLElement>();

const typeIconClass = {
  primary: "fa-solid fa-circle-notch",
  info: "fa-solid fa-circle-info",
  success: "fa-solid fa-circle-check",
  warning: "fa-solid fa-circle-exclamation",
  danger: "fa-solid fa-ban",
};

const iconType = computed(() => {
  if (props.type === undefined) return undefined;
  return props.type in typeIconClass ? props.type : undefined;
});

const handleClose = () => {
  visiable.value = false;
  emit("close");
};

const iconStyle = ref({
  "font-size": computed(() => {
    if (mainRef.value === undefined) {
      return "";
    } else {
      const height = (mainRef.value.scrollHeight / 3) * 2;
      if (height === undefined) return "";
      return `${height}px`;
    }
  }),
});

// console.log(iconStyle.value);

onMounted(() => {
  // console.log("ne:", iconStyle.value);
});
</script>
<style scoped></style>
