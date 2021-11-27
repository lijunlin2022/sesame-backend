const Router = require('koa-router')
const { auth, checkIdValid, checkOwner } = require('../utils')
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
  unfollow,
  listQuestions
} = require('../controllers/users')

const router = new Router({ prefix: '/user' })

router.get('/', find)
router.post('/', create)
router.get('/:id', checkIdValid, findById)
router.patch('/:id', auth, checkIdValid, checkOwner, update)
router.delete('/:id', auth, checkIdValid, checkUserExist, del)
router.post('/login', login)
router.get('/:id/following', checkIdValid, listFollowing)
router.get('/:id/followers', checkIdValid, listFollowers)
router.put('/following/:id', checkIdValid, auth, checkUserExist, follow)
router.delete('/following/:id', checkIdValid, auth, checkUserExist, unfollow)
router.get('/:id/questions', listQuestions)

module.exports = router
