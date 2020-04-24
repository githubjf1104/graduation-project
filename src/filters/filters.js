const filters = {
  timeFormat (time) {
    let date = new Date(time)
    let nowDate = new Date()
    let showDay = ''
    let value = (nowDate.getTime() - date.getTime()) / 1000
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    if (value < 60 * 5) {
      showDay = '刚刚'
    } else if (value >= 60 * 5 && value < 60 * 60) {
      showDay = parseInt(value / 60) + '分钟前'
    } else if (value >= 3600 && value < 3600 * 24) {
      showDay = parseInt(value / 3600) + '小时前'
    } else if (value >= 3600 * 24 && value < 3600 * 24 * 4) {
      showDay = parseInt(value / 3600 / 24) + '天前'
    } else {
      showDay = timeWithZero(year) + '-' + timeWithZero(month) + '-' + timeWithZero(day)
    }
    // 格式时间
    function timeWithZero (num) {
      return num > 10 ? num : '0' + num
    }
    return showDay
  },

  handleContentHTML (content) {
    if (content !== null) {
      return content.replace(/<[^>]+>/g, '')
    }
    return ''
  }
}
export default filters
