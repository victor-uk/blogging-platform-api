const getCurrentTime = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    // Time calculation
    let formattedDate = [year, month, day]
    formattedDate = formattedDate.map(item => {
      return String(item).padStart(2, '0')
    }).join(`-`)

    return formattedDate + ' ' + [hour, minute, second].join(':')
}

module.exports = getCurrentTime