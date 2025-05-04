import { describe, test, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import SpTooltip from './Tooltip.vue'

const onVisibleChange = vi.fn()

describe('Tooltip.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  test('basic test', async () => {
    const wrapper = mount(
      () => (
        <div>
          <div id="outside">outside</div>
          <SpTooltip
            content="this is a button"
            trigger="click"
            onVisibleChange={onVisibleChange}
          >
            <button id="trigger">trigger</button>
          </SpTooltip>
        </div>
      ),
      {
        attachTo: document.body,
      }
    )
    const outside = wrapper.find('#outside')
    const trigger = wrapper.find('.sp-tooltip__trigger')
    const popper = wrapper.find('.sp-tooltip__popper')
    //     console.log(wrapper.html())
    //     console.log(outside.html())
    //     console.log(trigger.html())

    // 点击内部测试
    expect(popper.isVisible()).toBeFalsy()
    trigger.trigger('click')
    await vi.runAllTimers()
    expect(popper.isVisible()).toBeTruthy()
    expect(popper.find('.sp-tooltip__popper__content').text()).toBe(
      'this is a button'
    )

    // 点击外部测试
    outside.trigger('click')
    await vi.runAllTimers()
    expect(popper.isVisible()).toBeFalsy()

    // 事件测试
    expect(onVisibleChange).toHaveBeenCalledTimes(2)
    expect(onVisibleChange).toHaveBeenCalledWith(true)
    expect(onVisibleChange).toHaveBeenLastCalledWith(false)
  })
})
