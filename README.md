<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [前端笔记](#%E5%89%8D%E7%AB%AF%E7%AC%94%E8%AE%B0)
  - [js语言的新发展](#js%E8%AF%AD%E8%A8%80%E7%9A%84%E6%96%B0%E5%8F%91%E5%B1%95)
    - [linux知识](#linux%E7%9F%A5%E8%AF%86)
    - [php知识](#php%E7%9F%A5%E8%AF%86)
    - [js深入](#js%E6%B7%B1%E5%85%A5)
      - [js](#js)
    - [jq技术内幕：](#jq%E6%8A%80%E6%9C%AF%E5%86%85%E5%B9%95)
    - [es5&es6-9](#es5es6-9)
      - [es5核心](#es5%E6%A0%B8%E5%BF%83)
    - [js函数式编程与测试](#js%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B%E4%B8%8E%E6%B5%8B%E8%AF%95)
  - [前端工程化与持续构建](#%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96%E4%B8%8E%E6%8C%81%E7%BB%AD%E6%9E%84%E5%BB%BA)
    - [webpack：趋势开箱即用](#webpack%E8%B6%8B%E5%8A%BF%E5%BC%80%E7%AE%B1%E5%8D%B3%E7%94%A8)
- [其他](#%E5%85%B6%E4%BB%96)
  - [前端常用工具配置](#%E5%89%8D%E7%AB%AF%E5%B8%B8%E7%94%A8%E5%B7%A5%E5%85%B7%E9%85%8D%E7%BD%AE)
      - [Travis CI & github 自动发布npm插件](#travis-ci--github-%E8%87%AA%E5%8A%A8%E5%8F%91%E5%B8%83npm%E6%8F%92%E4%BB%B6)
      - [Settings Sync & github 同步 vscode配置](#settings-sync--github-%E5%90%8C%E6%AD%A5-vscode%E9%85%8D%E7%BD%AE)
  - [编程](#%E7%BC%96%E7%A8%8B)
      - [常用算法](#%E5%B8%B8%E7%94%A8%E7%AE%97%E6%B3%95)
  - [项目实战系列](#%E9%A1%B9%E7%9B%AE%E5%AE%9E%E6%88%98%E7%B3%BB%E5%88%97)
      - [微信小程序全栈开发](#%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%85%A8%E6%A0%88%E5%BC%80%E5%8F%91)
    - [[node爬虫]](#node%E7%88%AC%E8%99%AB)
      - [好玩的小项目](#%E5%A5%BD%E7%8E%A9%E7%9A%84%E5%B0%8F%E9%A1%B9%E7%9B%AE)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 前端笔记
## js语言的新发展

### linux知识
- windows平台上运行的类UNIX模拟环境[cygwin](https://mirrors.tuna.tsinghua.edu.cn/cygwin/)
### php知识

### js深入

#### js

- 1.函数提升变量提升函数提升优先于变量提升
- 2.当函数名和变量名相同时,如果变量没有被赋值,则函数生效，否则变量生效
- 3.var s= function g(){};g是只读的g只能在函数内部访问
- 4.this谁调用指向谁没人调用他就指向 window
- 5.this当函数创建的时候this指向当前函数的实例
- 6.简单的函数声明不能被new
- 7.es6简写的函数体不能被 new ，否则会报错
- 8.对象与闭包之间必须有分号
- 9.原型链需要先new，找不到值才会去找自身
- 10.闭包用完后，执行=null，避免内存泄漏（变量释放，执行垃圾回收机制）

### jq技术内幕：

### es5&es6-9
#### es5核心
- 1立即执行函数
- 2闭包内部函数可以访问外部函数的变量,把函数返回出去;闭包可以保护内部的变量，闭包造成内存泄漏==null
- 3原型链、
- - 3.1 构造函数里的属性的优先级比原型链的要高
- - 3.2面向对象编程的时候Js没有类的感念可以用函数替代
- - 3.3 constructor实际就是对应的那个函数
- - 3.4 prototype按引用传递的 Obejct.create原型链的副本
- 4数值、字符串、布尔类型按值传递；按引用传递对象~数组~
- 5改变this的方法 call apply，bind返回新的对象
- 6函数提升的级别要比变量高

### js函数式编程与测试



## 前端工程化与持续构建

### webpack：趋势开箱即用

- Webpack1到2最大的升级是tree-shaking，其次是配置文件的对象化，再其次包括插件的写法优化。Webpack2到3的最大升级是scope-hoisting。3到4简化了整个打包配置操作
- code-spliting(代码分割，把代码分离成 Chunk，按需加载)
    webpack2：中懒加载打包会连同样式以内联的形式一起打入JS中，这样的好处在于公共样式也被细化抽离，但是可能会造成样式冗余。
    webpack3：则提供了ExtractTextPlugin中提供了抽取公共样式的方法，公共样式可以额外抽离。
    webpack4：去除CommonsChunkPlugin，新增optimization.splitChunks

- tree-shaking(摇树优化)依赖于ES6
    ```
    使用tree-shaking，它只打包有用的方法，没有用的方法则不会进行打包。
    ree-shaking的消除原理是依赖于ES6的模块特性( ES6 module syntax)，默认是不会触发的，
    在webpack3，你需要配置babel，uglifyjs-webpack-plugin等才能触发。
    在webpack4，production模式默认触发。
    ```

- scope-hoisting(作用域提升)依赖于ES6
    ```
    javascript的模块化就是通过闭包来实现作用域的隔离，但是当我们模块化程度达到一定程度之后，过多闭包会让某些变量没法销毁，造成性能劣势。作用域提升即是把两个闭包合成一个闭包。
    实现原理：分析出模块之间的依赖关系，尽可能的把打散的模块合并到一个函数中去，但前提是不能造成代码冗余。因此只有那些被引用了一次的模块才能被合并。由需要分析出模块之间的依赖关系，因此源码必须采用 ES6 模块化语句，不然它将无法生效。
    webpack3：需要开启webpack.optimize.ModuleConcatenationPlugin来满足作用域提升的功能;
    webpack4：在development mode时没有采用scope hoisting，而production mode时默认开启了该优化
    ```


# 其他

## 前端常用工具配置

#### [Travis CI & github 自动发布npm插件](/book/TravisCI.MD)
#### [Settings Sync & github 同步 vscode配置](/book/vscode.MD)

## 编程
- [leetcode](/book/leetcode.MD)

#### [常用算法](/book/algorithm.MD)

## 项目实战系列
* [react16.8中hooks 结合dav.js使用方法](/code/reacthooks/src/pages/test/hooks.js)
* [React16.8+Next.js+Koa2开发Github全栈项目](/book/react16.8.MD)


#### [微信小程序全栈开发](/book/wechat-project-info.MD)
* [node+koa2 +ssr(Nextjs)搭建小程序服务端+管理后台](/book/koa2-serve.MD)
* [wepy 开发小程序](/book/wepy-app.MD)
* [nignx服务器配置](/book/nignx-config.MD)

### [node爬虫]
* [node-crawler初体验]()
#### 好玩的小项目
1、即刻换颜小程序 （头像DIY）

![img](/static/wxapp.png )