import type { VNode } from 'vue'

export type valueType = number | string | null

export interface SelectOption {
  label: string
  value: valueType
  disabled?: boolean
}

export interface SelectProps {
  // 选项
  options?: SelectOption[]
  // 一些基本的表单属性
  placeholder: string
  disabled?: boolean
  clearable?: boolean
  multiple?: boolean
  filterable?: boolean
  filterMethod?: CustomFilterFunc

  remote?: boolean
  remoteMethod?: CustomFilterRemoteFunc

  renderLabel?: RenderLabelFunc
}

export interface SelectStates {
  inputValue: string
  selectedOption: null | SelectOption
  selectedOptions: SelectOption[]
  mouseHover: boolean
  loading: boolean
  highlightIndex: number
  hasEnabled: boolean
}

export type RenderLabelFunc = (option: SelectOption) => VNode
export type CustomFilterFunc = (value: string) => SelectOption[]

export type CustomFilterRemoteFunc = (value: string) => Promise<SelectOption[]>

export interface SelectEmits {
  (e: 'clear'): void
  (e: 'change', value: valueType | valueType[]): void
  (e: 'visible-change', value: boolean): void
}
