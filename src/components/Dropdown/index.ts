import type { App } from 'vue'
import Dropdown from './Dropdown.vue'

Dropdown.install = (app: App) => {
  app.component(Dropdown.name || 'SpDropdown', Dropdown)
}

export default Dropdown

export * from './type'
