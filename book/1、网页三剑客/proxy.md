数据拦截：
方法一：class继承

```
class test1 {
constructor () {
super()
console.log(this, 'll')
}
api (data) {
return hyraxios(data)
}
}
class test2 extends test1 {
constructor (...data) {
super()
return this.api(data)
}
}



const api = (data) => new test2(data)
console.log(api.config, 'd')
export default api

```
方法二：function

```
const fn = function (...data) {
console.log(data, 'fn')
return hyraxios(...data)
}
export default fn

```
方法三：代理,返回实例对象

```
Reflect.construct(target, argumentsList[, newTarget])对构造函数进行 new 操作，相当于执行 new target(...args)
const proxy = () => {
const handler = {
construct: (target, args, newTarget) => {
// target()
console.log(target, args, newTarget, 'target, thisArg, args')
return Reflect.construct(target, args)
}
}
const api = new Proxy(hyraxios, handler)
return api
}
export default proxy()
const handler = {
construct (target, args, newTarget) { // args是参数数组, newTarget是生成的proxy实例
console.error('拦截数据', args)
return Reflect.construct(target, args)// 默认行为
}
}
var proxy = new Proxy(hyraxios, handler)

export default proxy

```
方法四：修改默认行为 最佳

```
Reflect.apply(target, thisArgument, argumentsList)对一个函数进行调用操作，同时可以传入一个数组作为调用参数。
const handler = {
apply: (target, thisArg, args) => {
console.log('拦截数据', args)
return Reflect.apply(target, thisArg, args)
}
}
const proxy = new Proxy(hyraxios, handler)

```
export default proxy