# Nginx 完全指南

## 一、基础概念
### 1.1 Nginx特点
- 事件驱动型设计
- 全异步网络I/O处理
- 低进程切换开销
- 高并发处理能力
- 内存占用少
- 高度模块化设计

### 1.2 进程模型
#### master进程职责
- 监控worker进程
- 接收外部信号
- 管理配置重载
- 平滑升级

#### worker进程特性
- 实际处理请求
- 非阻塞事件处理
- 请求数仅受内存限制
- 进程数通常配置为CPU核心数

## 二、安装与基本命令
### 2.1 安装方式对比
#### 包管理器安装
```bash
# Ubuntu/Debian
apt-get install nginx

# CentOS/RHEL
yum install nginx
```

#### 源码编译安装
```bash
# 1. 安装依赖
yum install gcc openssl openssl-devel pcre pcre-devel zlib zlib-devel -y

# 2. 下载源码
wget http://nginx.org/download/nginx-1.18.0.tar.gz

# 3. 配置编译选项
./configure \
    --prefix=/usr/local/nginx \
    --with-http_ssl_module \
    --with-http_v2_module \
    --with-http_realip_module \
    --with-http_stub_status_module \
    --with-http_gzip_static_module \
    --with-pcre

# 4. 编译安装
make && make install
```

### 2.2 进程管理命令
```bash
# 启动
nginx -c /path/to/nginx.conf

# 重载配置
nginx -s reload

# 优雅停止
nginx -s quit

# 快速停止
nginx -s stop

# 重新打开日志文件
nginx -s reopen
```

### 2.3 调试命令
```bash
# 测试配置
nginx -t

# 显示编译参数
nginx -V

# 显示帮助信息
nginx -h
```

## 三、核心配置详解
### 3.1 主配置结构
```nginx
# 全局配置
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

# 事件模块
events {
    use epoll;
    worker_connections 65535;
    multi_accept on;
}

# HTTP模块
http {
    # MIME类型
    include mime.types;
    default_type application/octet-stream;
    
    # 日志格式
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
    
    # 基础优化
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    
    # Gzip压缩
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript;
    
    # 虚拟主机配置
    include /etc/nginx/conf.d/*.conf;
}
```

### 3.2 Location匹配规则
#### 优先级顺序
1. = 精确匹配
2. ^~ 前缀匹配
3. ~ 区分大小写正则
4. ~* 不区分大小写正则
5. / 普通前缀匹配
6. / 通用匹配

#### 实例说明
```nginx
# 精确匹配
location = /api {
    # 只匹配 /api
}

# 前缀匹配
location ^~ /static/ {
    # 匹配所有以 /static/ 开头的路径
}

# 正则匹配
location ~ \.(gif|jpg|png)$ {
    # 匹配以 .gif、.jpg、.png 结尾的请求
}
```

## 四、代理服务
### 4.1 代理类型对比

#### 正向代理
![正向代理](/static/nginx正向代理.png)

**特点与应用：**
- 代理客户端，隐藏真实客户端
- 访问原来无法访问的资源（如 Google）
- 可以做缓存，加速访问
- 客户端访问授权，认证
- 记录用户访问行为，隐藏用户信息

```nginx
# 正向代理配置示例
server {
    listen 80;
    server_name proxy.example.com;
    
    location / {
        resolver 8.8.8.8;  # DNS解析服务器
        proxy_pass http://$http_host$request_uri;
    }
}
```

#### 反向代理
![反向代理](/static/nginx反向代理.png)

**特点与应用：**
- 代理服务端，隐藏真实服务器
- 保护内网安全
- 负载均衡
- 缓存静态内容
- 压缩优化传输

```nginx
# 反向代理配置示例
server {
    listen 80;
    server_name www.example.com;
    
    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 4.2 Cookie处理
#### cookie路径问题
```nginx
location /api/ {
    proxy_pass http://backend;
    proxy_cookie_path /backend /api;
}
```

#### cookie域名问题
```nginx
location /api/ {
    proxy_pass http://backend.internal;
    proxy_cookie_domain backend.internal www.example.com;
}
```

## 五、高级特性
### 5.1 HTTP功能模块
#### SSL配置
```nginx
server {
    listen 443 ssl http2;
    server_name example.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
    ssl_prefer_server_ciphers on;
    
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
}
```

#### 缓存配置
```nginx
# 代理缓存
proxy_cache_path /path/to/cache levels=1:2 keys_zone=my_cache:10m max_size=10g inactive=60m;

            location / {
    proxy_cache my_cache;
    proxy_cache_use_stale error timeout http_500 http_502 http_503 http_504;
    proxy_cache_valid 200 60m;
}

# 浏览器缓存
location /static/ {
    expires 30d;
    add_header Cache-Control "public, no-transform";
}
```

### 5.2 负载均衡策略
```nginx
upstream backend {
    # 1. 轮询（默认）
    server 192.168.1.10:8080;
    server 192.168.1.11:8080;
    
    # 2. 权重
    server 192.168.1.10:8080 weight=3;
    server 192.168.1.11:8080 weight=1;
    
    # 3. IP哈希
    ip_hash;
    server 192.168.1.10:8080;
    server 192.168.1.11:8080;
    
    # 4. 最少连接
    least_conn;
    server 192.168.1.10:8080;
    server 192.168.1.11:8080;
    
    # 5. 健康检查
    server 192.168.1.10:8080 max_fails=3 fail_timeout=30s;
}
```

### 5.3 安全防护
```nginx
# 1. DDoS防护
limit_req_zone $binary_remote_addr zone=one:10m rate=1r/s;
location / {
    limit_req zone=one burst=5;
}

# 2. IP黑白名单
allow 192.168.1.0/24;
deny all;

# 3. 防盗链
location ~* \.(gif|jpg|png)$ {
    valid_referers none blocked server_names *.example.com;
    if ($invalid_referer) {
        return 403;
    }
}

# 4. XSS防护
add_header X-XSS-Protection "1; mode=block";
add_header X-Content-Type-Options "nosniff";
```

## 六、性能优化
### 6.1 系统优化
```bash
# 1. 系统限制
ulimit -n 65535

# 2. 内核参数
sysctl -w net.core.somaxconn=65535
sysctl -w net.ipv4.tcp_max_tw_buckets=1440000
```

### 6.2 Nginx优化
```nginx
# 1. 工作进程
worker_processes auto;
worker_rlimit_nofile 65535;

# 2. 事件模块
events {
    use epoll;
    worker_connections 65535;
    multi_accept on;
}

# 3. HTTP优化
http {
    # 启用sendfile
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    
    # 超时设置
    keepalive_timeout 65;
    keepalive_requests 100;
    
    # 文件缓存
    open_file_cache max=100000 inactive=20s;
    open_file_cache_valid 30s;
    open_file_cache_min_uses 2;
    open_file_cache_errors on;
}
```

## 七、故障排查
### 7.1 日志分析
```nginx
# 1. 错误日志配置
error_log /var/log/nginx/error.log warn;

# 2. 访问日志配置
log_format detailed '$remote_addr - $remote_user [$time_local] '
                    '"$request" $status $body_bytes_sent '
                    '"$http_referer" "$http_user_agent" '
                    '$request_time $upstream_response_time';

access_log /var/log/nginx/access.log detailed;
```

### 7.2 常见问题排查
1. 502 Bad Gateway
   - 检查上游服务器状态
   - 检查upstream配置
   - 查看错误日志

2. 504 Gateway Timeout
   - 检查超时配置
   - 优化上游响应时间
   - 调整缓冲区设置

3. 性能问题
   - 使用nginx-debug
   - 检查系统资源
   - 分析访问日志

## 八、最佳实践
### 8.1 配置模板
```nginx
# 1. 反向代理
server {
    listen 80;
    server_name example.com;
    
    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        proxy_buffer_size 4k;
        proxy_buffers 4 32k;
        proxy_busy_buffers_size 64k;
    }
}

# 2. 静态文件服务
server {
    listen 80;
    server_name static.example.com;
    root /path/to/static;
    
    location / {
        try_files $uri $uri/ =404;
        expires 30d;
        access_log off;
        add_header Cache-Control "public";
    }
}
```

### 8.2 部署清单
1. 配置检查
   - nginx -t
   - 权限检查
   - 日志路径

2. 性能测试
   - ab/wrk压测
   - 监控系统资源
   - 分析响应时间

3. 安全检查
   - SSL配置
   - 访问控制
   - Headers配置




