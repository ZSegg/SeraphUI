import { App } from 'vue'
import Alert from './Alert.vue'

Alert.install = (app: App) => {
  app.component(Alert.name || 'SpAlert', Alert)
}

export default Alert

export * from './type'
