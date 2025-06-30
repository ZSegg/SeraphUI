<template>
  <form class="sp-form">
    <slot />
  </form>
</template>

<script setup lang="ts">
import { provide, ref, computed, onMounted } from "vue";
import type { ValidateFieldsError } from "async-validator";
import type { FormProps, FormItemContext, FormValidateError, FormInstance } from "./type";
import { formContextKey } from "./type";

defineOptions({
  name: "SpForm",
});

const props = defineProps<FormProps>();

const fields = ref<FormItemContext[]>([]);

const context = computed(() => ({
  ...props,
  addField: (field: FormItemContext) => {
    fields.value.push(field);
  },
  removeField: (field: FormItemContext) => {
    if (field.prop) {
      fields.value.splice(fields.value.indexOf(field), 1);
    }
  },
}));

const validate = async () => {
  let errors: ValidateFieldsError = {};
  for (let field of fields.value) {
    try {
      await field.validate("");
    } catch (e) {
      const error = e as FormValidateError;
      if (error.fields) {
        errors = {
          ...errors,
          ...error.fields,
        };
      }
    }
  }
  // console.log("errors", errors);
  if (Object.keys(errors).length > 0) {
    // return Promise.reject(errors);
    throw errors;
  }
  return true;
};

const resetFields = (keys: string[] = []) => {
  const fieldsToReset = fields.value.filter(
    (field) => keys.includes(field.prop) || keys.length === 0
  );
  fieldsToReset.forEach((field) => {
    field.resetField();
  });
};

const clearValidate = (keys: string[] = []) => {
  const fieldsToClear = fields.value.filter(
    (field) => keys.includes(field.prop) || keys.length === 0
  );
  fieldsToClear.forEach((field) => {
    field.clearValidate();
  });
};

const reset = (keys: string[] = []) => {
  resetFields(keys);
  clearValidate(keys);
};

provide(formContextKey, context.value);

defineExpose<FormInstance>({
  reset,
  validate,
  resetFields,
  clearValidate,
});
</script>
<style scoped></style>
