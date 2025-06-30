<template>
  <div
    class="sp-select"
    :class="{
      'is-disabled': disabled,
    }"
    @click="toggleTooltip"
    @mouseenter="selectStates.mouseHover = true"
    @mouseleave="selectStates.mouseHover = false"
  >
    <SpTooltip
      ref="tooltipRef"
      placement="bottom-start"
      manual
      :popper-options="popperOption"
      @click-outside="controlTooltip(false)"
    >
      <SpInput
        ref="inputRef"
        v-model="selectStates.inputValue"
        :disabled="disabled"
        :placeholder="placeholderValue"
        :readonly="!filterable || !isTooltipShow"
        @input="debounceOnFilter"
        @keydown="handleKeydown"
      >
        <template #suffix>
          <SpIcon
            v-if="clearIconShow"
            icon="circle-xmark"
            class="header-clear"
            @click.stop="onClear"
          />
          <SpIcon
            v-else
            icon="angle-down"
            class="header-angle"
            :class="{
              'is-active': isTooltipShow,
            }"
          />
        </template>
      </SpInput>
      <template #content>
        <div class="sp-select__loading" v-if="selectStates.loading">
          <SpIcon icon="spinner" spin />
        </div>
        <div
          class="sp-select__nodata"
          v-else-if="filterable && filteredOptions?.length === 0"
        >
          <slot name="no-data"> no matching data </slot>
        </div>
        <ul class="sp-select__menu" v-else>
          <template v-for="(item, index) in filteredOptions" :key="index">
            <li
              class="sp-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': checkSelect(item),
                'is-highlighted': selectStates.highlightIndex === index,
              }"
              :id="`select-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              <RenderVnode :vNode="renderLabel ? renderLabel(item) : item.label" />
            </li>
          </template>
        </ul>
      </template>
    </SpTooltip>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from "vue";
import { isFunction, debounce } from "lodash-es";
import SpIcon from "../Icon/Icon.vue";
import SpInput from "../Input/Input.vue";
import SpTooltip from "../Tooltip/Tooltip.vue";
import RenderVnode from "../common/RenderVnode";
import type { InputInstance } from "../Input/type";
import type { TooltipInstance } from "../Tooltip/type";
import type {
  valueType,
  SelectProps,
  SelectEmits,
  SelectStates,
  SelectOption,
} from "./type";

defineOptions({
  name: "SpSelect",
});

const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
});
const emits = defineEmits<SelectEmits>();

// popperOption 用于配置 Popper.js 的行为
const popperOption: any = {
  modifiers: [
    {
      name: "offset",
      options: {
        offset: [0, 9],
      },
    },
    {
      name: "sameWidth",
      enabled: true,
      phase: "beforeWrite",
      fn: ({ state }) => {
        const referenceWidth = state.rects.reference.width;
        state.styles.popper.width = `${referenceWidth}px`;
      },
      requires: ["computeStyles"],
    },
  ],
};

// 计算 placeholder 的值
const placeholderValue = computed(() => {
  return props.filterable && selectStates.selectedOption && isTooltipShow.value
    ? selectStates.selectedOption.label
    : props.placeholder;
});

// 定义选项列表的过滤状态
const filteredOptions = ref<SelectOption[]>(props.options);

// 生成过滤后的选项列表
const generateFilteredOptions = async () => {
  if (!props.filterable) return;

  if (props.filterMethod && isFunction(props.filterMethod)) {
    // 使用自定义过滤方法
    filteredOptions.value = await props.filterMethod(selectStates.inputValue);
  } else if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
    // 使用远程过滤方法
    selectStates.loading = true;
    try {
      filteredOptions.value = await props.remoteMethod(selectStates.inputValue);

      // console.log("filteredOptions:", filteredOptions.value);
    } catch (error) {
      console.error(error);
    } finally {
      selectStates.loading = false;
    }
  } else {
    // 默认过滤逻辑
    filteredOptions.value = props.options.filter((option) =>
      option.label.includes(selectStates.inputValue)
    );
  }
  selectStates.highlightIndex = -1;
};

const timeout = computed(() => (props.remote ? 300 : 0));

const onFilter = () => {
  generateFilteredOptions();
};

// 使用 lodash 的 debounce 函数来防抖处理输入事件
const debounceOnFilter = debounce(onFilter, timeout.value);

const findOption = (value: valueType) => {
  const option = props.options.find((item) => item.value === value);
  return option ? option : null;
};

// 处理选项选择事件
const itemSelect = (option: SelectOption) => {
  if (option.disabled) return;

  if (props.multiple) {
    // 多选逻辑
    const currentValue = (modelValue.value as valueType[]) || [];
    const optionIndex = currentValue.indexOf(option.value);

    if (optionIndex > -1) {
      currentValue.splice(optionIndex, 1);
      const selectedIndex = selectStates.selectedOptions.findIndex(
        (item) => item.value === option.value
      );
      if (selectedIndex > -1) {
        selectStates.selectedOptions.splice(selectedIndex, 1);
      }
    } else {
      currentValue.push(option.value);
      selectStates.selectedOptions.push(option);
    }
    // console.log("selectOptions:", selectStates.selectedOptions);
    modelValue.value = currentValue;
  } else {
    // 原有单选逻辑
    selectStates.inputValue = option.label;
    selectStates.selectedOption = option;
    modelValue.value = option.value;
    controlTooltip(false);
  }

  emits("change", modelValue.value);
};

// 检查选项是否被选中
const checkSelect = (item: SelectOption) => {
  if (props.multiple) {
    return selectStates.selectedOptions.some((option) => option.value === item.value);
  } else {
    return selectStates.selectedOption?.value === item.value;
  }
};

const modelValue = defineModel<valueType | valueType[]>();
const initalOption = findOption(modelValue.value as valueType);

const inputRef = ref<InputInstance>();
const tooltipRef = ref<TooltipInstance>();
const isTooltipShow = ref(false);

const selectStates = reactive<SelectStates>({
  inputValue: initalOption ? initalOption.label : "",
  selectedOption: initalOption,
  selectedOptions: [],
  mouseHover: false,
  loading: false,
  highlightIndex: -1,
  hasEnabled: filteredOptions.value.some((item) => !item.disabled),
});

// clearIconShow 计算属性，用于判断是否显示清除图标
const clearIconShow = computed(() => {
  return (
    props.clearable &&
    selectStates.mouseHover &&
    selectStates.selectedOption &&
    selectStates.inputValue.trim() !== ""
  );
});

// 处理清除操作
const onClear = () => {
  selectStates.selectedOption = null;
  selectStates.inputValue = "";
  emits("clear");
  emits("change", null);
};

// 控制 tooltip 的显示和隐藏
const controlTooltip = (show: boolean) => {
  if (show) {
    if (props.filterable && selectStates.selectedOption) {
      selectStates.inputValue = "";
    }
    tooltipRef.value?.show();
  } else {
    // console.log("hide");
    if (props.multiple) {
      // console.log("multiple:", selectStates.selectedOptions);
      selectStates.inputValue = selectStates.selectedOptions[0]?.label ?? "";
    } else {
      selectStates.inputValue = selectStates.selectedOption?.label ?? "";
    }
    tooltipRef.value?.hide();
    selectStates.highlightIndex = -1;
  }
  isTooltipShow.value = show;
  emits("visible-change", show);
};

const toggleTooltip = () => {
  if (props.disabled) return;
  // console.log("toggleTooltip");
  if (isTooltipShow.value) {
    controlTooltip(false);
  } else {
    controlTooltip(true);
  }
};

watch(
  () => props.options,
  () => (newValue, oldValue) => {
    if (newValue === oldValue) return;
    debounceOnFilter();
  },
  { immediate: true }
);

watch(
  () => selectStates.selectedOption,
  (newValue) => {
    if (newValue) {
      modelValue.value = newValue.label;
    } else {
      modelValue.value = "";
    }
  }
);

const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case "Enter":
      if (isTooltipShow.value) {
        if (
          selectStates.highlightIndex !== -1 &&
          filteredOptions.value[selectStates.highlightIndex]
        ) {
          itemSelect(filteredOptions.value[selectStates.highlightIndex]);
        }
      } else {
        controlTooltip(true);
      }
      toggleTooltip();
      break;
    case "Escape":
      if (isTooltipShow.value) {
        controlTooltip(false);
      }
      break;
    case "ArrowUp":
      e.preventDefault();
      if (isTooltipShow.value && selectStates.hasEnabled) {
        while (1) {
          if (selectStates.highlightIndex <= 0) {
            selectStates.highlightIndex = filteredOptions.value.length - 1;
          } else {
            selectStates.highlightIndex--;
          }
          if (!filteredOptions.value[selectStates.highlightIndex].disabled) {
            break;
          }
        }
      }
      break;
    case "ArrowDown":
      e.preventDefault();
      if (isTooltipShow.value && selectStates.hasEnabled) {
        while (1) {
          selectStates.highlightIndex =
            (selectStates.highlightIndex + 1) % filteredOptions.value.length;
          if (!filteredOptions.value[selectStates.highlightIndex].disabled) {
            break;
          }
        }
      }
      break;
    default:
      break;
  }
};
</script>
<style scoped></style>
