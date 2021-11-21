const mongoose = require('mongoose')
const { MONGODB_CONF } = require('../config/db')

const { dbName, host, port } = MONGODB_CONF

const connectMongoDB = () => {
  mongoose.connect(`mongodb://${host}:${port}/${dbName}`)
  const conn = mongoose.connection

  conn.on('error', () => {
    console.log('连接 MongoDB 出错')
  })

  conn.on('open', () => {
    console.log('连接 MongoDB 成功')
  })
}

module.exports = connectMongoDB

