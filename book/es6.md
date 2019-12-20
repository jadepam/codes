es6+next知识点
------------------------------------
# 1、let、const 有块级代码作用域
没有预解析，不存在变量提升
不能重复定义
特殊的for循环，for循环()里面定义的let变量，只在循环体内有效
const和let差不多，只不过人家是常量，不能改变
# 2、解构赋值
a). 数据解构赋值:
```
let [a='abc']=[] 解构默认值(里面填写undefined和null的区别)
let [a, b='banana'] = ['aaa', undefined]; 和 let [a, b='banana'] = ['aaa', null]
b). 对象解构赋值:
let {a,b} = {a:'apple', b:'banana'}
一个小坑:
let a;
{a} = {a:'apple'} 需要写成这种 ({a} = {a:'apple'} )

例子: 函数传参解构
let json={a:'111', b:'222'}
function fn({a, b='Strive'}){
console.log(a,b)
}
fn(json);
```
------------------------------
封装运动函数: 参数默认值
```
function doMove({x=0, y=0}={}){
console.log(x, y)
}

doMove({x:0, y:0})
doMove({x:10})
```
c). 字符串解构赋值:
const [a,b,c] = 'wel'; 平时工作用的不多
解构赋值的用途:
交换两个数的位置
函数返回多个值
提取 JSON 数据
import 模块的时候解构
封装框架的默认参数
# 3、字符串模板
``：字符串
${}：引用变量
var message = SaferHTML`<p>${bonk.sender} 向你示好。</p>`;

好处支持换行
字符串查找:
```
ES5 -> str.indexOf()
ES6 -> str.includes(xx)
str.startsWith(xx) 判断字符串开头
str.endsWith(xx) 判断字符串结尾
str.repeat(3) 字符串的复制
字符串填充（补全）：padStart（头部）和padEnd（尾部）
```
# 4、函数的变化 扩展运算符和rest运算符
函数参数的默认值
```
function fn(a='欢迎',b='mmr'){
console.log(a, b);
}
```
函数参数变量默认是声明的，不能再用let或者const声明
```
function foo(x = 5) {
let x = 1; // error
const x = 2; // error
}
```
配合对象解构，如果不默认赋值会报错
```
function foo({x, y = 5} = {}) {
console.log(x, y);
}
foo() // undefined 5
reset参数, (剩余参数)， 必须放到最后
```
例子1: 
```
function fn(...args){ //求和，不用arguments了，为何，因为有箭头函数}
fn(1,2,3,4,5)
例子2: 排序
function fn(...numbers){
return numbers.sort();
}
fn(3,2,-10,90,100);
```
箭头函数:=>
注意:  
this问题，就是定义时所在的对象，而不是使用时所在的对象，之前有过开发js的经验，都知道this简直令人丧心病狂
不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误 
不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
//函数传入数组
```
function fn(a,b,c){
console.log(a,b,c);
}
fn(...[1,2,3])
```
例子: 复制数组
循环
```
Array.from(）
[...arr1]
```
rest运算符:
```
function fn(arg1,...args){}
```
# 5、数组
```
.forEarch((cur,index,arr)=>{})
.map(()=>{return ...}) 
```
以上可接受两个参数（循环函数，this指向谁）
```
.filter(()=>{return ...}) 返回为true则留下，过滤
.some(()=>{return ...}) 类似查找，数组里面某个元素符合条件，返回true
.every(()=>{return ...})类似查找，数组里面所有元素符合条件，返回true

.reduce((prev,cur,index,arr)=>{})从左往右，求数组和\阶乘
.reduceRight(()=>{})从右往左
```
```
for...of...循环
```
允许你遍历 Arrays（数组）, Strings（字符串）, Maps（映射）, Sets（集合）等可迭代的数据结构等
```
for(let val of arr)
for(let index of arr.keys())
for(let val of arr.entries())
for(let [key,val] of arr.entries())
```
ES2017新增运算符：幂
老：Math.pow(x*y)
新：x**y
==== ==== === === === === ===
扩展运算符
```
let a = [1,2,3]
let b= [...a]

Array.from(类数组):把类数组，对象转化成数组

Array.of()把一组值转化为数组
Array.find(()=>{return ...}) 查找，返回第一个符合条件的数组成员，如无返回undefined

Array.findIndex(()=>{return ...})查找，返回第一个符合条件的数组成员的位置，如无返回-1

Array.fill(填充,开始,结束)填充

ES2016新增
Array.indexOf()
Array.includes(xx)

```

# 6、对象简洁语法json

对象简洁语法
```
Object.is() 比较两个值是否相等

Object.assign(目标对象{},source1,source2) 合并对象,克隆对象（复制）

Object.keys()
Object.values()

Object.entries()

ES2018 对象支持...

```

# 7、Promise承诺
作用：解决异步问题

传统方式：回调函数，事件

语法：
```
let promise = new Promise(function(resolve,reject){
//resolve成功
//reject失败
})
promise.then(success,fail)

promise.catch(err=>{//发生错误的别名
    console.log(err)
})

promise.resolve(resolve=>{//成功
    console.log(resolvesort)
})

promise.reject(reject=>{//失败
    console.log(reject)
})


promise.all(...).then()   all必须确保所有的promise对象都是resolve状态

promise.race(...).then()  race只要有一个成功即可
```
# 8、模块化
export:负责模块化输出
import:负责模块话引入

export和export default
输出单个值，使用export default
输出多个值，使用export
export default与普通的export不要同时使用

模块输出一个函数，首字母应该小写；模块输出一个对象，首字母应该大写

# 9、类
面向对象，类
属性
方法

函数模拟

人：Person

Person.prototype.showName

ES5之前
```
function Person(){

}
Person.prototype.showName=function(){}
```
ES6中的变形
```
let aaa='haha'
class Person{
  constructor(name,age){//构造函数方法，调用new自动执行
    console.log("asdas",${name},${age})
 }//无逗号
 showName(){
   return '年龄：${this.age}'
 }

[aaa](){//函数名可以为变量，json也可
     return '哈哈哈...' 
}

}
let p1 =new Person('xx',18)
console.log(p1.showName(),p1.haha(),p1[aaa])
```
注意：
1、ES6无提升（预解析），ES5
2、this

this矫正方法
```
fn.call
fn.apply
fn.bind
```
class里面取值函数（getter）,存值函数（setter）
静态方法（static），就是类身上的方法
子类extends继承父类方法

super
第一种情况，super作为函数调用时，代表父类的构造函数。
第二种情况，super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。



# 10、symbol & generator
symbol:新的原始数据类型，Undefined、Null、Boolean、String、Number、对象（Obiect）、function
```
let syml= Symbol('aaa')//不用new，返回是唯一值（做key，定义唯一或者私有的）
Object.getOwnPropertySymbols(a)：取一个对象上的Symbol属性名
Reflect.ownKeys(a)：返回所有类型的属性名
```
generator函数

生成器
解决异步，深度嵌套，async,可以保存状态
语法：
```
function *show(){
    yield
    //产出
}//加*号区分是generator函数

let g1=show()
g1.next().value.then(res=>{})
```
# 11、async 与 await
```
async function fn(){//表示异步，这个函数里面有异步任务
let f1= await readFile('data/a.txt')//表示后面结果要等待
...
...
...
}
fn()
```
async 特点：

- 1、await只能放到async函数中
- 2、更加语义化
- 3、await后面可以是promise对象，可以是数字，字符串，布尔
- 4、async函数返回的是一个promise对象
- 5、只要await语句后面Promise状态变成reject，那么整个async函数会终端执行

如何解决async抛出异常影响后续代码
```
try{}catch(e){}
```
promise本身的catch

# 12、set与map
set

数组结构
  数组
  json，交叉树

set 新的数据结构

类似数组，值不能重复常用数组去重复

用法：var set = new Set([1, 2, 3, 4, 4]);
   [...set]// 返回数组，不加...返回set结构本身

四个操作方法
```
add(value)：添加某个值，返回set结构本身
delete(value)：删除某个值，返回一个布尔值
has(value)：返回布尔值
clear()：删除所以成员，无返回值
size：属性，返回个数
 set内部的元素可以遍历for...of...与forEarch
```
weakset，new WeakSet({})存储json
```
.add();初始通过add添加
.delete();
.has();
```
map:对象保存键值对
```
new Map()
.set(key,value)设置一个值
.get(key) 获取一个值
.delete(key)
.has(key)
.size
.clear()
for...of...方法 与 forEach()方法
```
WeakMap():key只能是对象

总结：
set里面是数组，不重复，没有key，没有get方法  
map对JSON功能增强，key可以是任意值
  
# 13、数字（数值）变化与Math

二进制：(binary)
    let a=0b01

八进制：(Octal)
    let a=0o666

十六进制
    #ccc

Number()、parseInt()、parseFloat()

Number对象下的方法：
```
.isNaN()
.isFinite() 判读是不是数字
.isInteger() 判断数字书是不是整数
.isSafeInteger() 判断数字是不是安全整数
.MAX_SAFE_INTEGER 最大安全整数
.MIN_SAFE_INTEGER  最小安全整数
安全整数：-（2**53-1）~(2**53-1)
```

Math：
```
.abs()绝对值
.sqrt()平方根
.random()返回0~1随机数
.trunc(number)截断
.sign()判断一个数到底是正数，负数，还是0
.cbrt()计算一个数的立方根，等同于Math.pow(n,1/3)方法
.hypot()计算所有参数平方和的平方根
```
# 14、ES2018（ES9）新增


# 15、Proxy的使用(代理）
用于修改某些操作的默认行为
new Proxy(targer,handler)
targer：用Proxy包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
handler：一个对象，其属性是当执行一个操作时定义代理的行为的函数
示例：解决window.addEventListener重复调用
 ```
((w)=>{
    w.listenerList=new Set();
    const _cache=w.addEventListener;
    const handler ={
        apply:(target,thisArg,args)=>{
            target();
            listenerList.add(args[0]);
            Reflect.apply(_cache,w,args);
        }
    };
    w.addEventListener=new Proxy({},handler);
})(window);
```
# 16、什么是回调 
软件模块之间总是存在着一定的接口，从调用方式上，可以把他们分为三类：同步调用、回调和异步调用。

同步调用, 是一种阻塞式调用，调用方要等待对方执行完毕才返回，它是一种单向调用；
回调,     是一种双向调用模式，也就是说，被调用方在接口被调用时也会调用对方的接口；
异步调用, 是一种类似消息或事件的机制，不过它的调用方向刚好相反，
          接口的服务在收到某种讯息或发生某种事件时，会主动通知客户端（即调用客户端的接口）。










