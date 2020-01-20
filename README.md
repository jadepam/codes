<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [前端笔记](#%E5%89%8D%E7%AB%AF%E7%AC%94%E8%AE%B0)
  - [原生js、ES+、函数式编程](#%E5%8E%9F%E7%94%9Fjses%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B)
    - [es6+next](#es6next)
  - [linux](#linux)
  - [CSS知识点](#css%E7%9F%A5%E8%AF%86%E7%82%B9)
  - [自动化测试](#%E8%87%AA%E5%8A%A8%E5%8C%96%E6%B5%8B%E8%AF%95)
  - [前端工程化与持续构建](#%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96%E4%B8%8E%E6%8C%81%E7%BB%AD%E6%9E%84%E5%BB%BA)
    - [webpack](#webpack)
    - [微前端IFrame\WebComponent\Single-SPA](#%E5%BE%AE%E5%89%8D%E7%AB%AFiframe%5Cwebcomponent%5Csingle-spa)
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

## [原生js、ES+、函数式编程](/book/js.MD)
### [es6+next](/book/es6.md)
## [linux](/book/linux.MD)
## [CSS知识点](/book/CSS.MD)

<img src="code/css/images/Pikachu.gif" width="20%">

## [自动化测试](/book/test.MD)

## 前端工程化与持续构建

### [webpack](/book/micro-frontends.md)

### [微前端IFrame\WebComponent\Single-SPA](/book/micro-frontends.md)

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


### npm install graphql
## 项目实战系列

-   [react16.8 中 hooks 结合 dav.js 使用方法](/code/reacthooks/src/pages/test/hooks.js)
-   [React16.8+Next.js+Koa2 开发 Github 全栈项目](/book/react16.8.MD)
-   [Ant Design Pro 4.0实战]()
#### [微信小程序全栈开发](/book/wechat-project-info.MD)
-   [node+koa2 +ssr(Nextjs)搭建小程序服务端+管理后台](/book/koa2-serve.MD)
-   [wepy 开发小程序](/book/wepy-app.MD)
-   [nignx 服务器配置](/book/nignx-config.MD)

### [node 爬虫]

- [node-crawler 初体验](https://github.com/jadepam/node-crawer)
- node搭建ws实现报表大屏互动
#### 好玩的小项目

1、即刻换颜小程序 （头像 DIY）

<img src="./static/wxapp.png" width="20%">

2、[JSTP](https://metarhia.github.io/jstp/api/server/) 实现简单聊天室[DOM](/code/node-server/README.md)

## 新技术
### graphql 
npm install graphql
------------------------------
```
git remote -v
git push github master
git push gitee master
```