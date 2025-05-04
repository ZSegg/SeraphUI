import { beforeAll, describe, expect, Mock, test, vi } from 'vitest'
import { h, ref, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import type { VueWrapper, DOMWrapper } from '@vue/test-utils'
import SpCollapse from './Collapse.vue'
import SpCollapseItem from './CollapseItem.vue'

let wrapper: VueWrapper
let headers: DOMWrapper<Element>[]
let contents: DOMWrapper<Element>[]
let firstHeader: DOMWrapper<Element>
let secondHeader: DOMWrapper<Element>
let disableHeader: DOMWrapper<Element>
let firstContent: DOMWrapper<Element>
let secondConent: DOMWrapper<Element>
let disableContent: DOMWrapper<Element>
let onChange: Mock

describe('Collapse vue', () => {
  beforeAll(() => {
    const collapseNames = ref(['a'])
    onChange = vi.fn()
    wrapper = mount(
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
    headers = wrapper.findAll('.sp-collapse-item__header')
    contents = wrapper.findAll('.sp-collapse-item__content')

    firstHeader = headers[0]
    secondHeader = headers[1]
    disableHeader = headers[2]
    firstContent = contents[0]
    secondConent = contents[1]
    disableContent = contents[2]
  })
  test('测试基础结构和对应文本', () => {
    // 长度
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)

    //文本
    expect(firstHeader.text()).toBe('title a')

    //内容
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondConent.isVisible()).toBeFalsy()
    expect(firstContent.text()).toBe('content a')
  })
  test('点击标题展开/关闭内容', async () => {
    await firstHeader.trigger('click')
    // 等待 dom 节点更新
    expect(firstContent.isVisible()).toBeFalsy()
    await secondHeader.trigger('click')
    expect(secondConent.isVisible()).toBeTruthy()
  })
  test('发送正确事件', () => {
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenCalledWith([])
    expect(onChange).toHaveBeenLastCalledWith(['b'])
  })
  test('disalbed 的内容应该没有反应', async () => {
    onChange.mockClear()
    expect(disableHeader.classes()).toContain('is-disabled')
    await disableHeader.trigger('click')
    expect(disableContent.isVisible()).toBeFalsy()
    expect(onChange).not.toHaveBeenCalled()
  })
})
