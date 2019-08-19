const {
  appKey,
  appSecret
} = require('../config')
const request = require('request')
module.exports = {
  async getSession (code) {
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appKey}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`    
    return new Promise((resolve, reject) => {
      request(url, {
        method: 'GET',
        json: true
      }, (error, res, body) => {
        if (error) {
          reject(error)
        } else {
          if (body.errcode) {
            reject(new Error(body.errmsg))
          } else {
            resolve(body)
          }
        }
      })
    })
  }
}

// fetch(url)
// .then(res => res.text())
// //与axios不同的一点是 得到的数据需要转义
// .then(data => console.log(data))
// .catch(error => {
//         if (error) throw error
//   })
