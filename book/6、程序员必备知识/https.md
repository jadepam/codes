



## https

HTTP Strict Transport Security (通常简称为HSTS) 是一个安全功能，它告诉浏览器只能通过HTTPS访问当前资源, 禁止HTTP方式。
>表现：
1、通过http访问下，状态码是Status Code: 301； 

2、https响应头中包含：Strict-Transport-Security；

>配置：

对应nginx配置如下：
```
server {  
    listen 88;  
    server_name localhost;  
     
    rewrite ^(.*)$  https://$host$1 permanent;  
}
server {
    listen 443 ssl;
    listen [::]:443 ssl ipv6only=on;
    server_name localhost;
    ssl_certificate     /Volumes/Pam/hengchang/local-life-client/pem/cacert.pem;
    ssl_certificate_key /Volumes/Pam/hengchang/local-life-client/pem/private_key.pem;
   
    #把下面的注释掉就可以了
    add_header Strict-Transport-Security "max-age=63072000;includeSubDomains; preload";
    set $web_url $host;

    location / {
        #静态资源
        root   /Volumes/Pam/hengchang/local-life-client/dist;
        index  index.html;
    }
    location ^~ /api/ {
      #接口代理
      proxy_pass   https://localc.hengxiaohua.com/api/;
   }

}
```

