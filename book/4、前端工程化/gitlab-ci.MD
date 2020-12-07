## gitlab自动化构建与部署

### 1、Integrations

> 通过webhook方式触发jinkens任务

### 2、CI/CD

> 通过GitLab-Runner进行CI/CD，构建成功后通知企业微信群；

前言：所在公司docker自动化部署人工操作过多，本文适用与研发过程中，需频繁发布的场景；整体架构图如下：

<img src="/static/gitlab-ci/换行.jpg" alt="换行" style="zoom:50%;" />

2、新项目实施步骤（部署在自己的测试服务器上）

步骤：1、新建gitlab代码仓库，获取token=> 2、注册runner（测试服务器）=》3、配置.gitlab-ci.yml=》4、nginx配置=》5、提交代码，查看构建

具体操作如下：

1、新建gitlab代码仓库，获取token

<img src="/static/gitlab-ci/image-20201105184434298.png" alt="image-20201105184434298" style="zoom:33%;" />

2、注册runner（测试服务器）

 ```shell
//登入注册机
ssh [user@ip](mailto:user@ip)

....登入成功

//进入容器并注册runner
[user@ip]$ docker container ls
CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
bc331347f611 gitlab/gitlab-runner "/usr/bin/dumb-init …" 13 days ago Up 7 days awesome_mirzakhani

[user@ip]$ sudo docker exec -it bc331347f611 gitlab-runner register

Runtime platform                  arch=amd64 os=linux pid=10182 revision=e95f89a0 version=13.4.1

Running in system-mode.

Please enter the gitlab-ci coordinator URL (e.g. https://gitlab.com/):

http://hcgit.xxx.com/ #访问http://hcgit.xxx.com/caifufe/项目名称/settings/ci_cd

Please enter the gitlab-ci token for this runner:

mcEK6Z2oy9SfmN******  #访问http://hcgit.xxx.com/caifufe/项目名称/settings/ci_cd

Please enter the gitlab-ci description for this runner:

[bc331347f611]: goodServiceWise-H5

Please enter the gitlab-ci tags for this runner (comma separated):

dev-test

Registering runner... succeeded           runner=mcEK6Z2o

Please enter the executor: docker, docker-ssh, parallels, ssh, virtualbox, docker+machine, custom, shell, docker-ssh+machine, kubernetes:

shell

Runner registered successfully. Feel free to start it, but if it's running already the config should be automatically reloaded!

//查看注册结果
root@bc331347f611:/# gitlab-runner list
Runtime platform arch=amd64 os=linux pid=5578 revision=e95f89a0 version=13.4.1
Listing configured runners ConfigFile=/etc/gitlab-runner/config.toml
dev-test Executor=shell Token=24f0096f5ff987b3a708c60d979242 URL=http://hcgit.xxx.com/
docker Executor=docker Token=2ac99b80e4aa4fc788f8b9714890fb URL=http://hcgit.xxx.com/
goodServiceWise-H5 Executor=shell Token=6ff06c0b41d5d3e468b2233a0a71b1 URL=http://hcgit.xxx.com/
local-life-client-new Executor=shell Token=fbde47abfa044f837dacd158a14dc1 URL=http://hcgit.xxx.com/
local-life-merchants-new Executor=shell Token=2a3d62e8244801a8bfa561ed737b9a URL=http://hcgit.xxx.com/
 ```

gitlab对应页面:

<img src="/static/gitlab-ci/image-20201105184541332.png" alt="image-20201105184541332" style="zoom: 33%;text-algin:left" />

自动注册脚本：
expect shell.sh token name
```
#!/usr/bin/tclsh
package require Expect
# set host_ip1 [lindex $argv 0]
# set host_usr [lindex $argv 1]
# set host_pwd [lindex $argv 2]
# 服务器
set host_ip1 ip
set host_usr name
set host_pwd pwd
#runner配置
set token [lindex $argv 0]
#67VGC6mPZotT_wjvTSmo
set name  [lindex $argv 1]
#gitlab-runner
set curl  http://hcgit.hengchang6.com/
set tag auto-register
set language shell
set id bc331347f611
spawn ssh $host_usr@$host_ip1
set timeout 2
expect {
  -re "password" {send "$host_pwd\n"} 
  -re "yes/no" {send "yes\n";exp_continue} # 有的时候输入几次密码来确认,exp_continue
}
expect "$/#"
send "docker exec -it ${id} gitlab-runner register \r"
expect "https" {send "${curl} \r"}
expect "token" {send "${token} \r"}
expect "description" {send "${name} \r"}
expect "tags" {send "${tag} \r"}
expect "Please" {send "${language} \r"}
expect "#"
send "gitlab-runner list \r"
send "exit\r"
expect eof
```

3、配置.gitlab-ci.yml配置 [官网](https://docs.gitlab.com/ee/ci/yaml/README.html)

简单dom

```shell
stages:
  - bulid
  # - wechat
##缓存 node_modules/目录 下次构建不会删除
cache:
  key: "$CI_COMMIT_REF_NAME" #$CI_JOB_NAME/$CI_COMMIT_REF_NAME启用每个任务和每个分支缓存
  untracked: true
  paths:
  - node_modules/
  - dist
# 安装构建依赖
#variables:  #变量
before_script:
  - npm config set registry http://public.npmjs.xxx/
  - npm config ls
  - whoami # gitlab-runner 
  - pwd 
  - ls -a
  - npm install
# # 打包新文件
bulid_job:
  stage: bulid
  only: 
    - dev
  tags:
    - dev-test
  script:
    - echo '上传测试环境'
    - npm run sync
# # 企业微信通知
# wechat_job:
#   stage: wechat
#   only: 
#     - tags # tag 分支 commit 之后触发
#   tags:
#     - dev-test
#   script:
#     - echo '上传测试环境'
#     - npm run sync
#     - sh wechat.sh key url 环境  项目名称 #webhookid\url\环境\项目
```

[企业微信机器人通知](https://work.weixin.qq.com/help?doc_id=13376)

简单案例如下： wechat.sh
```shell
#读取commit 内容
PUSH_CONTENT=$(git log -1  --pretty=format:"提交人:%ae；提交内容:%s")
echo $0 $1 $2 $3 $4 $PUSH_CONTENT "提交内容"
if [ -z "$PUSH_CONTENT" ];then
echo  $PUSH_CONTENT 'error:commit is empty'
exit 1
fi

curl 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key='$1'&debug=1' \
   -H 'Content-Type: application/json' \
   -d '
   {
        "msgtype": "test",
        "text":{
            "content" : "项目：'$4' \n '$PUSH_CONTENT' \n 上线环境：'$3' \n 访问链接:'$2'"
        }
   }'

exit 0
```

4、nginx配置

```shell
# sudo -i
# mkdir /data/project1
# cd /data
# chown -R uploadUSER project1
# sudo -i
# cd /opt/nginx/conf/vhost
# vi xx.conf
    location ^~/ {
       root /data/project1/dist/;
       try_files $uri $uri/ /index.html =404;
       error_log logs/error_xx.com.log;
    }
    location ^~/api/ {
       proxy_pass http://api.xxx.com/;
       proxy_redirect off;
       proxy_set_header Host $proxy_host;
       proxy_set_header X-Real-IP       $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
# /opt/nginx/sbin/nginx -s reload(修改host文件也需重启)

```

5、略

### 其他记录

> 服务器环境 配置相关

```shell
vi /etc/hosts #HOST映射,host修改后，nginx需要重启
docker cp /etc/hosts bc331347f611:/etc/hosts #同步到docker容器

bash: vi: command not found #安装vim
apt-get update
apt-get install vim
apt-get install inetutils-ping

# 注册机docker环境安装：executor为docker时需要
apt-get install -y [docker.io](http://docker.io) 安装dokcer
systemctl start docker
systemctl enable docker
systemctl restart docker
docker version
sudo systemctl status docker
```

> ssh免密登录

```shell
#单向登陆的操作过程：
1、登录A机器 
2、ssh-keygen -t [rsa|dsa]，将会生成密钥文件和私钥文件 id_rsa,id_rsa.pub或id_dsa,id_dsa.pub
3、将 .pub 文件复制到B机器的 .ssh 目录， 并 cat id_dsa.pub >> ~/.ssh/authorized_keys
4、大功告成，从A机器登录B机器的目标账户，不再需要密码了；
/root/.ssh/id_rsa.pub # 公钥地址
cat /root/.ssh/id_rsa.pub
cat /var/log/secure # 查看日志

# 注册机
ls ~/.ssh
ssh-keygen -t rsa 生成秘钥
scp ~/.ssh/id_rsa.pub femember@host:/home/femember/id_rsa.pub

#登录测试机
cat /home/femember/id_rsa.pub /home/femember/.ssh/authorized_keys
vi /etc/ssh/sshd_config
RSAAuthentication yes
PubkeyAuthentication yes

# 测试服务器
Agent admitted failure to sign using the key#注册机报错，需在测试服务器运行
ssh-add
systemctl restart sshd.service
在注册机ssh user@ip #验证ssh免密登录是否成功

#其他错误
Permission denied (publickey,gssapi-keyex,gssapi-with-mic)
#应该是你的配置文件出现了问题 /etc/ssh/sshd_config
```



> docker-compose 管理容器（好处：host映射方便管理）

```shell
# 下载docker compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
# 添加可执行权限
sudo chmod +x /usr/local/bin/docker-compose
# 将文件copy到 /usr/bin/目录下
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
# 查看版本
docker-compose --version

# 拉取gitlab-runner镜像
sudo docker pull gitlab/gitlab-runner:latest
# 获取容器id
docker container ls
​```
CONTAINER ID        IMAGE                  COMMAND                  CREATED             STATUS              PORTS               NAMES
bc331347f611        gitlab/gitlab-runner   "/usr/bin/dumb-init …"   20 hours ago        Up 20 hours                             awesome_mirzakhani
​```

# 进入命令行&&注册gitlab-runner
docker exec -it bc331347f611 bash
#or
sudo docker exec -it bc331347f611 gitlab-ci-multi-runner register

```

> docker容器镜像导出

```shell
#导出容器
docker ps -a
docker export bc331347f611 > /docker/gitlab-runner.tar  #导出容器
docker commit bc331347f611 gitlab-runner-new
# 导出镜像
docker images# 查询images id
....
docker save 5a784622891d > /docker/gitlab-runner-new.tar # 导出镜像
```