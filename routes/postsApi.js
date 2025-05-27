const express = require('express')
const router = express.Router()
const {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
  getPostsByQuery
} = require('../controllers/useControllers')

router.route('/').get(getAllPosts).post(createPost)
router.route('/:id').get(getSinglePost).put(updatePost).delete(deletePost)
router.route('/query').get(getPostsByQuery) 

module.exports = router
