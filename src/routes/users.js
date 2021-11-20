const Router = require('koa-router')
const router = new Router({ prefix: '/user' })
const {
  find,
  findById,
  create,
  update,
  del
} = require('../controllers/users')

router.get('/', find)
router.post('/', create)
router.get('/:id', findById)
router.patch('/:id', update)
router.delete('/:id', del)

module.exports = router
