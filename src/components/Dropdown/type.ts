import type { VNode } from 'vue'
import type {
  TooltipProps,
  TooltipEmits,
  TooltipInstance,
} from '../Tooltip/type'

export interface DropdownProps extends TooltipProps {
  menuOptions: MenuOption[]
  hideAfterClick?: boolean
  size?: 'large' | 'small' | 'default'
  placement:
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-end'
    | 'bottom-start'
}

export interface MenuOption {
  label: string | VNode
  key: string | number
  disabled?: boolean
  divided?: boolean
}

export interface DropdownEmits extends TooltipEmits {
  (e: 'select', value: MenuOption): void
}

export interface DropdownInstance extends TooltipInstance {}
