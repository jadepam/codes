# webpack

## 基础参数配置

### loader

- 概述

	- 1、Webpack本身只认识JavaScript，对于其他类型的资源必须预先定义一个或多个loader对其进行转译，输出为Webpack能够接收的形式再继续进行，因此loader做的实际上是一个预处理的工作
2、loader可以是链式的。我们可以对一种资源设置多个loader，第一个loader的输入是文件源码，之后所有loader的输入都为上一个loader的输出。用公式表达则为以下形式；output=loaderA(loaderB(loaderC(input)))
3、loader本身就是一个函数，在该函数中对接收到的内容进行转换，然后返回转换后的结果（可能包含source map和AST对象），转化后的结果（也是字符串类型）、source map，以及AST对象



- 配置

	- 1、在配置loader时，实际上定义的是模块规则（module.rules），它主要关注两件事：该规则对哪些模块生效（test、exclude、include配置），使用哪些loader（use配置）。loader可以是链式的，并且每一个都允许拥有自己的配置项。
2、与loader相关的配置都在module对象中，其中module.rules代表了模块的处理规则，Webpack打包时是按照数组从后往前的顺序将资源交给loader处理的，因此要把最后生效的放在前面
3、第一个loader的输入是源文件，之后所有loader的输入是上一个loader的输出，最后一个loader则直接输出给Webpack。
4、exclude与include是用来排除或包含指定目录下的模块，可接收正则表达式或者字符串（文件绝对路径），以及由它们组成的数组。exclude和include同时存在时，exclude的优先级更高
5、Webpack中的loader按照执行顺序可分为pre、inline、normal、post四种类型，上面我们直接定义的loader都属于normal类型，inline形式官方已经不推荐使用，而pre和post则需要使用enforce来指定
6、在Webpack中，我们认为被加载模块是resource，而加载者是issuer

- 常用loader

	- css-loader

		- 
对于SCSS类型的资源来说，我们需要sass-loader来处理其语法，并将其编译为CSS；接着再用css-loader处理CSS的各类加载语法；最后使用style-loader来将样式字符串包装成style标签插入页面

	- babel-loader

		- babel-loader用来处理ES6+并将其编译为ES5，babel-loader：它是使Babel与Webpack协同工作的模块。
·@babel/core：顾名思义，它是Babel编译器的核心模块。
·@babel/preset-env：它是Babel官方推荐的预置器，可根据用户设置的目标环境自动添加所需的插件和补丁来编译ES6+代码

	- url-loader

		- url-loader与file-loader作用类似，唯一的不同在于用户可以设置一个文件大小的阈值，当大于该阈值时与file-loader一样返回publicPath，而小于该阈值时则返回文件base64形式编

	- file-loader

		- file-loader用于打包文件类型的资源，并返回其publicPath

### plugin

- webpack-dev-server

	- 1、npm install--production过滤掉devDependencies中的冗余模块，
2、webpack-dev-server可以看作一个服务者，它的主要工作就是接收浏览器的请求，然后将资源返回。当webpack-dev-server接收到浏览器的资源请求时，它会首先进行URL地址校验。如果该地址是资源服务地址（上面配置的publicPath），就会从Webpack的打包结果中寻找该资源并返回给浏览器。
3、webpack-dev-server的两大职能：
·令Webpack进行模块打包，并处理打包结果的资源请求。
·作为普通的Web Server，处理静态资源文件请求
4、webpack-dev-server还有一项很便捷的特性就是live-reloading（自动刷新）。
5、replacement（模块热替换），我们甚至不需要刷新浏览器就能获取更新之后的内容。

### 输入输出

- 概述

	- 资源的输入输出流程，以及相关的配置项context、entry、output。
在配置打包入口时，context相当于路径前缀，entry是入口文件路径。单入口的chunk name不可更改，多入口的话则必须为每一个chunk指定chunk name。
当第三方依赖较多时，我们可以用提取vendor的方法将这些模块打包到一个单独的bundle中，以更有效地利用客户端缓存，加快页面渲染速度。
path和publicPath的区别在于path指定的是资源的输出位置，而publicPath指定的是间接资源的请求位置

- 输入

	- context资源入口前缀，绝对路径，只能为字符串
	- entry的配置可以有多种形式：字符串、数组、对象、函数。
字符串、数组单入口，chunk名默认为name；对象多入口，key为name，value为入口（支持字符串或数组）；函数支持promise，需返回字符串、数组或对象任意一种格式
	- 单文件入口：分离 应用程序(app) 和 第三方库(vendor) 入口
多文件入口：

- 输出output

	- 提取vendor，不易变更的三方库（不包含业务逻辑），可利用缓存
	- filename：通过参数达到区分chunk、控制客户端缓存的效果
path可以指定资源输出的位置，要求值必须为绝对路径，Webpack 4之后，output.path已经默认为dist目录
publicPath：path用来指定资源的输出位置，而publicPath则用来指定资源的请求位置，__webpack_public_path__
（webpack-dev-server的配置中也有一个publicPath，值得注意的是，这个publicPath与Webpack中的配置项含义不同，它的作用是指定webpack-dev-server的静态资源服务路径）
	- 输出插件

		- clean-webpack-plugin
		- HtmlWebpackPlugin

## 优化&工具

### 代码分割

- 概述

	- 实现高性能应用其中重要的一点就是尽可能地让用户每次只加载必要的资源，优先级不太高的资源则采用延迟加载等技术渐进式地获取，这样可以保证页面的首屏速度

- hash与长效缓存

	- >> Webpack的运行时指的是初始化环境的代码，如创建模块缓存对象、声明模块加载函数等
manifest最后chunk，最先引入
>> manifest的CommonsChunkPlugin必须出现在最后，否则Webpack将无法正常提取模块。
在我们的页面中，manifest.js应该最先被引入，用来初始化Webpack环境
>> manifest的CommonsChunkPlugin必须出现在最后，否则Webpack将无法正常提取模块

- chunks

	- 1、optimization.SplitChunks
此处Webpack 4的配置与之前相比有两点不同：
·使用optimization.splitChunks替代了CommonsChunkPlugin，并指定了chunks的值为all，这个配置项的含义是，SplitChunks将会对所有的chunks生效（默认情况下，SplitChunks只对异步chunks生效，并且不需要配置）。
·mode是Webpack 4中新增的配置项，可以针对当前是开发环境还是生产环境自动添加对应的一些Webpack配置
2、从命令式到声明式
提取后的chunk可被共享或者来自node_modules目录
提取后的Javascript chunk体积大于30kB（压缩和gzip之前），CSS chunk体积大于50kB。
在按需加载过程中，并行请求的资源最大值小于等于5
在首次加载时，并行请求的资源数最大值小于等于3
3、默认的异步提取
前面我们对SplitChunks添加了一个chunks：all的配置，这是为了提取foo.js和bar.js的公共模块。实际上SplitChunks不需要配置也能生效，但仅仅针对异步资源

- 资源异步加载import()

	- 1、资源异步加载主要解决的问题是，当模块数量过多、资源体积过大时，可以把一些暂时使用不到的模块延迟加载
2、与正常ES6中的import语法不同，通过import函数加载的模块及其依赖会被异步地进行加载，并返回一个Promise对象
3、首屏加载的JS资源地址是通过页面中的script标签来指定的，而间接资源（通过首屏JS再进一步加载的JS）的位置则要通过output.publicPath来指定
4、import函数还有一个比较重要的特性。ES6 Module中要求import必须出现在代码的顶层作用域，而Webpack的import函数则可以在任何我们希望的时候调

### 打包优化

- 原则：按需不过早
- 多线程打包与HappyPack（开源）

	- ·缩小打包作用域；
·动态链接库思想与DllPlugin；
·死代码检测与tree shaking

- 缩小打包作用域（节流）

	-  IgnorePlugin： exclude和include是确定loader的规则范围，noParse是不去解析但仍会打包到bundle中。最后让我们再看一个插件IgnorePlugin，它可以完全排除一些模块，被排除的模块即便被引用了也不会被打包进资源文件中

- 动态链接库与DllPlugin

	- Code Splitting的思路是设置一些特定的规则并在打包的过程中根据这些规则提取模块；DllPlugin则是将vendor完全拆出来，有自己的一整套Webpack配置并独立打包，在实际工程构建时就不用再对它进行任何处理，直接取用即可。因此，理论上来说，DllPlugin会比Code Splitting在打包速度上更胜一筹，但也相应地增加了配置，以及资源管理的复杂度

- 树摇优化&代码压缩

	- ES6 Module：tree shaking只能对ES6 Module生效
使用Webpack进行依赖关系构建：使用了babel-loader，那么一定要通过配置来禁用它的模块依赖解析
使用压缩工具去除死代码： tree shaking本身只是为死代码添加上标记，真正去除死代码是通过压缩工具来进行的

### 样式处理

- 1、 分离样式文件：在生产环境下，我们希望样式存在于CSS文件中而不是style标签中，因为文件更有利于客户端进行缓存
 多样式文件的处理：chunk是对一组有依赖关系的模块的封装
mini-css-extract-plugin：mini-css-extract-plugin的特性，最重要的就是它支持按需加载CSS
2、样式预处理：样式预处理指的是在开发中我们经常会使用一些样式预编译语言，如SCSS、Less
Sass与SCSS：因此这里我们除了sass-loader以外还要安装node-sass，node-sass是真正用来编译SCSS的，而sass-loader只是起到黏合的作用
3、 PostCSS：PostCSS并不能算是一个CSS的预编译器，它只是一个编译插件的容器。它的工作模式是接收样式源代码并交由编译插件处理，最后输出CSS
4、stylelint：stylelint是一个CSS的质量检测工具，就像eslint一样，我们可以为其添加各种规则，来统一项目的代码风格，确保代码质量

## 模式(mode)

### 生产环境配置

- 目的：更快地加载资源，涉及如何压缩资源、如何添加环境变量优化打包、如何最大限度地利用缓存
- 环境变量

	- 因为DefinePlugin在替换环境变量时对于字符串类型的值进行的是完全替换。假如不添加JSON.stringify的话，在替换后就会成为变量名，而非字符串值。因此对于字符串环境变量及包含字符串的对象都要加上JSON.stringify才行

- source map配置

	- js/css(loader配置)，>> 在开发环境中，cheap-module-eval-source-map通常是一个不错的选择，属于打包速度和源码信息还原程度的一个良好折中

- 压缩JavaScript

	- 压缩JavaScript大多数时候使用的工具有两个，一个是UglifyJS（Webpack 3已集成），另一个是terser（Webpack 4已集成）。后者由于支持ES6+代码的压缩，更加面向于未来，因此官方在Webpack 4中默认使用了terser的插件terser-webpack-plugin

- 压缩CSS

	-  压缩CSS文件的前提是使用extract-text-webpack-plugin或mini-css-extract-plugin将样式提取出来，接着使用optimize-css-assets-webpack-plugin来进行压缩，这个插件本质上使用的是压缩器cssnano

- 使chunk id更稳定

	- 原因在于Webpack为每个模块指定的id是按数字递增的，当有新的模块插入进来时就会导致其他模块的id也发生变化，进而影响了vendor chunk中的内容。
解决的方法在于更改模块id的生成方式。在Webpack 3内部自带了HashedModuleIds-Plugin，它可以为每个模块按照其所在路径生成一个字符串类型的hash id

- bundle体积监控和分析

	- Import Cost可以帮助我们对引入模块的大小进行实时监测
webpack-bundle-analyzer
自动化地对资源体积进行监控，bundlesize
webpack-chart: webpack 数据交互饼图。
webpack-visualizer: 可视化并分析你的 bundle，检查哪些模块占用空间，哪些可能是重复使用的。
webpack-bundle-analyzer: 一款分析 bundle 内容的插件及 CLI 工具，以便捷的、交互式、可缩放的树状图形式展现给用户。
### 开发环境调优

- webpack-dashboard，更好的展示控制台输出信息，包含：log、status、modules、错误信息、静态资源
- webpack-merge多环境配置智能合并，更智能的object.assign
- speed-measure-webpack-plugin：分析打包过程中各个loader和plugin上耗费的时间
- size-plugin：监控资源体积变化，与上一次对比
- 开启HMR

	- 首先我们要确保项目是基于webpack-dev-server或者webpack-dev-middle进行开发的，Webpack本身的命令行并不支持HMR
调用HMR API有两种方式，一种是手动地添加这部分代码；另一种是借助一些现成的工具，比如react-hot-loader、vue-loader等。
HMR原理：HMR的核心就是客户端从服务端拉取更新后的资源（准确地说，HMR拉取的不是整个资源文件，而是chunk diff，即chunk需要更新的部分

## 打包工具vs

### Rollup

- 专注js打包， Rollup有一项Webpack不具备的特性，即通过配置output.format开发者可以选择输出资源的模块形式。上面例子中我们使用的是cjs（CommonJS），除此之外Rollup还支持amd、esm、iife、umd及system

### Parcel

- 1、Parcel在打包速度的优化上主要做了3件事：·利用worker来并行执行任务；·文件系统缓存；·资源编译处理流程优化
2、loader在设计的时候就只能接受和返回字符串
3、Parcel是可以用HTML文件作为项目入口的，从HTML开始再进一步寻找其依赖的资源；并且可以发现对于最后产出的资源，Parcel已经自动为其生成了hash版本号及source map。另外，如果打开产出的JS文件会发现，内容都是压缩过的，而此时我们还没有添加任何配置或者命令行参数

## 模块

### js中的模块

- 手动维护加载顺序、多个http请求、全局作用域变量污染

### 模块打包工具

- 两种方式：
·将存在依赖关系的模块按照特定规则合并为单个JS文件，一次全部加载进页面中。
·在页面初始时加载一个入口模块，其他模块异步地进行加载。

### 模块化概念

ES6 import 语句
CommonJS require() 语句
AMD define 和 require 语句
css/sass/less 文件中的 @import 语句。
样式(url(...))或 HTML 文件(<img src=...>)中的图片链接(image url)

- commomjs

  CommonJS与ES6 Module主要区别在于前者建立模块依赖关系是在运行时，后者是在编译时；在模块导入方面，CommonJS导入的是值拷贝，ES6 Module导入的是只读的变量映射；ES6 Module通过其静态特性可以进行编译过程中的优化，并且具备处理循环依赖的能力.

	- 模块：commonjs 每个模块是拥有各自的作用域的，对外不可见，不会污染全局环境
导出exports： CommonJS在每个模块的首部默认添加了以下代码：var module = {￼     exports: {},￼ };￼ var exports = module.exports;
导入require：导入只会执行一次，接收表达式

- es6 module

	- 导入import

		- 命名导入： 加载带有命名导出的模块时，import后面要跟一对大括号来将导入的变量名包裹起来，并且这些变量名需要与导出的变量名完全一致
默认导入：import后面直接跟变量名，并且这个名字可以自由指定（ 全局入必须写在大括号前面）

	- 导出export

		- 命名导出：使用命名导出时，需要进行命名，可以通过as关键字对变量重命名
默认导出：只能有一个，可视为导出一个命名为default的变量

	-  ES6 Module会自动采用严格模式，导入、导出语句都是声明式的，它不支持导入的路径是一个表达式，并且导入、导出语句必须位于模块的顶层作用域（比如不能放在if语句中）。
特点：死代码检测和排除、模块变量类型检查、编译器优化
复合写法：目前只支持当被导入模块（这里的calculator.js）通过命名导出的方式暴露出来的变量，默认导出则没有对应的复合形式，只能将导入和导出拆开写。

- amd：异步模块定义，通过require函数加载模块，易造成回调地狱
- umd

	- 通用模块标准，
// calculator.js￼ (function (global, main) {￼ 
// 根据当前环境采取不同的导出方式￼ 
if (typeof define === 'function' && define.amd) {￼  
// AMD￼  define(...);￼  
} else if (typeof exports === 'object') {￼  
// CommonJS￼  module.exports = ...;￼  } 
else {￼  // 非模块化环境￼  global.add = ...;￼  }￼ }(this, function () {￼  // 定义模块主体￼  return {...}￼ }));

- 非模块化

	- webpack打包时会为每个文件包装一层函数作用域来避免全局污染

### 模块打包原理

- webpack中每个模块有一个唯一的id，是从0开始递增的。整个打包后的bundle.js是一个匿名函数自执行。参数则为一个数组。数组的每一项都为个function。function的内容则为每个模块的内容，并按照require的顺序排列

### Runtime

- 管理所有模块之间的交互的数据，import 或 require 语句转换为 webpack_require 方法，指向模块标识符(module identifier)。通过使用 manifest 中的数据，runtime 将能够查询模块标识符，检索出背后对应的模块。
runtime 和 manifest 的注入在每次构建都会发生变化。

*XMind - Trial Version*