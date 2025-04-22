
/** Global variables */
const express = require('express')
const app = express()
const postsApi = require('./routes/postsApi')
const queryApi = require('./routes/queryApi')

/** Middleware */
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use('/api/v1/posts', postsApi)

app.use('/api/v1/query', queryApi)

/** Listening */
app.listen(5000, () => {
  console.log(`Server is listening on port 5000`)
})
