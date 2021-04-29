const mongoose = require('mongoose')

require('dotenv').config()
const uriDb = process.env.URI_DB

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  poolSize: 5,
})

mongoose.connection.on('connected', () => {
  console.log('Database connection successful')
})

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err.message}`)
  process.exit(1)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnection ')
})

process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close()
    console.log('Connection for db closed')
    process.exit(1)
  } catch (error) {
    console.error(error.message)
  }
})

module.exports = db
