# webpack
## 基本概念
CommonJS：是一个模块化的标准，Node.js在使用的模块化标准。适用与后端开发的标准。
AMD（Async Module Definition）：在CommonJS基础上衍生出来的适用于前端开发的模块化标准。
特点：预加载，第一次访问时，将所有的文件都加载出来。
优点：第一次访问完成以后，再次访问速度会很快
缺点：第一次加载，需要的时间会比较长
代表：requirejs

CMD（Common Module Definition）：在CommonJS基础上衍生出来的适用于前端开发的模块化标准。
特点：懒加载，只有使用到的时候，才会加载对应的模块。
优点：第一次访问速度会比较快
缺点：再次访问其他模块时会比较慢。
代表：seajs

## 更版本对比&特点
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

    ```
    使用tree-shaking，它只打包有用的方法，没有用的方法则不会进行打包。
    ree-shaking的消除原理是依赖于ES6的模块特性( ES6 module syntax)，默认是不会触发的，
    在webpack3，你需要配置babel，uglifyjs-webpack-plugin等才能触发。
    在webpack4，production模式默认触发。
    ```

-   scope-hoisting(作用域提升)依赖于 ES6
    ```
    javascript的模块化就是通过闭包来实现作用域的隔离，但是当我们模块化程度达到一定程度之后，过多闭包会让某些变量没法销毁，造成性能劣势。作用域提升即是把两个闭包合成一个闭包。
    实现原理：分析出模块之间的依赖关系，尽可能的把打散的模块合并到一个函数中去，但前提是不能造成代码冗余。因此只有那些被引用了一次的模块才能被合并。由需要分析出模块之间的依赖关系，因此源码必须采用 ES6 模块化语句，不然它将无法生效。
    webpack3：需要开启webpack.optimize.ModuleConcatenationPlugin来满足作用域提升的功能;
    webpack4：在development mode时没有采用scope hoisting，而production mode时默认开启了该优化
    ```