const posts = require('../dummy-data')
const Blog = require('../models/Blogs')
const { createCustomErrror } = require('../error/blog-error')
const asyncWrapper = require('../middleware/async-wrapper')


const getAllPosts = asyncWrapper( async(req, res) => {
  const blogPosts = await Blog.find()
    return res.status(200).json({ blogPosts })
})

const getSinglePost = asyncWrapper( async(req, res, next) => {
    const { id: blogID } = req.params

    const singlePost = Blog.findById(blogID)
    if (!singlePost) {
      next(createCustomErrror("post not found", 404))
    }
})

const createPost = asyncWrapper ( async (req, res, next) => {
    const { title, content, category, tags } = req.body
    const newBlog = {title, content, category, tags}
    if (!title || !content || !category) {
      return next(createCustomErrror("invalid post", 400))
    }
    const blog = await Blog.create(newBlog)
    return res.status(201).json({ blog })
})

const updatePost = asyncWrapper( async(req, res, next) => {
    const { id: blogID } = req.params
    const { content: newContent } = req.body
    
    // verifies that the new content is not the same as the old one
    const blog = Blog.findById(blogID, 'content')
    if (blog.content === newContent) {
        return next(createCustomErrror(`No changes made yet`, 304))
    }

    const updatedBlogPost = Blog.findByIdAndUpdate(blogID, { content: newContent }, 
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

const deletePost = asyncWrapper( async(req, res, next) => {
    const { id: blogID } = req.params
    const deletedPost = Blog.findByIdAndDelete(blogID)
    if (!deletedPost) {
      return next(createCustomErrror('post not found', 404))
    }
    return res.status(200).json({ success: true, data: posts })
})

const getPostsByQuery = asyncWrapper( async(req, res) => {
  const { search, tag, category } = req.query
  let searchResults = [...posts]

  if (search) {
    searchResults = searchResults.filter(post => {
      return Object.keys(post).some(
        key =>
          typeof post[key] === 'string' &&
          new RegExp(search, 'i').test(post[key])
      )
    })
  }
  if (tag) {
    searchResults = searchResults.filter(post =>
      new RegExp(tag, 'i').test(post.tags)
    )
  }
  if (category) {
    searchResults = searchResults.filter(post =>
      new RegExp(category, 'i').test(post.category)
    )
  }
  if (!searchResults) {
    return res.status(404).json({ success: true, msg: 'Post not found' })
  }
  res.status(200).json(searchResults)
})

module.exports = {
    getAllPosts,
    getSinglePost,
    createPost,
    updatePost,
    deletePost,
    getPostsByQuery
}




