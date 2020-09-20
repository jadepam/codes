## linux 知识
- windows 平台上运行的类 UNIX 模拟环境[cygwin](https://mirrors.tuna.tsinghua.edu.cn/cygwin/)
- main 指令使用查看工具

权限：rwx 111 7
## 各系统间文件传输
    linux/Windows文件传输方法：
    cp\scp： 用于在Linux下进行远程拷贝文件的命令，和它类似的命令有cp，不过cp只是在本机进行拷贝不能跨服务器，而且scp传输是加密的，scp在跨机器复制的时候为了提高数据的安全性，使用了ssh连接和加密方式，如果机器之间配置了ssh免密码登录，那在使用scp的时候密码都不用输入（免密登陆，证书代替密码ssh-keygen）
    ftp\sftp ： FTP是文件服务器，可实现文件的上传下载，存储等功能。sftp加密
    rz/sz ： 用于linux与windows之间的文件上传/下载
    rsync ： 是可以实现增量备份的工具。配合任务计划，rsync能实现定时或间隔同步，配合inotify或sersync，可以实现触发式的实时同步。rsync可以实现scp的远程拷贝，cp的本地拷贝、rm删除和"ls -l"显示文件列表等功能。
    samba服务：Samba服务类似于windows上的共享功能，可以实现在Linux上共享文件，windows上访问，当然在Linux上也可以访问到。 是一种在局域网上共享文件和打印机的一种通信协议，它为局域网内的不同计算机之间提供文件及打印机等资源的共享服务。
    PSCP/PSFTP：PSCP/PSFTP是PuTTY提供的文件传输工具，通过SSH连接，在两台机器之间安全的传输文件，可以用于任何SSH（包括SSHv1、SSHv2）服务器


