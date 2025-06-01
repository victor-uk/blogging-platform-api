const posts = require('../dummy-data')
const Blog = require('../models/Blogs')
const { createCustomErrror } = require('../error/blog-error')
const asyncWrapper = require('../middleware/async-wrapper')
const {
  queryObject,
  queryObjectBuilder,
  sortConfig
} = require('../util/queryObjectBuider')

const getAllPosts = asyncWrapper(async (req, res, next) => {
  const { search, category, tags, sort } = req.query

  queryObjectBuilder(search, category, tags)
  let result = Blog.find(queryObject)
  sortConfig(sort, result)
  const blogPosts = await result
  
  if (!blogPosts) {
    return next(createCustomErrror('post not found', 404))
  }
  return res.status(200).json({ blogPosts })
})

const getSinglePost = asyncWrapper(async (req, res, next) => {
  const { id: blogID } = req.params

  const singlePost = await Blog.findById(blogID)
  if (!singlePost) {
    return next(createCustomErrror('post not found', 404))
  }
  return res.status(200).json({ singlePost })
})

const createPost = asyncWrapper(async (req, res, next) => {
  const { title, content, category, tags } = req.body
  const newBlog = { title, content, category, tags }

  if (!title || !content || !category || !tags) {
    return next(createCustomErrror('invalid post', 400))
  }
  const blog = await Blog.create(newBlog)
  return res.status(201).json({ blog })
})

const updatePost = asyncWrapper(async (req, res, next) => {
  const { id: blogID } = req.params
  const { content: newContent } = req.body

  // verifies that the new content is not the same as the old one
  const blog = await Blog.findById(blogID, 'content')
  if (blog.content === newContent) {
    return next(createCustomErrror(`No changes made yet`, 304))
  }

  const updatedBlogPost = await Blog.findByIdAndUpdate(
    blogID,
    { content: newContent },
    {
      new: true,
      runValidators: true
    }
  )
  // checking whether post exists
  if (!updatedBlogPost) {
    return next(createCustomErrror('post not found', 404))
  }
  return res.status(200).json({ updatedBlogPost })
})

const deletePost = asyncWrapper(async (req, res, next) => {
  const { id: blogID } = req.params
  const deletedPost = await Blog.findByIdAndDelete(blogID)
  if (!deletedPost) {
    return next(createCustomErrror('post not found', 404))
  }
  return res.status(200).json({ status: 'success' })
})

module.exports = {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost
}
