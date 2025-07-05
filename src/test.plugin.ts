import type { App } from 'vue'

import SpButton from './components/Button/Button.vue'

const plugins = {
  install: (app: App) => {
    app.config.globalProperties.$echo = (name: string) => {
      return `hello ${name}`
    }

    app.component('SpButton', SpButton)

    app.provide('test', {
      message: 'from plugin',
    })
  },
}

export default plugins
