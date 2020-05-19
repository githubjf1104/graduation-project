<template>
    <div class="detail-wrapper" ref="detailWrapper">
      <div class="article-detail" ref="articleDetail">
        <div class="title">
          <h1>{{articleData.articleTitle}}</h1>
        </div>
        <div class="user-info">
            <div class="username">{{articleData.username}}</div>
            <div class="push-time">{{articleData.date | timeFormat}}</div>
        </div>
        <div class="mavon-editor">
          <mavon-editor
            class="md"
            :value="articleData.articleContent"
            :subfield = "false"
            :defaultOpen = "'preview'"
            :toolbarsFlag = "false"
            :editable="false"
            :scrollStyle="true"
            :ishljs = "true"
          ></mavon-editor>
        </div>
        <div class="tags">
          <span v-for="(tag, index) in articleData.articleTags"
                :key="index">
                {{tag}}
          </span>
        </div>
        <div class="left-panel">
          <vPanel
            :likes="articleData.likes"
            :total='total'
            :username="articleData.username"
            :articleid="articleData._id"
            @addlike="addLike"
            @reducelike="reduceLike">
          </vPanel>
        </div>
      </div>
      <div class="comment">
        <div class="header">评论</div>
        <div class="content">
          <div class="username">{{username}}</div>
          <div class="v-comment">
            <v-comment
              :articleid="articleData._id"
              @commentinfo="getCommentData">
            </v-comment>
          </div>
        </div>
      </div>
      <div class="comment-list">
        <ul>
          <li class="comment-info" v-for="(item, index) in commentsData" :key="index">
            <div class="username" @click="handleToPersonalDetail(item.username)">{{item.username}}</div>
            <div class="comment-content">{{item.comment}}</div>
            <div class="opration">
              <span class="time">{{item.date | timeFormat}}</span>
              <span class="comment" @click="handleShowComment(index)"><i class="iconfont">&#xe601;</i>回复({{item.reply.length}})</span>
            </div>
            <div class="write-comment" v-if="showComment && flag===index">
              <v-comment
                @inputblur="hiddeComment"
                :commentid="item._id"
                @commentinfo="getCommentData">
              </v-comment>
            </div>
            <ul class="reply-list" v-if="item.reply.length">
              <li class="reply-info" v-for="(reply, index) in item.reply" :key="index">
                <div class="username">{{reply.username}}</div>
                <div class="reply-content">
                    <span class="word">回复</span>
                   <div class="author">{{item.username}}:</div>
                   <div class="content">{{reply.content}}</div>
                </div>
                <div class="date">{{reply.date | timeFormat}}</div>
              </li>
            </ul>
          </li>
        </ul>
        <div class="no-data">
          <no-data :datalength="commentsData.length"></no-data>
        </div>
      </div>
    </div>
</template>
<script>
import vPanel from '@/components/common/Panel.vue'
import vComment from '@/components/comment/Comment.vue'
import noData from '@/components/common/noData.vue'
import { fetchComments } from '@/api/index'

export default {
  name: 'Detail',
  components: {
    vPanel,
    vComment,
    noData
  },
  created () {
    this.articleData = this.$route.params.articleData
    if (this.articleData) {
      localStorage.setItem('articleData', JSON.stringify(this.articleData))
    } else {
      this.articleData = JSON.parse(localStorage.getItem('articleData'))
    }
    this.username = localStorage.getItem('username')
    this.getCommentData()
  },
  mounted () {
    let str = this.$route.params.str
    // let height = this.$refs.articleDetail.offsetHeight
    if (str === 'comment') {
      this.$refs.articleDetail.scrollIntoView({ behavior: 'smooth' })
    }
  },
  data () {
    return {
      articleData: {},
      commentsData: [],
      showComment: false,
      username: '',
      flag: -1,
      total: 0
    }
  },
  filters: {},
  methods: {
    getCommentData () {
      fetchComments(this.articleData._id).then(res => {
        if (res.data.code === 0 && res.status === 200) {
          this.commentsData = res.data.data
          this.total = res.data.total
        } else {
          this.$message.error('获取失败')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('获取失败')
      })
    },
    // 转到用户个人中心
    handleToPersonalDetail (name) {
      this.$router.push({name: 'PersonArticle', params: {username: name}})
    },
    hiddeComment () {
      this.showComment = false
      this.flag = -1
    },
    handleShowComment (index) {
      this.showComment = true
      this.flag = index
    },
    addLike (name) {
      this.articleData.likes.push(name)
    },
    reduceLike (name) {
      var index = this.articleData.likes.indexOf(name)
      if (index !== -1) {
        this.articleData.likes.splice(index, 1)
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import '@/assets/scss/mixin.scss';
.detail-wrapper{
  max-width: 960px;
  min-height: 540px;
  margin: 0 auto;
  margin-top: 20px;
  background: rgb(251, 251, 251);
  box-shadow: 0 0 10px 0 #d8d5d5;
  .article-detail{
    @include flex-col;
    .title{
      padding: 20px 25px;
      line-height: 30px;
      font-size: 25px;
      h1{
        font-weight: 700;
        color: #24292E;
      }
    }
    .user-info{
      height: 80px;
      padding: 20px 25px;
      box-sizing: border-box;
      font-size: 0;
      border-bottom: 1px solid #eee;
      .username{
        font-size: 20px;
        font-weight: bold;
        color: #000;
        cursor: pointer;
      }
      .push-time{
        font-size: 14px;
        line-height: 24px;
        color: #909090;
      }
    }
    .mavon-editor{
      flex: 1;
      .markdown-body{
        z-index: 0;
      }
      // .markdown-body * {
      //   background: #fff!important;
      // }
      .v-note-wrapper.shadow {
          box-shadow: none!important;
        }
      }
    .tags{
      @include flex-row;
      text-align: center;
      padding: 15px 25px;
      font-size: 18px;
      span{
        display: inline-block;
        padding: 0 5px;
        min-width: 80px;
        height: 30px;
        line-height: 30px;
        border-radius: 10px;
        background: #528AAA;
        text-align: center;
        color: #fff;
        cursor: pointer;
        margin-right: 5px;
        &:hover{
          box-shadow: 0px 0px 10px rgb(137, 185, 212) inset;
        }
      }
    }
    .left-panel{
      position: fixed;
      top: 200px;
      margin-left: -80px;;
      width: 60px;
    }
  }
  .comment{
    padding: 0 15px;
    .header{
      text-align: center;
      font-size: 20px;
    }
    .content{
      @include flex-row;
      margin-top: 20px;
      .username{
        min-width: 100px;
        text-align: center;
        line-height: 30px;
        font-size: 20px;
      }
      .v-comment{
        flex: 1;
        width: 0;
      }
    }
  }
  .comment-list{
    max-width: 700px;
    margin: 20px auto;
    .comment-info{
      border-bottom: 1px solid #eee;
      padding-bottom: 20px;
      .username{
        font-size: 16px;
        line-height: 20px;
        margin-bottom: 10px;
        cursor: pointer;
      }
      .comment-content{
        font-size: 16px;
        max-width: 600px;
        word-wrap: break-word;
        line-height: 14px;
        margin-bottom: 10px;
      }
      .opration{
        @include flex-row;
        justify-content: space-between;
        font-size: 0;
        color: #b2bac2;
        .time{
          font-size: 12px;
        }
        .comment{
          font-size: 12px;
          cursor: pointer;
          .iconfont{
            padding: 0 5px;
            margin-right: 5px;
          }
        }
      }
      .write-comment{
        margin-top: 20px;
      }
      .reply-list{
        padding:10px 20px;
        margin-top: 10px;
        border-radius: 10px;
        background: #f5f5f5;
        .reply-info{
          border-bottom: 1px solid #eee;
          .username{
            font-size: 14px;
          }
          .reply-content{
            margin-top: 5px;
            @include flex-row;
            font-size: 14px;
            .word{
              min-width: 30px;
            }
            .author{
              margin-right: 10px;
            }
            .content{
              flex: 1;
              width: 0;
              word-wrap: break-word;
              line-height: 16px;
            }
          }
          .date{
            margin-top: 10px;
            color: #909090;
          }
        }
      }
    }
    .no-data{
      width: 100%;
    }
  }
}
@media screen and (max-width: 767px){
  .detail-wrapper{
    .article-detail{
      .left-panel{
        position: relative;
        margin-top: 20px;
        margin-left: 0;
        top: 0;
        width: 100%;

      }
    }
  }
}
</style>
