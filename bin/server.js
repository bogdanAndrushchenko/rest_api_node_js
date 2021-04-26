const app = require('../app')
const db = require('../model/db')
const PORT = process.env.PORT || 3001

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT})`)
  })
}).catch((error) => {
  console.log(`server is not running. Error: ${error.message}`)
  process.exit(1)
})
