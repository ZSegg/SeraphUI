import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { fireEvent } from '@testing-library/vue'
import SpInput from './Input.vue'

describe('Input', () => {
  it('基本展示', () => {
    // 针对动态 class, 查看 classes 是否正确
    // 针对 v-if 是否渲染正确的标签以及内容
    // 针对 slots, 是否渲染对应的 slots内容

    const wrapper = mount(SpInput, {
      props: {
        size: 'small',
        type: 'text',
      },
      slots: {
        prepend: 'prepend',
        append: 'append',
        prefix: 'prefix',
        suffix: 'suffix',
      },
    })
    //     console.log(wrapper.html())

    // classes
    expect(wrapper.classes()).toContain('sp-input--text')
    expect(wrapper.classes()).toContain('sp-input--small')
    expect(wrapper.classes()).toContain('is-prepend')
    expect(wrapper.classes()).toContain('is-append')
    expect(wrapper.classes()).toContain('is-prefix')
    expect(wrapper.classes()).toContain('is-suffix')

    // should render input
    const input = wrapper.find('input')
    expect(input.exists()).toBeTruthy()
    expect(input.attributes('type')).toBe('text')

    // slots
    const prepend = wrapper.find('.sp-input__prepend')
    const append = wrapper.find('.sp-input__append')
    const prefix = wrapper.find('.sp-input__prefix')
    const suffix = wrapper.find('.sp-input__suffix')
    expect(prepend.exists()).toBeTruthy()
    expect(prepend.text()).toBe('prepend')
    expect(append.exists()).toBeTruthy()
    expect(append.text()).toBe('append')
    expect(prefix.exists()).toBeTruthy()
    expect(prefix.text()).toBe('prefix')
    expect(suffix.exists()).toBeTruthy()
    expect(suffix.text()).toBe('suffix')

    // textarea
    const wrapper1 = mount(SpInput, {
      props: {
        size: 'small',
        type: 'textarea',
        disabled: true,
      },
    })
    expect(wrapper1.classes()).toContain('is-disabled')

    const textarea = wrapper1.find('.sp-textarea__wrapper')
    expect(textarea.exists()).toBeTruthy()
    //     console.log(textarea.html())
    expect(textarea.attributes('disabled')).toBeDefined()
  })
  it('支持 v-model', async () => {
    const wrapper = mount(SpInput, {
      props: {
        modelValue: '初始值', // 初始值
        'onUpdate:modelValue': (value: string | undefined) => {
          // 模拟父组件更新 modelValue
          wrapper.setProps({ modelValue: value })
        },
      },
    })
    // 初始值
    const input = wrapper.get('input')
    expect(input.element.value).toBe('初始值')
    // 更新值
    await input.setValue('更新值')

    expect(input.element.value).toBe('更新值')

    console.log('the events', wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')

    const inputEvent = wrapper.emitted('input')
    const changeEvent = wrapper.emitted('change')
    console.log('input:', inputEvent)
    console.log('change:', changeEvent)
    expect(inputEvent![0]).toEqual(['更新值'])
    expect(changeEvent![0]).toEqual(['更新值'])
    // v-model 的 异步更新
    await wrapper.setProps({ modelValue: 'prop 更新' })
    expect(input.element.value).toBe('prop 更新')
  })

  it('支持点击清空', async () => {
    const wrapper = mount(SpInput, {
      props: {
        modelValue: 'test', // 初始值
        clearable: true,
        type: 'text',
      },
      global: {
        stubs: ['SpIcon'],
      },
    })
    //     console.log(wrapper.html())
    // 不应该出现对应的 Icon 区域
    expect(wrapper.find('.sp-input__clear').exists()).toBeFalsy()
    const input = wrapper.find('input')
    await input.trigger('focus')
    expect(wrapper.emitted()).toHaveProperty('focus')

    // 出现 Icon 区域
    console.log(wrapper.html())
    expect(wrapper.find('.sp-input__clear').exists()).toBeTruthy()
    // 点击值清空并消失
    await wrapper.get('.sp-input__clear').trigger('click')
    expect(input.element.value).toBe('')
    expect(wrapper.find('.sp-input__clear').exists()).toBeFalsy()

    expect(wrapper.emitted()).toHaveProperty('clear')
    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')
    const inputEvent = wrapper.emitted('input')
    const changeEvent = wrapper.emitted('change')
    expect(inputEvent![0]).toEqual([''])
    expect(changeEvent![0]).toEqual([''])

    await input.trigger('blur')
    expect(wrapper.emitted()).toHaveProperty('blur')
  })
  it('支持切换密码显示', async () => {
    const wrapper = mount(SpInput, {
      props: {
        modelValue: '', // 初始值
        showPassword: true,
        type: 'text',
      },
      global: {
        stubs: ['SpIcon'],
      },
    })
    // 不出现对应的 Icon 区域
    expect(wrapper.find('.sp-input__password').exists()).toBeFalsy()
    const input = wrapper.find('input')
    expect(input.element.type).toBe('password')

    // 出现 Icon 区域, 并且 Icon 为 眼睛 的图标
    await input.setValue('123')
    console.log(wrapper.html())
    const eyeIcon = wrapper.find('.sp-input__password')
    expect(eyeIcon.exists()).toBeTruthy()

    expect(eyeIcon.attributes('icon')).toBe('eye-slash')
    // 点击会切换 input type 和 eyeIcon 的 Icon
    await eyeIcon.trigger('click')
    expect(input.element.type).toBe('text')
    expect(eyeIcon.attributes('icon')).toBe('eye')
  })
})
