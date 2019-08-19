> 命令解析
   * npm run mongo: 启动本地mongodb服务器
   * npm run dev: api 开发环境
   * npm run admin: 管理后台ssr

> 服务端知识点

* mongodb数据库配置

将数据库bin安装路径加入系统环境变量中
```
C:\Program Files\MongoDB\Server\3.0\bin
```
编写脚本：
```
@echo off
start  "wumin" "C:\Windows\System32\cmd.exe" 
net start MongoDB 
taskkill /f /im cmd.exe
exit
```
* mongoose操作数据库
    ![mongo](/static/wechat-project/mongo.jpg)

<!-- * 数据库知识点 -->
<!-- 
-|关系|非关系型|
-|-|-|
描述|业务逻辑都可以归结到二维表中<br>通过表与表之间建立关系来描述业务<br>基于 SQL 来查询 | 非数据结构比较简单<br>大多数不需要支持复杂的查询 |
常见类型 | Oracle<br>Microsoft SQL Server<br>MySQL、MariaDB | MongoDB（文档导向，可直接存储对象，不需要限定存储的数据格式 ）<br>Redis（内存的可持久化的键值对存储数据库） <br>Memcached（分布式高速缓存系统，基于键值存储，用于应用的高速缓存，不支持持久化）| -->


* 扫码登入：Oauth授权
    * [小程序登入](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)

    ![小程序登入](/static/wechat-project/api-login.jpg)
    * 扫码登入

    ![扫码登入](/static/wechat-project/scan.jpg)

* koa路由处理koa-router

* 图片（文件）上传：搭建静态资源目录koa-static\koa-multer
 
* log日志 [log4js-node](https://github.com/log4js-node/log4js-node)

* 单元测试

* ssr服务

* RESTful接口规范

    RESTful 设计一般符合以下条件：
    * 程序或应用的事物都应该被抽象为资源。
    * 同一个资源具有多种表现形式(xml,json等)
    * 每个资源对应唯一的 URI（URL 是 URI的一个子集）。
    * 使用统一的接口对资源进行*操作*(POST 、 DELETE 、 PUT 、 GET)。
    * 对资源的各种操作不会改变资源标识 。
    * 所有的操作都是*无状态*的（服务器不保存客户的上下文）
        ![状态存储](/static/wechat-project/token.jpg)

<!-- 
            -|概念|用法|
            -|-|-|-|
            cookie|仅仅是浏览器实现的一种数据存储功能(用户登录数据禁止随意修改)|-|-|
            session|session 只保存在服务器上，是服务器端使用的一种记录客户端状态的机制|客户端 cookie 里存 userid<br>服务端 session 存用户数据<br>客户端访问服务端的时候，根据 userid 找对应用户数据|-|
            token|在客户端一般存放于localStorage，cookie，或sessionStorage中。在服务器一般存于数据库中。token <br>· uid: 用户唯一身份标识<br>· time: 当前时间的时间戳<br>· sign: 签名, 使用hash/encrypt 压缩成定长的十六进制字符串，以防止第三方恶意拼接<br>· 固定参数(可选): 将一些常用的固定参数加入到 token 中是为了避免重复查库<br>|也称作令牌, 注意在客户端里存 userid（也就是token）、用户信息、密文<br>服务端只有一段加密代码，用来判断当前加密后的密文是否和客户端传递过来的密文一致，如果不一致，就是客户端的用户数据被篡改了，如果一致，就代表客户端的用户数据正常且正确<br>token 认证流程与 cookie 类似：<br>1. 用户登录，成功后服务器返回Token给客户端。<br>2. 客户端收到数据后保存在客户端<br>3. 客户端再次访问服务器，将 token 放入 headers 中<br>4. 服务器端校验。校验成功则返回请求数据，校验失败则返回错误码（401）| -->
            
    ```
    router
    .post ('/users', (ctx, next) => {
        ctx .body = 新增了一位用户';
    })
    .del ('/users/id',(ctx, next) => {
        ctx .body = 删除了用户编号为 id 的用户';
    })
    .put ('/users/id',(ctx, next) => (
    ctx .body =  修改了用户编号为 id 的用户信息';
    })
    .get ('/users/:id',(ctx, next) => (
    ctx.body ='我是编号为id 的用户信息';
    })
    ```
    [RESTful api 范例](https://developer.github.com/v3/)

    [GraphQL api 范例](https://developer.github.com/v4/)
    
        GraphQL的优点：一次请求完成多个业务接口调用；按需获取所需数据；前端快速迭代时，足够的灵活

>小程序端知识点


>nginx知识点