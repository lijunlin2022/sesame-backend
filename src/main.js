const Koa = require('koa')
const KoaBody = require('koa-body')
const routing = require('./routes')
const connectMongoDB = require('./db/mongodb')

const app = new Koa()

connectMongoDB()

app.use(KoaBody({
  multipart: true
}))

routing(app)

app.listen(3000, () => {
  console.log('程序启动成功，运行在 3000 端口')
})
