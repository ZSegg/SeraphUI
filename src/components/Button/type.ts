export type ButtonType = 'primary' | 'danger' | 'warning' | 'info' | 'success'
export type ButtonSize = 'large' | 'medium' | 'small'
export type ButtonNativeType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
  type?: ButtonType
  size?: ButtonSize
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
