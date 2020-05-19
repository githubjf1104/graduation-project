<template>
    <div class="comment-wrapper">
      <div id="comment"
        class="comment"
        @input="handleInputContent($event)"
        contenteditable="true"
        @blur="handleInput"
        @click="handleBtnshow">
      </div>
      <div class="btn" v-show="showBtn">
        <button @click="FinishedComment">评论</button>
      </div>
    </div>
</template>
<script>
import { comment, commentReply } from '@/api/index'
export default {
  name: 'Comment',
  props: {
    articleid: {
      type: String
    },
    commentid: {
      type: String
    }
  },
  data () {
    return {
      comment: '',
      showBtn: false,
      username: ''
    }
  },
  created () {
    this.username = localStorage.getItem('username')
  },
  methods: {
    handleInput () {
      if (this.comment === '') {
        this.showBtn = false
        this.$emit('inputblur')
      }
    },
    handleBtnshow () {
      this.showBtn = true
    },
    handleInputContent (event) {
      this.comment = event.target.innerText
    },
    FinishedComment () {
      if (this.articleid) {
        let commentObj = {
          articleId: this.articleid,
          comment: this.comment,
          username: this.username
        }
        comment(commentObj).then(res => {
          if (res.data.code === 0 && res.status === 200) {
            document.getElementById('comment').innerText = ''
            this.showBtn = false
            this.$emit('inputblur')
            this.$emit('commentinfo')
          } else if (res.data.code === 1) {
            this.$message.info('请先登录')
          }
        })
      } else {
        let commentsRelpy = {
          commentId: this.commentid,
          username: this.username,
          content: this.comment
        }
        commentReply(commentsRelpy).then(res => {
          if (res.data.code === 0 && res.status === 200) {
            document.getElementById('comment').innerText = ''
            this.showBtn = false
            this.$emit('inputblur')
            this.$emit('commentinfo')
          } else if (res.data.code === 1) {
            this.$message.info('请先登录')
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';

.comment-wrapper{
  max-width: 750px;
  .comment{
    min-height: 30px;
    line-height: 25px;
    padding: 0 10px;
    font-size: 14px;
    border: 1px solid #528aaa;
    outline: none;
    word-wrap: break-word;
    border-radius: 5px;
    resize: none;
  }
  .btn{
    @include flex-row;
    justify-content: flex-end;
    button{
      width: 100px;
      height: 30px;
      margin-top: 20px;
      background: #528aaa;
      border-radius: 5px;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>
