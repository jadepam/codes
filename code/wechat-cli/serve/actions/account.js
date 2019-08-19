const {
    login
} = require("../lib/db/user")
const {
    add, updateSessionKey, getSessionKey, removeData
  } = require('../lib/db/code')
const {
    getSession
} = require("../lib/wx")

const {
    encodeErCode,
    decode
  } = require('../lib/crypto')

module.exports={
    async login (code){
        const session =await getSession(code)
    if(session){
        const{openid}=session
        return login(openid)
    }else{
        throw new Error("登录失败")
    }
    },
    async getErcode(){
        const code = encodeErCode()
        await add(code) 
        setTimeout(()=>{
            removeData(code)
        },30000)
        return code
    },
    async setssionKeyForCode(code,sessionKey){
        const {timespan} = await decode(code)
        if(Date.now()-timespan>30000){
            throw new Error("过期") 
        }
        await updateSessionKey(code,sessionKey)
    },
    async getSessionKeyByCode(code){
        const sessionKey = await getSessionKey(code)
        if (sessionKey) {
          await removeData(code)
        }
        return sessionKey
    }
    
}