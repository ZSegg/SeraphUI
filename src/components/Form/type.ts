import type { InjectionKey } from 'vue'
import type {
  RuleItem,
  ValidateError,
  ValidateFieldsError,
} from 'async-validator'

export interface FormItemProps {
  label: string
  prop?: string
}

export interface FormItemRule extends RuleItem {
  trigger?: string
}

export interface FormRules {
  [key: string]: Array<FormItemRule>
}

export interface FormProps {
  model: Record<string, any>
  rules: FormRules
}

export interface FormContext extends FormProps {
  addField: (field: FormItemContext) => void
  removeField: (field: FormItemContext) => void
}

export interface FormItemContext {
  prop: string
  validate: (trigger: string) => Promise<boolean>
  resetField: () => void
  clearValidate: () => void
}

export interface FormValidateError {
  errors?: Array<ValidateError> | null
  fields?: ValidateFieldsError
}

export interface ValidateStatus {
  status: 'init' | 'success' | 'error'
  errorMsg: string
  loading: boolean
}

export interface FormInstance {
  validate: () => Promise<any>
  reset: (keys?: string[]) => void
  resetFields: (keys?: string[]) => void
  clearValidate: (keys?: string[]) => void
}

export interface FormItemInstance {
  validateStatus: ValidateStatus
  validate: (trigger: string) => Promise<boolean>
  resetField: () => void
  clearValidate: () => void
}

export const formContextKey: InjectionKey<FormContext> =
  Symbol('formContextKey')

export const formItemContextKey: InjectionKey<FormItemContext> =
  Symbol('formItemContextKey')
