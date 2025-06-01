const queryObject = {
  $or: '',
  category: '',
  tags: ''
}

const queryObjectBuilder = (search, category, tags) => {
  if (search) {
    queryObject.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
    ]
  }
  if (category) {
    queryObject.category = { $regex: category, $options: 'i' }
  }
  if (tags) {
    queryObject.tags = { $regex: tags, $options: 'i' }
  }
}

const sortConfig = (sort, result) => {
    if (sort) {
        const sortList = sort.split(',').join(' ')
        return result.sort(sortList)
    } else {
        return result.sort('createdAt')
    }
}

module.exports = { queryObject, queryObjectBuilder, sortConfig }
