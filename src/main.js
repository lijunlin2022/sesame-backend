const Koa = require('koa')
const koaBody = require('koa-body')
const koaJsonError = require('koa-json-error')
const koaParameter = require('koa-parameter')
const routing = require('./routes')
const connectMongoDB = require('./db/mongodb')

const app = new Koa()

connectMongoDB()

app.use(koaParameter(app))

app.use(koaBody({
  multipart: true
}))

app.use(koaJsonError({
  postFormat: function (e, { stack, ...rest }) {
    return process.env.NODE_ENV === 'production'? rest : { stack, ... rest }
  }
}))

routing(app)

app.listen(3000, () => {
  console.log('程序启动成功，运行在 3000 端口')
})
