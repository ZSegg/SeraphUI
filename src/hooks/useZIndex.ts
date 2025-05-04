import { ref, computed } from 'vue'
const zIndex = ref(0)
const useZIndex = (initalValue = 2000) => {
  const initalZIndex = ref(initalValue)
  const currentIndex = computed(() => zIndex.value + initalZIndex.value)
  const nextZIndex = () => {
    zIndex.value = (zIndex.value + 1) % 9999
    return currentIndex.value
  }
  return {
    currentIndex,
    nextZIndex,
  }
}

export default useZIndex
