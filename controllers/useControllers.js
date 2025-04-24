const posts = require('../dummy-data')
const getCurrentTime = require('../date')

const getAllPosts = (req, res) => {
    return res.status(200).json({ success: true, data: posts })
}

const getSinglePost = (req, res) => {
    const { id } = req.params
    const singlePost = posts.find(post => post.id === Number(id))
    return singlePost
        ? res.status(200).json({ success: true, data: singlePost })
        : res.status(404).json({ success: false, msg: `Post not found` })
}

const createPost = (req, res) => {
    const { title, content, category, tags } = req.body

    // checks if content and title exist
    if (!title || !content) {
        return res.status(400).json({ success: false, msg: 'Invalid post' })
    }
    const index = posts.findIndex(post => post.title === title)

    // checks whether Title already exists 
    if (index !== -1) {
        return res.status(200).json({ success: true, msg: 'Post with title already exists' })
    }

    // generate new ID safely
    const newId = posts.length > 0 ? posts[posts.length - 1].id + 1 : 1

    // validate tags
    const validTags = Array.isArray(tags) ? tags : []

    posts.push({
        id: newId,
        title: title,
        content: content,
        category: category,
        tags: validTags,
        createdAt: getCurrentTime(),
        updatedAt: 'No updates yet'
    })
    return res.status(201).json({ success: true, data: posts })
}

const updatePost = (req, res) => {
    const { id } = req.params
    const { content } = req.body
    const index = posts.findIndex(post => post.id === Number(id))

    // checks if post exists
    if (index === -1) {
        return res.status(404).json({ success: false, msg: 'Post not found' })
    }
    // checks if the content is empty
    if (!content) {
        return res.status(400).json({ success: false, msg: 'Invalid post' })
    }
    // verifies that the new content is not the same as the old one
    if (posts[index].content === content) {
        return res.status(200).json({ success: true, msg: `No changes made yet` })
    }

    posts[index].content = content
    posts[index].updatedAt = getCurrentTime()
    return res.status(200).json({ success: true, data: posts })
}

const deletePost = (req, res) => {
    const { id } = req.params

    const postIndex = posts.findIndex(post => post.id === Number(id))
    if (postIndex === -1) {
        return res.status(404).json({ success: false, msg: 'Post not found' })
    }
    
    // Remove the post by splicing the array instead of reassigning
    posts.splice(postIndex, 1)
    return res.status(200).json({ success: true, data: posts })
}

const getPostsByQuery = (req, res) => {
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
}

module.exports = {
    getAllPosts,
    getSinglePost,
    createPost,
    updatePost,
    deletePost,
    getPostsByQuery
}




