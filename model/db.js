const mongoose = require('mongoose');

require('dotenv').config()
const uriDb = process.env.URI_DB

const db =

process.on('SIGINT', async () => {
  try {
    const client = await db
    await client.close()
    console.log('connection close')
    process.exit(1)
  } catch (error) {
    console.error(error.message)
  }
})

module.exports = db
