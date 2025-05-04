import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { ButtonProps, ButtonInstance } from './type'
import SpButton from './Button.vue'
import SpIcon from '@/components/Icon/Icon.vue'

describe('Button.vue', () => {
  test('basic button', () => {
    const wrapper = mount(SpButton, {
      props: {
        type: 'primary',
      },
      slots: {
        default: 'button',
      },
    })
    // console.log(wrapper.html())
    expect(wrapper.classes()).toContain('sp-button--primary')

    // 通过 get 或 find 方法获取dom节点
    // text方法获取文本内容
    expect(wrapper.get('button').text()).toBe('button')

    // 触发事件
    wrapper.get('button').trigger('click')
    // console.log(wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('click')
  })
  test('disabled', () => {
    const wrapper = mount(SpButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'disabled',
      },
    })
    // console.log(wrapper.html())
    expect(wrapper.classes()).toContain('is-disabled')
    // 获取属性
    expect(wrapper.attributes('disabled')).toBeDefined()

    expect(wrapper.find('button').element.disabled).toBe(true)

    // 触发事件
    wrapper.get('button').trigger('click')
    // console.log(wrapper.emitted())
    expect(wrapper.emitted()).not.toHaveProperty('click')
  })

  test('icon', () => {
    const wrapper = mount(SpButton, {
      props: {
        icon: 'arrow-up',
      },
      slots: {
        default: 'icon',
      },
      global: {
        stubs: ['FontAwesomeIcon'],
      },
    })
    // console.log(wrapper.html())
    const iconElement = wrapper.findComponent(FontAwesomeIcon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('arrow-up')
  })
  test('loading', () => {
    const wrapper = mount(SpButton, {
      props: {
        loading: true,
      },
      slots: {
        default: 'loading',
      },
      global: {
        stubs: ['SpIcon'],
      },
    })
    console.log(wrapper.html())
    const iconElement = wrapper.findComponent(SpIcon)
    expect(iconElement.exists()).toBeTruthy()
    expect(iconElement.attributes('icon')).toBe('spinner')
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('is-loading')
  })
})
