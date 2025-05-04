import type { Placement, Options } from '@popperjs/core'

export type AnimationType = 'fade' | 'slide'

export interface TooltipProps {
  content?: string
  trigger?: 'hover' | 'click'
  placement: Placement
  manual?: boolean // 是否手动
  popperOptions?: Partial<Options> // 通过 Partial把必选属性都转换为可选属性
  openDelay?: number
  closeDelay?: number
  'transition-animation'?: AnimationType
}

export interface TooltipEmits {
  (e: 'visible-change', value: boolean): void
}

export interface TooltipInstance {
  show: () => void
  hide: () => void
}
