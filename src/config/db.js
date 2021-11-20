const env = process.env.NODE_ENV

let MONGODB_CONF = null

if (env === 'development') {
  MONGODB_CONF = {
    dbName: 'sesame',
    host: 'localhost',
    port: 27017
  }
}

module.exports = {
  MONGODB_CONF
}
