const User = require('../models/users')

class UserCtl {
  async find (ctx) {
    ctx.body = await User.find()
  }
  async findById (ctx) {
    const user = await User.findById(ctx.params.id)
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.body = user
  }
  async create (ctx) {
    console.log(ctx.request.body)
    const user = await new User(ctx.request.body).save()
    ctx.body = user
  }
  async update (ctx) {
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.body = user
  }
  async del (ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id)
    if (!user) {
      ctx.throw(404, '用户不存在')
    }
    ctx.status = 204
  }
}

module.exports = new UserCtl()
