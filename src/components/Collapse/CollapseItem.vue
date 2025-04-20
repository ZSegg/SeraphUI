<template>
  <div
    class="sp-collapse-item"
    :class="{
      'is-disabled': disabled,
    }"
  >
    <div
      class="sp-collapse-item__header"
      :id="`item-header-${name}`"
      @click="handleCollapse"
      :class="{
        'is-disabled': disabled,
        'is-active': isActive,
      }"
    >
      <slot name="title">
        {{ title }}
      </slot>
      <SpIcon icon="angle-right" class="header-angle" />
    </div>
    <Transition name="slide" v-on="transitionEvents">
      <div class="sp-collapse-item__wrapper" v-if="isActive">
        <div class="sp-collapse-item__content" :id="`item-content-${name}`">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";
import { collapseContextKey } from "./type";
import type { CollapseItemProps } from "./type";

import SpIcon from "@/components/Icon/Icon.vue";

defineOptions({
  name: "SpCollapseItem",
});

const props = defineProps<CollapseItemProps>();

const collapseContext = inject(collapseContextKey);

const isActive = computed(() => collapseContext?.activeNames.value.includes(props.name));
const handleCollapse = () => {
  if (props.disabled) return;
  collapseContext?.handleItemClick(props.name);
};

const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = "0px";
    el.style.overflow = "hidden";
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`;
    // scrollHeight 为 完整内容高度
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
};
</script>
<style scoped></style>
