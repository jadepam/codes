目录：

[toc]

> 前言：希望达到的效果：一是规范并区分commit提交类型；二是根据类型输出Changelog；至于commit规范，建议采用Angular commit规范，理由：开源库的现行规范，算行业标准；其次有npm插件提供包括：交互式命令生成符合规范的提交（commitizen）;当然你也可以搭配husky避免重复commit提交（多次提交，只提交最后一次commit内容）。基于规范的commit提交，使用standard-version可以实现自动化生成changelog.md

### 1、Angular commit规范

```json
commit message 分3个部分：head, body, footer
head: <type> (scop): subject
type: feat, fix, docs, style, refactor, test, chore,ci, revert, perf, build
score: 影响范围
subject: 简短描述（动词开头，首字母小写，结尾不加.）
body: 详细描述
footer: (1) 不兼容改动；(2) 关闭issue
revert 有特殊的格式
# head: revert: <要被撤销的commit的head>
# body: This reverts commit <commit-hash>.
# eg:
	revert: docs add README.md
	This reverts commit a2d04c0b914785e4ff0cdf4baeea84d8611c7a61.

```

## 2、commitizen 

作用：

交互式自动生成，符合Angular commit规范的commit message

安装：

```
npm i commitizen --D 
npx commitizen init cz-conventional-changelog --save-dev
```
运行：npx git-cz代替git commit -m

```
npx git-cz
```

![image-20200723145004516](/Users/jadepam/Library/Application Support/typora-user-images/image-20200723145004516.png)

```json
feat: A new feature //新功能
fix: A bug fix //修复 bug
docs: Documentation only changes //文档修改
style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) //格式（不影响代码运行的变动
refactor: A code change that neither fixes a bug nor adds a feature //重构
perf: A code change that improves performance //提高性能
test: Adding missing tests or correcting existing tests//添加缺失测试或更正现有测试
build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm) //依赖的外部资源变化
ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) //ci 文件变化
chore: Other changes that don't modify src or test files //构建过程或辅助工具的变动
revert: Reverts a previous commit//恢复先前的提交
```

vcsode插件:vscode-commitizen

### 3、husky

作用：避免重复的commit提交，阻止不符合规范的commit

安装：npm i -D husky @commitlint/config-conventional @commitlint/cli

配置：

```
"husky": {
"hooks": {
"commit-msg": "commitlint -x @commitlint/config-conventional -E HUSKY_GIT_PARAMS"
}
}
```

### 4、[standard-version](https://www.npmjs.com/package/standard-version)

作用：自动输出变更记录，只会输出feat、bug类型的commit

安装：

```json
npm install conventional-changelog-cli --D
npx conventional-changelog -p angular // # 0.1.0 (2020-07-22)
npx conventional-changelog -i CHANGELOG.md -s -p angular//输出CHANGELOG.md
或者standard-version
npm install standard-version --D
```

运行：

```json
npx standard-version
```

![图1](/Users/jadepam/Library/Application Support/typora-user-images/image-20200723144131289.png)

常用命令： 会同步变更package.json的"version"

```css
standard-version  --first-release 
创建CHANGELOG.md 
```

```ruby
standard-version 
1.0.0 => 1.0.1 并修改CHANGELOG.md 
```

```ruby
standard-version --prerelease dev
1.0.1 => 1.0.2.dev-0 并修改CHANGELOG.md
```

```ruby
再次执行
standard-version --prerelease dev
1.0.2.dev-0 => 1.0.2.dev-1 并修改CHANGELOG.md
```

```dart
重新设置version版本为1.0.0
standard-version  --release-as minor
1.0.0 => 1.1.0 并修改CHANGELOG.md
```

```dart
standard-version --release-as 1.8.0
1.1.0 => 1.8.0 并修改CHANGELOG.md
```

```ruby
standard-version --no-verify
1.8.0 => 1.8.1 并修改CHANGELOG.md 跳过git hook
```

```json
npx standard-version --dey-run//让您查看要运行的命令，而无需提交git或更新文件
✔ bumping version in package.json from 0.1.3 to 0.1.4
✔ bumping version in package-lock.json from 0.1.3 to 0.1.4
✔ outputting changes to CHANGELOG.md

---
### [0.1.4](http://hcgit.hengchang6.com/caifufe/local-life-client/compare/v0.1.3...v0.1.4) (2020-07-23)//预览输出
---

✔ committing package-lock.json and package.json and CHANGELOG.md
✔ tagging release v0.1.4
ℹ Run `git push --follow-tags origin gittest` to publish
```

配置文件.versionrc.js

```js
module.exports = {
    skip: {
      tag: true,
    },
    //types为Conventional Commits标准中定义，目前支持
    //https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional
    types: [
      { type: "feat", section: "新特性" },
      { type: "fix", section: "Bug修复" },
      { type: "docs", section: "文档" },
      { type: "chore", section: "配置项", hidden: false },
      { type: "style", section: "格式", hidden: false },
      { type: "refactor", section: "重构", hidden: false },
      { type: "perf", section: "性能", hidden: false },
      { type: "test", section: "测试", hidden: false },
      { type: "build", section: "构建", hidden: false },
      { type: "ci", section: "CI", hidden: false },
      { type: "revert", section: "回滚", hidden: false },
    ],
    //hash链接
    commitUrlFormat: "http://gitlab.cmss.com/BI/{{repository}}/commit/{{hash}}",
    //issue链接
    issueUrlFormat: "http://jira.cmss.com/browse/{{id}}",
    //server-version自动commit的模板
    releaseCommitMessageFormat:
      "build: v{{currentTag}}版本发布 \n\nCode Source From: Self Code \nDescription: \nJira: # \n市场项目编号（名称）：",
    //需要server-version更新版本号的文件
    bumpFiles: [
      {
        filename: "MY_VERSION_TRACKER.txt",
        // The `plain-text` updater assumes the file contents represents the version.
        type: "plain-text",
      },
      {
        filename: "package.json",
        // The `json` updater assumes the version is available under a `version` key in the provided JSON document.
        type: "json",
      },
    ],
  };
```

效果预览：

![image-20200723165902062](/Users/jadepam/Library/Application Support/typora-user-images/image-20200723165902062.png)



