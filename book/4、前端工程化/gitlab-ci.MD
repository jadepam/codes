
gitlab自动化构建与部署

# 1、Integrations
> 通过webhook方式触发jinkens任务

# 2、CI/CD
> 通过GitLab-Runner进行CI/CD

## 具体步骤（以新项目为例）
测试服务器：10.150.27.124

gitlab-runner注册机：




------
# 3、使用gitlab-ci实现gitlab自动化部署
## window下
 安装gitlab-runner [官网](https://docs.gitlab.com/runner/install/)
windows环境下载.exe文件,需将改文件放在“GitLab-Runner”文件夹下，如图
![img](/static/gitlab-ci/1.jpg)

## gitlab-runner

所在代码仓下目录:settings/ci_cd

![img](/static/gitlab-ci/2.jpg)

上图的url与token，输入下图中执行

![img](/static/gitlab-ci/3.jpg)

最终效果gitlab当前页面，则表示注册成功
![img](/static/gitlab-ci/4.jpg)

## .gitlab-ci.yml配置 [官网](https://docs.gitlab.com/ee/ci/yaml/README.html)




