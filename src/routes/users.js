const Router = require('koa-router')
const router = new Router({ prefix: '/user' })

router.get('/', async (ctx) => {
  ctx.body = '查询多个'
})

router.post('/', async (ctx) => {
  ctx.body = '新增'
})

router.get('/:id', async (ctx) => {
  ctx.body = '查询单个'
})

router.patch('/:id', async (ctx) => {
  ctx.body = '更新'
})

router.delete('/:id', async (ctx) => {
  ctx.body = '删除'
})

module.exports = router
