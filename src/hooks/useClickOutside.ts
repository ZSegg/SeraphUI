import type { Ref } from 'vue'
import { watch, onMounted, onUnmounted } from 'vue'

function useClickOutside(
  elementRef: Ref<HTMLElement | undefined | null>,
  callback: (e: MouseEvent) => void
) {
  const handler = (e: MouseEvent) => {
    if (!elementRef.value || !e.target) return
    if (!elementRef.value.contains(e.target as HTMLElement)) {
      callback(e)
    } else {
      // console.log('在元素内')
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
}

export default useClickOutside
