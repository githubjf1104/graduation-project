<template>
    <div class="action-box">
        <div class="action-like" @click="addLikeCount">
            <span class="iconfont" :class="{'like': liked}">&#xe60c;</span>
            <span class="count">{{likes.length}}</span>
        </div>
        <div class="action-comment">
            <span class="iconfont">&#xe601;</span>
            <span class="text">评论</span>
        </div>
    </div>
</template>
<script>
import { giveLike } from '@/api/index'

export default {
  name: 'Action',
  props: {
    likes: {
      type: Array
    },
    articleid: {
      type: String
    },
    username: {
      type: String
    }
  },
  data () {
    return {
      liked: false,
      name: ''
    }
  },
  created () {
    this.name = localStorage.getItem('username')
    if (this.likes.indexOf(this.name) !== -1) {
      this.liked = true
    }
  },
  methods: {
    addLikeCount () {
      if (!this.liked || this.liked === []) {
        this.handleGiveLike().then(() => {
          this.Bus.$emit('increaselike')
        })
      } else {
        this.handleGiveLike().then(() => {
          this.Bus.$emit('decreaselike')
        })
      }
      this.liked = !this.liked
    },
    handleGiveLike () {
      let likeObj = {
        id: this.articleid,
        username: localStorage.getItem('username'),
        liked: this.liked
      }
      return giveLike(likeObj).then(res => {
      })
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
      &.like{
        color: #528aaa;
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
