<template>
    <div class="article-detail">
      <div class="title">
        <h1>{{articleData.articleTitle}}</h1>
      </div>
      <div class="user-info">
          <div class="username">{{articleData.userName}}</div>
          <div class="push-time">{{articleData.date | timeFormat}}</div>
      </div>
      <div class="mavon-editor">
        <mavon-editor
          class="md"
          :value="articleData.articleContent"
          :subfield = "false"
          :defaultOpen = "'preview'"
          :toolbarsFlag = "false"
          :editable="false"
          :scrollStyle="true"
          :ishljs = "true"
        ></mavon-editor>
      </div>
      <div class="tags">
        <span v-for="(tag, index) in articleData.articleTags"
              :key="index">
              {{tag}}
        </span>
      </div>
      <div class="left-panel">
        <vPanel :likeNum="articleData.likeNum"
                :commentNum="articleData.comments.length"></vPanel>
      </div>
    </div>
</template>
<script>
import vPanel from '@/components/common/Panel.vue'
export default {
  name: 'Detail',
  components: {
    vPanel
  },
  created () {
    this.articleData = this.$route.params.articleData
  },
  data () {
    return {
      articleData: {}
    }
  },
  filters: {}
}
</script>
<style lang='scss' scoped>
@import '../../assets/scss/mixin.scss';

.article-detail{
  @include flex-col;
  max-width: 960px;
  min-height: 540px;
  background: rgb(251, 251, 251);
  margin: 0 auto;
  margin-top: 20px;
  box-shadow: 0 0 10px 0 #d8d5d5;
  .title{
    padding: 20px 25px;
    line-height: 30px;
    font-size: 25px;
    h1{
      font-weight: 700;
      color: #24292E;
    }
  }
  .user-info{
    height: 80px;
    padding: 20px 25px;
    box-sizing: border-box;
    font-size: 0;
    border-bottom: 1px solid #eee;
    .username{
      font-size: 20px;
      font-weight: bold;
      color: #000;
    }
    .push-time{
      font-size: 14px;
      line-height: 24px;
      color: #909090;
    }
  }
  .mavon-editor{
    flex: 1;
    .markdown-body{
      z-index: 0;
    }
    // .markdown-body * {
    //   background: #fff!important;
    // }
    .v-note-wrapper.shadow {
        box-shadow: none!important;
      }
    }
  .tags{
    @include flex-row;
    text-align: center;
    padding: 15px 25px;
    font-size: 18px;
    span{
      min-width: 80px;
      height: 30px;
      line-height: 30px;
      border-radius: 10px;
      background: #528AAA;
      text-align: center;
      color: #fff;
      cursor: pointer;
      margin-right: 5px;
      &:hover{
        box-shadow: 0px 0px 10px rgb(137, 185, 212) inset;
      }
    }
  }
  .left-panel{
    position: fixed;
    top: 200px;
    margin-left: -80px;;
    width: 60px;
  }
}

</style>
