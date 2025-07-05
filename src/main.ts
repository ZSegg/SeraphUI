import { createApp } from 'vue'
import App from './App.vue'
import './styles/index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 添加所有图标到库
library.add(fas)

import testPlugin from './test.plugin'

const app = createApp(App)

// console.log('App:', App.render.toString())

app.use(testPlugin)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
