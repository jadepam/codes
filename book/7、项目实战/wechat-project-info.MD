# 微信项目开发指南

## 一、快速开始

### 1.1 项目命令
```bash
# 启动MongoDB服务
npm run mongo

# 启动API开发环境
npm run dev

# 启动管理后台SSR
npm run admin
```

## 二、服务端开发

### 2.1 数据库配置
#### MongoDB环境配置
```bash
# 添加环境变量
C:\Program Files\MongoDB\Server\3.0\bin

# 启动脚本
@echo off
start "wumin" "C:\Windows\System32\cmd.exe" 
net start MongoDB 
taskkill /f /im cmd.exe
exit
```

#### Mongoose数据库操作
    ![mongo](/static/wechat-project/mongo.jpg)

### 2.2 用户认证

#### 小程序登录流程
- 官方文档：[小程序登录](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)
![小程序登录](/static/wechat-project/api-login.jpg)

#### 扫码登录实现
![扫码登录](/static/wechat-project/scan.jpg)

### 2.3 核心功能实现

#### 路由处理
- 使用koa-router实现路由管理

#### 静态资源处理
- koa-static：静态资源目录
- koa-multer：文件上传

#### 日志管理
- 使用[log4js-node](https://github.com/log4js-node/log4js-node)

#### 服务端渲染
- SSR服务实现
- 单元测试

### 2.4 API设计规范

#### RESTful API
- 资源抽象
- 统一接口
- 状态管理
![状态存储](/static/wechat-project/token.jpg)

##### 接口示例
```javascript
router
  .post('/users', (ctx, next) => {
    ctx.body = '新增用户';
  })
  .del('/users/id', (ctx, next) => {
    ctx.body = '删除用户';
  })
  .put('/users/id', (ctx, next) => {
    ctx.body = '修改用户';
  })
  .get('/users/:id', (ctx, next) => {
    ctx.body = '获取用户信息';
  });
```

#### 参考示例
- [RESTful API示例](https://developer.github.com/v3/)
- [GraphQL API示例](https://developer.github.com/v4/)

##### GraphQL优势
- 单次请求完成多接口调用
- 按需获取数据
- 支持前端快速迭代

## 三、小程序开发

### 3.1 基础配置
- app.json 全局配置
- project.config.json 项目配置
- sitemap.json 站点配置

### 3.2 页面开发
```javascript
// 页面结构
├── pages
│   ├── index
│   │   ├── index.js    // 页面逻辑
│   │   ├── index.json  // 页面配置
│   │   ├── index.wxml  // 页面结构
│   │   └── index.wxss  // 页面样式
│   └── ...
```

### 3.3 常用能力与注意事项

#### 1. 登录授权
##### 潜在问题
- wx.login 调用时序问题
- session_key 过期处理
- 用户拒绝授权场景

##### 解决方案
```javascript
// 推荐登录流程
async function login() {
  try {
    // 1. 先检查登录态
    const checkSession = await wx.checkSession().catch(() => false);
    if (!checkSession) {
      // 2. 重新登录
      const { code } = await wx.login();
      // 3. 发送code到后端
      await api.login(code);
    }
  } catch (error) {
    // 4. 异常处理
    console.error('登录失败:', error);
  }
}
```

#### 2. 获取用户信息
##### 潜在问题
- 2021年4月后 getUserInfo 接口废弃
- 用户信息获取受限
- 头像、昵称等信息需单独获取

##### 解决方案
```javascript
// 新版获取用户信息
Page({
  async getUserProfile() {
    try {
      // 1. 使用新接口
      const userInfo = await wx.getUserProfile({
        desc: '用于完善会员资料'
      });
      
      // 2. 单独获取头像昵称
      const { avatarUrl, nickName } = await wx.chooseAvatar();
      
    } catch (error) {
      // 3. 降级处理
      this.setData({ 
        userInfo: { 
          avatarUrl: '/images/default-avatar.png',
          nickName: '微信用户'
        }
      });
    }
  }
});
```

#### 3. 支付功能
##### 潜在问题
- 重复支付问题
- 支付状态同步
- 订单超时处理

##### 解决方案
```javascript
// 支付流程处理
async function handlePayment(orderId) {
  try {
    // 1. 防重复点击
    if (this.paying) return;
    this.paying = true;
    
    // 2. 调用支付
    const payParams = await api.getPayParams(orderId);
    await wx.requestPayment(payParams);
    
    // 3. 验证支付状态
    await this.checkPaymentStatus(orderId);
    
  } catch (error) {
    if (error.errMsg.includes('cancel')) {
      // 用户取消支付
    }
  } finally {
    this.paying = false;
  }
}
```

#### 4. 分享功能
##### 潜在问题
- 分享图片过大
- 分享参数限制
- 分享失效处理

##### 解决方案
```javascript
Page({
  onShareAppMessage() {
    return {
      title: '分享标题',
      path: `/pages/index/index?id=${this.data.id}`,
      imageUrl: 'compressed_image.jpg',
      // 处理分享失效
      success: () => {
        this.updateShareCount();
      }
    };
  },
  
  // 分享图片压缩
  async compressShareImage(src) {
    const ctx = wx.createCanvasContext('shareCanvas');
    // ... 压缩逻辑
  }
});
```

#### 5. 地理位置
##### 潜在问题
- 权限请求时机
- 定位精度问题
- 后台定位限制

##### 解决方案
```javascript
// 位置服务处理
async function getLocation() {
  try {
    // 1. 检查权限
    const setting = await wx.getSetting();
    if (!setting.authSetting['scope.userLocation']) {
      await wx.authorize({ scope: 'scope.userLocation' });
    }
    
    // 2. 获取位置
    const location = await wx.getLocation({
      type: 'gcj02',
      isHighAccuracy: true,
      highAccuracyExpireTime: 3000
    });
    
    // 3. 容错处理
    if (!location.latitude || !location.longitude) {
      throw new Error('定位失败');
    }
    
  } catch (error) {
    // 4. 降级处理
    this.handleLocationFallback();
  }
}
```

#### 6. 图片上传
##### 潜在问题
- 大小限制
- 上传超时
- 并发控制
- 内存溢出

##### 解决方案
```javascript
// 图片上传优化
async function uploadImages(files) {
  // 1. 图片压缩
  const compressedFiles = await Promise.all(
    files.map(file => this.compressImage(file))
  );
  
  // 2. 并发控制
  const results = await this.uploadWithConcurrency(compressedFiles, 3);
  
  // 3. 失败重试
  const failedFiles = results.filter(r => r.status === 'failed');
  if (failedFiles.length) {
    await this.retryUpload(failedFiles);
  }
}

// 并发控制
async function uploadWithConcurrency(files, limit) {
  const pool = new Array(limit).fill(null);
  const results = [];
  
  for (const file of files) {
    const promise = this.upload(file).finally(() => {
      const index = pool.indexOf(promise);
      pool[index] = null;
    });
    
    pool[pool.indexOf(null)] = promise;
    if (pool.every(p => p)) {
      await Promise.race(pool);
    }
    results.push(await promise);
  }
  
  return results;
}
```

#### 通用注意事项
1. **内存管理**
   - 及时销毁定时器
   - 清理大对象引用
   - 控制页面栈深度

2. **性能优化**
   - 合理使用setData
   - 避免频繁重渲染
   - 图片懒加载

3. **兼容性处理**
   - 基础库版本检查
   - API可用性检测
   - 降级方案准备

### 3.4 组件开发
```javascript
Component({
  properties: {
    // 组件属性
  },
  data: {
    // 组件数据
  },
  methods: {
    // 组件方法
  }
});
```

### 3.5 小程序性能优化

#### 1. 启动性能优化
##### 关键指标
- 首屏渲染时间
- 脚本执行时间
- 资源加载时间

##### 优化方案
```javascript
// 1. 分包加载
{
  "subpackages": [{
    "root": "pages/heavy",
    "pages": ["index/index"]
  }]
}

// 2. 预加载分包
{
  "preloadRule": {
    "pages/index/index": {
      "network": "all",
      "packages": ["heavy"]
    }
  }
}

// 3. 首屏优化
Page({
  data: {
    skeleton: true,
    content: null
  },
  onLoad() {
    // 使用骨架屏
    this.loadData().then(() => {
      this.setData({ skeleton: false });
    });
  }
});
```

#### 2. 渲染性能优化
##### setData优化
```javascript
// 1. 数据打平
data: {
  'list[0].name': 'new name'  // 优于 list: this.data.list
}

// 2. 批量更新
const updates = {};
items.forEach((item, index) => {
  updates[`list[${index}].checked`] = true;
});
this.setData(updates);

// 3. 防抖/节流
const debounceSetData = debounce(function(data) {
  this.setData(data);
}, 200);
```

#### 3. 网络优化
```javascript
// 1. 请求队列管理
class RequestQueue {
  queue = new Map();
  
  async request(key, promiseFn) {
    if (this.queue.has(key)) {
      return this.queue.get(key);
    }
    
    const promise = promiseFn().finally(() => {
      this.queue.delete(key);
    });
    
    this.queue.set(key, promise);
    return promise;
  }
}

// 2. 请求重试机制
async function requestWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await wx.request({ url, ...options });
    } catch (err) {
      if (i === maxRetries - 1) throw err;
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)));
    }
  }
}
```

#### 4. 内存优化
```javascript
// 1. 页面栈管理
Page({
  onUnload() {
    // 清理定时器
    this.intervals.forEach(clearInterval);
    this.timeouts.forEach(clearTimeout);
    
    // 清理事件监听
    wx.offNetworkStatusChange();
    
    // 清理大对象
    this.data.videoContext = null;
  }
});

// 2. 长列表优化
Component({
  data: {
    displayItems: [],
    allItems: []
  },
  
  methods: {
    // 虚拟列表实现
    updateDisplayItems(scrollTop) {
      const startIndex = Math.floor(scrollTop / this.itemHeight);
      const visibleCount = Math.ceil(this.height / this.itemHeight);
      
      this.setData({
        displayItems: this.data.allItems.slice(
          startIndex,
          startIndex + visibleCount + 2
        )
      });
    }
  }
});
```

#### 5. 体验优化

##### 1) 骨架屏实现
```javascript
// skeleton.js
Component({
  properties: {
    loading: {
      type: Boolean,
      value: true
    },
    bgcolor: {
      type: String,
      value: '#f2f2f2'
    }
  }
});

// skeleton.wxml
<view class="skeleton" wx:if="{{loading}}">
  <view class="skeleton-avatar" style="background: {{bgcolor}}"></view>
  <view class="skeleton-content">
    <view class="skeleton-title" style="background: {{bgcolor}}"></view>
    <view class="skeleton-paragraph" style="background: {{bgcolor}}"></view>
  </view>
</view>
```

##### 2) 下拉刷新优化
```javascript
Page({
  data: {
    refreshing: false,
    triggered: false
  },
  
  async onPullDownRefresh() {
    this.setData({ refreshing: true });
    try {
      await this.loadData();
    } finally {
      wx.stopPullDownRefresh();
      this.setData({ 
        refreshing: false,
        triggered: false
      });
    }
  }
});
```

#### 6. 调试技巧

##### 1) 性能监控
```javascript
// app.js
App({
  onLaunch() {
    // 监听内存告警
    wx.onMemoryWarning(res => {
      console.warn('内存告警', res.level);
    });
    
    // 性能数据上报
    const performance = wx.getPerformance();
    const observer = performance.createObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        if (entry.entryType === 'navigation') {
          // 上报启动性能数据
          this.reportPerformance(entry);
        }
      });
    });
    
    observer.observe({ entryTypes: ['navigation', 'render'] });
  }
});
```

##### 2) 错误监控
```javascript
// app.js
App({
  onError(error) {
    // 错误上报
    console.error('全局错误:', error);
    this.reportError({
      type: 'js',
      error: error,
      page: getCurrentPages().pop()?.route
    });
  },
  
  onPageNotFound(res) {
    // 页面不存在
    console.error('页面不存在:', res.path);
    wx.redirectTo({
      url: '/pages/404/index'
    });
  }
});
```

#### 7. 发布注意事项
1. **版本管理**
   - 使用分支管理不同版本
   - 灰度发布策略
   - 版本回滚机制

2. **审核要点**
   - 隐私政策合规
   - 用户授权规范
   - 内容安全审查
   - 功能完整性

3. **发布清单**
   - 功能测试
   - 性能测试
   - 兼容性测试
   - 安全测试
   - 体验测试

## 四、小程序服务端部署

### 4.1 服务器配置

#### 基础配置
```nginx
# nginx.conf - 小程序API服务配置
http {
    # 开启gzip压缩
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 6;
    gzip_types application/json;

    # 上传文件限制（小程序图片、媒体文件）
    client_max_body_size 10m;

    # 小程序资源缓存
    location /miniapp/static/ {
        expires 7d;
        add_header Cache-Control public;
    }
}
```

#### 小程序API代理
```nginx
# 小程序API服务代理
location /miniapp/api/ {
    proxy_pass http://localhost:3000/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    
    # 小程序请求超时设置
    proxy_connect_timeout 5s;
    proxy_read_timeout 60s;
    proxy_send_timeout 5s;
}

# WebSocket消息服务（小程序实时通讯）
location /miniapp/ws/ {
    proxy_pass http://localhost:3001;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

### 4.2 安全配置

#### HTTPS配置（小程序必需）
```nginx
server {
    listen 443 ssl;
    server_name miniapp-api.example.com;

    # SSL配置（小程序要求TLS 1.2以上）
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_certificate /path/to/miniapp-cert.pem;
    ssl_certificate_key /path/to/miniapp-key.pem;
}
```

#### 安全防护
```nginx
# 小程序API安全头
add_header Strict-Transport-Security "max-age=31536000";
add_header X-Content-Type-Options "nosniff";

# 防止API被其他域名调用
if ($http_referer !~* "^https://servicewechat\.com/") {
    return 403;
}
```

### 4.3 服务端性能优化

#### 缓存策略
```javascript
// Redis缓存配置 - 小程序常用数据
const redis = require('redis');
const client = redis.createClient();

// 缓存小程序码
async function getWxacode(scene) {
  const cacheKey = `wxacode:${scene}`;
  let wxacode = await client.get(cacheKey);
  
  if (!wxacode) {
    wxacode = await generateWxacode(scene);
    await client.set(cacheKey, wxacode, 'EX', 3600); // 1小时过期
  }
  
  return wxacode;
}

// 缓存接口数据
async function cacheApiData(key, getData, expires = 300) {
  const cacheKey = `api:${key}`;
  let data = await client.get(cacheKey);
  
  if (!data) {
    data = await getData();
    await client.set(cacheKey, JSON.stringify(data), 'EX', expires);
  }
  
  return JSON.parse(data);
}
```

### 4.4 监控告警

#### 小程序服务监控
```javascript
// 接口响应时间监控
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  
  // 超过500ms告警
  if (ms > 500) {
    await sendAlert({
      type: 'api_slow',
      path: ctx.path,
      duration: ms
    });
  }
});

// 错误监控
app.on('error', async (err, ctx) => {
  await sendAlert({
    type: 'api_error',
    path: ctx.path,
    error: err.message,
    stack: err.stack
  });
});
```

#### 业务监控
```javascript
// 登录失败监控
async function loginMonitor(userId, type, error) {
  await saveLog('login', {
    userId,
    type,
    error,
    timestamp: new Date()
  });
  
  // 频繁登录失败告警
  const failCount = await getLoginFailCount(userId);
  if (failCount > 5) {
    await sendAlert({
      type: 'login_fail',
      userId,
      count: failCount
    });
  }
}

// 支付异常监控
async function paymentMonitor(orderId, error) {
  await saveLog('payment', {
    orderId,
    error,
    timestamp: new Date()
  });
  
  await sendAlert({
    type: 'payment_error',
    orderId,
    error
  });
}
```

### 4.5 运维脚本

#### 发布脚本
```bash
#!/bin/bash
# 小程序服务端发布脚本

# 1. 更新代码
git pull origin master

# 2. 安装依赖
npm install --production

# 3. 构建
npm run build

# 4. 更新配置
cp config/prod.json config/current.json

# 5. 重启服务
pm2 reload miniapp-api

# 6. 验证服务
curl -I https://miniapp-api.example.com/health
```

#### 日志清理
```bash
#!/bin/bash
# 定期清理日志脚本

# 删除30天前的日志
find /var/log/miniapp/ -type f -mtime +30 -delete

# 压缩7天前的日志
find /var/log/miniapp/ -type f -mtime +7 -exec gzip {} \;
```
```



