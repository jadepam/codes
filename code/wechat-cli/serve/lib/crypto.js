const crypto = require('crypto')
const secret = 'test-2019816' //加密密钥
const algorithm = 'aes-256-cbc'//加密算法

const encode = (id)=> { //加密
  const encoder = crypto.createCipher(algorithm, secret)//创建加密算法
  const str = [id, Date.now(), '2019816'].join('|')//构建加密字符串
  let encrypted = encoder.update(str, 'utf8', 'hex')
  encrypted += encoder.final('hex')
  return encrypted
}

const decode =  (str) =>{//解密算法
  const decoder = crypto.createDecipher(algorithm, secret)//创建解密器
  let decoded = decoder.update(str, 'hex', 'utf8')
  decoded += decoder.final('utf8')
  const arr = decoded.split('|')//将解密后的字符串按照自定义规则解密成对象
  return {
    id: arr[0],
    timespan: parseInt(arr[1])
  }
}

const encodeErCode = ()=> {
  return encode(Math.random())
}

module.exports = {
  encode,
  decode,
  encodeErCode
}
