import { expect, test, describe, vi, Mocked } from 'vitest'
import { testFn, request } from './utils.js'
import axios from 'axios'

test('test common matcher', () => {
  const name = 'viking'
  expect(name).toBe('viking')
  expect(2 + 2).toBe(4)
  expect(2 + 2).not.toBe(5)
})

test('test object', () => {
  expect({ name: 'viking' }).toEqual({ name: 'viking' })
})

// callback test 回调函数测试
// mock 模拟数据
describe('functions', () => {
  test('create a mock function', () => {
    // 模拟回调函数
    const callback = vi.fn()
    testFn(12, callback)
    expect(callback).toBeCalled()
    expect(callback).toBeCalledWith(12)
  })

  test('spy on method', () => {
    const obj = {
      getName: () => 1,
    }
    // 监控对象方法
    const spy = vi.spyOn(obj, 'getName')
    obj.getName()
    expect(spy).toHaveBeenCalled()
    obj.getName()
    expect(spy).toHaveBeenCalledTimes(2)
  })

  test('mock third party module', async () => {
    vi.mock('axios')
    // 模拟 axios, ts 需要这一步添加类型断言
    const mockAxios = axios as Mocked<typeof axios>
    //     mockAxios.get.mockImplementation(() => Promise.resolve({ data: 123 }))
    mockAxios.get.mockResolvedValue({ data: 123 })
    const result = await request()
    expect(result).toBe(123)
  })
})
