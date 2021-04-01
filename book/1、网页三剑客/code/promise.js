// 先来分析一下promise的规范
// promise有三种状态：pending，fulfilled，rejected。pending代表等待的状态，在此状态下，可能执行resolve（）的方法，也可能执行reject（）方法，fulfilld代表成功态，此状态下执行resolve（）方法，rejected代表失败态，此状态下执行reject（）方法，一旦成功了就不能失败，反过来也是一样
// 每个promsie都有一个then方法
// 如果new promise 报错了会走失败态（throw new Error（'报错'）也会走失败态
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
    constructor (handle) {
      if (!isFunction(handle)) {
        throw new Error('MyPromise must accept a function as a parameter')
      }
      // 添加状态
      this._status = PENDING
      // 添加状态
      this._value = undefined
      // 执行handle
      try {
        handle(this._resolve.bind(this), this._reject.bind(this)) 
      } catch (err) {
        this._reject(err)
      }
    }
    // 添加resovle时执行的函数
    _resolve (val) {
      if (this._status !== PENDING) return
      this._status = FULFILLED
      this._value = val
    }
    // 添加reject时执行的函数
    _reject (err) { 
      if (this._status !== PENDING) return
      this._status = REJECTED
      this._value = err
    }
  }