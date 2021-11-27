const Router = require('koa-router')
const KoaJwt = require('koa-jwt')
const router = new Router({ prefix: '/user' })
const {
  find,
  findById,
  create,
  update,
  del,
  login,
  listFollowing,
  listFollowers,
  checkUserExist,
  follow,
  unfollow
} = require('../controllers/users')
const { secret } = require('../config/jwt')

/**
 * 认证用户是否登录
 */
const auth = KoaJwt({ secret })

/**
 * 检测操作的 id 是否和用户 id 相等
 */
const checkOwner = async (ctx, next) => {
  if (ctx.params.id !== ctx.state.user._id) {
    ctx.throw(403, '没有权限')
  }
  await next()
}

router.get('/', find)
router.post('/', create)
router.get('/:id', findById)
router.patch('/:id', auth, checkOwner, update)
router.delete('/:id', auth, checkOwner, del)
router.post('/login', login)
router.get('/:id/following', listFollowing)
router.get('/:id/followers', listFollowers)
router.put('/following/:id', auth, checkUserExist, follow)
router.delete('/following/:id', auth, checkUserExist, unfollow)

module.exports = router
