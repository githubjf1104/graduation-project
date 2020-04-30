<template>
    <div class="collect-view">
        <ul>
          <li class="collect-view-list" v-for="(item, index) in collectArticle" :key="index">
            <div class="title" @click="getCurrentArticleContent(item._id)">{{item.articleTitle}}</div>
            <div class="body">
                <div class="detail">
                    <span class="date">{{item.date | timeFormat}}</span>
                    <span class="tag" v-for="(tag, index) in item.articleTags" :key="index">{{tag}}</span>
                </div>
                <div class="operation">
                    <span class="read"  @click="getCurrentArticleContent(item._id)">查看</span>
                    <span class="collect" @click="handleCollect(item.collectId, index)"><i class="iconfont">&#xe600;</i>收藏</span>
                </div>
            </div>
         </li>
       </ul>
       <div class="no-data">
         <no-data :datalength="collectArticle.length"></no-data>
       </div>
    </div>
</template>
<script>
import noData from '@/components/common/noData.vue'
import { fetchArticleContentById, fetchAllArticles, collect } from '@/api/index'
export default {
  name: 'Collect',
  components: {
    noData
  },
  props: {
    collectdata: {
      type: Array
    }
  },
  data () {
    return {
      article: [],
      collectArticle: []
    }
  },
  created () {
    this.getAllArticle().then(() => {
      this.collectdata.forEach(collect => {
        this.article.forEach(article => {
          if (collect.articleId === article._id) {
            this.$set(article, 'collectId', collect._id)
            this.collectArticle.push(article)
          }
        })
      })
    })
  },
  filters: {},
  methods: {
    handleCollect (collectId, index) {
      let obj = {
        id: collectId
      }
      collect(obj).then(res => {
        if (res.data.code === 0 && res.status === 200) {
          this.$confirm('是否确定取消收藏?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.collectArticle.splice(index, 1)
          })
        }
      })
    },
    // 获取选择文章内容
    getCurrentArticleContent (id) {
      fetchArticleContentById(id).then(res => {
        console.log(res)
        if (res.data.code === 0 && res.status === 200) {
          this.$router.push({name: 'Detail', params: {articleData: res.data.data}})
        }
      }).catch(() => {
        this.$message.info('获取文章内容失败')
      })
    },
    // 获取文章
    getAllArticle () {
      return fetchAllArticles().then(res => {
        if (res.data.code === 0 && res.status === 200) {
          this.article = res.data.data
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../../../assets/scss/mixin.scss';
.collect-view{
  position: relative;
  padding-right: 20px;
  .collect-view-list{
    @include flex-col;
    padding: 20px 0;
    border-bottom: 1px solid #f5f5f5;
    &:first-child{
      padding-top: 0;
    }
    .title{
      line-height: 20px;
      font-size: 18px;
      font-weight: bold;
      @include ellipsis;
      cursor: pointer;
    }
    .body{
      @include flex-row;
      justify-content: space-between;
      margin-top: 20px;
      font-size: 0;
      line-height: 14px;
      span{
        display: inline-block;
        padding: 0 5px;
        font-size: 14px;
        margin-right: 10px;
        color: #545252;
        cursor: pointer;
        &:hover{
          color: #528aaa;
        }
        .iconfont{
          color: #528aaa;
          padding: 5px;
        }
      }
      .detail{
        .date{
        padding-left: 0;
        }
        .tag{
          min-width: 50px;
          padding:5px;
          border: 1px solid #eee;
          text-align: center
        }
      }
      .operation{
        .read{
            margin-left: 40px;
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
