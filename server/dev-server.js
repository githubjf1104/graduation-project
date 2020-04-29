const express = require('express')
// const webpack = require('webpack')
// const webpackConfig = require('../build/webpack.dev.conf')
const { serverInterface, config } = require('./base-server')
// const compiler = webpack(webpackConfig)
const app = express()
const cors = require('cors')
// 全局配置
app.use(cors())
// app.use(require('webpack-hot-middleware')(compiler))
// app.use(require('webpack-dev-middleware')(compiler, {
//     noInfo: true,
//     stats: {
//         colors: true
//     }
// }))
// 设置跨域访问
app.all('*', function (req, res, next) {
  // 设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', '*')
  // 允许的header类型
  res.header('Access-Control-Allow-Headers', 'content-type')
  // 跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
  // 让options尝试请求快速结束
  if (req.method.toLowerCase() === 'options') { res.send(200) } else { next() }
})
// 基本配置
config(app)
// 处理接口
serverInterface(app)
