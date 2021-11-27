const Router = require('koa-router')
const KoaJwt = require('koa-jwt')
const { checkIdValid, auth, checkQuestioner } = require('../utils')
const {
  find,
  findById,
  create,
  update,
  del,
  checkQuestionExist
} = require('../controllers/questions')


const router = new Router({ prefix: '/question' })

router.get('/', find)
router.post('/', auth, create)
router.get('/:id', checkIdValid, findById)
router.patch('/:id', checkIdValid, auth, checkQuestionExist, checkQuestioner, update)
router.delete('/:id', checkIdValid, auth, checkQuestionExist, checkQuestioner, del)

module.exports = router
