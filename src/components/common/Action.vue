<template>
    <div class="action-box">
        <div class="action-like" @click="addLikeCount">
            <span class="iconfont">&#xe60c;</span>
            <span class="count">{{count}}</span>
        </div>
        <div class="action-comment">
            <span class="iconfont">&#xe601;</span>
            <span class="text">评论</span>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Action',
  props: {
    likenum: {
      type: Number,
      default: 0
    },
    index: {
      type: Number
    }
  },
  data () {
    return {
      count: 0,
      liked: false
    }
  },
  created () {
    this.count = this.likenum
  },
  methods: {
    addLikeCount () {
      if (!this.liked) {
        this.count++
        // this.Bus.$emit('handlelike', this.count)
      } else {
        this.count--
      }
      this.liked = !this.liked
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../../assets/scss/mixin.scss';

.action-box{
  position: relative;
  @include flex-row;
  box-sizing: border-box;
  width: 100%;
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #ebebeb;
  color: rgb(131, 131, 131);
  .action-like{
    flex: 1;
    font-size: 0;
    border-right: 1px solid #ebebeb;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    .iconfont{
      padding: 5px;
      font-size: 16px;
      &:hover{
        color: #333;
      }
    }
    .count{
      font-size: 14px;
    }
  }
  .action-comment{
    flex: 1;
    font-size: 0;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    .iconfont{
      padding: 5px;
      font-size: 16px;
      &:hover{
        color: #333;
      }
    }
    .text{
      font-size: 14px;
    }
  }
}
</style>
