<template>
    <div class="common-view">
        <ul>
          <li class="common-view-list" v-for="(article, index) in categoryarticle" :key="index">
            <div class="common-view-box">
              <div class="common-view-content">
                <div class="common-view-title" @click="getCurrentArticleContent(article._id)">
                  <h2 :title="article.articleTitle">{{article.articleTitle}}</h2>
                </div>
                <div class="common-content" @click="getCurrentArticleContent(article._id)">{{article.articleContent | handleContentHTML}}</div>
                <div class="common-view-detail">
                  <div class="username">{{article.username}}</div>
                  <span class="common-view-tag" v-for="(tag, index) in article.articleTags" :key="index">{{tag}}</span>
                </div>
              </div>
              <div class="common-view-info">
                <div class="posttime">{{article.date | timeFormat}}</div>
              </div>
            </div>
            <div class="common-view-action">
              <v-action
                  :likes="article.likes"
                  :articleid="article._id"
                  :username="article.username"
                  @comment="getCurrentArticleContent">
              </v-action>
            </div>
         </li>
       </ul>
       <div class="no-data">
         <no-data :datalength="categoryarticle.length"></no-data>
       </div>
    </div>
</template>
<script>
import vAction from '@/components/common/Action.vue'
import noData from '@/components/common/noData.vue'
import { fetchArticleContentById } from '@/api/index'
export default {
  name: 'CommonView',
  props: {
    categoryarticle: Array
  },
  components: {
    vAction,
    noData
  },
  data () {
    return {
    }
  },
  filters: {},
  methods: {
    // 获取选择文章内容
    getCurrentArticleContent (id) {
      fetchArticleContentById(id).then(res => {
        if (res.data.code === 0 && res.status === 200) {
          this.$router.push({name: 'Detail', params: {articleData: res.data.data}})
        }
      }).catch(() => {
        this.$message.info('获取文章内容失败')
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../../assets/scss/mixin.scss';
$background: #fff;
$back_Color:#f5f5f5;
$title_Color: #3a8b96;
$username_Color: #2d5856;
$font_Color: #b1a9a9;
$box_shadow: #eee;
.common-view{
  position: relative;
  .common-view-list{
    @include flex-col;
    border-bottom: 1px solid $back_Color;
    .common-view-box{
      @include flex-row;
      padding: 15px;
      font-size: 0;
      .common-view-content{
        @include flex-col;
        flex: 1;
        width: 0;
        .common-view-title{
          width: 80%;
          font-size: 18px;
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
        .common-content{
          margin-top: 10px;
          line-height: 20px;
          font-size: 14px;
          color: rgb(117, 111, 111);
          cursor: pointer;
          @include ellipsis
        }
        .common-view-detail{
          @include flex-row;
          margin-top: 10px;
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
  .no-data{
    position: absolute;
    width: 100%;
    top: 0;
  }
}
</style>
