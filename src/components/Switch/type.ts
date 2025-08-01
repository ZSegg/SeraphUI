export type SwitchValueType = boolean | string | number

export interface SwitchProps {
  disabled?: boolean
  activeText?: string
  inactiveText?: string
  activeValue?: SwitchValueType
  inactiveValue?: SwitchValueType
  name?: string
  id?: string
  size?: 'small' | 'large'
}

export interface SwitchEmits {
  (e: 'change', value: SwitchValueType): void
}
