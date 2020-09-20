

**目录**

[TOC]

# 1、环境搭建&项目配置

> 几个重要的知识点

node:生产环境中使用，尽量使用LTS版本（带LTS版本官方维护期30个月;无此标记会在新版本发布后的2个月停止维护。

npm/yarn:一般来说，不推荐通过npm安装Yarn，在用基于Node.js的包管理工具安装Yarn时，该包未被签名，并且只通过基本的SHA1散列进行唯一完整性检查。这在安装系统级应用时有安全风险。为此，建议访问以下网址，采用Yarn官方推荐的方式进行安装：https://yarnpkg.com/zh-Hans/docs/install#mac-tab

TypeScript:TypeScript自带的tsc命令；TypeScript的运行时ts-node（封装了TypeScript编译的过程，提供直接运行TypeScript代码的能力）
```
tsc --init//tsconfig.json

tsc index.ts
node index.js

ts-node index.ts
```



# 2、ts语法

TypeScript 类型注解和类型推断，所谓**类型注解**（Type annotation），就是人为为一个变量指定类型；所谓**类型推断**（Type inference）就是 TypeScript 可以通过变量值倒推变量类型，因此在绝大部分情况下，我们是不需要去写类型注解的;

## 1、**类型注解**

TypeScript是JavaScript的超集

- 基本类型注解： 
  - 布尔类型（boolean）
  - 数字类型（number）
  - 字符串类型(string)
- 数组类型（array）
- 元组类型（tuple）
  元组是数组拓展，已知元素数量和类型的数组
```js
let arr:[number,string]=[1,'string']//any
console.log("元组",arr)//元组,[1, "string"]
```
- 特殊的：any、null、undefined和void

  - 任意类型（any）、字面变量
  - null 和 undefined
  - unknown 未知类型：3.0版本新增的类型，它表示未知的类型，"unknown 相对于 any 是安全的

  ```js
  let value:any;
  console.log(vlaue.name);
  console.log(vlaue.toFixed);
  console.log(value.length);
  ```

  - void类型：void 和 any 相反，表示没有任意类型.定义函数，函数没有返回值时会用到：	

  ```js
  const consoleText = (text: string): void => {
    console.log(text);
  };
  ```

  ```json
  void 类型的变量只能赋值为 undefined 和 null ，其他类型不能赋值给 void 类型的变量
  ```

- never类型
  never 类型指那些永不存在的值的类型,包括null与undefined。当一个函数返回空值时，它会返回一个void；但是，当一个函数根本就没有返回值，或者总是抛出错误时，它会返回一个never

  ```json
  const errorFunc = (message:string):never=>{
      throw new Error(message);
  }
  ```

  ```
  这个 errorFunc 函数总是会抛出异常，所以它的返回值类型是 never，用来表明它的返回值是用不存在的
  ```

  ```js
  const infiniteFunc = ():never=>{
      while(true){}
  }
  let neverVar=(()=>{
      while(true){}
  })();
  neverVar = 123;//error 不能将类型"number"分配给类型"never"
       
  ```

- **泛型**

  用于提升代码的重用性，any；泛型：解决类、接口、方法的复用性，以及对不特定数据类型的支持.

  ```
  <T>泛型变量、泛型类 、 泛型接口
  要实现泛型接口，这个类应该是泛型类
  类作为参数，约束数据传入的类型
  ```

- 接口interface

  提供了表达字典的能力，表达字典的类型是interface最常用的场景,以及interface作为接口的能力

- 内联类型注解

- 类型别名

> 交叉类型与联合类型:如果一个值是联合类型，我们只能访问它们共有的属性

- 交叉类型

  交叉类型就是取多个类型的并集，使用&符号定义，被&链接的过个类型构成一个交叉类型，表示这个类型同事具备这几个连接起来的类型的特点

  ```
  const merge=<T,U>(arg1:T,arg2:U):T & U =>{
      // 这里指定返回值的类型兼备T和U两个类型变量代表的类型的特点;
      let res = <T & U>{};
      // 这里使用Object.assign方法，返回一个合并后的对象；
      res = Object.assign(arg1,arg2);
      return res;
  }
  const info1={
      name:"duke"
  }
  const info2={
      age:18
  }
  const dukeinfo=merge(info1,info2);
  console.log(dukeinfo.address);
  //error 类型“{ name: string; } & { age: number; }”上不存在属性“address”
  ```

- 联合类型

  联合类型实际是几个类型的结合，但是和交叉类型不同，联合类型是要求只要符合联合类型中任意一种类型即可，它使用|符号定义。

  当我们的程序具有多样性，元素类型不唯一时，即使用联合类型

  ```
  const getLength=(content:string|number):number=>{
      if(typeof content === "string"){
          return content.length
      }else{
          return content.toString().length;
      }
  }
  console.log(getLength("abc"))//3
  console.log(getLength(123))//3
  
  ```

**类型防护和区分类型**

- as//变量声明：类型断言的两种方式，用“尖括号”、关键字as
- is
- in
- typeof
- instanceof

## 2、接口与类

### 类class

|                   | ES5                                                          | ES6                                                          | TS                                                           |
| ----------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 类和静态方法      | 类名.调用（Promise.all()）                                   | static(只能调用静态属性)                                     | es6+类型申明                                                 |
| 继承              | 原型链继承、对象冒充继承、原型链+对象冒充组合继承```d.prototype.__proto__=b.prototype(d派生类、b基类)``` | class（extends、super）                                      | es6+类型申明                                                 |
| 修饰符            | -                                                            | -                                                            | public(by default)、protected、private（类、子类、实例，依次不可访问 *** -> ** ->  *） |
| constructor构造器 | -                                                            | 使用构造器来定义成员变量，即在类中拥有一个成员，并在构造器中初始化它 | 属性初始化，可在构造器外初始化属性(ES7）                     |
| 存储器属性        | prototype                                                    | get、set                                                     | get、set                                                     |

当在TypeScript中使用类的继承时，它们会生成如下代码:
```
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

```

多态：父类定义一个方法不去实现，让继承的子类去实现，每个子类有不同的表现

抽象类(abstract)：可以作用在类及类的任何成员上；提供基类(abstract成员不能被直接访问，子类必须实现)；abstract类不能直接被实例化，必须创建一个类来继承abstract类

抽象方法：必须放在抽象类中，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现

---

### 接口interface
接口的本质是一种规范和限制，定义标准。

接口对函数参数包含属性的约束、对数组约束、对函数约束、对json约束、规范多个类动作。接口里面我们声明动作和属性，并不包括实现的部分。


- 属性类型接口：obj引入//可多传；**？**(Freshness)//加入**可选参数**，让这些字段可选;**readonly**//只读属性； 
- 函数类型接口：对方法传入的参数、返回的函数值进行约束，批量的
- 可索引接口：数组、对象的约束
- 类类型接口：对类的约束，类似 抽象类；**implements** //一个类通过关键字implements声明自己使用一个或者多个接口(逗号分隔)
- 接口的扩展：继承


## 3、命名空间与模块
### 模块
ts的外部模块简称，侧重代码复用，一个模块里可能会有多个命名空间。模块外部使用命名空间时，需export
### 命名空间

内部模块，主要用于组织代码，避免命名冲突；命名空间内的对象通过export，暴露外部使用

等价于something||（something={}

类型声明空间和变量声明空间 namespace

### 动态导入表达式

import（）（"module"："esnext"）、require.ensure（）

## 4、装饰器：@

常见装饰器：类、属性、方法、参数

执行顺序：同类型多个，由后向前执行；属性》方法》参数》类

装饰器的写法：普通装饰器（无法传参）、装饰器工厂（可传参）

## 5、Mixins

混合”是一个函数。传入一个构造函数=>创建个带有新功能，并且扩展构造函数的新类=>返回这个新类

```ts
//定义构造函数的类型
type Constructor<T = {}> = new (...args: any[]) => T;

//扩展一个类并返回它
function Time<TBase extends Constructor>(Base:TBase){
  return class extend Base{
    time=Date.now()
  }
}
```

## 6、declare申明合并

强烈建议把声明放入独立的.d.ts里，你可以从一个命名为globals.d.ts或vendor.d.ts的文件开始

**lib.d.ts**声明文件。这个文件包含JavaScript运行时及DOM（Document ObjectModel，文档对象模型）中存在的各种常见的JavaScript环境声明

--noLib true/false

修改本地类型，globals.d.ts

**索引签名**：强制用户必须明确写出toString（）的原因是：在对象上默认执行的toString方法非常糟糕;

申明一个索引签名

```ts
const foo:{
[index:string]:{messgae:string}
}
interface Foo{
[key:string]:number;
x:number;
y:number;
z:string//错误：z属性必须是number类型
}
```

## 7、其他

### 函数

- 1、函数的定义:函数声明法、匿名函数
- 2、可选参数:es5里面方法的实参和行参可以不一样，但是ts中必须一样，如果不一样就需要配置可选参数;
- 3、默认参数:es5里面没法设置默认参数，es6和ts中都可以设置默认参数
- 4、剩余参数：...
- 5、函数重载:typescript中的重载：通过为同一个函数提供多个函数类型定义来试下多种功能的目的

### 箭头函数

箭头函数和继承，适用场景：子类中重写父类函数，super只适用原型成员

快速返回对象：（）包围对象字面量的方式来修复它

### for..of

限制，循环节点只支持JavaScript引擎上的string和array，否则ts，会抛出一个错误提示：不是arrayo类型或string类型的；

### 迭代

迭代是面向对象编程语言常见的设计模式；

Fibonacci队列

### 枚举enum

数字枚举和字符串的枚举；**反向映射**是数字枚举独有的，因为TypeScript在实现数字枚举时的代码编译。正向映射（key->value）和反向映射（value->key）

```
enum Roles {
  SUPER_ADMIN,
  ADMIN,
  USER
}//如未赋值则等于下标；状态码常用
console.log(Roles[2],"val=>key");//0
console.log(Roles.USER,'key=>val'); // 0
```

### symbol

### iterator

当一个对象实现了Symbol.iterator时，我们认为它是可迭代的。如array、map、set、string、int32Array、uint32Array等一些内置的类型，目前都已经实现了各自的Symbol.iterator。对象上的Symbol.iterator函数负责返回供迭代的值。for..of语句会遍历可迭代的对象，调用对象上的Symbol.iterator方法

### generator（* yield）

调用generator函数时会返回一个generator对象。generator对象遵循迭代器接口，即通常所见到的next、return和throw函数

### JSX

/// :xml单行注释

### ThisType

通过ThisType，我们可以在对象字面量中输入this，并提供通过上下文类型控制this类型的便捷方式，它只有在--noImplicitThis

# 3、实战

```json
创建一个ts模块
npm init -y//初始化package.json文件
添加TypeScript：npm install typescript --save-dev
添加node.d.ts：npm install@types/node --save-dev
//node.js不是内置对象的一部分，如果想用typescript写Node.js，则需要引入第三方声明文件

配置初始化基础配置：
tsc --init --rootDir src --outDir lib --esModuleInterop --resolveJsonModule --lib dom,es6 --module commonjs


添加ts-node：npm install ts-node --save-dev
我们将会在Node中使用它来实现实时编译和运行。

添加nodemon：npm install nodemon --save-dev
只要文件被改变，它就会调用ts-node。
```

# 5、更多

## 开发&测试工具

### 1、Jest测试

[Jest](https://jestjs.io/docs/en/getting-started)是一个出色的单元测试选项，它提供了良好的对TypeScript的支持

```
npm i jest @types/jest ts-jest -D

ts-jest//它可以让Jest动态地转化TypeScript，并添加内置的source-map支持
```

jest.config.js

```
module.exports={
    "roots":[
        "<rootDir>/src"//目录
    ],
    "transform":{
        "^.+\\.tsx?$":"ts-jest"//文件范围
    }
}
```

运行：

```
1、npm script中添加一条script：jest 
npm run jest -- -w

2、npx jest--watch
```

拓展：

[jest与mocha单元测试](https://www.cnblogs.com/yaokai729/p/11468537.html)

[npx](http://www.ruanyifeng.com/blog/2019/02/npx.html)

### 2、开发工具

ESlint(代码检测)+husky(避免重复提交)+Prettier(代码格式化)+Changelog(日志)

配置文件[tsconfig.json](https://www.typescriptlang.org/tsconfig)

```json
## 编译选项设置
strictNullChecks：非空断言
noImplicitAny

基础配置项：
compilerOptions:someBooleanOption
 - typeRoots:指定编译需打包进来的@type包，如："types" : ["node", "lodash", "express"]
 - lib的分类：【JavaScrip功能】es5~esnext; 【运行环境】dom、dom.iterable、webworker、scripthost；
【ESNext功能选项】es2015.promise等；如果没有指定--lib，则会导入默认库。[插图]当--target选项为es5时，会导入es5、dom、scripthost。[插图]当--target选项为es6时，会导入es6、dom、dom.iterable、scripthost

编辑文件目录配置：
files:
include:
exclude: "exclude"默认情况下会排除node_modules，bower_components，jspm_packages和<outDir>目录
继承配置：
extends

保存编译：
compileOnSave
```

TSConfig：开启allowJs webpack：ts-loader

TSLint：

```
tslint --init
```

## 错误处理

简洁的错误信息和详细的错误信息

[ts手册](https://www.typescriptlang.org/docs/handbook/)

https://www.typescriptlang.org/

[commander.js](https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md)

## 编码建议

变量与函数：camelCase（JavaScript的惯例）

类class：PascalCase（在标准的JavaScript中通常是这么做的）

接口interface：PascalCase

- 使用PascalCase形式为接口命名。原因：和类相同。

- 接口成员使用camelCase方式进行命名。原因：和类的成员使用相同方式进行命名

类型别名：

- 类型别名使用PascalCase形式进行命名。原因：和类相同。

- 类型别名成员使用camelCase形式进行命名。原因：和类的成员使用相同方式进行命名

命名空间：PascalCase（遵循TypeScript团队惯例，命名空间实际上只是一个具有静态成员的类，类的命名形式是PascalCase，因此，命名空间的命名形式也是PascalCase。）

enum枚举类型：枚举类型使用PascalCase形式进行命名。原因：和类相同。

null和undefined：对于需要明确表明不可用的情况，null和undefined都不建议使用。原因：null和undefined通常用于在值之间保持结

格式化：

- 引号：除非转译，否则建议使用单引号（'）
- 空格：建议使用2个空格进行缩进，而不是使用Ta b键
- 分号：不能忘
- 数组：当声明数组时，建议使用foos：Foo[]，而不是foos：Array＜Foo＞
- type和interface：如果需要联合类型或交叉类型，建议使用type。如果想用extends或implements，则建议使用interface。

# 6、ts编译原理

## 编译器

src/compiler

Scanner扫描器（scanner.ts）

Parser解析器（parser.ts）

Binder绑定器（binder.ts）

 Checker检查器（checker.ts）

 Emitter发射器（emitter.ts）