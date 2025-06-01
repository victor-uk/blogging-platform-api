const mongoose = require('mongoose')
const dummyBlogPosts = require('./dummy-data')
const Blog = require('./models/Blogs')
require('dotenv').config()

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    await Blog.deleteMany() // Clear existing data
    await Blog.create(dummyBlogPosts)
    console.log('Successfully populated database with dummy data')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start() 