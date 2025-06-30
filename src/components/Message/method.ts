import { render, h, ref, shallowReactive, reactive } from 'vue'
import type { CreateMessageProps, MessageContext } from './type'
import SpMessage from './Message.vue'
import useZIndex from '@/hooks/useZIndex'

let seed = 1
// const instances = shallowReactive<MessageContext[]>([])
const instances = reactive<MessageContext[]>([])

export function createMessage(props: CreateMessageProps) {
  const id = `message_${seed++}`
  const container = document.createElement('div')
  const onDestory = () => {
    render(null, container)

    // 删除数组中的实例
    const index = instances.findIndex((item) => item.id === instance.id)
    if (index !== -1) instances.splice(index, 1)
  }
  const menualDestory = () => {
    const instance = instances.find((item) => item.id === id)
    if (instance) {
      instance.vm.exposed!.visiable.value = false
    }
  }

  const { nextZIndex } = useZIndex()
  const zIndex = nextZIndex()
  const messageProps = {
    id,
    ...props,
    onDestory,
    zIndex,
  }
  const vnode = h(SpMessage, messageProps)

  render(vnode, container)
  document.body.appendChild(container.firstElementChild!)

  // ! 为 非空断言描述符, 表示这个变量一定不为null
  const instance = {
    id,
    vnode,
    vm: vnode.component!,
    props: messageProps,
    destory: menualDestory,
  }
  instances.push(instance)
  // console.log(instance)
  return instance
}

export const getLastInstance = () => {
  return instances.at(-1) ?? null
  // 通过 .at(-1) 获取数组最后一项
}

export const getLastBottomOffset = (id) => {
  const index = instances.findIndex((item) => item.id == id)
  if (index <= 0) return 0
  return instances[index - 1].vm.exposed!.bottomOffset.value
}

export const closeAll = () => {
  instances.forEach((instance) => {
    instance.destory()
  })
}
