import { describe, expect, test, vi } from 'vitest'
import { h, ref, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import SpCollapse from './Collapse.vue'
import SpCollapseItem from './CollapseItem.vue'

describe('Collapse vue', () => {
  test('basic collapse', async () => {
    const collapseNames = ref(['a'])
    const onChange = vi.fn()

    const wrapper = mount(
      () => (
        <SpCollapse v-model={collapseNames.value} onChange={onChange}>
          <SpCollapseItem name="a" title="title a">
            content a
          </SpCollapseItem>
          <SpCollapseItem name="b" title="title b">
            content b
          </SpCollapseItem>
          <SpCollapseItem name="c" title="title c" disabled>
            content c
          </SpCollapseItem>
        </SpCollapse>
      ),
      {
        global: {
          stubs: ['SpIcon'],
        },
        attachTo: document.body, // 用于解决 jsdom style使用缓存,导致没有及时更新的问题
      }
    )
    console.log(wrapper.html())

    const headers = wrapper.findAll('.sp-collapse-item__header')
    const contents = wrapper.findAll('.sp-collapse-item__content')

    // 长度
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)

    //文本
    const firstHeader = headers[0]
    const secondHeader = headers[1]

    // console.log('second:', secondHeader.isVisible())
    // console.log(secondHeader.element.style.display)
    // console.log(window.getComputedStyle(secondHeader.element).display) // 获取最终样式

    //内容
    const firstContent = contents[0]
    const secondConent = contents[1]
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondConent.isVisible()).toBeFalsy()
    expect(firstContent.text()).toBe('content a')

    //行为
    const itemWrappers = wrapper.findAll('.sp-collapse-item__wrapper')
    await firstHeader.trigger('click')
    // 等待 dom 节点更新

    expect(firstContent.isVisible()).toBeFalsy()
    expect(onChange).toHaveBeenCalledWith([])

    await secondHeader.trigger('click')
    expect(secondConent.isVisible()).toBeTruthy()
    expect(onChange).toHaveBeenCalledWith(['b'])
    expect(onChange).toHaveBeenLastCalledWith(['b'])

    // disabled
    const disableHeader = headers[2]
    const disableContent = contents[2]
    expect(disableHeader.classes()).toContain('is-disabled')
    await disableHeader.trigger('click')
    expect(disableContent.isVisible()).toBeFalsy()
  })
})
