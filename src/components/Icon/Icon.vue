<template>
  <i
    class="sp-icon"
    :class="{ [`sp-icon--${type}`]: type }"
    :style="cutomerStyle"
    v-bind="$attrs"
  >
    <FontAwesomeIcon v-bind="filteredProps" />
  </i>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { IconProps } from "./type";
import { computed } from "vue";
import { omit } from "lodash-es";

defineOptions({
  name: "SpIcon",
  inheritAttrs: false,
});

const props = defineProps<IconProps>();

// 把多余的属性进行过滤
const filteredProps = computed(() => omit(props, ["type", "color"]));

// console.log(filteredProps.value);

const cutomerStyle = computed(() => (props.color ? { color: props.color } : {}));
</script>
<style scoped></style>
