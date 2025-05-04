export type ButtonType = 'primary' | 'danger' | 'warning' | 'info' | 'success'

export type ButtonSize = 'large' | 'medium' | 'small' | 'mini'
export type ButtonShape = 'circle' | 'round' | 'square'
export type ButtonNativeType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
  type?: ButtonType
  size?: ButtonSize
  shape?: ButtonShape
  plain?: boolean
  circle?: boolean
  round?: boolean
  disabled?: boolean
  autofocus?: boolean
  nativeType?: ButtonNativeType
  loading?: boolean
  icon?: string
}

export interface ButtonInstance {
  ref: HTMLButtonElement
}
