// import axios from 'axios'

function timestampToDate (timestamp = 0) {
  if (/\s/.test(timestamp)) {
    return timestamp
  }

  let date = new Date(timestamp)
  return date.toLocaleDateString().replace(/\//g, '-') + ' ' + date.toTimeString().split(' ')[0]
}

function objToUrlParam (obj = {}) {
  let param = ''
  for (let key in obj) {
    param += '&' + key + '=' + obj[key]
  }
  return param ? '?' + param.substr(1) : ''
}

function formatIP (ip = '') {
  return ip ? ip.split('.').slice(0, 3).join('.') + '.*' : ''
}

function formatVisits (visits = 0) {
  return visits ? (visits + '').replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : 0
}

// function request (url, method, data) {
//   if (method === 'get') {clear
//     axios.get(url, {
//       params: data,
//       headers: {'Authorization': localStorage.getItem('token')}
//     })
//   } else {
//     axios.post(url, {
//       params: data,
//       headers: {'Authorization': localStorage.getItem('token')}
//     })
//   }
// }

module.exports = {
  timestampToDate,
  objToUrlParam,
  formatIP,
  formatVisits
  // request
}
