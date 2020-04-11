<template>
    <div class="action-box">
        <div class="action-like">
            <span class="iconfont">&#xe60c;</span>
            <span class="count">0</span>
        </div>
        <div class="action-comment">
            <span class="iconfont">&#xe601;</span>
            <span class="text">评论</span>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Action'
}
</script>
<style lang='scss' scoped>
@import '../../../assets/scss/mixin.scss';

.action-box{
  position: relative;
  @include flex-row;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding: 5px 0;
  border-bottom: 1px solid #ebebeb;
  color: rgb(131, 131, 131);
  .action-like{
    flex: 1;
    font-size: 0;
    border-right: 1px solid #ebebeb;
    text-align: center;
    line-height: 29px;
    .iconfont{
      padding: 5px;
      font-size: 16px;
    }
    .count{
      font-size: 14px;
    }
  }
  .action-comment{
    flex: 1;
    font-size: 0;
    text-align: center;
    line-height: 25px;
    .iconfont{
      padding: 5px;
      font-size: 16px;
    }
    .text{
      font-size: 14px;
    }
  }
}
</style>
