<template>
    <div class="question-wrapper">
      <div class="ask-questions">
        <div class="question-title">
          <span class="word">标题</span>
          <input class="title" type="text" v-model="questionTitle">
        </div>
        <div class="question-content">
          <div class="mavon-edit">
            <mavon-editor v-model="qustionContent"
              ref="md"
              :ishljs = "true"
              :subfield = "false"
              @change="change"/>
          </div>
          <div class="btn">
            <button @click="handlePublishProblem">发表问题</button>
          </div>
        </div>
      </div>
      <div class="question-info">
        <wait-reply :problemdata="problemData"></wait-reply>
      </div>
    </div>
</template>
<script>
import WaitReply from '@/components/common/WaitReply.vue'
import { publishedProblem, fetchAllProblem } from '@/api/index'

export default {
  name: 'AskQuestion',
  components: {
    WaitReply
  },
  data () {
    return {
      questionTitle: '',
      qustionContent: '',
      html: '',
      problemData: []
    }
  },
  created () {
  },
  mounted () {
    this.getProblemData()
  },
  methods: {
    // 所有操作都会被解析重新渲染
    change (value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render
    },
    // 发表问题
    handlePublishProblem () {
      let username = localStorage.getItem('username')
      let questionObj = {
        questionTitle: this.questionTitle,
        questionContent: this.html,
        username: username
      }
      publishedProblem(questionObj).then(res => {
        if (res.data.code === 0 && res.status === 200) {
          this.$message.success('发表成功')
          this.questionTitle = ''
          this.qustionContent = ''
          this.getProblemData()
        } else {
          this.$message.error('发表失败')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('发表失败')
      })
    },
    // 获取问题列表
    getProblemData () {
      fetchAllProblem().then(res => {
        if (res.data.code === 0 && res.status === 200) {
          this.problemData = res.data.data
        } else {
          this.$message.error('查找失败')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('查找失败')
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import '@/assets/scss/mixin.scss';

.question-wrapper{
  position: relative;
  @include flex-col;
  max-width: 960px;
  margin: 0 auto;
  padding: 24px 0;
  margin-top: 20px;
  .ask-questions{
    @include flex-col;
    background: #fff;
    padding: 20px 24px;
    box-shadow: 0 0 10px 0 #d8d5d5;
    .question-title{
      @include flex-row;
      margin-bottom: 10px;
      font-size: 0;
      .word{
        width: 100px;
        line-height: 40px;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
      }
      .title{
        flex: 1;
        height: 30px;
        line-height: 30px;
        margin-top: 5px;
        font-size: 16px;
        padding: 0 10px;
        border-radius: 10px;
        border: 1px solid #eee;
      }
    }
    .question-content{
      flex: 1;
      .mavon-edit{
        border: 1px solid #eee;
        .markdown-body{
          z-index: 0;
          min-height: 200px!important;
        }
        .v-note-wrapper.shadow {
          box-shadow: none!important;
        }
      }
      .btn{
        @include flex-row;
        justify-content: flex-end;
        margin-top: 10px;
        font-size: 20px;
        button{
          padding: 0 10px;
          border-radius: 10px;
          background: #528aaa;
          color: #fff;
          cursor: pointer;
          &:hover{
            box-shadow: 0 0 10px 0 #a5c5f8 inset;
          }
        }
      }
    }
  }
  .question-info{
    min-height: 190px;
    margin-top: 20px;
    background: #fff;
    padding: 24px;
    box-shadow: 0 0 10px 0 #d8d5d5;
  }
}
</style>
