import type { App } from 'vue'
import Switch from './switch.vue'

Switch.install = (app: App) => {
  app.component(Switch.name || 'SpSwitch', Switch)
}

export default Switch

export * from './type'
