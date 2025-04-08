# 微信公众号开发指南

## 一、域名配置

### 1.1 JS接口安全域名配置
1. **文件配置**
   - 文件名：`MP_verify_*.txt`
   - 放置位置：静态资源根目录
   - 访问方式：`https://domain.com/MP_verify_*.txt`
   - 验证要求：能正确输出文件内容

2. **常见问题**
   ```nginx
   # Nginx配置示例
   location = /MP_verify_*.txt {
     # 方案1：直接返回内容
     return 200 'verification_code';
     
     # 方案2：指定文件
     root /path/to/static;
     
     # 方案3：重定向（不推荐）
     rewrite ^/(.*)$ /static/$1 last;
   }
   ```

### 1.2 网页授权域名
1. **配置要求**
   - 必须通过ICP备案
   - 必须支持HTTPS
   - 域名不能带端口号
   - 一级域名最多配置3个二级域名

2. **验证文件**
   - 下载验证文件并放置到域名根目录
   - 确保可以正常访问

## 二、接口开发

### 2.1 基础配置
```javascript
// 服务端配置
const config = {
  appId: 'wx123456789',
  appSecret: 'your_app_secret',
  token: 'your_token',
  encodingAESKey: 'your_encoding_aes_key'
};

// 接口验证
router.get('/wx', (ctx) => {
  const { signature, timestamp, nonce, echostr } = ctx.query;
  if (checkSignature(signature, timestamp, nonce, config.token)) {
    ctx.body = echostr;
  } else {
    ctx.body = 'failed';
  }
});
```

### 2.2 网页授权
```javascript
// 授权流程
async function handleOAuth(ctx) {
  const code = ctx.query.code;
  if (!code) {
    // 1. 重定向到授权页面
    const redirectUrl = encodeURIComponent('https://your.domain/oauth/callback');
    const authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo#wechat_redirect`;
    ctx.redirect(authUrl);
    return;
  }

  try {
    // 2. 获取access_token
    const tokenRes = await getAccessToken(code);
    
    // 3. 获取用户信息
    const userInfo = await getUserInfo(tokenRes.access_token, tokenRes.openid);
    
    // 4. 处理登录逻辑
    await handleLogin(userInfo);
    
  } catch (error) {
    console.error('授权失败:', error);
  }
}
```

### 2.3 JSSDK配置
```javascript
// 后端接口
router.get('/wx/jsconfig', async (ctx) => {
  const url = ctx.query.url;
  const ticket = await getJsapiTicket();
  
  const config = {
    nonceStr: generateNonceStr(),
    timestamp: Math.floor(Date.now() / 1000),
    url
  };
  
  config.signature = generateSignature(ticket, config);
  
  ctx.body = {
    appId: config.appId,
    timestamp: config.timestamp,
    nonceStr: config.nonceStr,
    signature: config.signature
  };
});

// 前端调用
wx.config({
  debug: false,
  appId: '',
  timestamp: '',
  nonceStr: '',
  signature: '',
  jsApiList: [
    'updateAppMessageShareData',
    'updateTimelineShareData',
    'onMenuShareTimeline',
    'onMenuShareAppMessage'
  ]
});
```

### 2.4 消息处理
```javascript
// 消息处理中间件
const handleMessage = async (ctx) => {
  const message = ctx.request.body;
  
  switch (message.MsgType) {
    case 'text':
      return handleTextMessage(message);
    case 'image':
      return handleImageMessage(message);
    case 'event':
      return handleEventMessage(message);
    default:
      return defaultReply(message);
  }
};

// 回复消息模板
function replyText(toUser, fromUser, content) {
  return `
    <xml>
      <ToUserName><![CDATA[${toUser}]]></ToUserName>
      <FromUserName><![CDATA[${fromUser}]]></FromUserName>
      <CreateTime>${Date.now()}</CreateTime>
      <MsgType><![CDATA[text]]></MsgType>
      <Content><![CDATA[${content}]]></Content>
    </xml>
  `;
}
```

## 三、常见问题

### 3.1 签名验证失败
1. **可能原因**
   - 时间戳不准确
   - URL编码问题
   - 参数顺序错误
   
2. **解决方案**
   ```javascript
   function checkSignature(signature, timestamp, nonce, token) {
     const arr = [token, timestamp, nonce].sort();
     const str = arr.join('');
     const sha1 = crypto.createHash('sha1');
     sha1.update(str);
     return sha1.digest('hex') === signature;
   }
   ```

### 3.2 分享失败
1. **常见原因**
   - 域名不在安全域名列表
   - config配置错误
   - 签名生成错误
   
2. **调试方法**
   ```javascript
   wx.config({
     debug: true,  // 开启调试模式
     // ... 其他配置
   });
   
   wx.error(function(res) {
     console.error('JSSDK配置失败:', res);
   });
   ```

### 3.3 接口调用频率限制
1. **解决方案**
   ```javascript
   // 使用Redis缓存access_token
   class TokenManager {
     async getAccessToken() {
       let token = await redis.get('wx_access_token');
       if (!token) {
         token = await requestNewToken();
         await redis.set('wx_access_token', token, 'EX', 7000);
       }
       return token;
     }
   }
   ```

## 四、最佳实践

### 4.1 安全性建议
1. **接口防护**
   - 使用HTTPS
   - 验证请求来源
   - 防重放攻击
   
2. **敏感信息**
   - 不在前端暴露appSecret
   - access_token安全存储
   - 用户信息脱敏处理

### 4.2 性能优化
1. **缓存策略**
   - 缓存access_token
   - 缓存jsapi_ticket
   - 缓存用户信息

2. **错误处理**
   - 完善的错误日志
   - 异常重试机制
   - 服务降级方案
