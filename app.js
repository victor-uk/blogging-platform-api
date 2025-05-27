/** Global variables */
const express = require('express')
const app = express()
const postsApi = require('./routes/postsApi')
const connectDB = require('./db/connect')
require('dotenv').config()
const morgan = require('morgan')
const errorHandler = require('./middleware/error-handler')

/** Middleware */
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('short'))
app.use('/api/v1/posts', postsApi)
app.use(errorHandler)

let port = process.env.PORT || 5000

/** Listening */
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`)
    })
  } catch (error) {
    console.log(error);
  }
}

start()