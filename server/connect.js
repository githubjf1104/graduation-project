var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/mydb'
var config = { useUnifiedTopology: true }
MongoClient.connect(url, config, (err, db) => {
  if (err) throw err
  var dbo = db.db('mydb')
  // 创建集合
  // dbo.createCollection('site', (err, res) => {
  //     if (err) throw err
  //     console.log('创建集合')
  //     db.close()
  // })
  var collection = dbo.collection('site')
  // 插入一条数据
  // var data = {name: '百度', url: 'www.baidu.com'}
  // var collection = dbo.collection('site')
  // collection.insertOne(data, (err, res) => {
  //     if (err) throw err
  //     console.log('文档插入成功')
  //     db.close()
  // })

  // 插入多条数据
  var data = [
    { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
    { name: 'Google', url: 'https://www.google.com', type: 'en'},
    { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
  ]
  collection.insertMany(data, (err, res) => {
    if (err) throw err
    console.log('插入文本数量 ' + res.insertedCount)
    db.close()
  })

  // 插入一个字段
  // var str = {name: '百度'}
  // var updateStr = {$set: {type: 'cn'}}
  // collection.updateOne(str, updateStr, (err, res) => {
  //     if (err) throw err
  //     console.log('插入字段成功')
  //     db.close()
  // })

  // 查询集合中的所有数据
  // collection.find({}).toArray((err, result) => {
  //     if (err) throw err
  //     console.log(result)
  //     db.close()
  // })

  // 查询指定条件的数据
  // var condition = {name: 'Facebook'}
  // collection.find(condition).toArray((err, result) => {
  //     if (err) throw err
  //     console.log(result)
  //     db.close()
  // })

  // 更新数据
  // var condition = {name: '菜鸟工具'}
  // var change = {$set: {url: 'https://www.runoob.com'}}
  // collection.updateOne(condition, change, (err, res) => {
  //     if (err) throw err
  //     console.log('文档更新成功')
  //     db.close()
  // })

  // 更新多条数据
  // var str = {type: 'en'}
  // var updateStr = {$set: {
  //     url: 'https://www.runoob.com'
  // }}
  // collection.updateMany(str, updateStr, (err, res) => {
  //     if (err) throw err
  //     console.log(res.result.nModified + '条文档被更新')
  //     db.close()
  // })

  // 删除一条数据
  // var str = {name: '菜鸟工具'}
  // collection.deleteOne(str, (err, res) => {
  //     if (err) throw err
  //     console.log('文档删除成功')
  //     db.close()
  // })

  // 删除多条数据
  // var str = {type: 'en'}
  // collection.deleteMany(str, (err, res) => {
  //     if (err) throw err
  //     console.log('删除数据条数 ' + res.deletedCount)
  //     db.close()
  // })

  // 删除集合
  // collection.drop((err,  bool) => {
  //     if (err) throw err
  //     if (bool) console.log('集合已删除')
  //     db.close()
  // })
})
