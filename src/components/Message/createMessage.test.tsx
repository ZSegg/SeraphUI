import { describe, expect, test, vi } from 'vitest'
import { nextTick } from 'vue'
import { createMessage, closeAll } from './method'

// 等待动画完成函数
const rAF = async () => {
  return new Promise((res) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null)
        await nextTick()
      })
    })
  })
}

const getTopValue = (element: Element) => {
  const styles = window.getComputedStyle(element)
  const topValue = styles.getPropertyValue('top')
  return Number.parseFloat(topValue)
}

describe('createMessage', () => {
  test('调用方法应该创建对应的 Message 组件', async () => {
    const instance = createMessage({
      message: 'test message',
      duration: 0,
    })
    await rAF()
    //     console.log('html', document.body.innerHTML)
    expect(document.querySelector('.sp-message')).toBeTruthy()
    instance.destory()
    await rAF()
    expect(document.querySelector('.sp-message')).toBeFalsy()
  })
  test('多次调用方法应该创建多个实例', async () => {
    createMessage({ message: 'hello world 1', duration: 0 })
    createMessage({ message: 'hello world 2', duration: 0 })
    await rAF()
    //    console.log('before:', document.body.innerHTML)
    let elements = document.body.querySelectorAll('.sp-message')
    expect(elements.length).toBe(2)
    closeAll()
    await rAF()
    console.log('after:', document.body.innerHTML)
    elements = document.body.querySelectorAll('.sp-message')
    expect(elements.length).toBe(0)
  })

  test('创建多个实例应该设置正确的 offset', async () => {
    createMessage({ message: 'hello world 1', duration: 0, offset: 100 })
    createMessage({ message: 'hello world 2', duration: 0, offset: 50 })
    await rAF()
    console.log('html', document.body.innerHTML)
    const elements = document.body.querySelectorAll('.sp-message')
    const firstTop = getTopValue(elements[0])
    const secondTop = getTopValue(elements[1])
    expect(firstTop).toBe(100)
    expect(secondTop).toBe(150)
  })
})
