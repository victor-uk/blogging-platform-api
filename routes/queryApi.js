const express = require('express')
const router = express.Router()
const { getPostsByQuery } = require('../controllers/useControllers')

router.get('/', getPostsByQuery)

module.exports = router
