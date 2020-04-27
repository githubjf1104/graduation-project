<template>
    <div class="panel">
        <div class="btn-like">
            <span class="iconfont" @click="handleLikes" :class="{'like': liked}">&#xe60c;</span>
            <span class="like-count">{{likes.length}}</span>
        </div>
        <div class="btn-comment">
            <span class="iconfont">&#xe601;</span>
            <span class="comment-count">{{total}}</span>
        </div>
        <div class="btn-collect">
            <span class="iconfont">&#xe600;</span>
            <span class="collect-count">0</span>
        </div>
    </div>
</template>
<script>
import { giveLike } from '@/api/index'
// import action from '@/components/common/Action'

export default {
  name: 'panel',
  // mixins: [action],
  props: {
    likes: {
      type: Array
    },
    commentNum: {
      type: Number
    },
    username: {
      type: String
    },
    articleid: {
      type: String
    },
    total: {
      type: Number
    }
  },
  computed: {
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
    handleLikes () {
      if (!this.liked || this.likes === []) {
        this.handleGiveLike().then(() => {
          this.$emit('addlike', this.name)
        })
      } else {
        this.handleGiveLike().then(() => {
          this.$emit('reducelike', this.name)
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
$panel_back: #fff;
$panel_Color: #b2bac2;
$panel_shadow: rgba(0, 0, 0,.04);
.panel{
  .btn-like, .btn-comment, .btn-collect{
    position: relative;
    height: 35px;
    width: 35px;
    border-radius: 50%;
    background: $panel_back;
    text-align: center;
    line-height: 35px;
    color: $panel_Color;
    font-size: 0;
    box-shadow: 0 2px 4px 0 $panel_shadow;
    margin-bottom: 20px;
    .iconfont{
      padding: 5px;
      font-size: 18px;
      cursor: pointer;
      &:hover{
          color: rgb(90, 90, 90);
      }
      &.like{
        color: #528aaa;
      }
    }
    .like-count, .comment-count, .collect-count{
      position: absolute;
      top: 0;
      left: 75%;
      display: inline-block;
      height: 15px;
      min-width: 30px;
      line-height: 17px;
      padding: 0 3px;
      font-size: 12px;
      color: $panel_back;
      background: $panel_Color;
      border-radius: 10px;
      transform-origin: left top;
      transform: scale(.75);
      cursor: pointer;
    }
  }
}
</style>
