const Router = require('koa-router')
const router = new Router()
const account = require('./actions/account')
const {
    findBySessionKey
  } = require('./lib/db/user')
const auth = async function (context, next) {
    const sessionKey = context.get('x-session')
    context.logger.debug(`[auth] 获取到到sessionKey为${sessionKey}`)
    if (!sessionKey) {
      context.throw(401, '请求头中未包含x-session')
    }
    const user = await findBySessionKey(sessionKey)
    if (user) {
      context.logger.debug(`[auth] 根据sessionKey查询到的用户为${JSON.stringify(user)}`)
      if (user.userType === -1) {
        context.throw(401, '当前用户被禁用')
      }
      context.state.user = {
        id: user._id,
        name: user.name,
        avatar: user.avatar,
        isAdmin: user.userType === 1
      }
    } else {
      context.logger.info(`[auth] 根据sessionKey未获取到用户`)
      context.throw(401, 'session 过期')
    }
  
    if (/^\/admin/i.test(context.url) && !context.state.user.isAdmin) {
      context.logger.info(`[auth] 当前的${context.url} 必须为管理员访问.`)
      context.throw(401, '当前资源必须管理员才能访问')
    }
    await next()
  }

async function responseOK (ctx, next) {
  ctx.body = {
    status: 0
  }
  await next()
}
router.get('/login', async (context, next) => {
    const code = context.query.code
    context.logger.info(`[login] 用户登陆Code为${code}`)
    context.body = {
      status: 0,
      data: await account.login(code)
    }
})


/**
 * 获取当前登陆的用户信息
 */
router.get('/my', auth, async (context, next) => {
    context.body = {
      status: 0,
      data: context.state.user
    }
})


/**
 * 后台管理站生成二维码
 */
router.get('/login/ercode', async (context, next) => {
  context.body = {
    status: 0,
    data: await account.getErcode()
  }
})

//后台管理轮询，轮询检查登陆状态
router.get('/login/ercode/check/:code',async (context, next) => {
  const startTime = Date.now()
  async function login () {
    const code = context.params.code
    const sessionKey = await account.getSessionKeyByCode(code)
    if (sessionKey) {
      context.body = {
        status: 0,
        data: {
          sessionKey: sessionKey
        }
      }
    } else {
      if (Date.now() - startTime < 10000) {
        await new Promise((resolve) => {
          process.nextTick(() => {
            resolve()
          })
        })
        await login()
      } else {
        context.body = {
          status: -1
        }
      }
    }
  }
  await login()
})

//小程序扫码
router.get('/login/ercode/:code', auth,async (context, next) => {
  const code = context.params.code //获取参数中的二维码字符串
  const sessionKey= context.get('x-session')
  await account.sessionKeyForCode(code,sessionKey)//返回根据code,返回session，同时code失效
  await next()
},responseOK)


router.get('/', async (context, next) => {
  context.body = `
  小程序&管理后台restful接口文档：
    + GET "/login" 登陆接口，根据code换取sessioKey
    + GET "/my"  获取当前登陆的用户信息
    + GET "/login/ercode/:code" 小程序扫码获取二维码字符串+客户端本地x-session，成功则code失效

    除了登陆接口外，其他接口都需要在请求头中采用"x-session"字段传递sessionKey

    管理后台接口：
    + GET "/login/ercode"， 后台管理站生成二维码
    + GET "/login/ercode/check/:code"， 后台管理轮询，轮询检查登陆状态
    `
})

module.exports = router