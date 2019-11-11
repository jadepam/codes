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
      - [函数式编程（lodash库）](#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8Blodash%E5%BA%93)
      - [测试](#%E6%B5%8B%E8%AF%95)
        - [单元测试](#%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95)
        - [性能测试](#%E6%80%A7%E8%83%BD%E6%B5%8B%E8%AF%95)
        - [安全测试](#%E5%AE%89%E5%85%A8%E6%B5%8B%E8%AF%95)
        - [功能测试](#%E5%8A%9F%E8%83%BD%E6%B5%8B%E8%AF%95)
  - [前端工程化与持续构建](#%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96%E4%B8%8E%E6%8C%81%E7%BB%AD%E6%9E%84%E5%BB%BA)
    - [webpack：趋势开箱即用](#webpack%E8%B6%8B%E5%8A%BF%E5%BC%80%E7%AE%B1%E5%8D%B3%E7%94%A8)
    - [工程化与持续集成免密登录、TravisCI等](#%E5%B7%A5%E7%A8%8B%E5%8C%96%E4%B8%8E%E6%8C%81%E7%BB%AD%E9%9B%86%E6%88%90%E5%85%8D%E5%AF%86%E7%99%BB%E5%BD%95travisci%E7%AD%89)
      - [版本管理：](#%E7%89%88%E6%9C%AC%E7%AE%A1%E7%90%86)
      - [git自动化部署](#git%E8%87%AA%E5%8A%A8%E5%8C%96%E9%83%A8%E7%BD%B2)
      - [Travis CI & github 自动发布npm插件](#travis-ci--github-%E8%87%AA%E5%8A%A8%E5%8F%91%E5%B8%83npm%E6%8F%92%E4%BB%B6)
      - [Settings Sync & github 同步 vscode配置](#settings-sync--github-%E5%90%8C%E6%AD%A5-vscode%E9%85%8D%E7%BD%AE)
      - [代码检查工作流：husky（避免糟糕的git commit） 和 lint-staged（执行所需脚本）](#%E4%BB%A3%E7%A0%81%E6%A3%80%E6%9F%A5%E5%B7%A5%E4%BD%9C%E6%B5%81husky%E9%81%BF%E5%85%8D%E7%B3%9F%E7%B3%95%E7%9A%84git-commit-%E5%92%8C-lint-staged%E6%89%A7%E8%A1%8C%E6%89%80%E9%9C%80%E8%84%9A%E6%9C%AC)
  - [编程](#%E7%BC%96%E7%A8%8B)
    - [leetcode](#leetcode)
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
- 1、立即执行函数
- 2、闭包内部函数可以访问外部函数的变量,把函数返回出去;闭包可以保护内部的变量，闭包造成内存泄漏==null
- 3、原型链、
- - 3.1 构造函数里的属性的优先级比原型链的要高
- - 3.2面向对象编程的时候Js没有类的感念可以用函数替代
- - 3.3 constructor实际就是对应的那个函数
- - 3.4 prototype按引用传递的 Obejct.create原型链的副本
- 4、数值、字符串、布尔类型按值传递；按引用传递对象~数组~
- 5、改变this的方法 call apply，bind返回新的对象
- 6、函数提升的级别要比变量高

### js函数式编程与测试
#### 函数式编程（lodash库）
  纯函数：纯函数是这样一种函数，即相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用。通过延迟执行的方式把不纯的函数转换为纯函数。
  函数柯里化：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数

#### 测试
##### 单元测试

  - 单元测试框架
  ```
    better-assert(TDD断言库Github 190star 19fork) 
    should.js(BDD断言库Github 2295star 194fork) 
    expect.js(BDD断言库Github 1391star 162fork) 
    chai.js(TDD BDD双模Github 2823star 271fork) 
    Jasmine.js(BDD Github10723star1680fork) 
    Node.js本身集成 require(“assert”); 
    Intern 更是一个大而全的单元测试框架 
    QUnit 一个游离在jQuery左右的测试框架 
    Macaca 一套完整的自动化测试解决方案 国产神器来自阿里
   ```
  ![img](/static/QA/1.jpg)

  - 自动化单元测试

    Karma 是一个基于 Node.js 的Javascript 测试执行过程管理工具（test runner），可用于测试所有主流web浏览器，可以集成到持续集成工具里面。
    ```
    karma 自动化runner集成PhantomJS无刷新 
    karma init karma.conf.js //生成配置文件
    karma start karma.conf.js//执行测试
    npm install -g karma 
    npm install karma-cli —save-dev 
    npm install karma-chrome-launcher —save-dev 
    npm install karma-phantomjs-launcher —save-dev 
    npm install karma-mocha —save-dev 
    npm install karma-chai —save-dev

    npm install karma-coverage —save-dev // 报告和单测覆盖率检查
    coverageReporter: { type: 'html',dir: 'coverage/' } //配制代码覆盖测试率
    生成
    ```
##### 性能测试
  - 基准测试
   ```
  面向切面编程AOP无侵入式统计 
  Benchmark基准测试方法，它并不是简单地统计
  执行多少次测试代码后对比时间，它对测试有着
  严密的抽样过程。执行多少次取决于采样到的数
  据能否完成统计。根据统计次数计算方差。
  ```
  - 压力测试
  ```
  对网络接口做压力测试需要检查的几个常用指标有吞吐率、响应时间
  和并发数，这些指标反映了服务器并发处理能力。 
  PV网站当日访问人数 UV独立访问人数。PV每天几十万甚至上百万就
  需要考虑压力测试。换算公式QPS=PV/t ps：1000000/
  10*60*60=27.7(100万请求集中在10个小时，服务器每秒处理27.7
  个业务请求) 
  常用的压力测试工具是ab、siege、http_load。 
  ab -c 100 -n 100 http://localhost:8001 每秒持续发出28个请求
  Request per second 表示服务器每秒处理请求数 即为QPS
  Failed requests 表示此次请求失败的请求数 理论上压测值越大增加
  Connection Times 连接时间，它包括客户端向服务器端建立连接、服
  务器端处理请求、等待报文响应的过程
  ```
##### 安全测试
  -  XSS
  -  SQL
  -  CSRF

##### 功能测试
   - selenium-webdriver 
   - protractor 
   - selenium-standalone 
   - http://webdriver.io/ WEBDRIVERI/O 
   - 冒烟测试 SmokeTest 自由测试的一种，找到一个BUG开发
    修复，然后专门针对此BUG,优点节省生煎防止build失败，
    缺点是覆盖率极低。 
   - 回归测试 修改一处对整体功能全部测试，一般配合自动化
    测

 

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

### 工程化与持续集成免密登录、TravisCI等

  main 指令使用查看工具
  
  权限：rwx 111 7
  
    linux/Windows文件传输方法：
    cp\scp： 用于在Linux下进行远程拷贝文件的命令，和它类似的命令有cp，不过cp只是在本机进行拷贝不能跨服务器，而且scp传输是加密的，scp在跨机器复制的时候为了提高数据的安全性，使用了ssh连接和加密方式，如果机器之间配置了ssh免密码登录，那在使用scp的时候密码都不用输入（免密登陆，证书代替密码ssh-keygen）
    ftp\sftp ： FTP是文件服务器，可实现文件的上传下载，存储等功能。sftp加密
    rz/sz ： 用于linux与windows之间的文件上传/下载
    rsync ： 是可以实现增量备份的工具。配合任务计划，rsync能实现定时或间隔同步，配合inotify或sersync，可以实现触发式的实时同步。rsync可以实现scp的远程拷贝，cp的本地拷贝、rm删除和"ls -l"显示文件列表等功能。
    samba服务：Samba服务类似于windows上的共享功能，可以实现在Linux上共享文件，windows上访问，当然在Linux上也可以访问到。 是一种在局域网上共享文件和打印机的一种通信协议，它为局域网内的不同计算机之间提供文件及打印机等资源的共享服务。
    PSCP/PSFTP：PSCP/PSFTP是PuTTY提供的文件传输工具，通过SSH连接，在两台机器之间安全的传输文件，可以用于任何SSH（包括SSHv1、SSHv2）服务器

  #### 版本管理：
    svn：集中式，本地与服务器，文件可以lock
    git: 分布式，http、ssh
    
  #### git自动化部署
  #### [Travis CI & github 自动发布npm插件](/book/TravisCI.MD)
  #### [Settings Sync & github 同步 vscode配置](/book/vscode.MD)
  #### 代码检查工作流：[husky](https://github.com/typicode/husky)（避免糟糕的git commit） 和 [lint-staged](https://github.com/okonet/lint-staged)（执行所需脚本）


## 编程
### [leetcode](/book/leetcode.MD)

### [常用算法](/book/algorithm.MD)

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