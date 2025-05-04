export interface AlertProps {
  title?: string
  type?: 'primary' | 'danger' | 'warning' | 'info' | 'success' | undefined
  description?: string
  closable?: boolean
  center?: boolean
  'close-text'?: string
  'show-icon'?: boolean
  effect?: 'dark' | 'light'
}

export interface AlertEmits {
  (e: 'close'): void
}
