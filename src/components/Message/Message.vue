<template>
  <Transition :name="transitionName" @enter="setHeight" @after-leave="destroyComponent">
    <div
      ref="messageRef"
      class="sp-message"
      v-show="visiable"
      :style="messageStyle"
      :class="{
        [`sp-message--${type}`]: type,
        'is-close': showClose,
      }"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="sp-message__content">
        <slot><RenderVnode :v-node="message" v-if="message" /></slot>
      </div>
      <div class="sp-message__close" v-if="showClose">
        <SpIcon icon="xmark" @click.stop="close" />
        <!-- 这里 .stop 是防止事件冒泡到父组件 -->
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed, nextTick } from "vue";
import type { MessageProps } from "./type";

import SpIcon from "../Icon/Icon.vue";
import RenderVnode from "../common/RenderVnode";
import useEventListener from "@/hooks/useEventListener";
import fadeTransition from "../Transition/fadeTransition.vue";

import { getLastInstance, getLastBottomOffset } from "./method";

const visiable = ref<boolean>(false);
const messageRef = ref<HTMLElement | null>(null);

const height = ref(0);
const lastOffset = computed(() => getLastBottomOffset(props.id));
const topOffset = computed(() => {
  let result = props.offset + lastOffset.value;
  return result;
});
const bottomOffset = computed(() => {
  let result = topOffset.value + height.value;
  return result;
});

const props = withDefaults(defineProps<MessageProps>(), {
  duration: 3000, // 3000ms = 3s
  type: "info",
  offset: 10,
  transitionName: "fade-up",
});

const messageStyle = computed(() => {
  return { top: `${topOffset.value}px`, "z-index": props.zIndex };
});

defineOptions({
  name: "SpMessgae",
});

const close = () => (visiable.value = false);

const keydown = (e: Event) => {
  const event = e as KeyboardEvent;
  if (event.code === "Escape") visiable.value = false;
};

useEventListener(document, "keydown", keydown);

let timer: any;

function startTimer() {
  if (props.duration === 0) return;
  timer = setTimeout(() => {
    close();
  }, props.duration);
}

function clearTimer() {
  clearTimeout(timer);
}

async function setHeight() {
  await nextTick();
  height.value = messageRef.value!.getBoundingClientRect().height; // 获取高度
}

function destroyComponent() {
  props.onDestory();
}

onMounted(async () => {
  visiable.value = true;
  startTimer();
});

// watch(visiable, (newValue) => {
//   if (!newValue) {
//     props.onDestory();
//   }
// });

defineExpose({
  visiable,
  bottomOffset,
  destroyComponent,
});
</script>
<style scoped></style>
