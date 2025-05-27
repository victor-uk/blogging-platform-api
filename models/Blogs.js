const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'must provide title'],
        trim: true,
    },
    content: {
        type: String,
        required: [true, 'must provide content'],
        trim: true
    },
    category: {
        type: String,
        trim: true,
        maxlength: [20, 'category must not be more than 20 characters']
    },
    tags: [{
        type: String,
        trim: true,
        maxlength: [20, 'tags cannot be more than 20 characters']
    }]
}, { timestamps: true })

module.exports = mongoose.model('Blog', BlogSchema)