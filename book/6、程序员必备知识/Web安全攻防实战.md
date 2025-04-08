# Web安全攻防实战指南

## 目录
- [1. 常见Web攻击与防御](#1-常见web攻击与防御)
  - [1.1 XSS（跨站脚本攻击）](#11-xss跨站脚本攻击)
    - [攻击原理](#攻击原理)
    - [防御措施](#防御措施)
  - [1.2 CSRF（跨站请求伪造）](#12-csrf跨站请求伪造)
    - [攻击原理](#攻击原理-1)
    - [防御措施](#防御措施-1)
  - [1.3 SQL注入](#13-sql注入)
    - [攻击原理](#攻击原理-2)
    - [防御措施](#防御措施-2)
- [2. 身份认证与授权](#2-身份认证与授权)
  - [2.1 JWT实现](#21-jwt实现)
  - [2.2 OAuth 2.0集成](#22-oauth-20集成)
- [3. 安全Headers配置](#3-安全headers配置)
- [4. 文件上传安全](#4-文件上传安全)
- [5. 安全监控与审计](#5-安全监控与审计)
  - [5.1 日志记录](#51-日志记录)
  - [5.2 安全审计](#52-安全审计)
- [6. 应急响应](#6-应急响应)
  - [6.1 安全事件处理流程](#61-安全事件处理流程)
  - [6.2 应急响应脚本](#62-应急响应脚本)
- [7. 安全配置核查清单](#7-安全配置核查清单)
  - [7.1 服务器配置](#71-服务器配置)
  - [7.2 应用配置](#72-应用配置)

## 1. 常见Web攻击与防御
### 1.1 XSS（跨站脚本攻击）
#### 攻击原理
```javascript
// 反射型XSS示例
// URL: https://example.com/search?q=<script>alert('XSS')</script>
searchQuery = request.getParameter("q");
response.write("查询结果: " + searchQuery);  // 未经过滤直接输出

// 存储型XSS示例
// 评论功能
comment = "<script>steal(document.cookie)</script>";
database.save(comment);  // 恶意脚本被存储到数据库
```

#### 防御措施
```javascript
// 1. 输入过滤
function sanitizeInput(input) {
    return input.replace(/[&<>"']/g, function(match) {
        const escape = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;'
        };
        return escape[match];
    });
}

// 2. CSP配置
// nginx配置
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://trusted.com";

// 3. HttpOnly Cookie
// express配置
app.use(session({
    cookie: {
        httpOnly: true,
        secure: true
    }
}));
```

### 1.2 CSRF（跨站请求伪造）
#### 攻击原理
```html
<!-- 攻击示例 -->
<form action="https://bank.com/transfer" method="POST">
    <input type="hidden" name="account" value="attacker" />
    <input type="hidden" name="amount" value="10000" />
</form>
<script>document.forms[0].submit();</script>
```

#### 防御措施
```javascript
// 1. CSRF Token
const csrfToken = crypto.randomBytes(16).toString('hex');
// 在表单中添加token
<input type="hidden" name="_csrf" value="${csrfToken}">

// 2. 验证Origin和Referer
app.use((req, res, next) => {
    const origin = req.headers.origin;
    const allowedOrigins = ['https://example.com'];
    if (!allowedOrigins.includes(origin)) {
        return res.status(403).json({ error: 'Invalid origin' });
    }
    next();
});

// 3. SameSite Cookie
// express配置
app.use(session({
    cookie: {
        sameSite: 'strict'
    }
}));
```

### 1.3 SQL注入
#### 攻击原理
```sql
-- 攻击示例
-- 原始查询：SELECT * FROM users WHERE username = '${username}' AND password = '${password}'
-- 注入攻击：username = "admin'--"
SELECT * FROM users WHERE username = 'admin'--' AND password = 'anything'
```

#### 防御措施
```javascript
// 1. 参数化查询
const mysql = require('mysql');
const connection = mysql.createConnection({/*配置*/});

// 错误示例
connection.query(
    `SELECT * FROM users WHERE username = '${username}'`  // 不安全
);

// 正确示例
connection.query(
    'SELECT * FROM users WHERE username = ?', 
    [username],  // 参数化查询
    function(error, results) {/*处理结果*/}
);

// 2. ORM框架
// 使用Sequelize示例
const user = await User.findOne({
    where: {
        username: username,
        password: hashedPassword
    }
});
```

## 2. 身份认证与授权
### 2.1 JWT实现
```javascript
// JWT认证实现
const jwt = require('jsonwebtoken');

// 生成token
const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

// 验证中间件
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) throw new Error('No token provided');
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
};
```

### 2.2 OAuth 2.0集成
```javascript
// OAuth 2.0配置
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user);
    });
}));
```

## 3. 安全Headers配置
```nginx
# Nginx安全headers配置
add_header X-Frame-Options "SAMEORIGIN";
add_header X-Content-Type-Options "nosniff";
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "strict-origin-source-when-cross-origin";
add_header Permissions-Policy "geolocation=(), microphone=()";
```

## 4. 文件上传安全
```javascript
// 文件上传安全处理
const multer = require('multer');
const path = require('path');

// 配置存储
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // 安全的文件名生成
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// 文件类型验证
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Invalid file type'), false);
    }
    cb(null, true);
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB限制
    }
});
```

## 5. 安全监控与审计
### 5.1 日志记录
```javascript
// Winston日志配置
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

// 安全事件记录
logger.info('Login attempt', {
    userId: user.id,
    ip: req.ip,
    userAgent: req.headers['user-agent']
});
```

### 5.2 安全审计
```javascript
// 用户操作审计
const auditLog = async (req, action, details) => {
    await AuditLog.create({
        userId: req.user.id,
        action: action,
        details: details,
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        timestamp: new Date()
    });
};
```

## 6. 应急响应
### 6.1 安全事件处理流程
1. 发现与确认
2. 隔离与控制
3. 分析与溯源
4. 清除与恢复
5. 总结与改进

### 6.2 应急响应脚本
```javascript
// 紧急封禁IP
async function blockIP(ip) {
    // Redis封禁记录
    await redis.set(`blocked:${ip}`, 1, 'EX', 3600);
    
    // Nginx动态封禁
    exec(`sudo iptables -A INPUT -s ${ip} -j DROP`, (error, stdout, stderr) => {
        if (error) {
            logger.error(`IP封禁失败: ${ip}`, { error });
            return;
        }
        logger.info(`IP已封禁: ${ip}`);
    });
}

// 账户锁定
async function lockAccount(userId) {
    await User.update({ 
        status: 'locked',
        lockedAt: new Date(),
        lockReason: 'Security violation'
    }, { 
        where: { id: userId } 
    });
    
    // 通知相关人员
    notifySecurityTeam({
        type: 'ACCOUNT_LOCKED',
        userId: userId,
        timestamp: new Date()
    });
}
```

## 7. 安全配置核查清单
### 7.1 服务器配置
- [ ] 更新系统补丁
- [ ] 配置防火墙规则
- [ ] 禁用不必要的服务
- [ ] 限制文件权限
- [ ] 配置安全组策略

### 7.2 应用配置
- [ ] 启用HTTPS
- [ ] 配置安全Headers
- [ ] 实施访问控制
- [ ] 启用日志记录
- [ ] 配置备份策略
