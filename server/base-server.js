const handler = require('./handler')
const express = require('express')
const bodyParser = require('body-parser')
const hostname = 'localhost'
const port = 8081

module.exports = {
    config(app) {
        // 使用 body-parser 中间件
        /**
          *express生成一个网站，它默认已经使用了bodyParser.json与bodyParser.urlencoded的解析功能，
          *除了这两个，bodyParser还支持对text、raw的解析
         */
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())
        app.use(express.static('dist')) // 将dist设为根目录
        app.listen(port, hostname, () => {
            console.log(`正在监听${hostname}:${port}\n\n`)
        })
    },
    interface(app) {
        app.post('/pushArticle', (req, res) => {
            handler.pushArticle(req, res)
        })
        app.post('/vaildToken', (req, res) => {
            handler.vaildToken(req, res)
        })
        app.get('/fetchAllArticles', (req, res) => {
            handler.fetchAllArticles(req, res)
        })

        app.post('/deleteArticle', (req, res) => {
            handler.deleteArticle(req, res)
        })

        app.get('/fetchArticleContentById', (req, res) => {
            handler.fetchArticleContentById(req, res)
        })

        app.get('/fetchTagsData', (req, res) => {
            handler.fetchTagsData(req, res)
        })

        app.get('/fetchTagsArtilesData', (req, res) => {
            handler.fetchTagsArtilesData(req, res)
        })

        app.post('/login', (req, res) => {
            handler.login(req, res)
        })

        app.post('/loginOut', (req, res) => {
            handler.loginOut(req, res)
        })

        app.post('/register', (req, res) => {
            handler.register(req, res)
        })
        
        app.post('/comment', (req, res) => {
            handler.comment(req, res)
        })

        app.get('/fetchVisits', (req, res) => {
            handler.fetchVisits(req, res)
        })
    }
}