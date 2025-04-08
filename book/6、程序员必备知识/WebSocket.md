# WebSocket完整指南

## 目录
- [一、基础概念](#一基础概念)
- [二、基本实现](#二基本实现)
- [三、通信协议](#三通信协议)
- [四、开发难点与解决方案](#四开发难点与解决方案)
- [五、最佳实践](#五最佳实践)
- [六、完整封装](#六完整封装)

## 一、基础概念
WebSocket是建立在TCP协议之上的通信协议，具有以下特点：
- 服务端可主动推送消息
- 无同源限制
- 支持文本和二进制数据传输
- 全双工通信

## 二、基本实现

### 1. 客户端实现
```js
const ws = new WebSocket("wss://localhost:8181");

ws.onopen = function(evt) { 
  console.log("Connection open ..."); 
  ws.send("Hello WebSockets!");
};

ws.onmessage = function(evt) {
  console.log("Received Message:", evt.data);
  ws.close();
};

ws.onclose = function(evt) {
  console.log("Connection closed.");
};      
```

### 2. 服务端实现
```js
const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({
    port: 8181,
    maxPayload: 1024 * 1024,  // 限制消息大小
    maxConnections: 1000      // 限制连接数
});

wss.on('connection', function (ws) {
    const sendMessage = function (ws) {
        if (ws.readyState === 1) {
            ws.send(JSON.stringify(speedObj));
            console.log("服务器：更新数据", JSON.stringify(speedObj));
        }
    }

    ws.on('message', function (message) {
        const stockRequest = JSON.parse(message);
        console.log("服务器：收到消息", stockRequest);
        sendMessage(ws);
    });

    ws.on('close', function () {
        // 处理连接关闭
    });
});
```

## 三、通信协议

### 1. 握手过程

**websocket**本质上还是建立在**tcp**协议之上的，与http相比的优势是，建立通信后，服务端可以向客户端主动发送消息。没有同源限制，客户端可以与任意服务器通信。不过，WebSocket只支持文本和二进制数据,推送消息。

>  客户端
```
var ws = new WebSocket("wss://localhost:8181");
//向服务端发出建立链接请求，并ws.send发送消息
ws.onopen = function(evt) { 
  console.log("Connection open ..."); 
  ws.send("Hello WebSockets!");
};
//监听服务端，ws.send发送消息操作
ws.onmessage = function(evt) {
  console.log( "Received Message: " + evt.data);
  ws.close();//向服务端发送断开链接请求
};

//监听服务端断开链接操作
ws.onclose = function(evt) {
  console.log("Connection closed.");
};      
```

> 服务端（node）
```
var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({
        port: 8181,
        maxPayload: 1024 * 1024, // 限制消息大小
        maxConnections: 1000 // 限制连接数
    }); //服务端口8181


wss.on('connection', function (ws) {
    //监听客户端ws.onopen建立请求操作
    var sendMessage = function (ws) {
        if (ws.readyState == 1) {
           ws.send(JSON.stringify(speedObj)); //需要将对象转成字符串。WebSocket只支持文本和二进制数据,推送消息
           console.log("服务器：更新数据", JSON.stringify(speedObj));
        }
    }
    ws.on('message', function (message) {
       //监听客户端ws.send发送消息操作
       var stockRequest = JSON.parse(message); //根据请求过来的数据来更新。
       console.log("服务器：收到消息", stockRequest);
       sendMessage(ws)
    });
    ws.on('close', function () {
        //监听客户端ws.close()断开操作
    });
});

// 2. 消息队列堆积
let pendingMessages = []
const processInterval = setInterval(() => {
  if (pendingMessages.length > 0 && ws.readyState === WebSocket.OPEN) {
    ws.send(pendingMessages.shift())
  }
}, 100)

```


>专用头字段

<img src="./static/WebSocket.png">

#### 请求头字段 (Client -> Server)



```js
// 1. 协议升级相关
Connection: Upgrade                 // 表示要升级协议
Upgrade: websocket                 // 指定升级到WebSocket协议

// 2. WebSocket特有字段
Sec-WebSocket-Key: JJtjhnpYbVE+wTCKW70Mzw==   
// - 客户端随机生成的16字节base64编码字符串
// - 用于验证服务器是否支持WebSocket协议
// - 服务器会使用此值计算响应键

Sec-WebSocket-Version: 13         // WebSocket协议版本号(当前规范要求为13)

// 3. 扩展支持
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
// - permessage-deflate: 支持消息压缩
// - client_max_window_bits: 客户端压缩窗口大小
```

#### 响应头字段 (Server -> Client)
```js
// 1. 协议升级确认
Connection: Upgrade                // 确认协议升级
Upgrade: websocket                // 确认升级到WebSocket协议

// 2. 连接验证
Sec-WebSocket-Accept: pycE4RO3PcFKoIfLsjXQb6a4uo0=
// - 服务器根据请求头中的Sec-WebSocket-Key计算得出
// - 计算公式：base64(sha1(Sec-WebSocket-Key + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"))
// - 用于验证服务器正确解析了WebSocket请求
```

#### 握手流程说明
1. 客户端发起握手请求
   - 生成随机的Sec-WebSocket-Key
   - 设置协议升级相关字段
   - 指定WebSocket版本和扩展支持

2. 服务器验证和响应
   - 验证协议版本号
   - 计算Sec-WebSocket-Accept值
   - 返回升级确认信息

3. 连接建立
   - 客户端验证Sec-WebSocket-Accept值
   - 双方切换到WebSocket协议
   - 开始全双工通信

#### 注意事项
- 所有头字段名不区分大小写
- Sec-WebSocket-Key每次连接都必须不同
- 服务器必须返回正确的Sec-WebSocket-Accept值
- 握手过程使用HTTP/1.1协议
- 握手成功后立即切换到WebSocket协议



## 四、开发难点与解决方案

### 1. 连接管理
```js
class ConnectionManager {
    constructor() {
        this.heartbeatInterval = 30000; // 30秒心跳检测
        this.reconnectAttempts = 0;
        this.maxAttempts = 5;
    }

    // 心跳检测 - 处理连接断开问题
    startHeartbeat() {
        return setInterval(() => {
            if (this.ws.readyState === WebSocket.OPEN) {
                this.ws.send('ping');
            } else {
                this.reconnect();
            }
        }, this.heartbeatInterval);
    }

    // 重连机制 - 使用指数退避算法
    reconnect() {
        if (this.reconnectAttempts < this.maxAttempts) {
            const delay = 1000 * Math.pow(2, this.reconnectAttempts);
            setTimeout(() => {
                this.initWebSocket();
                this.reconnectAttempts++;
            }, delay);
        }
    }
}
```

### 2. 数据处理
```js
class MessageHandler {
    constructor() {
        this.messageQueue = [];
        this.messageId = 0;
        this.chunkSize = 64 * 1024; // 64KB 分片大小
    }

    // 消息排序 - 处理消息乱序问题
    sendMessage(data) {
        try {
            this.ws.send(JSON.stringify({
                id: this.messageId++,
                data
            }));
        } catch (e) {
            console.error('发送失败:', e);
            this.reconnect();
        }
    }

    handleMessage(event) {
        const message = JSON.parse(event.data);
        this.messageQueue.push(message);
        this.messageQueue.sort((a, b) => a.id - b.id);
    }

    // 大文件传输 - 分片处理
    sendLargeData(data) {
        const chunks = [];
        for (let i = 0; i < data.length; i += this.chunkSize) {
            chunks.push(data.slice(i, i + this.chunkSize));
        }
        
        chunks.forEach((chunk, index) => {
            this.sendMessage({
                total: chunks.length,
                index,
                data: chunk
            });
        });
    }
}
```

### 3. 安全处理
```js
class SecurityManager {
    constructor(token) {
        this.token = token;
    }

    // 身份验证
    authenticate() {
        this.ws.send(JSON.stringify({
            type: 'auth',
            token: this.token
        }));
    }

    // XSS防护
    sanitizeMessage(data) {
        if (typeof data.content === 'string') {
            data.content = data.content.replace(/<[^>]+>/g, '');
        }
        return data;
    }

    // 数据验证
    validateMessage(data) {
        // 添加必要的数据验证逻辑
        return true;
    }
}
```

### 4. 兼容性处理
```js
class CompatibilityManager {
    // 浏览器支持检查
    static checkWebSocketSupport() {
        if ('WebSocket' in window) {
            return true;
        }
        return false;
    }

    // 获取安全的WebSocket URL
    static getSecureUrl(url) {
        const protocol = location.protocol === 'https:' ? 'wss://' : 'ws://';
        return protocol + url;
    }

    // 降级处理
    static getFallback() {
        // 实现轮询等降级方案
        return null;
    }
}
```

### 5. 性能优化
```js
class PerformanceManager {
    constructor() {
        this.pendingMessages = [];
        this.processInterval = 100; // 100ms处理一次
        this.maxPayload = 1024 * 1024; // 1MB消息大小限制
    }

    // 消息队列处理
    startMessageProcessor() {
        return setInterval(() => {
            if (this.pendingMessages.length > 0 && 
                this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(this.pendingMessages.shift());
            }
        }, this.processInterval);
    }

    // 资源清理
    cleanup() {
        clearInterval(this.processInterval);
        this.pendingMessages = [];
    }
}
```

### 6. 调试支持
```js
class DebugManager {
    constructor(debug = false) {
        this.debug = debug;
        this.logs = [];
    }

    // 日志记录
    log(type, data) {
        if (this.debug) {
            const log = {
                timestamp: new Date().toISOString(),
                type,
                data
            };
            console.log(`[${log.timestamp}][${type}]`, data);
            this.logs.push(log);
        }
    }

    // 状态监控
    bindEvents(ws) {
        ws.onopen = () => this.log('CONNECTED', {});
        ws.onclose = (e) => this.log('CLOSED', {code: e.code, reason: e.reason});
        ws.onerror = (e) => this.log('ERROR', e);
    }
}
```

### 7. 资源管理
```js
class ResourceManager {
    constructor() {
        this.intervals = new Set();
        this.bindWindowEvents();
    }

    // 资源释放
    cleanup() {
        this.intervals.forEach(clearInterval);
        this.intervals.clear();
        
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }

    // 窗口事件处理
    bindWindowEvents() {
        window.addEventListener('beforeunload', () => {
            this.cleanup();
        });
    }
}
```


## 五、完整封装

```js
class WebSocketManager {
    constructor(url, options = {}) {
        this.url = url;
        this.options = {
            debug: false,
            reconnect: true,
            heartbeat: true,
            ...options
        };
        
        this.init();
    }

    init() {
        this.ws = new WebSocket(this.url);
        this.connectionManager = new ConnectionManager();
        this.messageHandler = new MessageHandler();
        this.securityManager = new SecurityManager(this.options.token);
        this.performanceManager = new PerformanceManager();
        
        this.bindEvents();
        this.startServices();
    }

    bindEvents() {
        this.ws.onopen = () => console.log('Connected');
        this.ws.onclose = (e) => console.log('Closed:', e.code, e.reason);
        this.ws.onerror = (e) => console.error('Error:', e);
    }

    startServices() {
        if (this.options.heartbeat) {
            this.connectionManager.startHeartbeat();
        }
        if (this.options.token) {
            this.securityManager.authenticate();
        }
        this.performanceManager.startMessageProcessor();
    }

    destroy() {
        if (this.ws) {
            this.ws.close();
            this.performanceManager.cleanup();
            this.ws = null;
        }
    }
}
```

## 六、最佳实践

1. **错误处理**
- 所有操作都应该有try-catch
- 提供错误重试机制
- 记录错误日志

2. **性能考虑**
- 控制消息大小
- 限制连接数
- 消息队列管理

3. **安全防护**
- 必要的身份验证
- 数据校验和过滤
- 防止XSS攻击

4. **资源管理**
- 及时清理资源
- 防止内存泄漏
- 优雅降级处理

