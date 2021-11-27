const mongoose = require('mongoose')

const { Schema, model } = mongoose

const userSchema = new Schema({
  __v: { type: Number, select: false },
  username: { type: String, required: true },
  password: { type: String, required: true, select: false },
  gender: { type: String, enum: ['male', 'female'], default: 'male' },
  avatar_url: { type: String },
  /**
   * 一句话介绍
   */
  headline: { type: String },
  /**
   * 居住地
   */
  locations: {
    type: [{ type: String }], select: false
  },
  /**
   * 教育经历
   */
  educations: {
    type: [{
      school: { type: String },
      major: { type: String },
      /**
       * 学历
       * 1 代表高中及以下
       * 2 代表大专
       * 3 代表本科
       * 4 代表硕士
       * 5 代表博士及以上
       */
      diploma: {
        type: Number, enum: [1, 2, 3, 4, 5]
      },
      /**
       * 入学年份
       */
      entrance_year: { type: Number },
      /**
       * 毕业年份
       */
      graduation_year: { type: Number }
    }],
    select: false
  },
  /**
   * 关注的人
   */
  following: {
    type: [{
      type: Schema.Types.ObjectId, ref: 'User'
    }],
    select: false
  }
})

module.exports = model('User', userSchema)
