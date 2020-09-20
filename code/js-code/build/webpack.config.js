const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports={
    mode:process.env.NODE_ENV,
    entry:'./src/index.ts',
    output:{
        filename:'main.js'
    },
    resolve:{
        extensions:['.js','.ts']
    },
    module:{
        rules:[
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            {test:/\.tsx?$/,use:'ts-loader',exclude:/node_modules/}
        ]
    },
    devtool:process.env.NODE_ENV==='production'?false:'inline-source-map',
    devServer:{
        contentBase:'./dist',
        stats:'errors-only',
        compress:false,
        host:'0.0.0.0',
        port:8089
    },
    plugins:[
        new CleanWebpackPlugin.CleanWebpackPlugin({
            cleanOnceBeforeBuilPatterns:['./dist']
        }),
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ]
}