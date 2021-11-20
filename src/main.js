const Koa = require('koa')
const routing = require('./routes')

const app = new Koa()
routing(app)

app.listen(3000)
