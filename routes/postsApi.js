const express = require('express')
const router = express.Router()
let posts = require('../dummy-data')
const getCurrentTime = require('../date')

router.get('/', (req, res) => {
    return res.status(200).json({success: true, data: posts})
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  const singlePost = posts.find(post => {
    return post.id === Number(id)
  })
  return singlePost
    ? res.status(200).json({ success: true, data: singlePost })
    : res.status(404).json({ success: false, msg: `Post not found` })
})

router.post('/', (req, res) => {
    const { title, content, category, tags } = req.body

    // checks if content and title exist
    if (!title || !content) {
        return res.status(400).json({success: false, msg: "Invalid post"})
    }
    const index = posts.findIndex(post => post.title === title)

    // checks whether Title already exists
    if (index !== -1) {
     return res.status(200).json({success: true, msg: 'Post with title already exists'}) 
    }
    let newId = posts[posts.length - 1].id
    posts.push({
      id: ++newId,
      title: title,
      content: content,
      category: category,
      tags: [...tags],
      createdAt: getCurrentTime(),
      updatedAt: "No updates yet"
  })
    return res.status(201).json({success: true, data: posts})
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { content } = req.body
  const index = posts.findIndex(post => post.id === Number(id))

  // checks if post exists
  if (index === -1) {
    return res.status(404).json({success: false, msg: "Post not found"})
  }
  // checks if the content is empty
  if (!content) {
    return res.status(400).json({success: false, msg: "Invalid post"})
  }
  // verifies that the new content is not the same as the old one
  if(posts[index].content === content){
    return res.status(200).json({success: true, msg: `No changes made yet`})
  }

  posts[index].content = content
  posts[index].updatedAt = getCurrentTime()
  return res.status(200).json({success: true, data: posts})
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  postIndex = posts.findIndex(post => post.id === Number(id))
  if (postIndex === -1) {
    return res.status(404).json({success: false, msg: "Post not found"})
  }
  posts = posts.filter(post => post.id !== Number(id))
  return res.status(200).json({success: true, data: posts})
})









module.exports = router