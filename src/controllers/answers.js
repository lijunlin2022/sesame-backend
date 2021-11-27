const Answer = require('../models/answers')

class AnswerCtl {

  async find (ctx) {
    const { pageNo = 1, pageSize = 10, q = '' } = ctx.query
    const pNo = Math.max(pageNo * 1, 1) - 1
    const pSize = Math.max(pageSize * 1, 1)
    ctx.body = await Answer
                      .find({
                        content: new RegExp(q),
                        questionId: ctx.params.questionId
                      })
                      .limit(pSize)
                      .skip(pNo * pSize)
  }

  async checkAnswerExist (ctx, next) {
    const answer = await Answer.findById(ctx.params.id).select('+answerer')
    if (!answer) {
      ctx.throw(404, '答案不存在')
    }
    if (answer.questionId !== ctx.params.questionId) {
      ctx.throw(404, '该问题下没有此答案')
    }
    ctx.state.answer = answer
    await next()
  }

  async findById (ctx) {
    const { fields } = ctx.query
    const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('')
    const answer = await Answer.findById(ctx.params.id).select(selectFields).populate('answerer')
    ctx.body = answer
  }

  async create (ctx) {
    ctx.verifyParams({
      content: { type: 'string', required: true }
    })
    const answer = await new Answer(
                                {
                                  ...ctx.request.body,
                                  answerer: ctx.state.user._id,
                                  questionId: ctx.params.questionId
                                }
                              ).save()
    ctx.body = answer
  }

  async update (ctx) {
    ctx.verifyParams({
      content: { type: 'string', required: false }
    })
    await ctx.state.answer.update(ctx.request.body)
    ctx.body = ctx.state.answer
  }

  async del (ctx) {
    await Answer.findByIdAndRemove(ctx.params.id)
    ctx.status = 204
  }
}

module.exports = new AnswerCtl()
