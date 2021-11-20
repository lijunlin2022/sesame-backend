const Koa = require('koa')
const routing = require('./routes')
require('./db/mongodb')

const app = new Koa()
routing(app)

app.listen(3000, () => {
  console.log('程序启动成功，运行在 3000 端口')
})
