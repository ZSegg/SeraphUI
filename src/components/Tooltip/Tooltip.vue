<template>
  <div class="sp-tooltip" ref="poperContainer" v-on="outerEvents">
    <div class="sp-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot />
    </div>

    <component :is="transitionAnimation">
      <div
        class="sp-tooltip__popper"
        v-show="isOpen"
        v-on="popperEvents"
        ref="popperNode"
      >
        <div class="sp-tooltip__popper__content">
          <slot name="content">{{ content }}</slot>
        </div>
        <div id="arrow">
          <div data-popper-arrow></div>
        </div>
      </div>
    </component>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onUnmounted, Fragment } from "vue";
import { createPopper } from "@popperjs/core";
import { debounce } from "lodash-es";

import type { Instance } from "@popperjs/core";
import type { TooltipProps, TooltipEmits, TooltipInstance, AnimationType } from "./type";

import useClickOutside from "@/hooks/useClickOutside";
import slideTransition from "../Transition/slideTransition.vue";
import fadeTransition from "../Transition/fadeTransition.vue";

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: "bottom",
  trigger: "hover",
  openDelay: 0,
  closeDelay: 0,
  "transition-animation": "fade",
});

// console.log("props:", props);
const transitionAnimation = computed(() => {
  return props["transitionAnimation"] === "fade" ? fadeTransition : slideTransition;
});

const options = computed(() => ({
  placement: props.placement,
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 9],
      },
    },
  ],
  ...props.popperOptions,
}));

const emits = defineEmits<TooltipEmits>();

const isOpen = ref<boolean>(false);
const poperContainer = ref<HTMLElement>();
const popperNode = ref<HTMLElement>();
const triggerNode = ref<HTMLElement>();
const popperInstance = ref<null | Instance>(null);

let events: Record<string, any> = {};
let popperEvents: Record<string, any> = {};
let outerEvents: Record<string, any> = {};

const open = () => {
  setTimeout(() => {
    isOpen.value = true;
    emits("visible-change", isOpen.value);
  }, props.openDelay);
};

const close = () => {
  setTimeout(() => {
    isOpen.value = false;
    emits("visible-change", isOpen.value);
  }, props.closeDelay);
};

const openDebounce = debounce(open, props.openDelay);
const closeDebounce = debounce(close, props.closeDelay);

const openFinal = () => {
  closeDebounce.cancel();
  openDebounce();
};

const closeFinal = () => {
  openDebounce.cancel();
  closeDebounce();
};

const togglePopper = () => {
  if (isOpen.value) {
    closeFinal();
  } else {
    openFinal();
  }
};

const clickOutside = () => {
  // console.log("click outside");
  if (props.trigger === "click" && isOpen.value && !props.manual) {
    closeFinal();
  }
  if (isOpen.value) {
    emits("click-outside", true);
  }
};

const attachEvents = () => {
  if (props.trigger === "hover") {
    events["mouseenter"] = openFinal;
    popperEvents["mouseenter"] = openFinal;
    outerEvents["mouseleave"] = closeFinal;
  } else if (props.trigger === "click") {
    events["click"] = togglePopper;
  }
};

useClickOutside(poperContainer, clickOutside);

if (!props.manual) {
  attachEvents();
}

watch(
  () => props.manual,
  (isManual) => {
    if (isManual) {
      events = {};
      outerEvents = {};
      popperEvents = {};
    } else {
      attachEvents();
    }
    // console.log(
    //   isManual,
    //   props.trigger,
    //   "events:",
    //   events,
    //   "outer:",
    //   outerEvents,
    //   popperEvents
    // );
  }
  // { immediate: true }
);

watch(
  () => props.trigger,
  (newTrigger, oldTrigger) => {
    if (newTrigger !== oldTrigger) {
      events = {};
      outerEvents = {};
      popperEvents = {};
      attachEvents();
    }
  }
);

watch(isOpen, (newValue) => {
  if (newValue) {
    if (popperNode.value && triggerNode.value) {
      popperInstance.value = createPopper(
        triggerNode.value,
        popperNode.value,
        options.value
      );
    } else {
      popperInstance.value?.destroy();
    }
  }
});

onUnmounted(() => {
  popperInstance.value?.destroy();
});

defineOptions({
  name: "SpTooltip",
});

defineExpose<TooltipInstance>({
  show: openFinal,
  hide: closeFinal,
});
</script>
