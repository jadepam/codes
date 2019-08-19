const mongoose = require('mongoose')

const userSchema =new mongoose.Schema({
    openId: {
        type: String,
        index: true,
        unique: true
      },
      created: {
        type: Date,
        default: Date.now
      },
      lastLogin: {
        type: Date
      },
      name: {
        type: String,
        index: true
      },
      avatar: {
        type: String
      },
      userType: {
        type: Number,
        default: 0
      }
})

const codeSchema = new mongoose.Schema({
    code: {//存储二维码字符串
      type: String
    },
    sessionKey: String//存储小程序的登录凭证
  })
module.exports={
    User:mongoose.model("user",userSchema),
    Code: mongoose.model('code', codeSchema),
}