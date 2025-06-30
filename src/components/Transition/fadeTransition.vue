<template>
  <Transition name="fade" :css="trigger && props['cssTrigger']">
    <slot />
  </Transition>
</template>

<script setup lang="ts">
import { TransitionProps } from "./type";

const props = withDefaults(defineProps<TransitionProps>(), {
  trigger: true,
  "css-trigger": true,
  "js-trigger": true,
});

// console.log(props);
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
