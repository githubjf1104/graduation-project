<template>
    <div class="index-container">
      <div class=index-left>
        <ul>
          <li class="article-list" v-for="(article, index) in articlelist" :key="index">
            <div class="headportrait">
              <img :src="article.headportrait" alt="用户头像" width="45" height="45">
            </div>
            <div class="article-content">
              <div class="article-title">{{article.textTitle}}</div>
              <div class="article-detail">
                 <div class="username">{{article.username}}</div>
                 <span class="article-tag" v-for="(tag, index) in article.tag" :key="index">{{tag}}</span>
              </div>
            </div>
            <div class="article-info">
              <div class="posttime">{{article.posttime | timeFormat}}</div>
            </div>
         </li>
       </ul>
     </div>
     <div class="index-right">2</div>
    </div>
</template>

<script>
export default {
  name: 'Index',
  props: {
    articlelist: {
      type: Array
    }
  },
  filters: {
    timeFormat (time) {
      let date = new Date(time)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      let min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return `${year}-${month}-${day} ${hour}:${min}:${seconds}`
      // return `${year}-${month}-${day}`
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixin.scss';
$background: #fff;
$back_Color:#f5f5f5;
$title_Color: #2354f5;
$username_Color: #5f83f8;
.index-container{
  position: relative;
  @include flex-row;
  width: 960px;
  max-width: 960px;
  height: calc(100% - 20px);
  margin: 20px auto 0 auto;
  .index-left{
    flex: 1;
    border: 1px solid #eee;
    background: $background;
    .article-list{
      @include flex-row;
      padding: 15px;
      border-bottom: 1px solid $back_Color;
      font-size: 0;
      .headportrait{
        width: 45px;
        margin-right: 20px;
      }
      .article-content{
        @include flex-col;
        flex: 1;
        width: 0;
        padding-right: 20px;
        .article-title{
          font-size: 16px;
          font-weight: 600;
          @include ellipsis;
          cursor: pointer;
          &:hover{
            color: $username_Color;
          }
        }
      }
      .article-detail{
        @include flex-row;
        margin-top: 14px;
        font-size: 13px;
        .username{
          min-width: 50px;
          margin-right: 20px;
          cursor: pointer;
          &:hover{
            color: $username_Color;
          }
        }
        .article-tag{
          min-width: 25px;
          padding: 0 5px;
        }
      }
      .article-info{
        width: 130px;
        font-size: 13px;
      }
    }
  }
  .index-right{
    width: 240px;
    margin-left: 16px;
    border: 1px solid #eee;
    background: $background;
  }
}
</style>
