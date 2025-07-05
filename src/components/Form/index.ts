import type { App } from 'vue'
import Form from './Form.vue'
import FormItem from './FormItem.vue'

Form.install = (app: App) => {
  app.component(Form.name || 'SpForm', Form)
}

FormItem.install = (app: App) => {
  app.component(FormItem.name || 'SpFormItem', FormItem)
}

export default Form
export { FormItem }

export * from './type'
