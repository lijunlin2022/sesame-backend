const Router = require('koa-router')
const KoaJwt = require('koa-jwt')
const { checkIdValid, auth } = require('../utils')
const {
  find,
  findById,
  create,
  update,
  del,
  listQuestions
} = require('../controllers/topics')

const router = new Router({ prefix: '/topic' })

router.get('/', find)
router.post('/', create)
router.get('/:id', checkIdValid, findById)
router.patch('/:id', checkIdValid, auth, update)
router.delete('/:id', checkIdValid, auth, del)
router.get('/:id/questions', checkIdValid, listQuestions)

module.exports = router
