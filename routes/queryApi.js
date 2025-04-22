const express = require('express')
const router = express.Router()
let posts = require('../dummy-data')


router.get('/', (req, res) => {  
    const { query, tag, title, category} = req.query
    let searchResults = [...posts]

    if (search) {
      searchResults = searchResults.filter(post => {
        return Object.keys(post).some(key => typeof(post[key]) === 'string' && new RegExp(search, 'i').test(post[key]))
      })
    }
    if (tag) {
        searchResults = searchResults.filter(post => new RegExp(tag, "i").test(post.tags))
    }

    if (title) {
        searchResults = searchResults.filter(post => new RegExp(title, "i").test(post.title))
    }
    
    if (category) {
        searchResults = searchResults.filter(post => new RegExp(category, "i").test(post.category))
    }

    if (!searchResults) {
        res.status(404).json({success: true, msg: "Post not found"})
    }

    res.status(200).json(searchResults)
  })

  module.exports = router
