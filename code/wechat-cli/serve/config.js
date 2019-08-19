const env = process.env
const appKey = env.APP_KET || 'wx7acf2b547d5f68f9'
const appSecret = env.APP_SECRET || '24e8942b7b10f0ba2ad5a07b50685104'
const nodeEnv = env.NODE_ENV
let db = {//开发环境
  name: 'mongodb://localhost:27017/test',
  user: '',
  password: ''
}
if (nodeEnv === 'production') {//线上环境
  db = {
    name: 'mongodb://localhost:27017/test',
    user: '',
    password: ''
  }
}

module.exports = {
  appKey,
  appSecret,
  db
}