import type { App, Plugin } from 'vue'
import Alert from './components/Alert'
import Button from './components/Button'
import Collapse, { CollapseItem } from './components/Collapse'
import Dropdown from './components/Dropdown'
import Form, { FormItem } from './components/Form'
import Input from './components/Input'
import Select from './components/Select'
import Switch from './components/Switch'
import Tooltip from './components/Tooltip'
import Icon from './components/Icon'
import Message, {
  createMessage,
  closeAll as closeAllMessage,
} from './components/Message'

import './styles/index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

const components = [
  Alert,
  Button,
  Collapse,
  CollapseItem,
  Dropdown,
  Form,
  FormItem,
  Input,
  Select,
  Switch,
  Tooltip,
  Icon,
  Message,
]

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name || component.displayName, component)
  })
  app.component('font-awesome-icon', FontAwesomeIcon)
}

export {
  install,
  createMessage,
  closeAllMessage,
  Alert,
  Button,
  Collapse,
  CollapseItem,
  Dropdown,
  Form,
  FormItem,
  Input,
  Select,
  Switch,
  Tooltip,
  Icon,
  Message,
}

const SeraphUI: Plugin = { install }

export default SeraphUI
