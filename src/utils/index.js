const ObjectId = require('mongoose').Types.ObjectId
const KoaJwt = require('koa-jwt')
const { secret } = require('../config/jwt')

/**
 * 确定 id 的格式是否合法
 */
const checkIdValid = async (ctx, next) => {
  if (!ObjectId.isValid(ctx.params.id)) {
    ctx.throw(404, '传递的 id 格式不合法')
  }
  await next()
}

/**
 * 认证用户是否登录
 */
const auth = KoaJwt({ secret })

/**
 * 检测操作的 id 是否和用户 id 相等
 */
const checkOwner = async (ctx, next) => {
  if (ctx.params.id !== ctx.state.user._id) {
    ctx.throw(403, '没有权限, 你不是此资源的拥有者')
  }
  await next()
}

/**
 * 检测问题是否是此 id 的用户提出的
 */
const checkQuestioner = async (ctx, next) => {
  const { question } = ctx.state
  if (question.questioner.toString() !== ctx.state.user._id) {
    ctx.throw(403, '没有权限, 你不是此问题的拥有者')
  }
}

/**
 * 检测回答是否是此 id 的用户编写的
 */
const checkAnswerer = async (ctx, next) => {
  const { answer } = ctx.state
  if (answer.answerer.toString() !== ctx.state.user._id) {
    ctx.throw(403, '没有权限, 你不是此回答的拥有者')
  }
}

module.exports = {
  checkIdValid,
  auth,
  checkOwner,
  checkQuestioner,
  checkAnswerer
}
