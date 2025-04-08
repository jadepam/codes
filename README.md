<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [前端全栈开发指南](#%E5%89%8D%E7%AB%AF%E5%85%A8%E6%A0%88%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97)
  - [一、前端基础 (Base)](#%E4%B8%80%E5%89%8D%E7%AB%AF%E5%9F%BA%E7%A1%80-base)
    - [1.1 核心三件套](#11-%E6%A0%B8%E5%BF%83%E4%B8%89%E4%BB%B6%E5%A5%97)
      - [HTML5](#html5)
      - [CSS](#css)
      - [JavaScript](#javascript)
    - [1.2 运行时环境](#12-%E8%BF%90%E8%A1%8C%E6%97%B6%E7%8E%AF%E5%A2%83)
      - [浏览器环境](#%E6%B5%8F%E8%A7%88%E5%99%A8%E7%8E%AF%E5%A2%83)
      - [Node.js生态](#nodejs%E7%94%9F%E6%80%81)
      - [新一代运行时](#%E6%96%B0%E4%BB%A3%E8%BF%90%E8%A1%8C%E6%97%B6)
  - [二、前端框架 (Framework)](#%E4%BA%8C%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6-framework)
    - [2.1 经典框架](#21-%E7%BB%8F%E5%85%B8%E6%A1%86%E6%9E%B6)
      - [Vue生态](#vue%E7%94%9F%E6%80%81)
      - [React生态](#react%E7%94%9F%E6%80%81)
      - [小程序开发](#%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%BC%80%E5%8F%91)
    - [2.2 工程化体系](#22-%E5%B7%A5%E7%A8%8B%E5%8C%96%E4%BD%93%E7%B3%BB)
      - [构建工具](#%E6%9E%84%E5%BB%BA%E5%B7%A5%E5%85%B7)
      - [规范与流程](#%E8%A7%84%E8%8C%83%E4%B8%8E%E6%B5%81%E7%A8%8B)
      - [自动化体系](#%E8%87%AA%E5%8A%A8%E5%8C%96%E4%BD%93%E7%B3%BB)
  - [三、全栈能力 (FullStack)](#%E4%B8%89%E5%89%8D%E7%AB%AF%E8%83%BD%E5%8A%9B-fullstack)
    - [3.1 后端基础](#31-%E5%90%8E%E7%AB%AF%E5%9F%BA%E7%A1%80)
    - [3.2 网络通信](#32-%E7%BD%91%E7%BB%9C%E9%80%9A%E4%BF%A1)
    - [3.3 架构设计](#33-%E6%9E%B6%E6%9E%84%E8%AE%BE%E8%AE%A1)
  - [四、性能优化 (Performance)](#%E5%9B%9B%E5%89%8D%E7%AB%AF%E8%83%BD%E4%BC%98%E5%8C%96-performance)
    - [4.1 性能监控](#41-%E6%80%A7%E8%83%BD%E7%9B%91%E6%8E%A7)
    - [4.2 优化方案](#42-%E4%BC%98%E5%8C%96%E6%96%B9%E6%A1%88)
  - [五、前沿技术 (Advanced)](#%E4%BA%94%E5%89%8D%E7%AB%AF%E6%8A%80%E6%9C%AF-advanced)
    - [5.1 跨端技术](#51-%E8%B7%A8%E7%AB%AF%E6%8A%80%E6%9C%AF)
    - [5.2 智能化方向](#52-%E6%99%BA%E8%83%BD%E5%8C%96%E6%96%B9%E5%90%91)
    - [5.3 新兴领域](#53-%E6%96%B0%E5%85%B4%E9%A2%86%E5%9F%9F)
  - [六、实战项目 (Projects)](#%E5%85%AD%E5%89%8D%E7%AB%AF%E5%AE%9E%E6%88%98%E9%A1%B9%E7%9B%AE-projects)
    - [6.1 完整项目](#61-%E5%AE%8C%E6%95%B4%E9%A1%B9%E7%9B%AE)
    - [6.2 基础算法](#62-%E5%9F%BA%E7%A1%80%E7%AE%97%E6%B3%95)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 前端全栈开发指南

## 一、前端基础 (Base)
### 1.1 核心三件套
#### HTML5
- [基础知识](/book/1、网页三剑客/html.md)
- 现代HTML特性
  - 语义化标签
  - Web Components
  - 音视频处理
  - Canvas/SVG
  - WebGL基础

#### CSS
- [CSS技巧精选](book/1、网页三剑客/CSS.md)
- 现代CSS
  - Flex/Grid布局
  - CSS变量
  - 响应式设计
  - 动画性能
- 预处理器
  - Less
  - Sass
- 后处理器
  - PostCSS
- CSS工程化
  - CSS Modules
  - CSS-in-JS
  - Tailwind CSS

#### JavaScript
- [JavaScript指南](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide)
- [ES6+特性](book/1、网页三剑客/es6.md)
- [TypeScript实践](book/1、网页三剑客/ts入门.md)
- [JSON处理](book/1、网页三剑客/json.md)
- [Proxy与数据拦截](book/1、网页三剑客/proxy.md)
- 现代JS特性
  - ESM模块
  - 装饰器
  - WebAssembly基础
  - Worker线程

### 1.2 运行时环境
#### 浏览器环境
- [V8引擎原理](book/3、js运行时环境/v8.md)
- [浏览器工作原理](book/3、js运行时环境/浏览器工作原理与实践.md)
- 现代浏览器技术
  - 渲染原理
  - 事件循环
  - 垃圾回收
  - 跨域通信
  - Service Worker

#### Node.js生态
- 核心概念
  - 事件驱动
  - 异步I/O
  - Stream流
  - Buffer处理
- 实战项目
  - [Koa2+Next.js全栈开发](code/wechat-cli)
  - [爬虫实践](https://github.com/jadepam/node-crawer)
  - BFF层设计

#### 新一代运行时
- Deno特性与实践
- Bun高性能运行时
- Edge Runtime

## 二、前端框架 (Framework)
### 2.1 经典框架
#### Vue生态
- [Vue3源码解析](book/2、js视图类框架/vue3.0和react源码.md)
- 状态管理演进
  - Vuex
  - Pinia
- 周边生态
  - Vue Router
  - Nuxt 3
  - Vite

#### React生态
- [React源码解析](book/2、js视图类框架/vue3.0和react源码.md)
- [Hooks最佳实践](code/reacthooks/src/pages/test/hooks.js)
- 状态管理
  - Redux
  - MobX
  - Recoil
- 框架选择
  - Next.js
  - Remix
  - Gatsby

#### 小程序开发
- [底层原理解析](book/2、js视图类框架/小程序底层源码解析.md)
- 框架选择
  - [原生框架](book/7、项目实战/wechat-project-info.MD)
  - Taro
  - uni-app
  - [Vue Mini](https://vue-mini.gitee.io/guide/installation.html)

### 2.2 工程化体系
#### 构建工具
- [Webpack深入](book/4、前端工程化/玩转webpack.md)
  - [实战示例](code/webpcak)
  - [思维导图](book/4、前端工程化/webpack.xmind)
  - [模块联邦](book/4、前端工程化/webpackv5.md)
- 现代构建工具
  - Vite
  - esbuild
  - Rollup
  - Turbopack

#### 规范与流程
- [代码提交规范](book/4、前端工程化/AngularCommit规范.md)
- [版本控制规范](book/4、前端工程化/语义化版本规范.md)
- [Git工作流](book/6、程序员必备知识/git.md)
- 代码质量
  - ESLint
  - Prettier
  - [Husky](https://github.com/typicode/husky)
  - [lint-staged](https://github.com/okonet/lint-staged)

#### 自动化体系
- [测试体系](book/4、前端工程化/test.md)
  - 单元测试
  - E2E测试
  - 接口测试
- CI/CD
  - [GitLab CI](book/4、前端工程化/gitlab-ci.MD)
  - [Travis CI](book/4、前端工程化/TravisCI.MD)
  - GitHub Actions

## 三、全栈能力 (FullStack)
### 3.1 后端基础
- [Linux基础](book/6、程序员必备知识/linux.md)
- [Nginx配置](book/6、程序员必备知识/nginx.md)
- Docker容器化
- 数据库使用

### 3.2 网络通信
- HTTP协议进阶
- [HTTPS](book/6、程序员必备知识/HTTPS.md)
- [WebSocket应用](book/6、程序员必备知识/WebSocket.md)
- [Web安全防护](book/6、程序员必备知识/Web安全攻防实战.md)
- GraphQL应用

### 3.3 架构设计
- [微前端实践](book/7、项目实战/micro-frontends.md)
- [中台架构](book/8、架构/中台.md)
- BFF层设计
- 服务端渲染
- [工程化实践](book/4、前端工程化/前端工程化实践指南.md)

## 四、性能优化 (Performance)
### 4.1 性能监控
- [前端监控平台](book/5、性能优化/搭建前端监控平台.md)
- [全链路优化](book/5、性能优化/全链路性能优化.md)
- [行为录制](https://github.com/rrweb-io/rrweb)
- 性能指标
- 异常处理

### 4.2 优化方案
- [全链路优化](book/5、性能优化/web前端性能优化.md)

## 五、前沿技术 (Advanced)
### 5.1 跨端技术
- 跨端框架
  - React Native
  - Flutter
  - Electron
- 小程序生态
- PWA应用

### 5.2 智能化方向
- 低代码平台
  - 可视化搭建
  - DSL设计
  - 物料体系
- AI 辅助开发
  - GitHub Copilot
  - ChatGPT 应用
  - 智能代码分析

### 5.3 新兴领域
- Web3.0技术
  - 区块链基础
  - DApp开发
- 元宇宙相关
  - WebXR
  - Three.js
- 实时技术
  - WebRTC
  - WebTransport

## 六、实战项目 (Projects)
### 6.1 完整项目
- [小程序全栈开发](book/7、项目实战/wechat-project-info.MD)
- [微信公众号开发](book/7、项目实战/wechat.md)
- [即刻换颜小程序](./static/wxapp.png)
- [Chrome插件开发](code/chrome)

### 6.2 基础算法
- [算法总结](book/6、程序员必备知识/数据结构与算法.MD)
- [设计模式](book/6、程序员必备知识/Design_pattern.md)

