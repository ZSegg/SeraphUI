import { Ref } from 'vue'

export interface InputProps {
  type?: string
  size?: 'large' | 'small'
  disabled?: boolean
  clearable?: boolean
  showPassword?: boolean
  placeholder?: string
  readonly?: boolean
  autocomplete?: string
  autofocus?: boolean
  form?: string
}

export interface InputEmits {
  (e: 'input', value: string): void // 只要修改值就会触发
  (e: 'change', value: string): void // 修改了值并失去focus
  (e: 'focus', value: FocusEvent): void
  (e: 'blur', value: FocusEvent): void
  (e: 'clear'): void
}

export interface InputInstance {
  ref: HTMLInputElement | HTMLTextAreaElement
}
