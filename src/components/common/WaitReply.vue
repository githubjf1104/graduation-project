<template>
  <div class="wait-reply">
      <div class="header">问题</div>
      <ul class="question-info">
        <li class="question-item" v-for="(item, index) in problemdata" :key="index">
          <div class="box">
              <v-box></v-box>
            </div>
            <div class="question" @click="handleToQuestionDetail(item._id)">{{item.questionTitle}}</div>
            <div class="content" v-show="showcontent">{{item.questionContent | handleContentHTML}}</div>
            <div class="reply">
              <span class="username" @click="handleToPersonalDetail(item.username)" v-show="!showcontent">{{item.username}}</span>
              <div class="reply-btn" @click="handleToQuestionDetail(item._id)"><i class="iconfont">&#xe61b;</i>写回答</div>
              <div class="date">{{item.date | timeFormat}}</div>
              <div class="operation" v-show="showcontent && showEmpty">
                <span @click="handleDelQustion(item._id)"><i class="iconfont">&#xe64c;</i>删除</span>
              </div>
              <!-- <div class="rely-num">{{replyNum}}个回答</div> -->
            </div>
        </li>
      </ul>
  </div>
</template>
<script>
import vBox from '@/components/common/Box.vue'
import { deleteProblem, fetchProblemContentById } from '@/api/index'
export default {
  name: 'PersonQuestion',
  components: {
    vBox
  },
  props: {
    username: {
      type: String
    },
    problemdata: {
      type: Array
    },
    showcontent: {
      type: Boolean
    }
  },
  created () {
    this.showEmpty = this.username === localStorage.getItem('username')
  },
  data () {
    return {
      showEmpty: true,
      replyNum: 0
    }
  },
  methods: {
    // 转到用户个人中心
    handleToPersonalDetail (name) {
      this.$router.push({name: 'PersonArticle', params: {username: name}})
    },
    // 删除问题
    handleDelQustion (id) {
      deleteProblem({
        id: id
      }).then(res => {
        if (res.data.code === 0 && res.status === 200) {
          this.$confirm('是否确定删除此问题?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message.success('删除成功')
            this.$emit('delproblem')
          })
        } else {
          this.$message.error('删除失败')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('删除失败')
      })
    },
    handleToQuestionDetail (id) {
      fetchProblemContentById(id).then(res => {
        if (res.data.code === 0 && res.status === 200) {
          this.$router.push({name: 'QuestionDetail', params: {questionDetailData: res.data.data}})
        } else {
          this.$message.error('获取失败')
        }
      }).catch(err => {
        console.log(err)
        this.$message.error('获取失败')
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import '@/assets/scss/mixin.scss';

.wait-reply{
  @include flex-col;
  // padding: 0 20px;
  .header{
    height: 20px;
    line-height: 20px;
    padding-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid #eee;
  }
  .question-info{
    flex: 1;
    .question-item{
      padding: 10px 0;
    //   width: 90%;
      border-bottom: 1px solid #eee;
      .box{
        display: inline-block;
      }
      .question{
        display: inline-block;
        vertical-align: middle;
        max-width: 350px;
        margin-left: 20px;
        line-height: 30px;
        font-size: 20px;
        font-weight: bold;
        color: #000;
        @include ellipsis;
        cursor: pointer;
      }
      .content{
        @include multi-text;
        margin-top: 5px;
        padding-right: 20px;
        line-height: 20px;
        max-height: 60px;
        font-size: 14px;
        cursor: pointer;
        &:hover{
          color: #7d7878;
        }
      }
      .reply{
        position: relative;
        @include flex-row;
        margin-top: 15px;
        .username{
          font-size: 16px;
          line-height: 25px;
          margin-right: 20px;
          cursor: pointer;
        }
        .reply-btn{
          padding: 0 5px;
          line-height: 25px;
          border-radius: 10px;
          font-size: 16px;
          color: #528aaa;
          margin-right: 30px;
          cursor: pointer;
          &:hover{
            border: 1px solid #528aaa;
            background: #eee;
          }
        }
        .date{
          line-height: 25px;
          font-size: 16px;
        }
        .operation{
          font-size: 0;
          padding-left: 20px;
          span{
            display: inline-block;
            padding: 0 10px;
            line-height: 25px;
            font-size: 16px;
            cursor: pointer;
            border: 1px solid #eee;
            border-radius: 5px;
            &:hover{
              border: 1px solid #528aaa;
              box-shadow: inset 0 0 10px 1px #eee;
              color: #528aaa;
            }
            .iconfont{
              margin-right: 10px;
            }
          }
        }
        .rely-num{
          position: absolute;
          right: 40px;
          line-height: 25px;
          font-size: 16px;
        }
      }
    }
  }
}
@media screen and (max-width: 375px){
  .question-info{
    .question-item{
      .question{
        max-width: 280px!important;
        margin-left: 0!important;
      }
    }
  }
}
</style>
