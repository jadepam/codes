# 微前端架构实践指南

## 一、基础概念
微前端是将服务端微服务的理念应用到前端的架构方案。
### 1.1 什么是微前端
- 将微服务理念应用到前端
- 用于维护大型前端应用
- 支持多技术栈并存

### 1.2 核心特性
- 技术栈无关
- 业务独立
- 样式隔离
- 原生支持

### 1.3 架构组成
1. **基础设施**
   - 中心化路由
   - 服务注册中心
   - 应用标识系统
   - 生命周期管理
   - 自动化部署

2. **主框架能力**
   - 应用调度
   - 转场动画
   - 日志上报
   - 隔离机制
   - 监控降级
   - 应用通信

## 二、实现方案对比

### 2.1 IFrame方案

#### 优点
- 天然隔离
- 接入简单
- 快速部署

#### 缺点与解决方案
1. **显示控制**
   ```javascript
   // 使用element-resize-detector
   const erd = elementResizeDetectorMaker();
   erd.listenTo(element, (element) => {
     const height = element.offsetHeight;
     window.postMessage({ height }, '*');
   });
   ```

2. **URL管理**
   ```javascript
   // 存储状态
   sessionStorage.setItem('iframe-path', path);
   
   // 恢复状态
   window.onload = () => {
     const path = sessionStorage.getItem('iframe-path');
     if (path) {
       iframe.src = path;
     }
   };
   ```

3. **性能优化**
   ```javascript
   // 异步加载
   window.onload = () => {
     setTimeout(() => {
       iframe.src = url;
     }, 0);
   };
   ```

### 2.2 WebComponent方案
- 原生标准支持
- 自定义元素
- Shadow DOM隔离
- HTML模板

### 2.3 Single-SPA方案

#### 核心API
```javascript
registerApplication({
  name: 'app',
  app: () => import('./app'),
  activeWhen: '/app'
});
```

#### 生命周期
- bootstrap
- mount
- unmount
- update

### 2.4 Qiankun方案（推荐）

#### 1. 基础配置
```javascript
// 主应用
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([{
  name: 'react-app',
  entry: '//localhost:3000',
  container: '#container',
  activeRule: '/react'
}]);

start({ prefetch: true });
```

#### 2. 子应用适配
```javascript
// webpack.config.js
module.exports = {
  output: {
    library: `${name}-[name]`,
    libraryTarget: 'umd'
  }
};

// main.js
export async function bootstrap() {}
export async function mount(props) {}
export async function unmount() {}
```

#### 3. 通信机制
```javascript
// 主应用
const actions = initGlobalState(initialState);
actions.onGlobalStateChange(state => {
  console.log(state);
});

// 子应用
export function mount(props) {
  props.onGlobalStateChange((state, prev) => {
    console.log(state, prev);
  });
}
```

## 三、最佳实践

### 3.1 应用拆分
- 业务维度划分
- 技术栈统一
- 团队边界清晰

### 3.2 性能优化
1. **加载策略**
   - 预加载配置
   - 按需加载
   - 资源复用

2. **沙箱优化**
   ```javascript
   start({
     sandbox: {
       strictStyleIsolation: true,
       experimentalStyleIsolation: true
     }
   });
   ```

### 3.3 开发规范
1. **样式隔离**
   - CSS Modules
   - BEM命名
   - Shadow DOM

2. **依赖管理**
   - 共享依赖提取
   - 版本统一
   - 构建优化

3. **发布流程**
   - 独立部署
   - 版本控制
   - 灰度策略

## 四、常见问题

### 4.1 样式冲突
- 开启严格隔离
- 采用CSS Modules
- 使用命名空间

### 4.2 JS污染
- 沙箱隔离
- 共享依赖
- 全局变量处理

### 4.3 路由管理
- 路由注册
- 状态同步
- 跨应用跳转