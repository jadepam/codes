/***
* 日志分类：访问日志、应用日志
* configure方法为配置log4js对象，内部有levels、appenders、categories三个属性
*  levels
*     log4js 中的日志输出可以分为以下级别，日志级别由低到高排列如下。
*     ALL:new Level(Number.MIN_VALUE, "ALL")
*     @trace：记录应用调用的跟踪信息，标记方法被调用，级别最低。
*     @debug：记录调试信息，方便调试时使用。
*     @info ：记录非调试和跟踪的信息，相对来说是较为重要的信息。
*     @warn ：记录警告信息。
*     @error ：记录错误信息，这些错误不会导致服务完全不可用。
*     @fatal：记录严重错误信息，这些错误导致整个服务不可用。
*     @OFF:new Level(Number.MAX_VALUE, "OFF")
*  appenders
*     配置文件的输出源，一般日志输出type共有console、file、dateFile三种
*     console:普通的控制台输出
*     file:输出到文件内，以文件名-文件大小-备份文件个数的形式rolling生成文件
*     dateFile:输出到文件内，以pattern属性的时间格式，以时间的生成文件
*  replaceConsole:
*     是否替换控制台输出，当代码出现console.log，表示以日志type=console的形式输出
*  
*/

const log4js = require('log4js')
const env = process.env.NODE_ENV
console.log(process.env.NODE_ENV,"process.env.NODE_ENV")
log4js.configure({
  appenders: {
    everything: {//日志分类名称
      type: 'file',//日志文件类型
      filename: `logs/${env}-every.log`, //日志输出文件
      maxLogSize: 10485760,//日志大小
      backups: 3,
      compress: true
    },
    dev: {//日志切割
      type: 'dateFile',
      filename:`logs/${env}`,
      pattern:'yy-MM-dd.log',//文件名加后缀
      alwaysIncludePattern:true//是否总是有后缀
    }
  },
  categories: {
    default: {//日志默认配置
      appenders: ['everything'],
      level: 'info'
    },
    dev: {//dev环境下配置详
      appenders: ['dev'],
      level: 'debug'//日志信息级别debug及以上
    }
  }
})

let logger = log4js.getLogger()

if (env !== 'production') {
  logger = log4js.getLogger('dev')//获取日志记录器
}

module.exports = async function (ctx, next) {
  ctx.logger = logger
  ctx.logger.info(JSON.stringify({
    url: ctx.url,
    query: ctx.query,
    headers: ctx.request.headers,
    ua: ctx.userAgent,
    timespan: Date.now()
  }))
  await next()
}