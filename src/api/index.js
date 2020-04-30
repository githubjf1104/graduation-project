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

export function fetchAllUser () {
  return axios.get('/api/fetchAllUser')
}

export function fetchArticleContentById (id) {
  return axios.get(`/api/fetchArticleContentById?id=${id}`)
}

export function pushArticle (obj) {
  return axios.post('/api/pushArticle', obj)
}

export function publishedProblem (obj) {
  return axios.post('/api/publishedProblem', obj)
}

export function publishedReply (obj) {
  return axios.post('/api/publishedReply', obj)
}

export function fetchAllReply (id) {
  return axios.get(`/api/fetchAllReply?id=${id}`)
}

export function fetchAllProblem (obj) {
  return axios.get('/api/fetchAllProblem' + objToUrlParam(obj))
}

export function deleteProblem (obj) {
  return axios.post('/api/deleteProblem', obj)
}

export function deleteArticle (obj) {
  return axios.post('/api/deleteArticle', obj)
}

export function fetchProblemContentById (id) {
  return axios.get(`/api/fetchProblemContentById?id=${id}`)
}

export function giveLike (obj) {
  return axios.post('/api/giveLike', obj)
}

export function collect (obj) {
  return axios.post('/api/collect', obj)
}

export function fetchCollect (obj) {
  return axios.get('/api/fetchCollect' + objToUrlParam(obj))
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

export function comment (data) {
  return axios.post('/api/comment', data)
}

export function commentReply (data) {
  return axios.post('/api/commentReply', data)
}

export function fetchComments (id) {
  return axios.get(`/api/fetchComments?id=${id}`)
}

export function vaildToken () {
  return axios.post('/api/vaildToken')
}
