<template>
    <div class="index-container" v-loading="loading">
      <div class="index-left">
        <ul class="list-ul">
          <li class="article-list" v-for="(article, index) in articleList" :key="index">
            <div class="article-content">
              <div class="article-title" @click="getCurrentArticleContent(article._id, 'title')">
                <h2 :title="article.articleTitle">{{article.articleTitle}}</h2>
              </div>
              <div class="content-detail" @click="getCurrentArticleContent(article._id, 'content')">{{article.articleContent | handleContentHTML}}</div>
              <div class="article-detail">
                 <div class="username" @click="handleToPersonalDetail(article.username)">{{article.username}}</div>
                 <span class="article-tag" v-for="(tag, index) in article.articleTags" :key="index">{{tag}}</span>
              </div>
            </div>
            <div class="article-info">
              <div class="posttime">{{article.date | timeFormat}}</div>
              <div class="info-count">
                <span class="iconfont" @click="getCurrentArticleContent(article._id, 'comment')">&#xe601;</span>
                <span class="count"></span>
              </div>
            </div>
         </li>
       </ul>
       <div class="no-data">
         <no-data :datalength="articleList.length"></no-data>
       </div>
       <div class="paganation">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
       </div>
      </div>
      <div class="index-right">
        <div class="index-info">
            <div class="author-word">
              <h2>作者</h2>
            </div>
            <div class="index-username">
                <ul>
                  <li class="author-list" v-for="(author, index) in authorList" :key="index">
                    <div class="username" @click="handleToPersonalDetail(author.user)">{{author.user}}</div>
                  </li>
                </ul>
                <div class="all-list"><span>榜单</span><i class="iconfont">&#xe70c;</i></div>
            </div>
        </div>
        <div class="index-calendar">
            <el-date-picker
              v-model="pickervalue"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
        </div>
        <div class="index-article" ref="index-article">
          <div class="hotarticle-list"></div>
          <ul>
            <li class="title-list" v-for="(item, index) in hostArticle" :key="index">
              <div class="title" @click="getCurrentArticleContent(item._id)">{{item.articleTitle}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
<script>
import { fetchAllArticles, fetchArticleContentById } from '@/api/index'
import noData from '@/components/common/noData.vue'

export default {
  name: 'Index',
  props: {
  },
  components: {
    noData
  },
  data () {
    return {
      articleList: [],
      authorList: [],
      hostArticle: [],
      pageSize: 6,
      currentPage: 1,
      total: 0,
      searchContent: '',
      loading: false,
      pickervalue: new Date()
    }
  },
  computed: {},
  created () {
    this.getAllArticles()
    // this.getAllUser()
    this.Bus.$on('handlesearch', content => {
      this.searchContent = content
      this.currentPage = 1
      this.getAllArticles()
    })
  },
  mounted () {
  },
  filters: {},
  methods: {
    // 处理侧边栏显示作者数据
    handleSliderAuthor () {
      // 拆分为{a:[]}
      let articleData = {}
      this.articleList.forEach(item => {
        if (articleData[item.username] === undefined) {
          articleData[item.username] = [item]
        } else {
          this.$set(articleData[item.username], articleData[item.username].length, item)
        }
      })
      // 拆分为[{a:[]}]
      let list = []
      for (let key in articleData) {
        list.push({
          user: key,
          articles: articleData[key]
        })
      }
      list = list.sort((a, b) => {
        return b.articles.length - a.articles.length
      })
      this.authorList = list.slice(0, 4)
    },
    // 处理侧边栏文章列表显示
    handleSliderArticle () {
      let article = []
      article = this.articleList.sort((o1, o2) => {
        return o2.likes.length - o1.likes.length
      })
      this.hostArticle = article.slice(0, 5)
    },
    // 分页
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.currentPage = 1
      this.getAllArticles()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getAllArticles()
    },
    // 获取选择文章内容
    getCurrentArticleContent (id, str) {
      fetchArticleContentById(id).then(res => {
        if (res.data.code === 0 && res.status === 200) {
          this.$router.push({name: 'Detail', params: {articleData: res.data.data, str: str}})
        }
      }).catch(() => {
        this.$message.info('获取文章内容失败')
      })
    },
    // 查询所有文章
    getAllArticles () {
      this.loading = true
      fetchAllArticles({
        articleTitle: this.searchContent,
        pageSize: this.pageSize,
        currentPage: this.currentPage
      }).then(res => {
        // console.log(res)
        if (res.data.code === 0 && res.status === 200) {
          this.articleList = res.data.data
          this.total = res.data.total
          this.loading = false
          this.handleSliderAuthor()
          this.handleSliderArticle()
        }
      }).catch(() => {
        this.loading = false
      })
    },
    // 查询所有用户
    // getAllUser () {
    //   fetchAllUser().then(res => {
    //     if (res.data.code === 0 && res.status === 200) {
    //       this.authorList = res.data.data
    //     } else {
    //       this.$message.error('获取用户失败')
    //     }
    //   }).catch(err => {
    //     console.log(err)
    //     this.$message.error('获取用户失败')
    //   })
    // },
    // 转到用户个人中心
    handleToPersonalDetail (name) {
      this.$router.push({name: 'PersonArticle', params: {username: name}})
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
$background: #fff;
$back_Color:#f5f5f5;
$title_Color: #3a8b96;
$username_Color: #2d5856;
$font_Color: #b1a9a9;
$box_shadow: #d8d5d5;
.index-container{
  position: relative;
  @include flex-row;
  max-width: 960px;
  margin: 20px auto 0 auto;
  .index-left{
    position: relative;
    flex: 1;
    border: 1px solid #eee;
    background: $background;
    min-height: 540px;
    box-shadow: 0px 0px 10px 0px $box_shadow;
    .list-ul{
      min-height: 510px;
      max-height: 800px;
      .article-list{
        @include flex-row;
        padding: 15px 24px;
        border-bottom: 1px solid $back_Color;
        font-size: 0;
        .article-content{
          flex: 1;
          @include flex-col;
          width: 0;
          .article-title{
            width: 80%;
            font-size: 16px;
            font-weight: 600;
            color: $title_Color;
            cursor: pointer;
            &:hover{
              color: $username_Color;
            }
            h2{
              font-size: 18px;
              @include ellipsis;
            }
          }
          .content-detail{
            font-size: 14px;
            margin: 10px 20px 0 0;
            color: rgb(117, 111, 111);
            cursor: pointer;
            @include ellipsis;
          }
          .article-detail{
            @include flex-row;
            margin-top: 14px;
            font-size: 13px;
            color: $font_Color;
            .username{
              min-width: 50px;
              margin-right: 20px;
              cursor: pointer;
              &:hover{
                color: $username_Color;
              }
            }
            .article-tag{
              min-width: 25px;
              padding: 0 5px;
            }
          }
        }
        .article-info{
          color: $font_Color;
          min-width: 60px;
          margin-top: 20px;
          .posttime{
            height: 20px;
            padding-top: 5px;
            line-height: 20px;
            font-size: 13px;
          }
          .info-count{
            padding-top: 5px;
            font-size: 0;
            color: $font_Color;
            .iconfont{
              height: 20px;
              line-height: 20px;
              padding-right: 5px;
              font-size: 16px;
              line-height: 20px;
              cursor: pointer;
              &:hover{
                color: #292828;
              }
            }
            .count{
              font-size: 14px;
            }
          }
        }
      }
    }
    .no-data{
      position: absolute;
      width: 100%;
      top: 0;
    }
    .paganation{
      @include flex-row;
      justify-content: flex-end;
    }
  }
  .index-right{
    @include flex-col;
    width: 240px;
    margin-left: 16px;
    .index-info{
      background: $background;
      border: 1px solid #eee;
      box-shadow: 1px 0px 10px 0 $box_shadow;
      .author-word{
        height: 30px;
        line-height: 30px;
        padding: 10px 0 0 10px;
        font-size: 16px;
        font-weight: 400;
      }
      .index-username{
        .author-list {
          @include flex-row;
          height: 40px;
          line-height: 40px;
          padding: 0 10px;
          cursor: pointer;
          &:first-child{
            border-top: 1px solid $back_Color;
          }
          &:last-child{
            border-bottom: 1px solid $back_Color;
          }
          &:hover{
            background: $back_Color;
          }
          .headportrait{
            height: 40px;
            width: 40px;
            border-radius: 50%;
            overflow: hidden;
          }
          .username{
            flex: 1;
            margin-left: 20px;
            font-size: 12px;
          }
        }
        .all-list{
          height: 40px;
          text-align: center;
          line-height: 40px;
          font-size: 0;
          font-weight: 400;
          color: $title_Color;
          cursor: pointer;
          span{
            font-size: 14px;
          }
          .iconfont{
            font-size: 12px;
            margin-left: 10px;
          }
        }
      }
    }
    .index-calendar{
      margin-top: 20px;
      box-shadow: 1px 0px 10px 0 $box_shadow;
      .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 100%;
      }
    }
    .index-article{
      margin-top: 20px;
      background: $background;
      box-shadow: 1px 0px 10px 0 $box_shadow;
      .title-list{
        padding:  0  20px;
        height: 30px;
        line-height: 30px;
        &:hover{
          background: $back_Color;
        }
        .title{
          border-bottom: 1px solid #eee;
          @include ellipsis;
          cursor: pointer;
        }
      }
    }
  }
}
@media screen and (max-width: 767px) {
  .index-container{
    .index-right{
      display: none !important;
    }
  }
}
</style>
