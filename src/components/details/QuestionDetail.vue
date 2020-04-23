<template>
    <div class="question-detail">
        <div class="question">
        </div>
        <div class="writ-reply"></div>
        <div class="reply-info"></div>
    </div>
</template>
<script>
export default {
  name: 'QuestionDetail'
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/mixin.scss';

.question-detail{
  @include flex-col;
  min-height: 540px;
  max-width: 960px;
  margin: 0 auto;
  margin-top: 20px;
  .question{
    min-height: 200px;
    background: #fff;
    box-shadow: 0 0 10px 1px #eee;
  }
}
</style>
