# 单元测试

-   单元测试框架

```
  Node.js本身集成 require(“assert”);
  should.js(BDD断言库)
  expect.js(BDD断言库)
  chai.js(TDD BDD双模)
  Jasmine.js(BDD)
  Intern 更是一个大而全的单元测试框架
  QUnit 一个游离在jQuery左右的测试框架
  Macaca 一套完整的自动化测试解决方案 国产神器来自阿里
```

![img](/static/QA/1.jpg)

-   自动化单元测试

    Karma 是一个基于 Node.js 的 Javascript 测试执行过程管理工具（test runner），可用于测试所有主流 web 浏览器，可以集成到持续集成工具里面。

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

## 性能测试

-   基准测试

```
面向切面编程AOP无侵入式统计
Benchmark基准测试方法，它并不是简单地统计
执行多少次测试代码后对比时间，它对测试有着
严密的抽样过程。执行多少次取决于采样到的数
据能否完成统计。根据统计次数计算方差。
```

-   压力测试

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

## 安全测试

-   XSS
-   SQL
-   CSRF

## 功能测试

-   selenium-webdriver
-   protractor
-   selenium-standalone
-   http://webdriver.io/ WEBDRIVERI/O
-   冒烟测试 SmokeTest 自由测试的一种，找到一个 BUG 开发
    修复，然后专门针对此 BUG,优点节省生煎防止 build 失败，
    缺点是覆盖率极低。
-   回归测试 修改一处对整体功能全部测试，一般配合自动化
    测

## 案例
[vue多页应用+自动化测试](https://github.com/jadepam/vueMpa)