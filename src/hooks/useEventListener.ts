import { isRef, watch, effectScope, ref } from 'vue'
import type { Ref } from 'vue'

// 定义事件清理函数的类型
type CleanupFunction = () => void
type EventCleanupMap = Record<string, CleanupFunction>

// 存储每个 target 的清理函数
const targetCleanupMap = new WeakMap<EventTarget, EventCleanupMap>()
const targetWatchMap = new WeakMap<Ref<EventTarget | null>, () => void>()

function addEvent(
  target: EventTarget | null | undefined,
  event: string,
  handler: (e: Event) => void
): void {
  if (!target) return

  target.addEventListener(event, handler)

  // 初始化或获取该target的清理记录
  const cleanupMap = targetCleanupMap.get(target) || {}

  // 创建新的清理函数
  const newCleanup = () => {
    target.removeEventListener(event, handler)
    // 只删除当前事件的清理函数，而不是整个target
    const currentCleanupMap = targetCleanupMap.get(target)
    if (currentCleanupMap) {
      delete currentCleanupMap[event]
      if (Object.keys(currentCleanupMap).length === 0) {
        targetCleanupMap.delete(target)
      }
    }
  }

  // 保存清理函数
  cleanupMap[event] = newCleanup
  targetCleanupMap.set(target, cleanupMap)
}

function removeEvent(
  target: EventTarget | null | undefined,
  event: string
): void {
  if (!target) return

  const cleanupMap = targetCleanupMap.get(target)
  if (!cleanupMap) return

  const cleanup = cleanupMap[event]
  if (cleanup) {
    cleanup() // 执行清理
    delete cleanupMap[event] // 从记录中移除

    // 如果这个target没有其他事件了，完全移除
    if (Object.keys(cleanupMap).length === 0) {
      targetCleanupMap.delete(target)
    }
  }
}

export default function useEventListener(
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handler: (e: Event) => void
) {
  const scope = effectScope()
  scope.run(() => {
    if (isRef(target)) {
      if (targetWatchMap.has(target)) {
        const stopWatch = targetWatchMap.get(target)
        if (stopWatch) stopWatch()
      }
      // 防止创建多个watch
      const stopWatch = watch(
        target,
        (newTarget, oldTarget, onCleanup) => {
          // 清理旧target的事件
          removeEvent(oldTarget, event)
          // 清理新target原有的事件
          removeEvent(newTarget, event)
          // 添加新target的事件
          if (newTarget) {
            addEvent(newTarget, event, handler)
          }

          // 注册清理函数
          onCleanup(() => {
            removeEvent(newTarget, event)
          })
        },
        { immediate: true }
      )
      targetWatchMap.set(target, stopWatch)
    } else {
      // 静态target的处理
      removeEvent(target, event)
      addEvent(target, event, handler)
    }
  })

  // 返回一个手动清理的方法
  return () => {
    if (isRef(target)) {
      removeEvent(target.value, event)
    } else {
      removeEvent(target, event)
    }
    scope.stop()
  }
}
