Settings Sync & github 同步 vscode配置

>备份配置

1、vscode中安装Settings Sync插件

![Alt text](../static/TravisCI/1.jpg)

2、github 授权 Settings Sync



3、github新建token,获得token key

github用户头像=>[setting](https://github.com/settings/profile)=>[Developer settings](https://github.com/settings/apps)=>[Personal access tokens](https://github.com/settings/tokens)

![](../static/TravisCI/6.jpg)

确定后生成token，需记下

4、github新建Gist，生成Gist id

github用户头像=>[You gits]（url:https://gist.github.com/XXX（用户名））=> +


![](../static/TravisCI/8.jpg)

记下Gist id

![](../static/TravisCI/9.jpg)

5、配置Settings Sync的token key与Gist id

方法一：
Settings Sync配置

shift+ctrl+p ：sync

![](../static/TravisCI/11.jpg)
![](../static/TravisCI/12.jpg)
![](../static/TravisCI/13.jpg)

Gist id配置

![](../static/TravisCI/10.jpg)


方法二：
![](../static/TravisCI/4.jpg)
![](../static/TravisCI/5.jpg)

6、测试是否成功

shift+alt+u

![](../static/TravisCI/14.jpg)

github显示如下:

![](../static/TravisCI/7.jpg)

>新机恢复操作

1、vscode中安装Settings Sync插件

2、下载
方法一：

![](../static/TravisCI/15.jpg)

方法二：

shift+alt+d

输入Gist id

![](../static/TravisCI/16.jpg)