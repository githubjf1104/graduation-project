<template>
  <div class="wait-reply">
      <div class="header">问题</div>
      <ul class="question-info">
        <li class="question-item">
          <div class="box">
            <v-box></v-box>
          </div>
          <div class="question">title</div>
          <div class="reply">
            <div class="reply-btn"><i class="iconfont">&#xe61b;</i>写回答</div>
            <div class="date">2021-4-21</div>
            <div class="rely-num">0个回答</div>
         </div>
        </li>
      </ul>
  </div>
</template>
<script>
import vBox from '@/components/common/Box.vue'
export default {
  name: 'waitReply',
  components: {
    vBox
  }
}
</script>
<style lang='scss' scoped>
@import '../../../assets/scss/mixin.scss';

.wait-reply{
  @include flex-col;
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
      padding: 20px 0;
      width: 90%;
      border-bottom: 1px solid #eee;
      .box{
        display: inline-block;
      }
      .question{
        display: inline-block;
        vertical-align: middle;
        margin-left: 20px;
        line-height: 30px;
        font-size: 20px;
        font-weight: bold;
        color: #000;
        @include ellipsis;
        cursor: pointer;
      }
      .reply{
        position: relative;
        @include flex-row;
        margin-top: 15px;
        .reply-btn{
          line-height: 25px;
          // border: 1px solid #528aaa;
          border-radius: 10px;
          font-size: 16px;
          color: #528aaa;
          margin-right: 30px;
          cursor: pointer;
          &:hover{
            background: #eee;
          }
        }
        .date{
          line-height: 25px;
          font-size: 16px;
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
</style>
