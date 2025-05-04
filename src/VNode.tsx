import { ref, defineComponent, h } from 'vue'

export default defineComponent({
  name: 'VNode',
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const count = ref(1)
    const add = () => count.value++
    return () => (
      <div>
        <h1>msg: {props.msg}</h1>
        <h1>count: {count.value}</h1>
        <button onClick={add}>add</button>
      </div>
    )
  },
})
