# Git 完整指南

## 目录
- [一、基础概念](#一基础概念)
- [二、常见问题与解决方案](#二常见问题与解决方案)
- [三、Git配置管理](#三git配置管理)
- [四、高级操作](#四高级操作)
- [五、最佳实践](#五最佳实践)

## 一、基础概念

### 1. 版本管理类型
- **SVN**: 集中式，本地与服务器，文件可以lock
- **Git**: 分布式，支持http、ssh协议

### 2. 工作区概念
- 工作区（Working Directory）
- 暂存区（Stage/Index）
- 本地仓库（Local Repository）
- 远程仓库（Remote Repository）

## 二、常见问题与解决方案

### 1. 合并冲突处理
```bash
# 方案一：保留本地更改
git merge --abort
git reset --merge
git pull

# 方案二：使用远程版本（慎用）
git fetch --all
git reset --hard origin/master
git fetch
```

### 2. Fetch与Pull的区别
```bash
# Fetch：获取远程更新但不合并
git fetch origin master
git log -p master..origin/master  # 比较差异
git merge origin/master           # 手动合并

# Pull：获取并自动合并
git pull origin master           # 相当于fetch + merge
```

### 3. 分支管理
```bash
# 查看和清理分支
git remote show origin          # 查看分支
git remote prune origin        # 清理无效远程分支

# 批量删除分支
git branch | grep -v 'master' | xargs git branch -D  # 删除除master外所有分支

# 单个分支操作
git push origin --delete <branch-name>  # 删除远程分支
git branch -d <branch-name>             # 删除本地分支
```

### 4. 提交管理
```bash
# 撤销提交
git reset --hard [commit-id]   # 完全撤销
git revert HEAD               # 创建新提交来撤销
git revert id -m 1           # 撤销合并

# 修改提交
git commit --amend -m "新消息"  # 修改最后一次提交
git rebase -i [commit-id]     # 修改历史提交
```

## 三、Git配置管理

### 1. 配置优先级
```bash
# 优先级：local > global > system
git config --local   # 仓库级
git config --global  # 用户级
git config --system  # 系统级

# 查看配置
git config --list --local
git config --list --global
git config --list --system

# 清除配置
git config --unset --local user.name
```

### 2. 常用传输协议
| 协议类型 | 语法格式 | 说明 |
|---------|---------|------|
| 本地协议 | /path/to/repo.git | 哑协议 |
| 本地协议 | file:///path/to/repo.git | 智能协议 |
| HTTP/HTTPS | http(s)://git-server.com:port/path/to/repo.git | 智能协议 |
| SSH | user@git-server.com:path/to/repo.git | 最常用 |

## 四、高级操作

### 1. 标签管理
```bash
# 创建和推送标签
git tag <tag-name>                # 创建本地标签
git push origin <tag-name>        # 推送单个标签
git push origin --tags           # 推送所有标签

# 删除标签
git tag -d <tag-name>            # 删除本地标签
git push origin :<tag-name>      # 删除远程标签
```

### 2. 暂存区操作
```bash
# 常用工作流
git add => git commit => git checkout  # 常规提交
git add => git stash => git checkout   # 临时保存

# 暂存区管理
git stash list                    # 查看暂存列表
git stash apply stash@{id}        # 恢复指定暂存
git stash pop                     # 恢复最新暂存
```

## 五、最佳实践

1. **分支管理**
   - 主分支保持稳定
   - 功能开发使用特性分支
   - 定期同步主分支更新

2. **提交规范**
   - 提交信息要清晰明确
   - 相关改动放在同一提交
   - 保持提交粒度合适

3. **工作流程**
   - 及时提交本地更改
   - 定期推送到远程
   - 妥善处理冲突

4. **安全建议**
   - 重要操作前备份
   - 谨慎使用强制推送
   - 定期清理无用分支
