<template>
  <div
    class="sp-form-item"
    :class="{
      'is-error': validateStatus.status === 'error',
      'is-success': validateStatus.status === 'success',
      'is-loading': validateStatus.loading,
      'is-required': isRequired,
    }"
  >
    <label class="sp-form-item__label">
      <slot name="label" :label="label">
        {{ label }}
      </slot>
    </label>

    <div class="sp-form-item__content">
      <slot />
      <div class="sp-form-item__error-msg" v-if="validateStatus.status === 'error'">
        {{ validateStatus.errorMsg }}
      </div>
    </div>
  </div>

  <!-- <button @click.prevent="validate">validate</button> -->
</template>

<script setup lang="ts">
import { isNil } from "lodash-es";
import { inject, computed, reactive, provide, onMounted, onUnmounted } from "vue";
import type { FormItemProps, ValidateStatus, FormItemInstance } from "./type";
import { formContextKey, formItemContextKey } from "./type";
import Schema from "async-validator";

defineOptions({
  name: "SpFormItem",
});

const props = defineProps<FormItemProps>();

const validateStatus = reactive<ValidateStatus>({
  status: "init",
  errorMsg: "",
  loading: false,
});

const formContext = inject(formContextKey);

let initalValue = null;

const innerValue = computed(() => {
  const model = formContext?.model;
  // 如果model存在，prop存在，且prop的值不为null或者undefined，则返回model[prop]
  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop];
  }
  return null;
});

const itemRules = computed(() => {
  const rules = formContext?.rules;
  if (rules && props.prop && rules[props.prop] && Array.isArray(rules[props.prop])) {
    return rules[props.prop];
  }
  return [];
});

const isRequired = computed(() => {
  return itemRules.value.some((rule) => rule.required);
});

const getTriggerRules = (trigger: string) => {
  if (!trigger) return itemRules.value;
  return itemRules.value.filter((rule) => rule.trigger === trigger);
};

const validate = async (trigger: string) => {
  if (!props.prop) return true;

  const triggerRules = getTriggerRules(trigger);
  if (triggerRules.length === 0) return true;

  let errorSave = null;
  validateStatus.loading = true;
  try {
    const validator = new Schema({
      [props.prop]: triggerRules, // 只验证triggerRules
    });
    await validator.validate({
      [props.prop]: innerValue.value,
    });
    validateStatus.status = "success";
    validateStatus.errorMsg = "";
  } catch (error: any) {
    errorSave = error;
    validateStatus.status = "error";
    validateStatus.errorMsg = error.errors[0]?.message || "";
  } finally {
    validateStatus.loading = false;
  }
  if (errorSave) {
    throw errorSave;
  }
  return true;
};

const resetField = () => {
  const model = formContext?.model;
  // 如果model存在，prop存在，且prop的值不为null或者undefined，则返回model[prop]
  if (model && props.prop && !isNil(model[props.prop])) {
    model[props.prop] = initalValue;
  }
};

const clearValidate = () => {
  validateStatus.status = "init";
  validateStatus.errorMsg = "";
  validateStatus.loading = false;
};

const context = computed(() => ({
  prop: props.prop || "",
  validate,
  resetField,
  clearValidate,
}));

provide(formItemContextKey, context.value);

onMounted(() => {
  if (props.prop) {
    // console.log(`${props.prop}'s addField: `, context.value);
    formContext?.addField(context.value);
    initalValue = innerValue.value;
  }
});

onUnmounted(() => {
  formContext?.removeField(context.value);
});

defineExpose<FormItemInstance>({
  validateStatus,
  validate,
  resetField,
  clearValidate,
});
</script>
<style scoped></style>
