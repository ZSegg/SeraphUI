<template>
  <Transition
    name="slide"
    v-on="transitionEvents"
    :css="props.trigger && props['cssTrigger']"
  >
    <slot />
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { TransitionProps } from "./type";

const props = withDefaults(defineProps<TransitionProps>(), {
  trigger: true,
  "css-trigger": true,
  "js-trigger": true,
});

// console.log(props.trigger && props["cssTrigger"]);

const transitionEvents = ref<Record<string, (el: HTMLElement) => void>>({});

watch(
  () => [props.trigger, props["jsTrigger"]],
  () => {
    // console.log("trigger", props.trigger, props["jsTrigger"]);
    transitionEvents.value =
      props.trigger && props["jsTrigger"]
        ? {
            beforeEnter(el) {
              el.style.height = "0px";
              el.style.overflow = "hidden";
            },
            enter(el) {
              el.style.height = `${el.scrollHeight}px`;
            },
            afterEnter(el) {
              el.style.height = "";
              el.style.overflow = "";
            },
            beforeLeave(el) {
              el.style.height = `${el.scrollHeight}px`;
              el.style.overflow = "hidden";
            },
            leave(el) {
              el.style.height = "0px";
            },
            afterLeave(el) {
              el.style.height = "";
              el.style.overflow = "";
            },
          }
        : {};
  },
  { immediate: true } // 初始化立即执行
);

// console.log("transitionEvents:", transitionEvents.value);
// console.log("props:", props);
</script>
<style>
/* 为被过渡的元素设置初始样式 */
.slide-move,
.slide-enter-active,
.slide-leave-active {
  transition: height 1s ease-in-out;
  overflow: hidden;
}

.slide-transition-enter-from,
.slide-transition-leave-to {
}

.slide-transition-enter-to,
.slide-transition-leave-from {
}
</style>
