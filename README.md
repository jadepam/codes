<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [前端全栈学习目录](#%E5%89%8D%E7%AB%AF%E5%85%A8%E6%A0%88%E5%AD%A6%E4%B9%A0%E7%9B%AE%E5%BD%95)
  - [1、网页三剑客(html/js/css)](#1%E7%BD%91%E9%A1%B5%E4%B8%89%E5%89%91%E5%AE%A2htmljscss)
    - [html](#html)
    - [js](#js)
    - [css <img src="code/css/images/Pikachu.gif" width="30px">](#css-img-srccodecssimagespikachugif-width30px)
  - [2、js运行时环境](#2js%E8%BF%90%E8%A1%8C%E6%97%B6%E7%8E%AF%E5%A2%83)
    - [浏览器](#%E6%B5%8F%E8%A7%88%E5%99%A8)
    - [node](#node)
    - [deno](#deno)
  - [3、js(视图类)框架](#3js%E8%A7%86%E5%9B%BE%E7%B1%BB%E6%A1%86%E6%9E%B6)
    - [jq](#jq)
    - [vue](#vue)
    - [react](#react)
    - [小程序](#%E5%B0%8F%E7%A8%8B%E5%BA%8F)
  - [4、前端工程化](#4%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96)
    - [构建工具](#%E6%9E%84%E5%BB%BA%E5%B7%A5%E5%85%B7)
    - [自动化测试](#%E8%87%AA%E5%8A%A8%E5%8C%96%E6%B5%8B%E8%AF%95)
    - [持续构建/部署](#%E6%8C%81%E7%BB%AD%E6%9E%84%E5%BB%BA%E9%83%A8%E7%BD%B2)
  - [5、性能优化](#5%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96)
    - [全链路性能优化](#%E5%85%A8%E9%93%BE%E8%B7%AF%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96)
    - [前端监控](#%E5%89%8D%E7%AB%AF%E7%9B%91%E6%8E%A7)
  - [6、程序员必备知识](#6%E7%A8%8B%E5%BA%8F%E5%91%98%E5%BF%85%E5%A4%87%E7%9F%A5%E8%AF%86)
    - [编程](#%E7%BC%96%E7%A8%8B)
    - [网络](#%E7%BD%91%E7%BB%9C)
    - [服务端](#%E6%9C%8D%E5%8A%A1%E7%AB%AF)
    - [工具类](#%E5%B7%A5%E5%85%B7%E7%B1%BB)
  - [7、项目实战](#7%E9%A1%B9%E7%9B%AE%E5%AE%9E%E6%88%98)
    - [全栈系列](#%E5%85%A8%E6%A0%88%E7%B3%BB%E5%88%97)
    - [微信相关](#%E5%BE%AE%E4%BF%A1%E7%9B%B8%E5%85%B3)
    - [服务端](#%E6%9C%8D%E5%8A%A1%E7%AB%AF-1)
    - [好玩的小项目](#%E5%A5%BD%E7%8E%A9%E7%9A%84%E5%B0%8F%E9%A1%B9%E7%9B%AE)
- [8、架构](#8%E6%9E%B6%E6%9E%84)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 前端全栈学习目录
## 1、网页三剑客(html/js/css)

### [html](/book/1、网页三剑客/html.md)

### js
> 理论
- [JavaScript 指南](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide)
<!-- - [JS红宝书](book/1、网页三剑客/JS红宝书.md) -->
<!-- - [js核心原理解析](book/1、网页三剑客/jscore.md) -->
- [es6+next](book/1、网页三剑客/es6.md)
- [ts](book/1、网页三剑客/ts入门.md)

- [一些零碎的js知识](book/1、网页三剑客/js.md)
- [json](book/1、网页三剑客/json.md)
> 实战
- [数据拦截](book/1、网页三剑客/proxy.md)

### css <img src="code/css/images/Pikachu.gif" width="30px">

- 预处理
  - less
  - sass
- 原生
  - css2
  - css3
  - cssNext
  - [css的一些技巧](book/1、网页三剑客/CSS.md)、[code](code/css)
- 后处理
  - postcss


## 2、js运行时环境

### 浏览器
[v8](book/3、js运行时环境/v8.md)

[浏览器工作原理与实践](book/3、js运行时环境/浏览器工作原理与实践.md)
### node

> 理论

> 实战
- [node+koa2 +ssr(Nextjs)搭建小程序服务端+管理后台](code/wechat-cli)
- [node-crawler 初体验](https://github.com/jadepam/node-crawer)

- node BFF

### deno
> 理论

一个基于v8引擎的安全的TypeScript运行时

> 实战
### 桌端应用
> 理论

> 实战

## 3、js(视图类)框架
### jq


### vue

[vue源码](book/2、js视图类框架/vue3.0和react源码.md)

### react

> [理论](https://react.docschina.org/docs/hello-world.html)

- [react源码](book/2、js视图类框架/vue3.0和react源码.md)

> 实战
- [react16.8 中 hooks 结合 dav.js 使用方法](code/reacthooks/src/pages/test/hooks.js)
- [react+TS+UI组件库]()

### 小程序

[小程序底层源码解析](book/2、js视图类框架/小程序底层源码解析.md)

框架：[vuemini](https://vue-mini.gitee.io/guide/installation.html)
## 4、前端工程化
### 构建工具
> 构建工具
- [玩转webpack](book/4、前端工程化/玩转webpack.md)
  [code仓库](code/webpcak)
  [webpack思维导图](book/4、前端工程化/webpack.xmind)
- [webpack 5.* module-federation的应用（微前端）](book/4、前端工程化/webpackv5.md)
- [rollup]适用于js库打包构建
### 规范  
- [Angular commit](book/4、前端工程化/AngularCommit规范.md)
- [语义化版本（Semantic-Versioning）规范格式](book/4、前端工程化/语义化版本规范.md)
- 代码检查工作流
[husky](https://github.com/typicode/husky)（避免糟糕的 git commit） 和 [lint-staged](https://github.com/okonet/lint-staged)（执行所需脚本）

### 自动化测试
- [自动化测试概念](book/4、前端工程化/test.md)
- [postman接口自动化测试]
  
### 持续构建/部署  
- [gitlab &gitlab-ci 自动化部署](book/4、前端工程化/gitlab-ci.MD)
- [Travis CI & github 自动发布 npm 插件](book/4、前端工程化/TravisCI.MD)
- [Settings Sync & github 同步 vscode 配置](book/4、前端工程化/vscode.MD)
- [前端工程化实践指南](book/4、前端工程化/前端工程化实践指南.md)

## 5、性能优化

### [全链路性能优化](book/5、性能优化/全链路性能优化.md)
### 前端监控
- [rrweb](https://github.com/rrweb-io/rrweb)录屏重放
- [搭建前端监控平台](book/5、性能优化/搭建前端监控平台.md)
## 6、程序员必备知识

### 编程
- [leetcode](book/6、程序员必备知识/leetcode.MD)
- [常用算法](book/6、程序员必备知识/algorithm.MD)
- [设计模式](book/6、网页三剑客/Design_pattern.md)
  [code](code/js-code/src/Design_pattern/)

### 网络
- http协议
- [WebSocket](book/6、网页三剑客/WebSocket.md)
- [Web安全攻防实战](book/6、网页三剑客/Web安全攻防实战.md)
### 服务端
- [linux](book/6、程序员必备知识/linux.md)
- [docker]()
- [nginx](book/6、程序员必备知识/nginx.md)
### 工具类
- [git 常用命令](book/6、程序员必备知识/git.md)
## 7、项目实战
### 全栈系列
- [微前端IFrame\WebComponent\Single-SPA](book/7、项目实战/micro-frontends.md)
### 微信相关
- [微信小程序全栈开发](book/7、项目实战/wechat-project-info.MD)
- [微信公众号](book/7、项目实战/wechat.md)

### 服务端
- 大前端bff(Backend for Frontends)
  - node+koa or eggjs
  - [Apollo+graphql](https://www.howtographql.com/basics/0-introduction/)
- [nignx 服务器配置](book/7、项目实战/nignx-config.MD)


### 好玩的小项目
- 1、即刻换颜小程序 （头像 DIY）
  <img src="./static/wxapp.png" width="20%" >

- 2、[JSTP](https://metarhia.github.io/jstp/api/server/) 实现简单聊天室[DOM](code/node-server/README.md)


- 3、[chrome插件](code/chrome)
  百晓生书签管理

# 8、架构

- [中台](book/8、架构/中台.md)

<!-- ## 9、书单&读书笔记
### http相关
  - HTTP权威指南
  - 深入浅出 HTTPS：从原理到实战
  - HTTP/2 in Action 中文版 -->

<!-- ```
doctoc README.md # 更新目录
git remote -v
git push github master
git push gitee master

``` -->

