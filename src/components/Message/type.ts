import type { VNode, ComponentInternalInstance, Ref } from 'vue'

export interface MessageProps {
  id: string
  message?: string | VNode
  duration?: number // 关闭时间, 如果为0表示不关闭
  showClose?: boolean // 是否显示关闭按钮
  offset?: number // 间距
  type?: 'success' | 'info' | 'warning' | 'error'
  zIndex: number
  onDestory: () => void
  transitionName?: string
}

export interface MessageContext {
  id: string
  vnode: VNode
  props: MessageProps
  vm: ComponentInternalInstance
  destory: () => void
}

export type CreateMessageProps = Omit<
  MessageProps,
  'onDestory' | 'id' | 'zIndex'
>
