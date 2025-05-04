<template>
  <div class="sp-collapse">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, provide, watch } from "vue";
import type { NameType, CollapseProps, CollapseEmits } from "./type";
import { collapseContextKey } from "./type";

const props = defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();

defineOptions({
  name: "SpCollapse",
});

// 使用 defineModel 来绑定 v-model
const activeNames = defineModel<NameType[]>({ required: true });

// console.log("activeNames:", activeNames.value);

// console.log("props:", props);

const handleItemClick = (name: NameType) => {
  if (props.accordion) {
    // 手风琴模式，只允许一个展开
    activeNames.value = activeNames.value[0] === name ? [] : [name];
    ("");
  } else {
    // 普通模式，可以多选
    const index = activeNames.value.indexOf(name);
    if (index <= -1) {
      activeNames.value.push(name);
    } else {
      activeNames.value.splice(index, 1);
    }
    console.log("act:", activeNames.value);
  }

  // 触发 change 事件
  // 这里设置成传值的方式是为了方便测试
  emits("change", [...activeNames.value]);
};

provide(collapseContextKey, {
  activeNames,
  handleItemClick,
});
</script>

<style scoped></style>
