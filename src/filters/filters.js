const filters = {
  timeFormat (time) {
    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    // 格式时间
    function timeWithZero (num) {
      return num > 10 ? num : '0' + num
    }
    return timeWithZero(year) + '-' + timeWithZero(month) + '-' + timeWithZero(day)
  },

  handleContentHTML (content) {
    let reg = /<[^>]+>/g
    return content.replace(reg, '')
  }
}
export default filters
