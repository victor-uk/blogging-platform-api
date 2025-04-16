/**
 * Requirements
 * Create a RESTFUL API for a personal blogging platform. The API should allow users to perform the following operations:

 * Create a new blog post
 * Update an existing blog post
 * Delete an existing blog post
 * Get a single blog post
 * Get all blog posts
 * Filter blog posts by a search term
 */

/** Global variables */ 
const express = require('express')
const app = express()
const posts = require('./dummy-data')

/** Middleware */
app.use(express.json()) 

/** Routing */
app.get('/api/posts', (req, res) => {
    return res.status(200).json({success: true, data: posts})
})

app.get('/api/posts/:id', (req, res) => {
    return res.status(200).json({success: true, data: posts})
})


/** Listening */
app.listen(5000, () => {
    console.log(`Server is listening on port 5000`);
    
})
