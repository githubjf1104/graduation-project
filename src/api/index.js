import axios from 'axios'
import { objToUrlParam } from '../utils'

axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('token')
  if (token) {
    config.headers.userToken = token
    return config
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

export function fetchAllArticles (obj) {
  return axios.get('/api/fetchAllArticles' + objToUrlParam(obj))
}

export function fetchArticleContentById (id) {
  return axios.get(`/api/fetchArticleContentById?id=${id}`)
}

export function pushArticle (obj) {
  return axios.post('/api/pushArticle', obj)
}

export function deleteArticle (obj) {
  return axios.post('/api/deleteArticle', obj)
}

export function fetchTagsData () {
  return axios.get('/api/fetchTagsData')
}

export function fetchTagsArtilesData () {
  return axios.get('/api/fetchTagsArtilesData')
}

export function login (data) {
  return axios.post('/api/login', data)
}

export function loginOut (data) {
  return axios.post('/api/loginOut', data)
}

export function register (data) {
  return axios.post('/api/register', data)
}

export function addComment (data) {
  return axios.post('/api/comment', data)
}

export function fetchVisits () {
  return axios.get('/api/fetchVisits')
}

export function vaildToken () {
  return axios.post('/api/vaildToken')
}
