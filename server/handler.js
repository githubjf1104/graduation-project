const { generateToken, isVaildToken } = require('./token')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const url = 'mongodb://localhost:27017/'
const config = { useUnifiedTopology: true }
// 保存文章数据的集合/表
const articleCollection = 'articles'
const questionCollection = 'questions'
const replyCollection = 'replys'
const commentCollection = 'comments'

let tagsCacheData = []
let tagsArticlesCacheData = {}
let totalReply = 0
// 标签数据是否改变
let isTagsChange = true
let likedContent = {}
initData()

module.exports = {
  // 验证
  vaildToken (req, res) {
    MongoClient.connect(url, config, async (err, db) => {
      if (err) throw err
      const dbo = db.db('blog')
      const Authorization = req.get('userToken')
      if (Authorization !== undefined && Authorization != null && Authorization !== '') {
        const token = Authorization
        // 验证 token
        const vaild = await isVaildToken(dbo, token)
        if (!vaild) {
          res.send({
            code: 1,
            msg: 'token 失效，请重新登陆'
          })
        } else {
          res.send({
            code: 0,
            msg: ''
          })
          db.close()
        }
      } else {
        res.send({
          code: 1,
          msg: 'token 失效，请重新登陆'
        })
        db.close()
      }
    })
  },
  // 发表文章
  pushArticle (req, res) {
    MongoClient.connect(url, config, async (err, db) => {
      if (err) throw err
      const dbo = db.db('blog')
      const token = req.get('userToken')
      // 验证 token
      const vaild = await isVaildToken(dbo, token)
      const collection = dbo.collection(articleCollection)
      if (!vaild) {
        res.send({
          code: 1,
          msg: 'token 失效，请重新登陆'
        })

        db.close()
        return
      }

      if (req.body.id) {
        const query = { _id: ObjectID(req.body.id) }
        const body = req.body
        const updateContent = {
          $set: {
            articleTitle: body.articleTitle,
            articleType: body.articleType,
            articleContent: body.articleContent,
            articleTags: body.articleTags,
            username: body.username
          }
        }

        collection.updateOne(query, updateContent, err => {
          if (err) {
            res.send({
              code: 1,
              msg: '更新失败'
            })
          } else {
            updateTagsData()
            isTagsChange = true
            res.send({
              code: 0,
              data: '更新成功'
            })
          }

          db.close()
        })
      } else {
        const date = (new Date()).getTime()
        const articleData = {
          ...req.body,
          date: date,
          likes: []
        }

        collection.insertOne(articleData, err => {
          if (err) {
            res.send({
              code: 1,
              msg: '发布失败'
            })
          } else {
            updateTagsData()
            res.send({
              code: 0,
              data: '发布成功'
            })
          }

          db.close()
        })
      }
    })
  },
  // 查询文章并分页
  fetchAllArticles (req, res) {
    MongoClient.connect(url, config, (err, db) => {
      if (err) throw err
      const dbo = db.db('blog')
      const query = req.query
      // ~~取整
      const size = ~~query.pageSize
      const index = ~~query.currentPage
      const queryObj = {}
      const collection = dbo.collection(articleCollection)
      if (query.articleType) {
        queryObj.articleType = query.articleType
      } else if (query.articleTags) {
        let tag = query.articleTags
        queryObj.articleTags = {$elemMatch: {$eq: tag}}
      } else if (query.articleTitle) {
        let title = query.articleTitle
        queryObj.articleTitle = {$regex: title, $options: '$i'}
      } else if (query.username) {
        queryObj.username = query.username
      }
      collection.find(queryObj).count((err, num) => {
        if (err) throw err
        collection.find(queryObj).sort({'date': -1}).skip(size * (index - 1)).limit(size).toArray((err, result) => {
          if (err) {
            res.send({
              code: 1,
              msg: '查找失败',
              data: []
            })
          } else {
            res.send({
              code: 0,
              data: result,
              total: num
            })
          }

          db.close()
        })
      })
    })
  },
  // 根据_id获取文章
  fetchArticleContentById (req, res) {
    MongoClient.connect(url, config, (err, db) => {
      if (err) throw err
      const dbo = db.db('blog')
      const query = { _id: ObjectID(req.query.id) }
      const collection = dbo.collection(articleCollection)
      collection.findOne(query).then(result => {
        if (!result) {
          res.send({
            code: 1,
            msg: '获取失败'
          })
        } else {
          res.send({
            code: 0,
            data: result,
            msg: '获取成功'
          })
        }

        db.close()
      })
    })
  },
  // 删除文章
  deleteArticle (req, res) {
    MongoClient.connect(url, config, async (err, db) => {
      if (err) throw err
      const dbo = db.db('blog')
      const token = req.get('userToken')
      // 验证 token
      const vaild = await isVaildToken(dbo, token)
      const query = { _id: ObjectID(req.body.id) }
      if (!vaild) {
        res.send({
          code: 1,
          msg: 'token 失效，请重新登陆'
        })

        db.close()
        return
      }

      dbo.collection(articleCollection).deleteOne(query, err => {
        if (err) {
          res.send({
            code: 1,
            msg: '删除失败'
          })
        } else {
          res.send({
            code: 0,
            msg: '删除成功'
          })
        }

        db.close()
      })
    })
  },
  // 发表提问
  publishedProblem (req, res) {
    MongoClient.connect(url, config, async (err, db) => {
      if (err) throw err
      const dbo = db.db('blog')
      const token = req.get('userToken')
      // 验证 token
      const vaild = await isVaildToken(dbo, token)
      const collection = dbo.collection(questionCollection)
      if (!vaild) {
        res.send({
          code: 1,
          msg: 'token 失效，请重新登陆'
        })

        db.close()
        return
      }

      if (req.body.id) {
        const query = { _id: ObjectID(req.body.id) }
        const body = req.body
        const updateContent = {
          $set: {
            questionTitle: body.questionTitle,
            questionContent: body.questionContent,
            username: body.username
          }
        }

        collection.updateOne(query, updateContent, err => {
          if (err) {
            res.send({
              code: 1,
              msg: '更新失败'
            })
          } else {
            res.send({
              code: 0,
              data: '更新成功'
            })
          }
          db.close()
        })
      } else {
        const date = (new Date()).getTime()
        const questionData = {
          ...req.body,
          date: date
        }

        collection.insertOne(questionData, err => {
          if (err) {
            res.send({
              code: 1,
              msg: '发布失败'
            })
          } else {
            res.send({
              code: 0,
              data: '发布成功'
            })
          }

          db.close()
        })
      }
    })
  },
  // 查询问题
  fetchAllProblem (req, res) {
    MongoClient.connect(url, config, (err, db) => {
      if (err) throw err
      const dbo = db.db('blog')
      const query = req.query
      const queryObj = {}
      const collection = dbo.collection(questionCollection)

      if (query.username) {
        queryObj.username = query.username
      }
      collection.find(queryObj).count((err, num) => {
        if (err) throw err
        collection.find(queryObj).sort({'date': -1}).toArray((err, result) => {
          if (err) {
            res.send({
              code: 1,
              msg: '查找失败',
              data: []
            })
          } else {
            res.send({
              code: 0,
              data: result,
              total: num
            })
          }

          db.close()
        })
      })
    })
  },
  // 删除问题
  deleteProblem (req, res) {
    MongoClient.connect(url, config, async (err, db) => {
      if (err) throw err
      const dbo = db.db('blog')
      const token = req.get('userToken')
      // 验证 token
      const vaild = await isVaildToken(dbo, token)
      const query = { _id: ObjectID(req.body.id) }
      const queryObj = { questionId: req.body.id }
      if (!vaild) {
        res.send({
          code: 1,
          msg: 'token 失效，请重新登陆'
        })

        db.close()
        return
      }

      dbo.collection(questionCollection).deleteOne(query, err => {
        if (err) {
          res.send({
            code: 1,
            msg: '删除失败'
          })
        } else {
          delReply(queryObj)
          res.send({
            code: 0,
            msg: '删除成功'
          })
        }

        db.close()
      })
    })
  },
  // 根据_id获取问题
  fetchProblemContentById (req, res) {
    MongoClient.connect(url, config, (err, db) => {
      if (err) throw err
      const dbo = db.db('blog')
      const query = { _id: ObjectID(req.query.id) }
      const collection = dbo.collection(questionCollection)
      collection.findOne(query).then(result => {
        if (!result) {
          res.send({
            code: 1,
            msg: '获取失败'
          })
        } else {
          res.send({
            code: 0,
            data: result,
            msg: '获取成功'
          })
        }

        db.close()
      })
    })
  },
  // 发表回复
  publishedReply (req, res) {
    MongoClient.connect(url, config, async (err, db) => {
      if (err) throw err
      const dbo = db.db('blog')
      const token = req.get('userToken')
      // 验证 token
      const vaild = await isVaildToken(dbo, token)
      const collection = dbo.collection(replyCollection)
      if (!vaild) {
        res.send({
          code: 1,
          msg: 'token 失效，请重新登陆'
        })

        db.close()
        return
      }

      if (req.body.id) {
        const query = { _id: ObjectID(req.body.id) }
        const body = req.body
        const updateContent = {
          $set: {
            content: body.content
          }
        }

        collection.updateOne(query, updateContent, err => {
          if (err) {
            res.send({
              code: 1,
              msg: '更新失败'
            })
          } else {
            res.send({
              code: 0,
              data: '更新成功'
            })
          }
          db.close()
        })
      } else {
        const date = (new Date()).getTime()
        const replyData = {
          ...req.body,
          date: date
        }

        collection.insertOne(replyData, err => {
          if (err) {
            res.send({
              code: 1,
              msg: '发布失败'
            })
          } else {
            getReplyNum({questionId: req.body.id})
            res.send({
              code: 0,
              data: '发布成功',
              total: totalReply
            })
          }
          db.close()
        })
      }
    })
  },

  // 查询回复
  fetchAllReply (req, res) {
    MongoClient.connect(url, config, (err, db) => {
      if (err) throw err
      const dbo = db.db('blog')
      const query = { questionId: req.query.id }
      const collection = dbo.collection(replyCollection)
      collection.find(query).count((err, num) => {
        if (err) throw err
        collection.find(query).sort({'date': -1}).toArray((err, result) => {
          if (err) {
            res.send({
              code: 1,
              msg: '查找失败',
              data: []
            })
          } else {
            res.send({
              code: 0,
              data: result,
              total: num
            })
          }

          db.close()
        })
      })
    })
  },

  // 点赞功能
  giveLike (req, res) {
    MongoClient.connect(url, config, async (err, db) => {
      if (err) throw err
      const dbo = db.db('blog')
      const token = req.get('userToken')
      // 验证 token
      const vaild = await isVaildToken(dbo, token)
      const collection = dbo.collection(articleCollection)
      if (!vaild) {
        res.send({
          code: 1,
          msg: 'token 失效，请重新登陆'
        })

        db.close()
        return
      }

      const query = { _id: ObjectID(req.body.id) }
      const body = req.body
      if (body.liked) {
        likedContent = {
          $pull: {
            likes: body.username
          }
        }
      } else {
        likedContent = {
          $push: {
            likes: body.username
          }
        }
      }
      collection.updateOne(query, likedContent, err => {
        if (err) {
          res.send({
            code: 1,
            msg: '更新失败'
          })
        } else {
          res.send({
            code: 0,
            data: '更新成功'
          })
        }
        db.close()
      })
    })
  },
  fetchTagsData (req, res) {
    if (tagsCacheData.length && !isTagsChange) {
      res.send({
        code: 0,
        data: tagsCacheData
      })

      return
    }

    updateTagsData(res)
  },

  fetchTagsArtilesData (req, res) {
    if (!tagsCacheData.length) {
      res.send({
        code: 0,
        msg: '没有标签数据',
        data: []
      })

      return
    }

    if (!isTagsChange) {
      res.send({
        code: 0,
        data: tagsArticlesCacheData
      })

      return
    }

    isTagsChange = false
    searchTagsArticlesData(res)
  },

  login (req, res) {
    MongoClient.connect(url, config, (err, db) => {
      if (err) throw err
      const dbo = db.db('blog')
      const { user, password } = req.body
      const collection = dbo.collection('user')
      collection.findOne({ user, password }).then(result => {
        if (!result) {
          res.send({
            code: 1,
            msg: '没有查询到该用户'
          })
        } else {
          const token = generateToken(user)
          const updateContent = {
            $set: {
              token
            }
          }

          collection.updateOne({ user, password }, updateContent, err => {
            if (err) {
              res.send({
                code: 1,
                msg: '登陆失败，请重试'
              })
            } else {
              res.send({
                code: 0,
                data: token
              })
            }

            db.close()
          })
        }
      })
    })
  },
  loginOut (req, res) {
    MongoClient.connect(url, config, (err, db) => {
      if (err) throw err
      const dbo = db.db('blog')
      const user = req.body.user
      const collection = dbo.collection('user')
      collection.findOne({user: user}).then(result => {
        if (!result) {
          res.send({
            code: -1,
            msg: '没有查询到该用户'
          })
        } else {
          const updateContent = {
            $unset: {
              token: 1
            }
          }
          collection.updateOne({user: user}, updateContent, err => {
            if (err) {
              res.send({
                code: 1,
                msg: '退出登录失败'
              })
            } else {
              res.send({
                code: 0,
                msg: '退出登录成功'
              })
            }
            db.close()
          })
        }
      })
    })
  },
  register (req, res) {
    MongoClient.connect(url, config, (err, db) => {
      if (err) throw err
      const dbo = db.db('blog')
      const userinfo = req.body
      const collection = dbo.collection('user')
      collection.findOne({user: userinfo.user}).then(result => {
        if (result) {
          res.send({
            code: -1,
            msg: '该用户已存在'
          })
        } else {
          collection.insertOne(userinfo, err => {
            if (err) {
              res.send({
                code: 1,
                msg: '注册失败'
              })
            } else {
              res.send({
                code: 0,
                msg: '注册成功'
              })
            }
            db.close()
          })
        }
      })
    })
  },
  comment (req, res) {
    MongoClient.connect(url, config, async (err, db) => {
      if (err) throw err
      const dbo = db.db('blog')
      const token = req.get('userToken')
      // 验证 token
      const vaild = await isVaildToken(dbo, token)
      const collection = dbo.collection(commentCollection)
      if (!vaild) {
        res.send({
          code: 1,
          msg: 'token 失效，请重新登陆'
        })

        db.close()
        return
      }
      const date = (new Date()).getTime()
      const commentData = {
        ...req.body,
        date: date,
        reply: []
      }

      collection.insertOne(commentData, err => {
        if (err) {
          res.send({
            code: 1,
            msg: '评论失败'
          })
        } else {
          res.send({
            code: 0,
            data: date
          })
        }

        db.close()
      })
    })
  },
  commentReply (req, res) {
    MongoClient.connect(url, config, async (err, db) => {
      if (err) throw err
      const dbo = db.db('blog')
      const token = req.get('userToken')
      const query = { _id: ObjectID(req.body.commentId) }
      // 验证 token
      const vaild = await isVaildToken(dbo, token)
      const collection = dbo.collection(commentCollection)
      if (!vaild) {
        res.send({
          code: 1,
          msg: 'token 失效，请重新登陆'
        })

        db.close()
        return
      }
      const date = (new Date()).getTime()
      const replyData = {
        $push: {
          reply: {
            username: req.body.username,
            content: req.body.content,
            date
          }
        }
      }
      collection.updateOne(query, replyData, err => {
        if (err) {
          res.send({
            code: 1,
            msg: '回复失败'
          })
        } else {
          res.send({
            code: 0,
            data: '回复成功'
          })
        }
        db.close()
      })
    })
  },
  fetchComments (req, res) {
    MongoClient.connect(url, config, (err, db) => {
      if (err) throw err
      const dbo = db.db('blog')
      const query = { articleId: req.query.id }
      const collection = dbo.collection(commentCollection)
      collection.find(query).count((err, num) => {
        if (err) throw err
        collection.find(query).sort({'date': -1}).toArray((err, result) => {
          if (err) {
            res.send({
              code: 1,
              msg: '查找失败',
              data: []
            })
          } else {
            res.send({
              code: 0,
              data: result,
              total: num
            })
          }

          db.close()
        })
      })
    })
  },
  fetchVisits (req, res) {
    MongoClient.connect(url, config, (err, db) => {
      if (err) throw err
      const dbo = db.db('blog')
      const query = { user: 'admin' }
      const collection = dbo.collection('user')
      // visits 自增1
      const updateContent = {
        $inc: {
          visits: 1
        }
      }

      collection.updateOne(query, updateContent, err => {
        if (err) {
          res.send({
            code: 1,
            msg: '获取访问量失败'
          })
        } else {
          collection.findOne(query).then(result => {
            res.send({
              code: 0,
              data: result.visits
            })

            db.close()
          })
        }
      })
    })
  }
}

function initData () {
  // 更新并缓存标签数据
  updateTagsData()
  // 获取文章总数
}

// 更新标签信息
function updateTagsData (res) {
  MongoClient.connect(url, config, (err, db) => {
    if (err) throw err
    const dbo = db.db('blog')
    dbo.collection(articleCollection).find({ tags: new RegExp('') }).toArray((err, result) => {
      if (err) throw err
      let arry = []
      result.forEach(item => {
        arry.push(...item.tags)
      })

      arry = [...new Set(arry)]
      tagsCacheData = arry
      if (res) {
        res.send({
          code: 0,
          data: arry
        })
      }

      db.close()
    })
  })
}

// 搜索文章标签数据
function searchTagsArticlesData (res) {
  MongoClient.connect(url, config, (err, db) => {
    if (err) throw err
    const dbo = db.db('blog')
    const lastIndex = tagsCacheData.length - 1
    tagsArticlesCacheData = {}
    tagsCacheData.forEach((item, i) => {
      dbo.collection(articleCollection).find({ tags: item }).toArray((err, result) => {
        if (err) throw err
        tagsArticlesCacheData[item] = result.length
        if (res && i === lastIndex) {
          res.send({
            code: 0,
            data: tagsArticlesCacheData
          })
        }

        db.close()
      })
    })
  })
}

// 获取问题答复总数
function getReplyNum (query) {
  MongoClient.connect(url, config, (err, db) => {
    if (err) throw err
    const dbo = db.db('blog')
    dbo.collection(questionCollection).find(query).count((err, result) => {
      if (err) throw err
      totalReply = result
      db.close()
    })
  })
}

// 删除问题的同时删除回复内容
function delReply (query) {
  MongoClient.connect(url, config, (err, db) => {
    if (err) throw err
    const dbo = db.db('blog')
    dbo.collection(replyCollection).deleteMany(query, (err, res) => {
      if (err) throw err
      console.log('删除数据条数 ' + res.deletedCount)
      db.close()
    })
  })
}
