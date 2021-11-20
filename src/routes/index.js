const fs = require('fs')

/**
 * 同步读取 routes 下的所有文件
 * 并自动注册路由
 * @param {*} app
 */
module.exports = (app) => {
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') { return }
    const router = require(`./${file}`)
    app.use(router.routes()).use(router.allowedMethods())
  })
}
