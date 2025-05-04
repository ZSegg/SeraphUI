<template>
  <SpTooltip v-bind="props" ref="tooltipRef" @visible-change="visibleChange">
    <slot />

    <template #content>
      <ul class="sp-dropdown__menu" :id="size ? `menu-${size}` : ''" ref="menuRef">
        <template v-for="item in menuOptions" :key="item.key">
          <li v-if="item.divided" role="separator" class="divided-placeholder" />
          <li
            class="sp-dropdown__item"
            :class="{ 'is-disabled': item.disabled, 'is-divided': item.divided }"
            @click="select(item)"
            :id="`dropdown-item-${item.key}`"
          >
            <RenderVnode :vNode="item.label" />
          </li>
        </template>
      </ul>
    </template>
  </SpTooltip>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { omit } from "lodash-es";
import type { Ref } from "vue";
import type { TooltipInstance } from "@/components/Tooltip/type";
import type { DropdownProps, DropdownEmits, DropdownInstance, MenuOption } from "./type";

import SpTooltip from "../Tooltip/Tooltip.vue";
import RenderVnode from "../common/RenderVnode";

const props = withDefaults(defineProps<DropdownProps>(), {
  hideAfterClick: true,
  "transition-animation": "slide",
});
const emits = defineEmits<DropdownEmits>();
const tooltipProps = computed(() => {
  const result = omit(props, ["menuOptions"]);
  // console.log("tooltipProps result:", result); // 检查是否包含 animation
  return result;
});
// console.log("props:", props);
// console.log("tooltipProps:", tooltipProps.value);

const tooltipRef = ref() as Ref<TooltipInstance>;
const menuRef = ref() as Ref<HTMLElement>;

const visibleChange = (visible: boolean) => {
  emits("visible-change", visible);
};

const select = (option: MenuOption) => {
  if (option.disabled) return;
  emits("select", option);
  if (props.hideAfterClick) {
    tooltipRef.value.hide();
  }
};

defineOptions({
  name: "SpDropdown",
});

defineExpose<DropdownInstance>({
  show: () => tooltipRef.value?.show(),
  hide: () => tooltipRef.value?.hide(),
});
</script>
<style>
.sp-tooltip__popper {
  padding: 0 !important;
}
</style>
