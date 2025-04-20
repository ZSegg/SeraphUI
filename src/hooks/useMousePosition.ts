import { ref, onMounted, onUnmounted } from 'vue'

function useMousePosition() {
  const x = ref(0)
  const y = ref(0)
  const updateMouse = (e: MouseEvent) => {
    x.value = e.clientX
    y.value = e.clientY
  }
  onMounted(() => {
    document.addEventListener('click', updateMouse)
  })
  onUnmounted(() => {
    document.removeEventListener('click', updateMouse)
  })
  return { x, y }
}

export default useMousePosition
