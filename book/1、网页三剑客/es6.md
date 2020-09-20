**目录**

[TOC]

# 1、let、const 有块级代码作用域

作用域：变量的作用范围
- 全局-非函数
- 函数--函数包含，作用域提升(优先级高于变量)
- 块作用域

> var-let-const对比

变量申明| 特点
-------|---
var | 支持变量声明预解析，不支持块，允许重复声明
let | 不支持预解析（先声明再解析），支持块，不允许重复（暂存死区）
const | let➕常量，不允许修改，必须初始化，对象可以改，object.freeze属性可冻结一层


> 块级作用域用途:菜单点击、特殊的for循环，for循环()里面定义的let变量，只在循环体内有效

# 2、解构赋值

解构赋值：多重解构
数组，顺序对位
对象，key多位
字符串也可解构

解构赋值的用途:
- 交换两个数的位置
- 函数返回多个值
- 提取 JSON 数据
- import 模块的时候解构
- 封装框架的默认参数

扩展运算符：...
Math.max（...arr）
对象/数组合并


a). 数据解构赋值:
```
let [a='abc']=[] 解构默认值(里面填写undefined和null的区别)
let [a, b='banana'] = ['aaa', undefined]; 和 let [a, b='banana'] = ['aaa', null]
b). 对象解构赋值:
let {a,b} = {a:'apple', b:'banana'}
一个小坑:
let a;
{a} = {a:'apple'} 需要写成这种 ({a} = {a:'apple'} )
```
例子: 函数传参解构
```
let json={a:'111', b:'222'}
function fn({a, b='Strive'}){
console.log(a,b)
}
fn(json);
------------------------------
封装运动函数: 参数默认值
function doMove({x=0, y=0}={}){
console.log(x, y)
}

doMove({x:0, y:0})
doMove({x:10})
```
c). 字符串解构赋值:

const [a,b,c] = 'wel'; 平时工作用的不多


# 3、字符串模板

``：字符串
${}：引用变量
var message = SaferHTML`<p>${bonk.sender} 向你示好。</p>`;

模版字符串：
- 保持内容格式keep format
- 变量表达式解析，不支持语句

好处支持换行
字符串查找:
- ES5 -> str.indexOf()
- ES6 -> str.includes(xx)
- str.startsWith(xx) 判断字符串开头
- str.endsWith(xx) 判断字符串结尾
- str.repeat(3) 字符串的复制
- 字符串填充（补全）：padStart（头部）和padEnd（尾部）
> 字符串扩展
unicode表示法 ｛\u 编码｝

# 4、函数的变化 扩展运算符和rest运算符
函数扩展：
函数默认值：必填放前面，可选放后面（设置函数默认值）
rest剩余参数只能写在形参列表最后面

箭头函数：使用函数表达式（参数列表）=>{函数体} 
参数
返回值
> 注意事项：

1、内部this在函数创建期间就绑定好了，内部的this对象指向创建期上下文对象，普通函数的this指向是在函数的执行期绑定的（谁执行指向谁）
2、不能作为构造函数，不能new
3、没有arguments
4、不能作为生成器函数
生成器函数以function*开头；
在生成器函数中，yield是一个关键字，如同return。yield可以多次使用，作用是中断生成器，
而在需要的时候可以恢复生成器的执行。

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
```
reset参数, (剩余参数)， 必须放到最后
```
例子1: function fn(...args){ //求和，不用arguments了，为何，因为有箭头函数}
fn(1,2,3,4,5)
例子2: 排序
function fn(...numbers){
return numbers.sort();
}
fn(3,2,-10,90,100);
```
箭头函数:=>
注意:  
- this问题，就是定义时所在的对象，而不是使用时所在的对象，之前有过开发js的经验，都知道this简直令人丧心病狂
- 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误 
- 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
```
//函数传入数组
function fn(a,b,c){
console.log(a,b,c);
}
fn(...[1,2,3])
```
例子: 复制数组
循环
```
Array.from()
[...arr1]
```
rest运算符:
```
function fn(arg1,...args){}
```
# 5、数组
.forEarch((cur,index,arr)=>{})
.map(()=>{return ...}) 
以上可接受两个参数（循环函数，this指向谁）

.filter(()=>{return ...}) 返回为true则留下，过滤
.some(()=>{return ...}) 类似查找，数组里面某个元素符合条件，返回true
.every(()=>{return ...})类似查找，数组里面所有元素符合条件，返回true

.reduce((prev,cur,index,arr)=>{},initialValue)从左往右，求数组和\阶乘,initialValue初始值prev

.reduceRight(()=>{})从右往左

> Iterator 与 for of循环
```
for...of...循环
允许你遍历 Arrays（数组）, Strings（字符串）, Maps（映射）, Sets（集合）等可迭代的数据结构等
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
```
Array.from(类数组):把类数组，对象转化成数组

Array.of()把一组值转化为数组
Array.find(()=>{return ...}) 查找，返回第一个符合条件的数组成员，如无返回undefined

Array.findIndex(()=>{return ...})查找，返回第一个符合条件的数组成员的位置，如无返回-1

Array.fill(填充,开始,结束)填充

ES2016新增
```
Array.indexOf()

Array.includes(xx)
```


# 6、对象简洁语法json

对象简洁语法

Object.is() 比较两个值是否相等

Object.assign(目标对象{},source1,source2) 合并对象,克隆对象（复制）

Object.keys()
Object.values()

Object.entries()

ES2018 对象支持...

对象：
//浅拷贝
.assign({},{}) :后者覆盖前者，
.create() 通过defineProperty添加或者修改属性
.freeze()




> 对象扩展：
对象简洁表示法：key与变量名一直，可简写
属性名表达式

# 7、Promise
构造函数，接收一个参数callback，把要执行的异步任务放置在这个callback中，内部维护一个状态，默认是pending，另有resolved，rejected
作用：解决异步问题

传统方式：回调函数，事件

语法：
```
let promise = new Promise((resolve,reject)=>{
//通过resolve成功，reject失败改变内部状态
})
promise.then(success,fail)//在状态改变时触发，接收两个回调函数，分布对应resolved执行success，rejected执行fail，返回值认为promise对象

promise.catch(err=>{//发生错误的别名
    console.log(err)
})

Promise.resolve(resolve=>{//成功
    console.log(resolvesort)
})

Promise.reject(reject=>{//失败
    console.log(reject)
})


promise.all(...).then()   all必须确保所有的promise对象都是resolve状态

promise.race(...).then()  race只要有一个成功即可
```
# 8、模块化

导出：export
导入：import


export和export default，输出单个值，使用export default，输出多个值，使用export，default与普通的export不要同时使用

模块输出一个函数，首字母应该小写；模块输出一个对象，首字母应该大写

> 模块化相关知识点：Commonjs、ES6 import区别(参考自《webpack实战：入门、进阶与调优》)

export，两者本质区别前者模块依赖关系建立发生在代码运行阶段，而后者发生在代码编译阶段。由此可知前者被require时，模块路径可以动态指定，支持表达是或者if语句；而后者不支持，并且导入导出语句必须位于模块的顶层作用域，也正因为ES6 Module是静态的模块结构，故借此特性，可以实现死代码检测和排除、模块变量类型检查、编译优化（对象vs变量）
# 9、类
面向对象，类
属性、方法

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

2、this，this矫正方法,fn.call,fn.apply,fn.bind

class里面取值函数（getter）,存值函数（setter）
静态方法（static），就是类身上的方法
子类extends继承父类方法

super
第一种情况，super作为函数调用时，代表父类的构造函数。
第二种情况，super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。


# 10、symbol & generator

symbol：属性私有化
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
function *show(){
    yield
    //产出
}//加*号区分是generator函数

let g1=show()
g1.next().value.then(res=>{})

generator:自动化generator函数调用器
```
//fn为generator函数

const co=(callback)=>{
    let cb=callback()
    //递归得调用cb的next方法
    cb.next()
    function next(d){
        let result=cb.next(d)//value,done
        if(result.do){
            return
        }
        result.value.then(data=>{
            next(data)
        })
        next()
    }
    
}
co(fn)
```
> 如何解决async抛出异常影响后续代码
```
try catch捕获异常
```
# 11、async 与 await
```
async function fn(){//表示异步，这个函数里面有异步任务
let f1= await readFile('data/a.txt')//表示后面结果要等待
...
}
fn()
```
async 特点：

1、await只能放到async函数中

2、更加语义化

3、await后面可以是promise对象，可以是数字，字符串，布尔

4、async函数返回的是一个promise对象

5、只要await语句后面Promise状态变成reject，那么整个async函数会终端执行

> 如何解决async抛出异常影响后续代码
```
try{}catch(e){}

promise本身的catch
```
# 12、set与map

数组结构:数组、json，交叉树

> set 新的数据结构

类似数组，值不能重复常用数组去重复

用法：var set = new Set([1, 2, 3, 4, 4]);
   [...set]// 返回数组，不加...返回set结构本身

> new set()的方法
- .add(value)：添加某个值，返回set结构本身
- .delete(value)：删除某个值，返回一个布尔值
- .has(value)：返回布尔值
- .clear()：删除所以成员，无返回值
- size：属性，返回个数
-  set内部的元素可以遍历for...of...与forEarch
- .keys()
- .values()
- .entries()
- .forEach()



> weakset，new WeakSet({})存储json

- .add();初始通过add添加
- .delete();
- .has();

> map:对象保存键值对

    js的对象只能使用字符串当作键，map类似对象，其key的范围不限字符串，可为各种类型的值（包括对象）。Object结构提供了“字符串-值”的对应，map提供“值-值”的对应，是一种更完善的hash结构实现。

   - 用途：类数据私有化

> new Map()的方法

- .set(key,value)设置一个值
- .get(key) 获取一个值
- .delete(key)
- .has(key)
- .size
- .clear()
- .keys()
- .values()
- .entries()
- .forEach()
- for...of...方法 与 forEach()方法

    注意：
    NaN同一个键
    map的键是根据内存地址绑定的
    key的顺序永远为添加顺序

> WeakMap():key只能是对象,key 是弱引用，GC机制不考虑回收问题

总结：
set里面是数组，不重复，没有key，没有get方法  
map对JSON功能增强，key可以是任意值
  
  
内置对象：
string
number
array
object
set
weakset
map
weakmap
数组：
.includes()
.foreach()
.every() 全选
.some()多选一
.filter()过滤，值不变
.map()新映射
.reduce(fn (pre,current),0) 统计


# 13、数字（数值）变化与Math

- 数值扩展：
- 二进制：0b
- 八进制：0o
- 十进制：非0
- 十六进制：0x

二进制：(binary)
    let a=0b01
八进制：(Octal)
    let a=0o666
十六进制
    #ccc

Number()、parseInt()、parseFloat()


> Number对象下的方法：
- .isNaN()
- .isFinite() 判读是不是数字
- .isInteger() 判断数字书是不是整数
- .isSafeInteger() 判断数字是不是安全整数
- .MAX_SAFE_INTEGER 最大安全整数
- .MIN_SAFE_INTEGER  最小安全整数
- 安全整数：-（2**53-1）~(2**53-1)


> Math：
- .abs()绝对值
- .sqrt()平方根
- .random()返回0~1随机数
- .trunc(number)截断
- .sign()判断一个数到底是正数，负数，还是0
- .cbrt()计算一个数的立方根，等同于Math.pow(n,1/3)方法
- .hypot()计算所有参数平方和的平方根
- Math.round(x)　  四舍五入 加上0.5向下取整　Math.round(-11.2)　　-10
- Math.ceil(x)　　  不小于x的最小整数Math.ceil(-1.5)　　-1
- Math.floor(x)　　返回小于等于x的最大整数　Math.floor(-5.99)　　-6
- Math.random()　生成0和1之间的随机小数
- Math.floor(Math.random() * 7 + 1)生成0和8之间的随机整数,注意是整数，不是小数



# 14、ES2017\ES2018（ES9）新增
Decorator是一个函数，用来修改类或者类的属性的行为。说的直白点decorator就是给类添加或者修改类的变量与方法的
@decorator
class A {}

// 等同于

class A {}
A = decorator(A) || A;


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

# 16、迭代器

for in：key，可枚举属性

for of：value，of一个可迭代对象，该对象实现了迭代器，迭代器有symbol.iterator方法，该方法返回一个next对象
```
var obj=｛｝
obj[symbol.iterator]=function(){
return {
next:function(){
return{
value:""
done:true/false 为true跳出循环
}}}}

```
[Symbol.iterator]属性运行Array.prototype[Symbol.iterator]测试；
属性值是函数，执行函数返回一个迭代器；这个迭代器就有next方法可执行顺序迭代子元素；
更多[参考](https://es6.ruanyifeng.com/#docs/)












