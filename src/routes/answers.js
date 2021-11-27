const Router = require('koa-router')
const KoaJwt = require('koa-jwt')
const { checkIdValid, auth, checkAnswerer } = require('../utils')
const {
  find,
  findById,
  create,
  update,
  del,
  checkAnswerExist
} = require('../controllers/answers')

const router = new Router({ prefix: '/question/:questionId/answer' })

router.get('/', find)
router.post('/', auth, create)
router.get('/:id', checkIdValid, findById)
router.patch('/:id', checkIdValid, auth, checkAnswerExist, checkAnswerer, update)
router.delete('/:id', checkIdValid, auth, checkAnswerExist, checkAnswerer, del)

module.exports = router
