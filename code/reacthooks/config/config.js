import routes from './routers'
import {resolve} from 'path'
import {apiUrl, loginUrl} from './dev'

export default {
  // history: 'hash',
  routes,
  // plugins: [
  //   ['umi-plugin-react', {
  //     antd: true,
  //     dva: true,
  //     dynamicImport: false,
  //     dll: true,
  //   }],
  //   `${__dirname}/script.js`,    // 第三方js库优雅引入
  // ],
  dva: {},
  antd: {},
  hash: true,
  alias: {
    '@': resolve(__dirname, '../src'),
  },
  proxy: {
    // '/api': {
    //   target: apiUrl,
    //   changeOrigin: true,
    //   pathRewrite: { "^/api": "" }
    // },
    // '/api/login': {
    //   target: loginUrl,
    //   changeOrigin: true,
    //   pathRewrite: { "^/api/login": "" }
    // }
  }
}
