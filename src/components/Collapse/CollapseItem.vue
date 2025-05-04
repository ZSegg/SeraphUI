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
    <slideTransition>
      <div class="sp-collapse-item__wrapper" v-show="isActive">
        <div class="sp-collapse-item__content" :id="`item-content-${name}`">
          <slot />
        </div>
      </div>
    </slideTransition>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";
import { collapseContextKey } from "./type";
import type { CollapseItemProps } from "./type";

import SpIcon from "@/components/Icon/Icon.vue";
import slideTransition from "@/components/Transition/slideTransition.vue";

defineOptions({
  name: "SpCollapseItem",
});

const props = defineProps<CollapseItemProps>();

const collapseContext = inject(collapseContextKey);

const isActive = computed(() => collapseContext?.activeNames.value.includes(props.name));

const handleCollapse = () => {
  if (props.disabled) return;
  collapseContext?.handleItemClick(props.name);
  // console.log("触发:", isActive.value, collapseContext?.activeNames);
};
</script>
<style scoped></style>
