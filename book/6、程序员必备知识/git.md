1、导致报错:error: You have not concluded your merge (MERGE_HEAD exists).的原因可能是在以前pull下来的代码自动合并失败。

解决方案一：保留本地的更改，中止合并->重新合并->重新拉取
```
git merge --abort
git reset --merge
git pull
```
解决方案二：舍弃本地代码，远端版本覆盖本地版本（慎重）
```
git fetch --all
git reset --hard origin/master
git fetch
```
2、Git fetch和git pull的区别(都可以从远程获取最新版本到本地)
```

git fetch：只是从远程获取最新版本到本地，不会merge(合并)

git fetch origin master  

//从远程的origin的master主分支上获取最新版本到origin/master分支上

git log -p master..origin/master 

//比较本地的master分支和origin/master分支的区别

git merge origin/master //合并

Git pull：从远程获取最新版本并merge(合并)到本地

git pull origin master  //相当于进行了 git fetch 和 git merge两部操作
```

3、本地删除无效的远程分支：清理远程分支，把本地不存在的远程分支删除
```
git remote prune origin
```
批量删除本地分支：除master

git branch | grep -v 'master' | xargs git branch -D
4、撤销提交
- git reset 撤销至某个提交（恢复至当前版本代码）
```
git reflog
git reset --hard [last good SHA]
```
- git revert 撤销某个提交


5、放错分支（备份到新的分支）
- 新建一个 feature 分支，指向当前最新的提交，注意，这时依然停留在当前分支
```
git branch feature
```
- 切换到这几次提交之前的状态
```
git reset --hard [当前分支此前的最后一次提交]
```
- 切换到 feature 分支
git checkout -b 名 origin/url
```
git checkout feature
```
快速拉取分支到本地
 ```
 git checkout -b name origin/name
 ```
6、commit本地变更
（1）填写错误，替换上一次提交
```
git commit --amend -m "Fixes bug #42"
```
（2）修改历史commit
```
git rebase -i hash（父）
```
（3）连续的commit合并
```
git rebase -i hash(父)
```
（4）不连续的commit合并
```
git rebase -i hash(父)
```
7、git relog 与 git log 区别
git reflog 可以查看所有分支的所有操作记录（包括已经被删除的 commit 记录和 reset 的操作）

git log 命令可以显示所有提交过的版本信息（--pretty=oneline只会显示版本号和提交时的备注信息）

8、remote: HTTP Basic: Access denied

git config --system --unset credential.helper
重新输入账户与密码


有如下几种处理方式：
1. git add并且git commit，再git checkout，提交到当前分支
2. git add但不git commit，可以git stash，然后git checkout到新分支，做修改，然后git checkout回到之前的分支之后git stash apply，再git commit，提交到之前的分支
3. git add但不git commit，也不git stash，直接git checkout到新分支，做修改，然后再git commit的话，记录就在切换后的分支下面。

其背后的原因：一个本地的git repo只有一个工作区和暂存区，但是有多个分支的提交区，而我们的checkout只是将HEAD指针从一个分支切换到另一个分支

9、git config

优先级：local > global > system
设置：缺省等同于 local 
$ git config --local 当前仓
$ git config --global global对登录⽤户所有仓库有效
$ git config --system system对系统的所有⽤户有效

显示 config 的配置，加 --list 
$ git config --list --local 
$ git config --list --global 
$ git config --list --system

清除，--unset
$ git config --unset --local user.name 
$ git config --unset --global user.name 
$ git config --unset --system user.name

10、.git文件
cd .git目录

git diff --cached 暂存区域head作比较

git diff默认比较，工作区与暂存区域的区别
<!-- head作比较 -->

git reset HEAD （-- 文件）将暂存区的文件取消保存，恢复到head状态
此时git diff --cached 为空 

git checkout -- 文件名 工作区恢复至暂存区

git reset --hard hash 工作区、暂存区恢复至指定状态


git diff commit的hash（分支的话，表示最近一次提交） hash -- 文件名 比较不同提交（分支）的文件变化

git rm 文件 删除文件并放置暂存区

git stash  保持，git stash apply恢复；临时保持当前状态并将工作恢复到之前状态
git stash pop 与git stash apply（保留）区别，git stash list列表是否保留


.gitignore
/不包含文件名的文件

git mv 变更文件名
11、常⽤的传输协议
|常⽤协议 |语法格式| 说明|

|本地协议（1）| /path/to/repo.git |哑协议|
|本地协议（2）| file:///path/to/repo.git| 智能协议|

|http/https协议|http://git-server.com:port/path/to/repo.git
https://git-server.com:port/path/to/repo.git |平时接触到的，都是智能协议|

|ssh协议| user@git-server.com:path/to/repo.git |⼯作中最常⽤的智能协议|

哑协议与智能协议

直观区别：哑协议传输进度不可⻅；智能协议传输可⻅。

传输速度：智能协议⽐哑协议传输速度快。

git remote -v
git remote set-branches [--add] <name> <branch>..


gitlab CI/CO

12、tags
git tag <tagName> //创建本地tag

git push origin <tagName> //推送到远程仓库
若存在很多未推送的本地标签，你想一次全部推送的话：
git push origin --tags

远程 tag 的删除：
git tag -d <tagName>
git push origin :<tagName>

4.检出标签
git checkout -b <branchName> <tagName>

