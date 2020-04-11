<template>
    <div class="common-view">
        <ul>
          <li class="common-view-list" v-for="(article, index) in articlelist" :key="index">
            <div class="common-view-box">
              <div class="headportrait">
                <img :src="article.headportrait" alt="用户头像" width="45" height="45">
              </div>
              <div class="common-view-content">
                <div class="common-view-title">
                  <h2 :title="article.textTitle">{{article.textTitle}}</h2>
                </div>
                <div class="common-view-detail">
                  <div class="username">{{article.username}}</div>
                  <span class="common-view-tag" v-for="(tag, index) in article.tag" :key="index">{{tag}}</span>
                </div>
              </div>
              <div class="common-view-info">
                <div class="posttime">{{article.posttime | timeFormat}}</div>
              </div>
            </div>
            <div class="common-view-action">
              <v-action :likecount="article.likeCount" :index="index"></v-action>
            </div>
         </li>
       </ul>
    </div>
</template>
<script>
import vAction from '@/components/common/Action.vue'
export default {
  name: 'CommonView',
  props: {
    articlelist: Array
  },
  components: {
    vAction
  },
  data () {
    return {
    }
  },
  filters: {
    timeFormat (time) {
      let date = new Date(time)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      function timeWithZero (num) {
        return num > 10 ? num : '0' + num
      }
      return timeWithZero(year) + '-' + timeWithZero(month) + '-' + timeWithZero(day)
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../../../assets/scss/mixin.scss';
$background: #fff;
$back_Color:#f5f5f5;
$title_Color: #3a8b96;
$username_Color: #2d5856;
$font_Color: #b1a9a9;
$box_shadow: #eee;
.common-view{
  .common-view-list{
    @include flex-col;
    .common-view-box{
      @include flex-row;
      padding: 20px;
      border-bottom: 1px solid $back_Color;
      font-size: 0;
      .headportrait{
        width: 45px;
        margin-right: 20px;
        img{
          border-radius: 50%;
        }
      }
      .common-view-content{
        @include flex-col;
        flex: 1;
        width: 0;
        .common-view-title{
          width: 80%;
          font-size: 16px;
          font-weight: 600;
          color: $title_Color;
          cursor: pointer;
          &:hover{
            color: $username_Color;
          }
          h2{
            @include ellipsis;
          }
        }
      }
      .common-view-detail{
        @include flex-row;
        margin-top: 14px;
        font-size: 13px;
        color: $font_Color;
        .username{
          min-width: 50px;
          margin-right: 20px;
          cursor: pointer;
          &:hover{
            color: $username_Color;
          }
        }
        .common-view-tag{
          min-width: 25px;
          padding: 0 5px;
        }
      }
      .common-view-info{
        color: $font_Color;
        min-width: 60px;
        .posttime{
          height: 20px;
          line-height: 20px;
          font-size: 13px;
        }
        .info-count{
          padding-top: 5px;
          font-size: 0;
          color: $font_Color;
          .iconfont{
            height: 20px;
            line-height: 20px;
            padding-right: 5px;
            font-size: 16px;
            line-height: 20px;
          }
          .count{
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
