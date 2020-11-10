<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [webpack基础](#webpack%E5%9F%BA%E7%A1%80)
  - [输入输出](#%E8%BE%93%E5%85%A5%E8%BE%93%E5%87%BA)
  - [loader](#loader)
    - [概述](#%E6%A6%82%E8%BF%B0)
    - [配置](#%E9%85%8D%E7%BD%AE)
    - [常用loader](#%E5%B8%B8%E7%94%A8loader)
  - [核⼼概念之 Mode与优化](#%E6%A0%B8%E2%BC%BC%E6%A6%82%E5%BF%B5%E4%B9%8B-mode%E4%B8%8E%E4%BC%98%E5%8C%96)
    - [生产环境配置](#%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE)
    - [开发环境调优](#%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83%E8%B0%83%E4%BC%98)
  - [体积优化实践](#%E4%BD%93%E7%A7%AF%E4%BC%98%E5%8C%96%E5%AE%9E%E8%B7%B5)
    - [scope hoisting](#scope-hoisting)
    - [基础库分离](#%E5%9F%BA%E7%A1%80%E5%BA%93%E5%88%86%E7%A6%BB)
    - [资源异步加载import()](#%E8%B5%84%E6%BA%90%E5%BC%82%E6%AD%A5%E5%8A%A0%E8%BD%BDimport)
    - [动态 Polyfill](#%E5%8A%A8%E6%80%81-polyfill)
    - [多进程/多实例构建：资源并行解析可选方案](#%E5%A4%9A%E8%BF%9B%E7%A8%8B%E5%A4%9A%E5%AE%9E%E4%BE%8B%E6%9E%84%E5%BB%BA%E8%B5%84%E6%BA%90%E5%B9%B6%E8%A1%8C%E8%A7%A3%E6%9E%90%E5%8F%AF%E9%80%89%E6%96%B9%E6%A1%88)
    - [分包与缓存](#%E5%88%86%E5%8C%85%E4%B8%8E%E7%BC%93%E5%AD%98)
    - [缩小打包作用域（节流）](#%E7%BC%A9%E5%B0%8F%E6%89%93%E5%8C%85%E4%BD%9C%E7%94%A8%E5%9F%9F%E8%8A%82%E6%B5%81)
    - [树摇优化tree shaking](#%E6%A0%91%E6%91%87%E4%BC%98%E5%8C%96tree-shaking)
- [webpack进阶实践](#webpack%E8%BF%9B%E9%98%B6%E5%AE%9E%E8%B7%B5)
  - [多⻚⾯打包通⽤⽅案](#%E5%A4%9A%E2%BB%9A%E2%BE%AF%E6%89%93%E5%8C%85%E9%80%9A%E2%BD%A4%E2%BD%85%E6%A1%88)
  - [构建配置抽离成 npm 包的意义](#%E6%9E%84%E5%BB%BA%E9%85%8D%E7%BD%AE%E6%8A%BD%E7%A6%BB%E6%88%90-npm-%E5%8C%85%E7%9A%84%E6%84%8F%E4%B9%89)
  - [webpack ssr](#webpack-ssr)
  - [webpack日志报错](#webpack%E6%97%A5%E5%BF%97%E6%8A%A5%E9%94%99)
  - [React 全家桶 和 webpack 开发商城项目](#react-%E5%85%A8%E5%AE%B6%E6%A1%B6-%E5%92%8C-webpack-%E5%BC%80%E5%8F%91%E5%95%86%E5%9F%8E%E9%A1%B9%E7%9B%AE)
- [webpack原理](#webpack%E5%8E%9F%E7%90%86)
  - [动手实现一个简易的 webpack](#%E5%8A%A8%E6%89%8B%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E7%AE%80%E6%98%93%E7%9A%84-webpack)
  - [编写 Loader 和插件](#%E7%BC%96%E5%86%99-loader-%E5%92%8C%E6%8F%92%E4%BB%B6)
- [基本概念](#%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5)
  - [1、webpack 中，module，chunk 和 bundle 的区别是什么？](#1webpack-%E4%B8%ADmodulechunk-%E5%92%8C-bundle-%E7%9A%84%E5%8C%BA%E5%88%AB%E6%98%AF%E4%BB%80%E4%B9%88)
  - [2、 模块](#2-%E6%A8%A1%E5%9D%97)
    - [模块打包工具](#%E6%A8%A1%E5%9D%97%E6%89%93%E5%8C%85%E5%B7%A5%E5%85%B7)
    - [模块化概念](#%E6%A8%A1%E5%9D%97%E5%8C%96%E6%A6%82%E5%BF%B5)
    - [模块打包原理](#%E6%A8%A1%E5%9D%97%E6%89%93%E5%8C%85%E5%8E%9F%E7%90%86)
    - [Runtime](#runtime)
  - [3、文件指纹： hash & chunkhash & contenthash：](#3%E6%96%87%E4%BB%B6%E6%8C%87%E7%BA%B9-hash--chunkhash--contenthash)
  - [4、各版本对比&特点](#4%E5%90%84%E7%89%88%E6%9C%AC%E5%AF%B9%E6%AF%94%E7%89%B9%E7%82%B9)
  - [5、打包工具vs](#5%E6%89%93%E5%8C%85%E5%B7%A5%E5%85%B7vs)
    - [Rollup](#rollup)
    - [Parcel](#parcel)
  - [6、webpack-dev-server](#6webpack-dev-server)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# webpack基础

## 输入输出
> 概述：资源的输入输出流程，以及相关的配置项context、entry、output。

在配置打包入口时，context相当于路径前缀，entry是入口文件路径。单入口的chunk name不可更改，多入口的话则必须为每一个chunk指定chunk name。

当第三方依赖较多时，我们可以用提取vendor的方法将这些模块打包到一个单独的bundle中，以更有效地利用客户端缓存，加快页面渲染速度。

path和publicPath的区别在于path指定的是资源的输出位置，而publicPath指定的是间接资源的请求位置

> 输入entry

  - context资源入口前缀，绝对路径，只能为字符串
  - entry的配置可以有多种形式：字符串、数组、对象、函数。
字符串、数组单入口，chunk名默认为name；对象多入口，key为name，value为入口（支持字符串或数组）；函数支持promise，需返回字符串、数组或对象任意一种格式
  - 单文件入口：分离 应用程序(app) 和 第三方库(vendor) 入口
  - 多文件入口

> 输出output：
  - 1、提取vendor，不易变更的三方库（不包含业务逻辑），可利用缓存

  - 2、filename：通过参数达到区分chunk、控制客户端缓存的效果
  - 3、path可以指定资源输出的位置，要求值必须为绝对路径，Webpack 4之后，output.path已经默认为dist目录
  - 4、publicPath：path用来指定资源的输出位置，而publicPath则用来指定资源的请求位置，__webpack_public_path__
（webpack-dev-server的配置中也有一个publicPath，值得注意的是，这个publicPath与Webpack中的配置项含义不同，它的作用是指定webpack-dev-server的静态资源服务路径）
  - 5、输出插件
    - 清理构建⽬录 
		```
		rm -rf ./dist && webpack
		rimraf ./dist && webpack//需安装npm包rimraf
		```
		或 [clean-webpack-plugin]
    - [HtmlWebpackPlugin](https://www.webpackjs.com/plugins/html-webpack-plugin/)
		```
		module.exports = {
			entry: {
			app: './src/app.js',
			search: './src/search.js'
			},
			output: {
			filename: '[name][chunkhash:8].js',
			path: __dirname + '/dist'
			},
			plugins: [
			+ new CleanWebpackPlugin()
			+ new HtmlWebpackPlugin()
			};
		```
	
  
  
## loader

### 概述
- 1、webpack 开箱即用只支持 JS 和 JSON 两种文件类型，通过 Loaders 去支持其它文
件类型并且把它们转化成有效的模块，并且可以添加到依赖图中
- 2、loader可以是<b>链式</b>的,用公式表达则为以下形式:output=loaderA(loaderB(loaderC(input)))
- 3、loader本身就是一个函数，在该函数中对接收到的内容进行转换，然后返回转换后的结果（可能包含source map和AST对象），转化后的结果（也是字符串类型）、source map，以及AST对象

### 配置

```
const path = require('path');
module.exports = {
output: {
filename: 'bundle.js'
},
module: {
rules: [
{ 
	test: /\.txt$/, //test 指定匹配规则
	use: 'raw-loader'//use 指定使⽤的 loader 名称
 }
]}
};
```

- 1、在配置loader时，实际上定义的是模块规则（module.rules），它主要关注两件事：该规则对哪些模块生效（test、exclude、include配置），使用哪些loader（use配置）。loader可以是链式的，并且每一个都允许拥有自己的配置项。
- 2、与loader相关的配置都在module对象中，其中module.rules代表了模块的处理规则，Webpack打包时是按照数组从后往前的顺序将资源交给loader处理的，因此要把最后生效的放在前面
- 3、第一个loader的输入是源文件，之后所有loader的输入是上一个loader的输出，最后一个loader则直接输出给Webpack。
- 4、exclude与include是用来排除或包含指定目录下的模块，可接收正则表达式或者字符串（文件绝对路径），以及由它们组成的数组。exclude和include同时存在时，exclude的优先级更高
- 5、Webpack中的loader按照执行顺序可分为pre、inline、normal、post四种类型，上面我们直接定义的loader都属于normal类型，inline形式官方已经不推荐使用，而pre和post则需要使用enforce来指定
- 6、在Webpack中，我们认为被加载模块是resource，而加载者是issuer

### [常用loader](https://www.webpackjs.com/loaders/)

- 对于SCSS类型的资源来说，我们需要sass-loader来处理其语法，并将其编译为CSS；接着再用css-loader处理CSS的各类加载语法；最后使用style-loader来将样式字符串包装成style标签插入页面（style-loader）
  

- babel-loader
- babel-loader用来处理ES6+并将其编译为ES5，babel-loader：它是使Babel与Webpack协同工作的模块。
·@babel/core：顾名思义，它是Babel编译器的核心模块。
·@babel/preset-env：它是Babel官方推荐的预置器，可根据用户设置的目标环境自动添加所需的插件和补丁来编译ES6+代码
- eslint-loader
  使⽤ eslint-loader，构建时检查 JS 规范
  ```
  module.exports = {
	module: {
	rules: [
	{
	test: /\.js$/,
	exclude: /node_modules/,
	use: [
	"babel-loader", 
	+ "eslint-loader” ]}]}
	};
  ```
  
- url-loader(小图片或字体的资源内联)
  url-loader与file-loader作用类似，唯一的不同在于用户可以设置一个文件大小的阈值，当大于该阈值时与file-loader一样返回publicPath，而小于该阈值时则返回文件base64形式编

- file-loader
   file-loader用于打包文件类型的资源，并返回其publicPath

- HTML 和 JS 内联
	raw-loader 内联 html
	```
	<script>${require(' raw-loader!babel-loader!. /meta.html')}</script>
	```
	raw-loader 内联 JS
	```
	<script>${require('raw-loader!babel-loader!../node_modules/lib-flexible')}</script>
	```
- CSS 内联


⽅案⼀：借助 style-loader

	```
	module.exports = {
		module: {
		rules: [
			{
			test: /\.scss$/,
			use: [
			{
				loader: 'style-loader',
				options: {
					insertAt: 'top', // 样式插入到 <head>
					singleton: true, //将所有的style标签合并成一个
				}
			},
			"css-loader",
			"sass-loader"
			],
			}
		]}};
	```
	⽅案⼆：html-inline-css-webpack-plugin

```
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
 
module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin(),
    new HTMLInlineCSSWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  }
}
```



## 核⼼概念之 Mode与优化
Mode ⽤来指定当前的构建环境是：production、development 还是 none
设置 mode 可以使⽤ webpack 内置的函数，默认值为 production

### 生产环境配置

>目的：更快地加载资源，涉及如何压缩资源、如何添加环境变量优化打包、如何最大限度地利用缓存

> 环境变量

因为DefinePlugin在替换环境变量时对于字符串类型的值进行的是完全替换。假如不添加JSON.stringify的话，在替换后就会成为变量名，而非字符串值。因此对于字符串环境变量及包含字符串的对象都要加上JSON.stringify才行

> source map配置

 js/css(loader配置)，>> 在开发环境中，cheap-module-eval-source-map通常是一个不错的选择，属于打包速度和源码信息还原程度的一个良好折中

- 作⽤：通过 source map 定位到源代码
	· source map科普⽂：http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html

- 开发环境开启，线上环境关闭
	· 线上排查问题的时候可以将 sourcemap 上传到错误监控系统

> 压缩JavaScript

多进程并行压缩代码 
目前有三种主流的压缩方案：parallel-uglify-plugin、uglifyjs-webpack-plugin（Webpack 3已集成）、terser-webpack-plugin（Webpack 4已集成，支持ES6+代码的压缩）

> css样式处理

  * 1、 分离样式文件：在生产环境下，我们希望样式存在于CSS文件中而不是style标签中，因为文件更有利于客户端进行缓存
  多样式文件的处理：chunk是对一组有依赖关系的模块的封装
  mini-css-extract-plugin：mini-css-extract-plugin的特性，最重要的就是它支持按需加载CSS
  * 2、样式预处理：样式预处理指的是在开发中我们经常会使用一些样式预编译语言，如SCSS、Less
  Sass与SCSS：因此这里我们除了sass-loader以外还要安装node-sass，node-sass是真正用来编译SCSS的，而sass-loader只是起到黏合的作用
  * 3、 PostCSS：PostCSS 插件 autoprefixer ⾃动补⻬ CSS3 前缀;通过 document.querySelector 来识别在 html 文件里面不存在的选择器;
  * 4、stylelint：stylelint是一个CSS的质量检测工具，就像eslint一样，我们可以为其添加各种规则，来统一项目的代码风格，确保代码质量
  * 移动端 CSS px ⾃动转换成 rem(font-size of the root element)
	使⽤ px2rem-loader;
	⻚⾯渲染时计算根元素的 font-size 值 ;
	可以使⽤⼿淘的lib-flexible库 ·https://github.com/amfe/lib-flexible
  * PurifyCSS: 遍历代码，识别已经用到的 CSS class 
  * uncss: HTML 需要通过 jsdom 加载，所有的样式通过

- 压缩CSS&删除无用代码
	-  压缩CSS文件的前提是使用extract-text-webpack-plugin或mini-css-extract-plugin将样式提取出来，接着使用optimize-css-assets-webpack-plugin来进行压缩，这个插件本质上使用的是压缩器cssnano;
	purgecss-webpack-plugin:去除无用代码
  综合配置实例：
  ```
	const MiniCssExtractPlugin = require('mini-css-extract-plugin');
	const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
	const PurgecssPlugin = require('purgecss-webpack-plugin');
	   module: {
        rules: [{
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }, {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    overrideBrowserslist: ['last 2 version', '>1%', 'ios 7']
                                })
                            ]
                        }
                    },
                    {
                        loader: 'px2rem-loader',
                        options: {
                            remUnit: 75,
                            remPrecision: 8
                        }
                    }
                ]
            }]},
	plugins: [
			new MiniCssExtractPlugin({
				filename: '[name]_[contenthash:8].css'
			}),
			new OptimizeCSSAssetsPlugin({
				assetNameRegExp: /\.css$/g,
				cssProcessor: require('cssnano')
			}),
			new PurgecssPlugin({
				paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
			})
		]
  ```
- 图片压缩

  - 要求：基于 Node 库的 imagemin 或者 tinypng API 
  - 使用：配置 image-webpack-loader
  - Imagemin的优点分析:
    有很多定制选项 可以引入更多第三方优化插件，例如pngquant 可以处理多种图片格式
  - Imagemin的压缩原理 
    pngquant: 是一款PNG压缩器，通过将图像转换为具有alpha通道（通常比24/32位PNG 文件小60-80％）的更高效的8位PNG格式，可显著减小文件大小。 
    pngcrush:其主要目的是通过尝试不同的压缩级别和PNG过滤方法来降低PNG IDAT数据 流的大小。
    optipng:其设计灵感来自于pngcrush。optipng可将图像文件重新压缩为更小尺寸，而不 会丢失任何信息。 
    tinypng:也是将24位png文件转化为更小有索引的8位图片，同时所有非必要的metadata 也会被剥离掉

  	```
  	{
  		test: /.(png|jpg|gif|jpeg)$/,
  		use: [
  			{
  				loader: 'file-loader',
  				options: {
  					name: '[name]_[hash:8].[ext]'
  				}
  			},
  			{
  				loader: 'image-webpack-loader',
  				options: {
  				mozjpeg: {
  					progressive: true,
  					quality: 65
  				},
  				// optipng.enabled: false will disable optipng
  				optipng: {
  					enabled: false,
  				},
  				pngquant: {
  					quality: '65-90',
  					speed: 4
  				},
  				gifsicle: {
  					interlaced: false,
  				},
  				// the webp option will enable WEBP
  				webp: {
  					quality: 75
  				}
  				}
  			}
  		]
  	}
  	```
	- html ⽂件的压缩
    ```
	 module.exports = {
		entry: {
			app: './src/app.js',
			search: './src/search.js'
		},
		output: {
			filename: '[name][chunkhash:8].js',
			path: __dirname + '/dist'
		},
		plugins: [
			+ new HtmlWebpackPlugin({
			+ template: path.join(__dirname, 'src/search.html’),
			+ filename: 'search.html’, + chunks: ['search’],
			+ inject: true,
			+ minify: {
			+ html5: true,
			+ collapseWhitespace: true,
			+ preserveLineBreaks: false,
			+ minifyCSS: true,
			+ minifyJS: true,
			+ removeComments: false
			+ } + })
			]
		};
		```
- bundle体积监控和分析

webpack-chart: webpack 数据交互饼图。

webpack-visualizer: 可视化并分析你的 bundle，检查哪些模块占用空间，哪些可能是重复使用的。

webpack-bundle-analyzer: 一款分析 bundle 内容的插件及 CLI 工具，以便捷的、交互式、可缩放的树状图形式展现给用户,自动化地对资源体积进行监控，bundlesize

	```
	const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
	plugins: [new BundleAnalyzerPlugin()]
	```

### 开发环境调优

- webpack-dashboard，更好的展示控制台输出信息，包含：log、status、modules、错误信息、静态资源
- webpack-merge多环境配置智能合并，更智能的object.assign

- 速度分析 speed-measure-webpack-plugin：分析打包过程中各个loader和plugin上耗费的时间
  
  ```
	const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');

	const smp = new SpeedMeasureWebpackPlugin();
	module.exports =smp.wrap({
		entry: entry,
		output: {
			path: path.join(__dirname, 'dist'),
			filename: '[name]_[chunkhash:8].js'
		},
		mode: 'production',
		....
		})
  ```
- size-plugin：监控资源体积变化，与上一次对比

- 开启HMR
  * 首先我们要确保项目是基于webpack-dev-server或者webpack-dev-middle进行开发的，Webpack本身的命令行并不支持HMR。调用HMR API有两种方式，一种是手动地添加这部分代码；另一种是借助一些现成的工具，比如react-hot-loader、vue-loader等。
  * HMR原理：HMR的核心就是客户端从服务端拉取更新后的资源（准确地说，HMR拉取的不是整个资源文件，而是chunk diff，即chunk需要更新的部分
  
- 使用 webpack 内置的 stats：
  
  ```
  "build:stats": "webpack --config webpack.prod.js --json > stats.json"
  ```

## 体积优化实践

* 策略总结
	Scope Hoisting 
	Tree-shaking 
	公共资源分离 
	图片压缩 
	动态 
	Polyfill
* 原则：按需不过早

### scope hoisting

原理：将所有模块的代码按照引⽤顺序放在⼀个函数作⽤域⾥，然后适当的重命名⼀
些变量以防⽌变量名冲突
对⽐: 通过 scope hoisting 可以减少函数声明代码和内存开销
scope hoisting 使⽤
必须是 ES6 语法，CJS 不⽀持
webpack mode 为 production 默认开启
```
module.exports = {
entry: {
app: './src/app.js',
search: './src/search.js'
},
output: {
filename: '[name][chunkhash:8].js',
path: __dirname + '/dist'
},
plugins: [
+ new webpack.optimize.ModuleConcatenationPlugin()
};
```
###  基础库分离

* 概述：实现高性能应用其中重要的一点就是尽可能地让用户每次只加载必要的资源，优先级不太高的资源则采用延迟加载等技术渐进式地获取，这样可以保证页面的首屏速度
  - html-webpackexternals-plugin 将 react、react-dom 基础，包通过 cdn 引入
  


- SplitChunks
	Webpack4 内置的，替代CommonsChunkPlugin插件;
    chunks 参数说明：
	· async 异步引⼊的库进⾏分离(默认)
	· initial 同步引⼊的库进⾏分离
	· all 所有引⼊的库进⾏分离(推荐)

	```
	//作用进⾏公共脚本分离
	module.exports = {
		optimization: {
			splitChunks: {
				chunks: 'async',
				minSize: 30000,
				maxSize: 0,
				minChunks: 1,
				maxAsyncRequests: 5,
				maxInitialRequests: 3,
				automaticNameDelimiter: '~',
				name: true,
				cacheGroups: {
				vendors: {
				test: /[\\/]node_modules[\\/]/,//test: 匹配出需要分离的包
				priority: -10
			}}}}
		};
	//分离基础包
	module.exports = {
		optimization: {
			splitChunks: {
				cacheGroups: {
				commons: {
				test: /(react|react-dom)/,
				name: 'vendors',
				chunks: 'all'
			} } } }
		};
	//分离⻚⾯公共⽂件
	//minuSize: 分离的包体积的⼤⼩
	//minChunks: 设置最⼩引⽤次数为2次
	module.exports = {
		optimization: {
			splitChunks: {
			minSize: 0,
			cacheGroups: {
				commons: {
				name: 'commons',
				chunks: 'all',
				minChunks: 2
			} } } }}
		};


	```

### 资源异步加载import()

* 1、资源异步加载主要解决的问题是，当模块数量过多、资源体积过大时，可以把一些暂时使用不到的模块延迟加载
* 2、与正常ES6中的import语法不同，通过import函数加载的模块及其依赖会被异步地进行加载，并返回一个Promise对象
* 3、首屏加载的JS资源地址是通过页面中的script标签来指定的，而间接资源（通过首屏JS再进一步加载的JS）的位置则要通过output.publicPath来指定
* 4、import函数还有一个比较重要的特性。ES6 Module中要求import必须出现在代码的顶层作用域，而Webpack的import函数则可以在任何我们希望的时候调

* 懒加载 JS 脚本的⽅式

	CommonJS：require.ensure
	ES6：动态 import（⽬前还没有原⽣⽀持，需要 babel 转换）

	```
		//安装 babel 插件
		npm install @babel/plugin-syntax-dynamic-import --save-dev
		//ES6：动态 import（⽬前还没有原⽣⽀持，需要 babel 转换）
		{
		"plugins": ["@babel/plugin-syntax-dynamic-import"],
		...
		}
	```

### 动态 Polyfill
> 我们希望浏览器提供一些特性，但是没有，然后我们自己写一段代码来实现他，那这段代码就是补丁。

一般处理方式：babel-polyfill.js
引入
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.2.5/polyfill.js"></script>
```
然后就 es6、es7 特性随便写了，但缺点是，babel-polyfill 包含所有补丁，不管浏览器是否支持，也不管你的项目是否有用到，都全量引了

> 动态补丁polyfill.io

在需要补丁的浏览器会加载补丁代码，不需要补丁的浏览器不会加载代码，比如：
```
<script src="https://polyfill.io/v3/polyfill.min.js?features=Promise%2CArray.prototype.includes"></script>
```
然后在 Chrome@71 下的输出是：
```

/* Disable minification (remove `.min` from URL path) for more info */

````
啥都没有，因为 Promsie 特性 Chrome@71 已经支持了。

阿里也搭了个服务，可以考虑引用阿里的
```
<script src="https://polyfill.alicdn.com/polyfill.min.js?features=Promise%2CArray.prototype.includes"></script>
```


###  多进程/多实例构建：资源并行解析可选方案

- 使用 HappyPack 解析资源(HappyPack的作者表示已不再维护此项目)
原理：每次 webapck 解析一个模块，HappyPack 会将它及它的依赖分配给 worker 线程中
```
// webpack.config.js
const HappyPack = require('happypack');
 
exports.module = {
  rules: [
    {
      test: /.js$/,
      // 1) replace your original list of loaders with "happypack/loader":
      // loaders: [ 'babel-loader?presets[]=es2015' ],
      use: 'happypack/loader',
      include: [ /* ... */ ],
      exclude: [ /* ... */ ]
    }
  ]
};
 
exports.plugins = [
  // 2) create the plugin:
  new HappyPack({
    // 3) re-add the loaders you replaced above in #1:
    loaders: [ 'babel-loader?presets[]=es2015' ]
  })
```

- thread-loader(4.0 后默认)
  原理：每次 webpack 解析一个模块，thread- loader 会将它及它的依赖分配给 worker 线程中

```

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve("src"),
        use: [
		 {
            loader: 'thread-loader',
            options: {
                    workers: 3
                    }
             },
        'babel-loader',// your expensive loader (e.g babel-loader)
        ]
      }
    ]
  }

```



### 分包与缓存

|  DLL   | 缓存  |
|  ----  | ----  |
| 把公共代码打包为 DLL 文件存到硬盘里  | 把常用文件存到硬盘/内存里 |
| 第二次打包时动态链接 DLL 文件，不重新打包 | 第二次加载时直接读取缓存，不重新请求 |
| 打包时间缩短 | 加载时间缩短 |

- 分包
  * 设置 Externals
  思路：将 react、react-dom 基础包通过 cdn 引入，不打入 bundle 中 
  方法：使用 html-webpack-externals- plugin

  	```
	  	module.exports = {
		// ......
		plugins: [
			new HtmlWebpackExternalsPlugin({
				externals: [
				{
					module: 'react',
					entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
					global: 'React',
				},
				{
					module: 'react-dom',
					entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
					global: 'ReactDOM',
				},
				]
			})]
		}
	```

  * dll:预编译资源模块 
  思路：将 react、react-dom、redux、react-redux 基础包和业务基础包打包成一个文件 
  方法：使用 DLLPlugin 进行分包，DllReferencePlugin 对 manifest.json 引用
  
	```
	1、使用 DLLPlugin 进行分包
	//文件目录：configs/webpack.dll.js
	'use strict';

	const path = require('path');
	const webpack = require('webpack');

	module.exports = {
		mode: 'production',
		entry: {
			react: ['react', 'react-dom'],
		},
		// 这个是输出 dll 文件
		output: {
			path: path.resolve(__dirname, '../dll'),
			filename: '_dll_[name].js',
			library: '_dll_[name]',
		},
		// 这个是输出映射表
		plugins: [
			new webpack.DllPlugin({ 
				name: '_dll_[name]', // name === output.library
				path: path.resolve(__dirname, '../dll/[name].manifest.json'),
			})
		]
	};
	2、npm run build:dll 就可以打包 dll.js 、*.manifest.json文件了：
	// package.json

	{
	"scripts": {
		"build:dll": "webpack --config configs/webpack.dll.js",
	},
	}

	第 3 步，链接 dll 文件，使用 DllReferencePlugin 引用 manifest.json

	// 文件目录：webpack.prod.js
	
	const path = require('path');
	const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin'); // 顾名思义，把资源加到 html 里，那这个插件把 dll 加入到 index.html 里
	const webpack = require('webpack');
	module.exports = {
	// ......
	plugins: [
		new webpack.DllReferencePlugin({
		// 注意: DllReferencePlugin 的 context 必须和 package.json 的同级目录，要不然会链接失败
		context: path.resolve(__dirname, '../'),
		manifest: path.resolve(__dirname, '../dll/react.manifest.json'),
		}),
		new AddAssetHtmlPlugin({
		filepath: path.resolve(__dirname, '../dll/_dll_react.js')
		}),
	]
	}
	```

- 缓存
  缓存目的：提升二次构建速度 
  缓存思路： 
  · babel-loader 开启缓存 
  · terser-webpack-plugin 开启缓存 
  · 使用 cache-loader 或者 hard-source-webpack-plugin

    ```
    const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

    module.exports = {
      // ......
      plugins: [
        new HardSourceWebpackPlugin() // <- 直接加入这行代码就行
      ]
    }
    ```
### 缩小打包作用域（节流）
  - IgnorePlugin： exclude和include是确定loader的规则范围，noParse是不去解析但仍会打包到bundle中。最后让我们再看一个插件IgnorePlugin，它可以完全排除一些模块，被排除的模块即便被引用了也不会被打包进资源文件中
  - 减少文件搜索范围 
	优化 resolve.modules 配置（减少模块搜索层级） 
	优化 resolve.mainFields 配置 
	优化 resolve.extensions 配置 
	合理使用 alias

    比如 babel-loader 不解析 node_modules
  
###  树摇优化tree shaking

- 概念：
1 个模块可能有多个方法，只要其中的某个方法使用到了，则整个文件都会被打到 bundle 里面去，tree shaking 就是只把用到的方法打入 bundle ，没用到的方法会在 uglify 阶段被擦除掉。 
- 使用：
webpack 默认支持，在 .babelrc 里设置 modules: false 即可 · production mode的情况下默认开启 
- 要求：
必须是 ES6 的语法，CJS 的方式不支持

- Tree-shaking 原理
利⽤ ES6 模块的特点: ·只能作为模块顶层的语句出现
· import 的模块名只能是字符串常量
· import binding 是 immutable的
代码擦除： uglify 阶段删除⽆⽤代码




----
# webpack进阶实践
## 多⻚⾯打包通⽤⽅案
## 构建配置抽离成 npm 包的意义
## webpack ssr
## webpack日志报错
## React 全家桶 和 webpack 开发商城项目
----
# webpack原理
## 动手实现一个简易的 webpack
## 编写 Loader 和插件
----
# 基本概念
## 1、webpack 中，module，chunk 和 bundle 的区别是什么？
module，chunk 和 bundle 其实就是同一份逻辑代码在不同转换场景下的取了三个名字：我们直接写出来的是 module，webpack 处理时是 chunk，最后生成浏览器可以直接运行的 bundle。

## 2、 模块

> js中的模块

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

样式(url(...))或 HTML 文件(```<img src=...>```)中的图片链接(image url)
 
> commomjs
- CommonJS：是一个模块化的标准，Node.js在使用的模块化标准。适用与后端开发的标准。
- CommonJS与ES6 Module主要区别在于前者建立模块依赖关系是在运行时，后者是在编译时；在模块导入方面，CommonJS导入的是值拷贝，ES6 Module导入的是只读的变量映射；ES6 Module通过其静态特性可以进行编译过程中的优化，并且具备处理循环依赖的能力.
- 模块：commonjs 每个模块是拥有各自的作用域的，对外不可见，不会污染全局环境
- 导出exports： CommonJS在每个模块的首部默认添加了以下代码：
  
  ```
  var module = {￼    
  exports: {},￼
  };￼
  var exports = module.exports;
  ```
- 导入require：导入只会执行一次，接收表达式
> es6 module
- 导入import
  * 命名导入： 加载带有命名导出的模块时，import后面要跟一对大括号来将导入的变量名包裹起来，并且这些变量名需要与导出的变量名完全一致
  * 默认导入：import后面直接跟变量名，并且这个名字可以自由指定（ 全局入必须写在大括号前面）
- 导出export
  * 命名导出：使用命名导出时，需要进行命名，可以通过as关键字对变量重命名
  * 默认导出：只能有一个，可视为导出一个命名为default的变量
  * ES6 Module会自动采用严格模式，导入、导出语句都是声明式的，它不支持导入的路径是一个表达式，并且导入、导出语句必须位于模块的顶层作用域（比如不能放在if语句中）。
  * 特点：死代码检测和排除、模块变量类型检查、编译器优化
  * 复合写法：目前只支持当被导入模块（这里的calculator.js）通过命名导出的方式暴露出来的变量，默认导出则没有对应的复合形式，只能将导入和导出拆开写。

> amd异:步模块定义，通过require函数加载模块，易造成回调地狱

* AMD（Async Module Definition）：在CommonJS基础上衍生出来的适用于前端开发的模块化标准。
特点：预加载，第一次访问时，将所有的文件都加载出来。
优点：第一次访问完成以后，再次访问速度会很快
缺点：第一次加载，需要的时间会比较长
代表：requirejs

* CMD（Common Module Definition）：在CommonJS基础上衍生出来的适用于前端开发的模块化标准。
特点：懒加载，只有使用到的时候，才会加载对应的模块。
优点：第一次访问速度会比较快
缺点：再次访问其他模块时会比较慢。
代表：seajs

> umd 通用模块标准

```
// calculator.js￼(function (global, main) {￼
// 根据当前环境采取不同的导出方式￼
if (typeof define === 'function' && define.amd) {￼ 
// AMD￼ define(...);￼ 
} else if (typeof exports === 'object') {￼ 
// CommonJS￼ module.exports = ...;￼ } 
else {￼ // 非模块化环境￼ global.add = ...;￼ }￼}(this, function () {￼ // 定义模块主体￼ return {...}￼}));
```
> 非模块化:webpack打包时会为每个文件包装一层函数作用域来避免全局污染


### 模块打包原理

- webpack中每个模块有一个唯一的id，是从0开始递增的。整个打包后的bundle.js是一个匿名函数自执行。参数则为一个数组。数组的每一项都为个function。function的内容则为每个模块的内容，并按照require的顺序排列
- webpack 的模块机制：
  · 打包出来的是一个 IIFE (匿名闭包) 
  · modules 是一个数组，每一项是一个模块初始化函数 
  · __webpack_require 用来加载模块，返回 module.exports 
  · 通过 WEBPACK_REQUIRE_METHOD(0) 启动程序

### Runtime

- 管理所有模块之间的交互的数据，import 或 require 语句转换为 webpack_require 方法，指向模块标识符(module identifier)。通过使用 manifest 中的数据，runtime 将能够查询模块标识符，检索出背后对应的模块。
runtime 和 manifest 的注入在每次构建都会发生变化。

## 3、文件指纹： hash & chunkhash & contenthash：

Hash：和整个项⽬的构建相关，只要项⽬⽂件有修改，整个项⽬构建的 hash 值就会更改

Chunkhash：和 webpack 打包的 chunk 有关，不同的 entry 会⽣成不同的 chunkhash 值

Contenthash：根据⽂件内容来定义 hash ，⽂件内容不变，则 contenthash 不变

## 4、各版本对比&特点
-   Webpack1 到 2 最大的升级是 tree-shaking，其次是配置文件的对象化，再其次包括插件的写法优化。Webpack2 到 3 的最大升级是 scope-hoisting。3 到 4 简化了整个打包配置操作
-   code-spliting(代码分割，把代码分离成 Chunk，分割的节点进行异步加载，类似 require.js 的按需异步加载)
  
    webpack2：懒加载打包会连同样式以内联的形式一起打入 JS 中，这样的好处在于公共样式也被细化抽离，但是可能会造成样式冗余。

    webpack3：则提供了 ExtractTextPlugin 中提供了抽取公共样式的方法，公共样式可以额外抽离。

    webpack4：去除 CommonsChunkPlugin，新增 optimization.splitChunks
    ```
      ps:　require.js的诞生，就是为了解决这两个问题：
      （1）实现js文件的异步加载，避免网页失去响应；
      （2）管理模块之间的依赖性，便于代码的编写和维护
    ```
-   tree-shaking(摇树优化)依赖于 ES6

    使用tree-shaking，它只打包有用的方法，没有用的方法则不会进行打包。

    tree-shaking的消除原理是依赖于ES6的模块特性( ES6 module syntax)，默认是不会触发的，
    在webpack3，你需要配置babel，uglifyjs-webpack-plugin等才能触发。
    在webpack4，production模式默认触发。
    

- scope-hoisting(作用域提升)依赖于 ES6
  
	javascript的模块化就是通过闭包来实现作用域的隔离，但是当我们模块化程度达到一定程度之后，过多闭包会让某些变量没法销毁，造成性能劣势。作用域提升即是把两个闭包合成一个闭包。

	实现原理：分析出模块之间的依赖关系，尽可能的把打散的模块合并到一个函数中去，但前提是不能造成代码冗余。因此只有那些被引用了一次的模块才能被合并。由需要分析出模块之间的依赖关系，因此源码必须采用 ES6 模块化语句，不然它将无法生效。

	webpack3：需要开启webpack.optimize.
	ModuleConcatenationPlugin来满足作用域提升的功能;

	webpack4：在development mode时没有采用scope hoisting，而production mode时默认开启了该优化
## 5、打包工具vs

### Rollup

- 专注js打包， Rollup有一项Webpack不具备的特性，即通过配置output.format开发者可以选择输出资源的模块形式。上面例子中我们使用的是cjs（CommonJS），除此之外Rollup还支持amd、esm、iife、umd及system

### Parcel

* 1、Parcel在打包速度的优化上主要做了3件事：·利用worker来并行执行任务；·文件系统缓存；·资源编译处理流程优化
* 2、loader在设计的时候就只能接受和返回字符串
* 3、Parcel是可以用HTML文件作为项目入口的，从HTML开始再进一步寻找其依赖的资源；并且可以发现对于最后产出的资源，Parcel已经自动为其生成了hash版本号及source map。另外，如果打开产出的JS文件会发现，内容都是压缩过的，而此时我们还没有添加任何配置或者命令行参数

## 6、webpack-dev-server
1、npm install--production过滤掉devDependencies中的冗余模块，
2、webpack-dev-server可以看作一个服务者，它的主要工作就是接收浏览器的请求，然后将资源返回。当webpack-dev-server接收到浏览器的资源请求时，它会首先进行URL地址校验。如果该地址是资源服务地址（上面配置的publicPath），就会从Webpack的打包结果中寻找该资源并返回给浏览器。
3、webpack-dev-server的两大职能：
·令Webpack进行模块打包，并处理打包结果的资源请求。
·作为普通的Web Server，处理静态资源文件请求
4、webpack-dev-server还有一项很便捷的特性就是live-reloading（自动刷新）。
5、replacement（模块热替换），我们甚至不需要刷新浏览器就能获取更新之后的内容。