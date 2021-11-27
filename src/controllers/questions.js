const Question = require('../models/questions')

class QuestionCtl {

  async find (ctx) {
    const { pageNo = 1, pageSize = 10, q = '' } = ctx.query
    const pNo = Math.max(pageNo * 1, 1) - 1
    const pSize = Math.max(pageSize * 1, 1)
    ctx.body = await Question
                      .find({
                        $or: [
                          { title: new RegExp(q) },
                          { description: new RegExp(q) }
                        ]
                      })
                      .limit(pSize)
                      .skip(pNo * pSize)
  }

  async checkQuestionExist (ctx, next) {
    const question = await Question.findById(ctx.params.id).select('+questioner')
    if (!question) {
      ctx.throw(404, '问题不存在')
    }
    ctx.state.question = question
    await next()
  }

  async findById (ctx) {
    const { fields } = ctx.query
    const selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('')
    const question = await Question.findById(ctx.params.id).select(selectFields).populate('questioner topics')
    ctx.body = question
  }

  async create (ctx) {
    ctx.verifyParams({
      title: { type: 'string', required: true },
      description: { type: 'string', required: false }
    })
    const question = await new Question(
                                {
                                  ...ctx.request.body,
                                  questioner: ctx.state.user._id
                                }
                              ).save()
    ctx.body = question
  }

  async update (ctx) {
    ctx.verifyParams({
      title: { type: 'string', required: false },
      description: { type: 'string', required: false }
    })
    await ctx.state.question.update(ctx.request.body)
    ctx.body = ctx.state.question
  }

  async del (ctx) {
    await Question.findByIdAndRemove(ctx.params.id)
    ctx.status = 204
  }
}

module.exports = new QuestionCtl()
