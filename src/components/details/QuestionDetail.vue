<template>
    <div class="question-detail">
        <div class="question">
          <div class="title">{{questionDetailData.questionTitle}}</div>
          <div class="content">
            <mavon-edit :content="questionDetailData.questionContent"></mavon-edit>
          </div>
          <div class="operation">
            <span class="username">{{questionDetailData.username}}</span>
            <div class="reply" @click="handleShowReply"><i class="iconfont">&#xe61b;</i>写回答</div>
         </div>
        </div>
        <div class="write-reply" v-if="showRely">
          <div class="username">{{name}}</div>
          <div class="mavon-edit">
            <mavon-editor v-model="replycontent"
              ref="md"
              :ishljs = "true"
              :subfield = "false"
              @change="change"/>
          </div>
            <div class="btn">
              <button @click="handlePushReply(questionDetailData._id)">提交</button>
            </div>
        </div>
        <div class="reply-list">
          <div class="reply-num"><i class="iconfont">&#xe601;</i>{{replyData.length}}个回答</div>
          <ul class="reply-info">
            <li class="reply-item" v-for="(item, index) in replyData" :key="index">
              <div class="username">{{item.username}}</div>
              <div class="reply-content">
                <mavon-edit :content="item.content"></mavon-edit>
              </div>
              <div class="date">{{item.date | timeFormat}}</div>
            </li>
          </ul>
        </div>
    </div>
</template>
<script>
import mavonEdit from '@/components/common/mavonEdit.vue'
import { publishedReply, fetchAllReply } from '@/api/index'

export default {
  name: 'QuestionDetail',
  components: {
    mavonEdit
  },
  data () {
    return {
      questionDetailData: {},
      replyData: [],
      replycontent: '',
      name: '',
      html: '',
      showRely: '',
      questionId: ''
    }
  },
  created () {
    this.name = localStorage.getItem('username')
    let data = this.$route.params.questionDetailData
    if (data) {
      localStorage.setItem('question', JSON.stringify(data))
    } else {
      data = JSON.parse(localStorage.getItem('question'))
    }
    this.questionDetailData = data
    this.questionId = data._id
  },
  mounted () {
    this.getReplyData()
  },
  methods: {
    change (value, render) {
      this.html = render
    },
    handleShowReply () {
      this.showRely = true
    },
    // 获取回复数据
    getReplyData () {
      fetchAllReply(this.questionId).then(res => {
        if (res.data.code === 0 && res.status === 200) {
          this.replyData = res.data.data
        } else {
          this.$message.error('获取失败')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('获取失败')
      })
    },
    // 发表回复
    handlePushReply (id) {
      let replyObj = {
        questionId: id,
        content: this.html,
        username: this.name
      }
      publishedReply(replyObj).then(res => {
        if (res.data.code === 0 && res.status === 200) {
          this.getReplyData()
          this.$message.success('发表成功')
          this.replycontent = ''
        } else {
          this.$message.error('发表失败')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('发表失败')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/mixin.scss';

.question-detail{
  @include flex-col;
  min-height: 500px;
  max-width: 960px;
  margin: 0 auto;
  margin-top: 20px;
  .question{
    min-height: 150px;
    padding: 24px;
    background: #fff;
    box-shadow: 0 0 10px 1px #eee;
    .title{
      line-height: 20px;
      font-size: 20px;
      font-weight: bold;
    }
    .content{
      margin-top: 20px;
      font-size: 16px;
      line-height: 16px;
    }
    .operation{
      @include flex-row;
      margin-top: 10px;
      font-size: 16px;
      line-height: 25px;
      .username{
        margin-right: 20px;
      }
      .reply{
        padding: 0 10px;
        margin-right: 20px;
        border-radius: 5px;
        border: 1px solid #528aaa;
        cursor: pointer;
        &:hover{
          background: #528aaa;
          color: #fff;
        }
      }
    }
  }
  .write-reply{
    margin-top: 20px;
    padding: 24px;
    background: #fff;
    box-shadow: 0 0 10px 1px #eee;
    .username{
      line-height: 20px;
      font-size: 20px;
      font-weight: bold;
      padding-bottom: 10px;
    }
    .mavon-edit{
      border-bottom: 1px solid #eee;
      margin-bottom: 20px;
      .markdown-body{
        z-index: 0;
        min-height: 250px!important;
      }
      .v-note-wrapper.shadow {
        box-shadow: none!important;
      }
    }
    .btn{
      @include flex-row;
      justify-content: flex-end;
      button{
        font-size: 20px;
        line-height: 25px;
        width: 80px;
        padding: 0 5px;
        border: 1px solid #528aaa;
        border-radius: 5px;
        cursor: pointer;
        text-align: center;
        &:hover{
          background: #528aaa;
          color: #fff;
        }
      }
    }
  }
  .reply-list{
    margin-top: 20px;
    padding: 24px;
    background: #fff;
    box-shadow: 0 0 10px 1px #eee;
    .reply-num{
      padding-bottom: 10px;
      line-height: 20px;
      border-bottom: 1px solid #eee;
      font-size: 20px;
      font-weight: bold;
      .iconfont{
        padding: 0 5px;
        color: #6d6a6a;
        cursor: pointer;
      }
    }
    .reply-info{
      margin-top: 10px;
      .reply-item{
        position: relative;
        margin-top: 10px;
        border-bottom: 1px solid #eee;
        .username{
          font-size: 20px;
          font-weight: bold;
        }
        .reply-content{
          margin-top: 10px;
        }
        .date{
          position: absolute;
          right: 10px;
          bottom: 10px;
          font-size: 16px;
        }
      }
    }
    .reply-info{
      min-height: 160px;
    }
  }
}
</style>
