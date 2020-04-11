<template>
    <div class="index-container">
      <div class=index-left>
        <ul>
          <li class="article-list" v-for="(article, index) in articlelist" :key="index">
            <div class="headportrait">
              <img :src="article.headportrait" alt="用户头像" width="45" height="45">
            </div>
            <div class="article-content">
              <div class="article-title">
                <h2 :title="article.textTitle">{{article.textTitle}}</h2>
              </div>
              <div class="article-detail">
                 <div class="username">{{article.username}}</div>
                 <span class="article-tag" v-for="(tag, index) in article.tag" :key="index">{{tag}}</span>
              </div>
            </div>
            <div class="article-info">
              <div class="posttime">{{article.posttime | timeFormat}}</div>
              <div class="info-count">
                <span class="iconfont">&#xe601;</span>
                <span class="count">{{article.commentCount}}</span>
              </div>
            </div>
         </li>
       </ul>
      </div>
      <div class="index-right">
        <div class="index-info">
            <div class="author-word">
              <h2>作者</h2>
            </div>
            <div class="index-username">
                <ul>
                  <li class="author-list" v-for="(author, index) in indexAuthor" :key="index">
                    <div class="headportrait">
                      <img :src="author.headportrait" alt="用户头像" height="40" width="40">
                    </div>
                    <div class="username">{{author.username}}--{{author.likeCount}}</div>
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
            <li class="title-list" v-for="(title, index) in hostArticle" :key="index">
              <div class="title">{{title.textTitle}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    articlelist: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
  },
  data () {
    return {
      pickervalue: new Date()
    }
  },
  computed: {
    // 作者列表
    indexAuthor () {
      return this.articlelist.slice(0, 4)
    },
    indexArticle () {
      return this.handleArticleList()
    },
    hostArticle () {
      return this.articlelist.slice(0, 6)
    }
  },
  created () {
  },
  mounted () {
  },
  filters: {
    timeFormat (time) {
      let date = new Date(time)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      // let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      // let min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      // let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      // return `${year}-${month}-${day} ${hour}:${min}:${seconds}`
      // return `${year}-${month}-${day}`
      // 格式时间
      function timeWithZero (num) {
        return num > 10 ? num : '0' + num
      }
      return timeWithZero(year) + '-' + timeWithZero(month) + '-' + timeWithZero(day)
    }
  },
  methods: {
    // 文章列表
    handleArticleList () {
      return this.articlelist.sort((o1, o2) => {
        return o2.posttime - o1.posttime
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/mixin.scss';
$background: #fff;
$back_Color:#f5f5f5;
$title_Color: #3a8b96;
$username_Color: #2d5856;
$font_Color: #b1a9a9;
$box_shadow: #eee;
.index-container{
  position: relative;
  @include flex-row;
  width: 960px;
  max-width: 960px;
  margin: 20px auto 0 auto;
  .index-left{
    flex: 1;
    border: 1px solid #eee;
    background: $background;
    box-shadow: 4px -4px 2px $box_shadow;
    .article-list{
      @include flex-row;
      padding: 20px;
      border-bottom: 1px solid $back_Color;
      font-size: 0;
      .headportrait{
        width: 45px;
        margin-right: 20px;
      }
      .article-content{
        @include flex-col;
        flex: 1;
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
            @include ellipsis;
          }
        }
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
      .article-info{
        color: $font_Color;
        min-width: 60px;
        .posttime{
          height: 20px;
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
  .index-right{
    @include flex-col;
    width: 240px;
    margin-left: 16px;
    box-shadow: 4px -4px 2px $box_shadow;
    .index-info{
      background: $background;
      border: 1px solid #eee;
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
          padding: 10px;
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
      .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 100%;
      }
    }
    .index-article{
      margin-top: 20px;
      background: $background;
      .title-list{
        padding:  5px  20px;
        height: 30px;
        line-height: 30px;
        &:hover{
          background: $back_Color;
        }
        .title{
          @include ellipsis;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
