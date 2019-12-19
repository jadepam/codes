<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [前端笔记](#%E5%89%8D%E7%AB%AF%E7%AC%94%E8%AE%B0)
  - [js 语言的新发展](#js-%E8%AF%AD%E8%A8%80%E7%9A%84%E6%96%B0%E5%8F%91%E5%B1%95)
    - [linux 知识](#linux-%E7%9F%A5%E8%AF%86)
    - [php 知识](#php-%E7%9F%A5%E8%AF%86)
    - [js 深入](#js-%E6%B7%B1%E5%85%A5)
      - [js](#js)
    - [jq 技术内幕：](#jq-%E6%8A%80%E6%9C%AF%E5%86%85%E5%B9%95)
    - [es5&es6-9](#es5es6-9)
      - [es5 核心](#es5-%E6%A0%B8%E5%BF%83)
    - [js 函数式编程与测试](#js-%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B%E4%B8%8E%E6%B5%8B%E8%AF%95)
      - [函数式编程（lodash\Ramda 库）](#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8Blodash%5Cramda-%E5%BA%93)
      - [测试](#%E6%B5%8B%E8%AF%95)
  - [CSS知识点](#css%E7%9F%A5%E8%AF%86%E7%82%B9)
  - [前端工程化与持续构建](#%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96%E4%B8%8E%E6%8C%81%E7%BB%AD%E6%9E%84%E5%BB%BA)
    - [webpack](#webpack)
    - [微前端](#%E5%BE%AE%E5%89%8D%E7%AB%AF)
    - [工程化与持续集成免密登录、TravisCI 等](#%E5%B7%A5%E7%A8%8B%E5%8C%96%E4%B8%8E%E6%8C%81%E7%BB%AD%E9%9B%86%E6%88%90%E5%85%8D%E5%AF%86%E7%99%BB%E5%BD%95travisci-%E7%AD%89)
      - [git 自动化部署](#git-%E8%87%AA%E5%8A%A8%E5%8C%96%E9%83%A8%E7%BD%B2)
      - [代码检查工作流](#%E4%BB%A3%E7%A0%81%E6%A3%80%E6%9F%A5%E5%B7%A5%E4%BD%9C%E6%B5%81)
  - [编程](#%E7%BC%96%E7%A8%8B)
    - [leetcode](#leetcode)
    - [常用算法](#%E5%B8%B8%E7%94%A8%E7%AE%97%E6%B3%95)
  - [项目实战系列](#%E9%A1%B9%E7%9B%AE%E5%AE%9E%E6%88%98%E7%B3%BB%E5%88%97)
      - [微信小程序全栈开发](#%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%85%A8%E6%A0%88%E5%BC%80%E5%8F%91)
    - [[node 爬虫]](#node-%E7%88%AC%E8%99%AB)
      - [好玩的小项目](#%E5%A5%BD%E7%8E%A9%E7%9A%84%E5%B0%8F%E9%A1%B9%E7%9B%AE)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 前端笔记

## js 语言的新发展

### linux 知识

-   windows 平台上运行的类 UNIX 模拟环境[cygwin](https://mirrors.tuna.tsinghua.edu.cn/cygwin/)

main 指令使用查看工具

权限：rwx 111 7

    linux/Windows文件传输方法：
    cp\scp： 用于在Linux下进行远程拷贝文件的命令，和它类似的命令有cp，不过cp只是在本机进行拷贝不能跨服务器，而且scp传输是加密的，scp在跨机器复制的时候为了提高数据的安全性，使用了ssh连接和加密方式，如果机器之间配置了ssh免密码登录，那在使用scp的时候密码都不用输入（免密登陆，证书代替密码ssh-keygen）
    ftp\sftp ： FTP是文件服务器，可实现文件的上传下载，存储等功能。sftp加密
    rz/sz ： 用于linux与windows之间的文件上传/下载
    rsync ： 是可以实现增量备份的工具。配合任务计划，rsync能实现定时或间隔同步，配合inotify或sersync，可以实现触发式的实时同步。rsync可以实现scp的远程拷贝，cp的本地拷贝、rm删除和"ls -l"显示文件列表等功能。
    samba服务：Samba服务类似于windows上的共享功能，可以实现在Linux上共享文件，windows上访问，当然在Linux上也可以访问到。 是一种在局域网上共享文件和打印机的一种通信协议，它为局域网内的不同计算机之间提供文件及打印机等资源的共享服务。
    PSCP/PSFTP：PSCP/PSFTP是PuTTY提供的文件传输工具，通过SSH连接，在两台机器之间安全的传输文件，可以用于任何SSH（包括SSHv1、SSHv2）服务器
### php 知识

### js 深入

#### js

-   1.函数提升变量提升函数提升优先于变量提升
-   2.当函数名和变量名相同时,如果变量没有被赋值,则函数生效，否则变量生效
-   3.var s= function g(){};g 是只读的 g 只能在函数内部访问
-   4.this 谁调用指向谁没人调用他就指向 window
-   5.this 当函数创建的时候 this 指向当前函数的实例
-   6.简单的函数声明不能被 new
-   7.es6 简写的函数体不能被 new ，否则会报错
-   8.对象与闭包之间必须有分号
-   9.原型链需要先 new，找不到值才会去找自身
-   10.闭包用完后，执行=null，避免内存泄漏（变量释放，执行垃圾回收机制）

### jq 技术内幕：

### es5&es6-9

#### es5 核心

-   1、立即执行函数
-   2、闭包内部函数可以访问外部函数的变量,把函数返回出去;闭包可以保护内部的变量，闭包造成内存泄漏==null
-   3、原型链、
-   -   3.1 构造函数里的属性的优先级比原型链的要高
-   -   3.2 面向对象编程的时候 Js 没有类的感念可以用函数替代
-   -   3.3 constructor 实际就是对应的那个函数
-   -   3.4 prototype 按引用传递的 Obejct.create 原型链的副本
-   4、数值、字符串、布尔类型按值传递；按引用传递对象~数组~
-   5、改变 this 的方法 call apply，bind 返回新的对象
-   6、函数提升的级别要比变量高

### js 函数式编程与测试

#### [函数式编程]()（lodash\Ramda 库）

-   纯函数：纯函数是这样一种函数，即相同的输入，永远会得到相同的输出，而且没有任何可观察的副作- 用。通过延迟执行的方式把不纯的函数转换为纯函数。
-   函数柯里化：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数
-   [声明式代码示例](./code/flickr/index.html)：声明式的、可组合的方式创建的示例应用
-   Hindley-Milner 类型签名: 推断函数可能的实现，还能够给我们带来自由定理

    ```
    array.reduce(function(total, currentValue, currentIndex, arr), initialValue) initialValue：传递给函数的初始值
    reduce :: (b -> a -> b) -> b -> [a] -> b
    第一个参数为function：f,函数为(b,a)=>b，其中传参数b类等于total，参数a类等于currentValue，返回的b为下一次循环的参数a
    第二个参数为b，b作为参数传入函数f
    第三参数为数组xs，参数a的集合[a]，其中每个a作为参数传入函数f
    最终返回b：第一个参数函数的输出就是 reduce 函数的输出

    ```

#### [测试](/book/test.MD)


## [CSS知识点](/book/CSS.MD)

## 前端工程化与持续构建

### [webpack](/book/micro-frontends.md)

### [微前端](/book/micro-frontends.md)

    IFrame\WebComponent\Single-SPA

### 工程化与持续集成免密登录、TravisCI 等

#### git 自动化部署
git版本管理：

      svn：集中式，本地与服务器，文件可以lock
      git: 分布式，http、ssh

[Travis CI & github 自动发布 npm 插件](/book/TravisCI.MD)

[gitlab &gitlab-ci 自动化部署](/book/gitlab-ci.MD)

[Settings Sync & github 同步 vscode 配置](/book/vscode.MD)

#### 代码检查工作流
[husky](https://github.com/typicode/husky)（避免糟糕的 git commit） 和 [lint-staged](https://github.com/okonet/lint-staged)（执行所需脚本）


## 编程

### [leetcode](/book/leetcode.MD)

### [常用算法](/book/algorithm.MD)

## 项目实战系列

-   [react16.8 中 hooks 结合 dav.js 使用方法](/code/reacthooks/src/pages/test/hooks.js)
-   [React16.8+Next.js+Koa2 开发 Github 全栈项目](/book/react16.8.MD)

#### [微信小程序全栈开发](/book/wechat-project-info.MD)

-   [node+koa2 +ssr(Nextjs)搭建小程序服务端+管理后台](/book/koa2-serve.MD)
-   [wepy 开发小程序](/book/wepy-app.MD)
-   [nignx 服务器配置](/book/nignx-config.MD)

### [node 爬虫]

-   [node-crawler 初体验]()

#### 好玩的小项目

1、即刻换颜小程序 （头像 DIY）

![img](/static/wxapp.png)

2、[JSTP](https://metarhia.github.io/jstp/api/server/) 实现简单聊天室[DOM](/code/node-server/README.md)


------------------------------
```
git remote -v
git push github master
git push gitee master
```