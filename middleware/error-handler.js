const { BlogError } = require("../error/blog-error");

const errorHandler = (err, req, res, next) => {
    if (err instanceof BlogError) {
        return res.status(err.statusCode).json(err.message)
    }
    return res.status(500).json({ msg: err })
}

module.exports = errorHandler