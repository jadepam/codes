# 微前端架构(服务端微服务的理念应用到前端)：
用途：用不同技术框架，去维护大型应用
特点：技术无关性、业务独立、样式隔离、原生支持

基本构成：
中心化路由，服务注册中心；
标识化应用；
设计一定的生命周期；
部署和配置自动化；

主框架的作用：
应用的发现和调度；
转场动画、日志、上报；
应用、css隔离影响；
应用监控、降级、鉴权等；
应用间通信机制；

## 1. 通过IFrame方式进行聚合

### 优点：沙盒模型、改动成本小

### 缺点：
#### iframe嵌入的显示区大小不容易控制
解决方法：
[element-resize-detector]
原理：用该插件监听iframe元素高度，通过window.postMessage()传值给父标签，jsp页面通过 window.addEventListener('message',{})方法监听到高度变化并设置iframe父标签高度

#### URL的记录完全无效，页面刷新不能够被记忆，刷新会返回首页，iframe功能之间跳转也无效
解决方法：
1、直接更改iframe的src，会产生重复的history
2、直接createElement，替换原来的iframe
3、iframe存储内部url的pathA与父页面的pathB,父页面刷新时onload，判断浏览器当前的window.location.pathname是否等于父页面的pathB，如果相等，直接将iframe的src替换为pathA

存储方法：url传参数\cookies\ local/session storage
#### iframe 阻塞 onload
浏览器解析 => 解析HTML节点到DOM树 => DOM树解析完成（触发DOMContentLoaded） => 下载资源并解析资源（包括iframe） => 资源全部下载并解析完毕 => 页面加载完成（触发onload）

1、异步处理
2、onload之后再加载iframe内容src

#### 兼容性差

## 2. 使用WebComponent构建应用

https://developer.mozilla.org/zh-CN/docs/Web/Web_Components

https://www.webcomponents.org/

## 3. 在不同的框架之上设计通讯、加载机制，诸如 [Single-SPA](https://single-spa.js.org/)

[Single-SPA]
single-spa-config：
- 注册：registerApplication(name, howToLoad, activityFunction)


howToLoad：返回promise的加载function或者已解析的Application（improt/export）
生命周期：bootstrap、mount、unmount、unload（可选）

执行方法：Update更新

activityFunction：纯函数、将window.location作为参数提供

- 挂载：start()，在AJAX请求后再调用性能最佳