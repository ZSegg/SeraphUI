import axios from 'axios'
import { error } from 'console'
import { reactive, toRefs } from 'vue'

interface IResult<T> {
  result: null | T
  loading: boolean
  error: any
}

// T = any -> T 默认为 any 类型
const useURLLoader = <T = any>(url: string) => {
  const data: IResult<T> = reactive({
    result: null,
    loading: true,
    error: null,
  })
  axios
    .get(url)
    .then((rawData) => {
      data.result = rawData.data
    })
    .catch((error) => {
      data.error = error
    })
    .finally(() => {
      data.loading = false
    })
  console.log('data', data)
  return toRefs(data)
}

export default useURLLoader
