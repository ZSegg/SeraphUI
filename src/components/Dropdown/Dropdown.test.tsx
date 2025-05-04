import { h, ref } from 'vue'
import { describe, test, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SpDropdown from './Dropdown.vue'

import type { Mock } from 'vitest'
import type { MenuOption, DropdownInstance } from './type'

let onVisibleChange: Mock
let onSelect: Mock
let dropOptions: MenuOption[]

describe('Dropdown.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    onVisibleChange = vi.fn()
    onSelect = vi.fn()
    dropOptions = [
      { key: 1, label: h('b', 'this is bold') },
      { key: 2, label: 'item2', disabled: true },
      { key: 3, label: 'item3', divided: true },
      { key: 4, label: 'item4' },
    ]
  })
  test('click test', async () => {
    const wrapper = mount(
      () => (
        <div>
          <SpDropdown
            trigger="click"
            placement="right"
            menuOptions={dropOptions}
            onVisibleChange={onVisibleChange}
            onSelect={onSelect}
          >
            <button id="trigger">trigger</button>
          </SpDropdown>
        </div>
      ),
      {
        attachTo: document.body,
      }
    )
    const trigger = wrapper.find('.sp-tooltip__trigger')
    const popper = wrapper.find('.sp-tooltip__popper')

    //     console.log(wrapper.html())
    //     console.log(trigger.html())
    //     console.log(popper.html())

    // 显示测试
    expect(popper.isVisible()).toBeFalsy()
    trigger.trigger('click')
    await vi.runAllTimers()
    expect(popper.isVisible()).toBeTruthy()
    expect(popper.find('#dropdown-item-1').text()).toBe('this is bold')
    expect(popper.find('#dropdown-item-2').text()).toBe('item2')
    expect(popper.find('#dropdown-item-3').text()).toBe('item3')
    expect(popper.find('#dropdown-item-4').text()).toBe('item4')

    // 点击测试
    popper.find('#dropdown-item-1').trigger('click')
    await vi.runAllTimers()
    expect(popper.isVisible()).toBeFalsy()
    trigger.trigger('click')
    await vi.runAllTimers()
    expect(popper.isVisible()).toBeTruthy()
    popper.find('#dropdown-item-2').trigger('click')
    await vi.runAllTimers()
    expect(popper.isVisible()).toBeTruthy()

    // 事件测试
    expect(onVisibleChange).toHaveBeenCalledTimes(3)
    expect(onVisibleChange).toBeCalledWith(true)
    expect(onVisibleChange).toHaveBeenLastCalledWith(true)
  })

  test('maual test', async () => {
    const dropdownRef = ref<DropdownInstance | null>(null)
    const wrapper = mount(
      () => (
        <div>
          <SpDropdown
            ref={dropdownRef}
            trigger="click"
            placement="right"
            menuOptions={dropOptions}
            onVisibleChange={onVisibleChange}
            onSelect={onSelect}
            manual
          >
            <button id="trigger">trigger</button>
          </SpDropdown>
        </div>
      ),
      {
        attachTo: document.body,
      }
    )
    const trigger = wrapper.find('.sp-tooltip__trigger')
    const popper = wrapper.find('.sp-tooltip__popper')

    console.log(wrapper.html())
    //     console.log(trigger.html())
    //     console.log(popper.html())

    // 显示测试
    expect(popper.isVisible()).toBeFalsy()
    trigger.trigger('click')
    await vi.runAllTimers()
    expect(popper.isVisible()).toBeFalsy()

    // 等待组件挂载
    await wrapper.vm.$nextTick()

    // 手动触发测试
    expect(dropdownRef.value).not.toBeNull()
    expect(dropdownRef.value?.show).toBeDefined() // 确认方法存在
    dropdownRef.value?.show()
    console.log('show:', dropdownRef.value?.show.toString())
    await vi.runAllTimers()
    expect(popper.isVisible()).toBeTruthy()
    console.log('hide', dropdownRef.value?.hide.toString())
    dropdownRef.value?.hide()
    await vi.runAllTimers()
    expect(popper.isVisible()).toBeFalsy()

    // 事件测试
    expect(onVisibleChange).toHaveBeenCalledTimes(2)
    expect(onVisibleChange).toBeCalledWith(true)
    expect(onVisibleChange).toHaveBeenLastCalledWith(false)
  })
})
