

![image-20200901181911718](/static/image-20200901181911718.png)

Nginx先天的**事件驱动**型设计、**全异步**的网络I/O处理机制、极少的进程间切换以及许多优化设计，都使得Nginx天生善于处理**高并发**压力下的互联网请求，同时Nginx降低了资源消耗，可以把服务器硬件资源“压榨”到极致。

nginx使用一个master管理多个worker进程（通常worker=cup核心数，进程间切换的代价最小），master只负责监控管理worker进程，worker提供实际的互联网服务。一个worker进程可以同时处理的请求数只受限于<b>内存</b>大小。Apache每个进程每个时刻只能处理一个请求（在Prefork MPM中每个子进程一个时间只能处理一个请求；在Workder MPM中，进程生成的每个线程一个时间处理一个请求）


## nginx安装与常用命令

> 版本：nginx-1.19.4

nginx -V //查看版本，
nginx -t //检查配置
nginx -T //检查配置，并打印配置
nginx -s reload//在不重启服务的情况下可使配置生效
nginx -s stop //关闭
ps -ef|grep nginx//查看nginx进程
## nignx配置文件

nginx配置分为几大块：

main (全局设置)

events(nginx工作模式）

http(http设置): upstream（负载均衡服务器设置），server(主机设置）：location（url匹配）

```json
#总体上分成三个部分构成：基本配置、events配置、HTTP配置（upstream、server、location），以下为配置详情
    #---基本配置---
    worker_processes  1; #配置工作进程数目，根据硬件调整，通常等于CPU数量或者2倍于CPU数量
		...
    #---events配置---
    #配置工作模式和连接数
    events {
        worker_connections  1024;  
      	...
    }
    #---HTTP配置---配置HTTP服务器，利用它的反向代理功能提供负载均衡支持
    http {
        #---HTTP基本配置---
    		include  ... #导入单独配置文件
 				#---HTTP_server、upstream配置---
        server {
            listen       80; #监听端口
            server_name  localhost; #配置服务名
            location / {
                root   html; #root是配置服务器默认网站根目录位置，默认nginx安装主目录下的html
                index  index.html index.htm; #配置首页文件的名称
            }
        }
				upstream backend  {
        server backend1.example.com weight=5;
        server backend2.example.com:8080;
        server unix:/tmp/backend3;
      }
 		#---mail配置---
		mail {
      #---mail基本配置---
      
      #---HTTP_多server配置---
      server {
        listen 25;
        protocol smtp;
        timeout 120000;
      }
   	 }
    }

```
## 正向代理、反向代理 



**正向代理的用途：**

（1）访问原来无法访问的资源，如google

（2） 可以做缓存，加速访问资源

（3）对客户端访问授权，上网进行认证

（4）代理可以记录用户访问记录（上网行为管理），对外隐藏用户信息

**正向代理即是客户端代理, 代理客户端, 服务端不知道实际发起请求的客户端.**

2、反向代理

反向代理的作用

（1）保证内网的安全，阻止web攻击，大型网站，通常将反向代理作为公网访问地址，Web服务器是内网

（2）负载均衡，通过反向代理服务器来优化网站的负载

**反向代理即是服务端代理, 代理服务端, 客户端不知道实际提供服务的服务端**

> 正向、反向代理配置


```
resolver 8.8.8.8 #resolver为DNS解析,这里填写的IP为Google提供的免费DNS服务器的IP地址
server { 
  location / 
  {     
  # 当客户端请求我的时候，我会把请求转发给它      
  # $http_host 要访问的主机名 $request_uri 请求路径      
    proxy_pass http://$http_host$request_uri; 
  }
  }
```
//反向
server {    
  listen   80;    
  server_name   localhost; 
  # 用户访问 localhost，反向代理到 http://www.baidu.com
   location / {        
    proxy_pass http://www.baidu.com
    }
  }


```

安全隔离。◆ 提供对隔离应用程序组件的可扩展性。◆ 反向代理服务器的性能调优

> cookie丢失的问题

**proxy_cookie_path**：proxy_cookie_path path replacement

path就是你要替换的路径 replacement 就是要替换的值

```json
location /proxy_path {
       proxy_pass   http://127.0.0.1:8080/project;
       proxy_cookie_path  /project /proxy_path;
   }

```

**proxy_cookie_domain**：

转换response的set-cookie header中的domain选项，由后端设置的域名domain转换成你的域名replacement，来保证cookie的顺利传递并写入到当前页面中

```json
location /api {
   proxy_pass https://b.test.com;
   proxy_cookie_domain b.test.com  a.test.com;
} 
```

3、location路径的映射

```json
通过在nginx的nginx.conf文件进行配置
location路径的映射：优先级
匹配顺序：= （精准匹配） > ^~(匹配开头路径) > ~（正则匹配结尾，字母大小写敏感）,~*（正则匹配结尾，字母大小写不敏感） > /起始路径 > /（通用匹配）

location = /uri 　　　=开头表示精确匹配，只有完全匹配上才能生效。
location ^~ /uri 　　^~ 开头对URL路径进行前缀匹配，并且在正则之前。
location ~ pattern 　~开头表示区分大小写的正则匹配。
location ~* pattern 　~*开头表示不区分大小写的正则匹配。
location /uri 　　　　不带任何修饰符，也表示前缀匹配，但是在正则匹配之后。
location / 　　　　　通用匹配，任何未匹配到其它location的请求都会匹配到，相当于switch中的default。

方式一：匹配文件
    #当访问静态资源，则从Linux服务器/opt/static目录下获取（举例）
    location ~ .*\.(js|css|html|gif|jpeg|png|bmp|swf|ioc|rar|zip|txt|flv|mid|doc|ppt|pdf|xls|mp3|wma)$ {
        root /opt/static;
    }
    #其中：~表示正则匹配，也就是说后面的内容可以是正则表达式匹配
    #       第一个点.表示任意字符
    #       *表示一个或多个字符
    #       \是转义字符，是后面点的转义字符标志
    #       |表示或者
    #       $表示结尾
    #整个配置表示以.后面括号里面的这些为后缀结尾的文件都有nginx处理；
    #注意：放置静态资源的目录，需要有足够的权限，权限不足会报403错误，建议：chmod 755

方式二：匹配目录
    location ~ .*/(css|js|img|images) {
        root /opt/static
    }
```

3、访问三方服务

Nginx提供了两种全异步方式来与第三方服务器通信：upstream与subrequest。upstream可以保证在与第三方服务器交互时（包括三次握手建立TCP连接、发送请求、接收响应、四次握手关闭TCP连接等）不会阻塞Nginx进程处理其他请求，Nginx仍然可以保持它的高性能。

upstream：访问第三方服务，并将内容几乎原封不动地返回给用户时，一般使用upstream方式，它可以非常高效地透传HTTP

subrequest：访问第三方服务只是为了获取某些信息，再依据这些信息来构造响应并发送给用户，这时应该用subrequest方式，因为从业务上来说，这是两件事：获取上游响应，再根据响应内容处理请求，应由两个请求处理

```json
  #------------------------HTTP_负载均衡-------------------------
         upstream www.myweb.com {
            server 127.0.0.1:9100;
            server 127.0.0.1:9200;
        }//轮询（默认）
        upstream www.myweb.com {
            server 127.0.0.1:9100 weight=3;
            server 127.0.0.1:9200 weight=1;
        }// 权重
 				upstream www.myweb.com {
                ip_hash;
                server 127.0.0.1:9100 weight=3;
                server 127.0.0.1:9200 weight=1;
            } //ip_hash:也叫IP绑定，每个请求访问IP的hash值分配，这样每个访问客户端会固定访问一个后端服务器，可以解决会话Session丢失问题
				upstream www.myweb.com {
                least_conn;
                server 127.0.0.1:9100 weight=3;
                server 127.0.0.1:9200 weight=1;
            }//web请求会被转发到最少连接数的服务器上
				upstream www.myweb.com {
            server 127.0.0.1:9100;
            server 127.0.0.1:9200 backup; #其他所有的非backup机器down的时候，才请求backup机器
        }
        upstream www.myweb.com {
            server 127.0.0.1:9100;
            server 127.0.0.1:9200 down; #down表示当前的server是down状态，不参与负载均衡
        }
        
        server {
           location /myweb {
                      proxy_pass http://www.myweb.com
            }//负载均衡
        }
```

## 邮件代理

Nginx提供邮件代理服务器，无实际的邮件服务器功能，而是把客户端的请求代理到上游的邮件服务器中，其中最重要的是**Nginx并不是简单地透传邮件协议到上游，它还有一个认证的过程**。

Nginx在与下游客户端交互过程中，还会访问认证服务器，只有认证服务器通过了并且被告知Nginx上游的邮件服务器地址后，Nginx才会向上游的邮件服务器发起通信请求。同时，Nginx可以解析客户端的协议获得必要的信息，接下来它还可以根据客户端发来的信息快速、独立地与邮件服务器做简单的认证交互，之后才会开始在上、下游之间透传TCP流。这些行为都意味着Nginx的高并发特性将会降低上游邮件服务器的并发压力

<div style="display:flex;width:100%"><img src="/Users/jadepam/Library/Application Support/typora-user-images/image-20200724112834841.png" alt="image-20200724112834841" style="zoom:45%;" /><img src="/Users/jadepam/Library/Application Support/typora-user-images/image-20200727153843706.png" alt="image-20200723115011476" style="zoom:45%;" /></div>

Nginx与下游客户端、上游邮件服务器间都是使用邮件协议，而与认证服务器之间却是通过类似HTTP的形式进行通信的。

> 基本代理服务。 认证服务。与memcached结合。解释日志文件。操作系统限制

```json
events {
  worker_connections 1024;
}
mail {
  server_name mail.example.com;
  auth_http localhost:9000/auth;//认证服务器

  proxy on;

  ssl_prefer_server_ciphers on;
  ssl_protocols TLSv1 SSLv3;
  ssl_ciphers HIGH:!ADH:!MD5:@STRENFTH;
  ssl_session_cache shared:MAIL:10m;
  ssl_certificate /opt/mail.example.com.crt;
  ssl_certificate_key /opt/mail.example.com.key;

  pop3_capabilities TOP USER;
  imap_capabilities IMAP4rev1 UIDPLUS QUOTA;
  smtp_capabilities PIPELINING 8BITMIME DSN;

  pop3_auth apop cram-md5;
  imap_auth login cram-md5;
  smtp_auth login cram-md5;

  server {
    listen 25;
    protocol smtp;
    timeout 120000;
  }

  server {
    listen 465;
    protocol smtp;
    ssl on;
  }

  server {
    listen 587;
    protocol smtp;
    starttls on;
  }

  server {
    listen 110;
    protocol pop3;
    starttls on;
  }

  server {
    listen 995;
    protocol pop3;
    ssl on;
  }

  server {
    listen 143;
    protocol imap;
    starttls on;
  }

  server {
    listen 993;
    protocol imap;
    ssl on;
  }
}
```



## nginx实战

### 静态网站

```json
修改配置文件：
        server {
                listen       80; #监听端口
                server_name  localhost; #配置服务名

                #charset utf-8; #配置字符集

                #access_log  logs/host.access.log  main; #配置本虚拟主机的访问日志

                #默认的斜杠/的请求，当访问路径中有斜杠/，会被该location匹配到并进行处理
                location / {
                    root   static_path; #配置静态网页根目录位置，默认nginx安装主目录下的html
                    index  index.html index.htm; #配置首页文件的名称
                }
        }
```

### 负载均衡

```json
访问入口只有一个，针对不同的请求分发到相应的服务器上去做处理
    硬件负载均衡：eg: F5/深信服/Array等，缺点是费用昂贵，对于规模较小的网络应用成本太高
    软件负载均衡：eg: nginx/LVS/HAProxy等，有点免费开源，成本低廉
实现方式：
    用户-->nginx负载均衡-->{Tomcat1，Tomcat2}访问动态资源
```

### 动静分离

```json
                        |-->{tomcat1,tomcat2}动态资源
用户-->nginx负载均衡-->  |
                        |-->{nginx1，nginx2}静态资源
nginx在一台Linux上安装一份，可以启动多个nginx，每个nginx的配置文件不一样即可。分类别（动态资源，静态资源）多配置
```

### 虚拟主机&集群

```json
虚拟主机就是把一台服务器划分成多个“虚拟”的服务器，这样我们的一台物理服务器就可以当做多个服务器来使用，从而可以配置多个网站
    nginx提供虚拟主机的功能，就是为了让我们不需要安装多个nginx，就可以运行多个网站
    nginx下，一个server标签就是一个虚拟主机
    nginx的虚拟主机就是通过nginx.conf中server节点指定的，想要配置多个虚拟主机，配置多个server节点即可
    配置虚拟主机通常有一下两种方式：
    （1）基于域名的虚拟主机
    server{
        listen          80;
        server_name     www.wang.com;
        location /wang {
            proxy_pass http://www.wang.com; #还应该配置名称为www.wang.com的负载均衡
        }
    }
    server{
        listen          80;
        server_name     www.bin.com;
        location /bin {
            proxy_pass http://www.bin.com; #还应该配置名称为www.bin.com的负载均衡
        }
    }

    （2）通过include的方式引入虚拟主机配置
    include /usr/local/nginx/vhost/vhost.conf;
    将虚拟目录的配置文件加入到“http{}”部分的末尾，与其他server并列；
    其中vhost.conf中的内容同基于域名的虚拟主机的server配置
    在nginx.conf中的http末尾include vhost.conf_path 即可
```

## nginx进阶

### 1、nginx的http服务器

<img src="/Users/jadepam/Library/Application Support/typora-user-images/image-20200724153249324.png" alt="image-20200724153249324" style="zoom:50%;" />



### 2、进程间的通信机制 

Linux提供了多种进程间传递消息的方式，如共享内存、套接字、管道、消息队列、信号等，每种方式都有其优缺点，而Nginx框架使用了3种传递消息传递方式：共享内存、套接字、信号。

### 3、slab共享

first-fit：将从头遍历空闲内存块构成的链表，当找到的第1块空间大于请求size的内存块时，就把它返回给申请者

best-fit：它也会遍历空闲链表，但如果一块空闲内存的空间远大于请求size，为了避免浪费，它会继续向后遍历，看看有没有恰好适合申请大小的空闲内存块，这个算法将试图返回最适合（例如内存块大小等于或者略大于申请size）的内存块

前者分配的速度更快，但内存浪费得多；后者的分配速度慢一些，内存利用率上却更划算

Nginx的slab内存分配方式是基于**best-fit**思路的，即当我们申请一块内存时，它只会返回恰好符合请求大小的内存块

### 4、nginx常用容器

**跨平台、使用C语言实现**，导致Nginx不宜使用一些第三方中间件提供的容器和算法；跨平台意味着Nginx的所有代码都必须可以跨平台编译、运行。虽然all操作系统都支持C语言，但是C语言与每一个操作系统都是强相关的，且C库对操作系统的某些系统调用封装的方法并不是跨平台的。Nginx的解决方法：在必须特殊化处理的地方，对每个操作系统都给一份特异化的实现；故下载Nginx源码包时会发现有Windows版本和UNIX版本。而对于基础的数据结构和算法，Nginx则完全从头实现了一遍，如动态数组、链表、二叉排序树、散列表等。

> 常用的6中容器

ngx_queue_t双向链表：

 双向链表是Nginx提供的轻量级链表容器，**它与Nginx内存池无关**，因此不要指望双向链表为你分配内存空间，它只能为你存储已经分配好内存的元素，它只做元素间的连接工作。双向链表虽然功能很简单，但它量级很轻，只要求用户数据增加两个指针域即可。除此之外，它还提供了简易的插入排序算法。

ngx_arrat_t 动态数组：

Nginx的动态数组类似于STL中的vector，它使用连续内存存储元素，所以按下标随机存取效率很高。 相比数组，动态数组的优势是动态扩容，当容量达到最大值时自动扩容(扩容算法与vector不同)。另外，**动态数组负责内存分配**。它在支持通配符的散列表中有所应用。

ngx_list_t 单向链表:

单向链表与双向链表是完全不同的。首先，**它负责内存分配**，这一点与动态数组相同，但是它使用不连续空间存储元素，有点像“数组+单链表”。

ngx_rbtree_t红黑树:

红黑树是一种十分高效的高级数据结构，Linux中作为核心数据结构存在。检索时不必遍历整个容器，查找的时间仅跟树的高度有关。与散列表相比，它支持范围查询。Nginx的许多模块都用到了红黑树，在需要快速检索元素的场景中，首先考虑是不是可以用红黑树。

ngx_radix_tree_t基数树:

与红黑树一样，基数树也是一种二叉查找树，具备红黑树同样的高效特点。但是基数树的应用场景比红黑树要窄，因为基数树要求必须以**整型(long)**作为关键字。但由于基数树插入、删除时不需要旋转操作，因此其变更效率比红黑树高。使用也比红黑树简单许多。

支持通配符的散列表:

这是Nginx的独创。Nginx首先实现了一般的散列表，然后在其基础上根据web服务器的特点，针对URL场景设计了支持通配符的散列表。不过，只支持前置和后置两种匹配模式，即只支持"*[.baidu.com](http://.baidu.com)"和"[www.baidu](http://www.baidu).*"两种模式。这种散列表实现较为复杂。




