const Koa = require('koa')
const logger = require('./middlewares/log')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const router = require('./router')
const JSON_MIME = 'application/json'
const {open} = require('./lib/db/connect')
const app = new Koa()
open()
app.use(logger)//日志
app.use(cors({
  origin: '*'
}))
app.use(bodyParser({multipart: true}))
app.use(async (context, next) => {
  context.type = JSON_MIME
  await next()
})
app.use(async (context, next) => {
    try {
      await next()
    } catch (ex) {
      context.logger.error(ex.stack || ex)
      context.body = {
        status: -1,
        message: ex.message || ex,
        code: ex.status
      }
      console.log("异常",ex)
    }
  })
app.use(router.routes())
app.use(router.allowedMethods())
app.listen(4001)
console.log('api serve http://localhost:4001');