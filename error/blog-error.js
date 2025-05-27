class BlogError extends Error{
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

const createCustomErrror = (message, code) => {
    return new BlogError(message, code)
}

module.exports = {BlogError, createCustomErrror}