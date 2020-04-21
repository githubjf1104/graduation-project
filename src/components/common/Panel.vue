<template>
    <div class="panel">
        <div class="btn-like">
            <span class="iconfont">&#xe60c;</span>
            <span class="like-count">{{likeNum}}</span>
        </div>
        <div class="btn-comment">
            <span class="iconfont">&#xe601;</span>
            <span class="comment-count">{{commentNum}}</span>
        </div>
        <div class="btn-collect">
            <span class="iconfont">&#xe600;</span>
            <span class="collect-count">110</span>
        </div>
    </div>
</template>
<script>
export default {
  name: 'panel',
  props: {
    likeNum: {
      type: Number
    },
    commentNum: {
      type: Number
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
