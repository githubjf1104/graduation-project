<template>
    <div class="person-article">
      <ul>
        <li class="article-info" v-for="(item, index) in personArticle" :key="index">
          <div class="person-detail">
            <h2 class="title" @click="getCurrentArticleContent(item._id)">{{item.articleTitle}}</h2>
            <div class="username">{{username}}</div>
            <div class="tag">
              <span class="tag-item" v-for="(tag, index) in item.articleTags" :key="index">
                {{tag}}
              </span>
            </div>
            <div class="article-content" @click="getCurrentArticleContent(item._id)">
              <div class="detail">{{item.articleContent | handleContentHTML}}</div>
            </div>
          </div>
          <div class="person-opration" v-if="username==currentUser">
            <span class="del" @click="handleDelArticle(item._id)">删除</span>
            <span class="fix" @click="handleChangeArticle(item._id)">修改</span>
          </div>
        </li>
      </ul>
    </div>
</template>
<script>
import { fetchAllArticles, fetchArticleContentById, deleteArticle, vaildToken } from '@/api/index'

export default {
  name: 'PersonArticle',
  props: {
    username: {
      type: String
    }
  },
  created () {
    this.currentUser = localStorage.getItem('username')
    this.getPersonalArticle()
  },
  data () {
    return {
      personArticle: [],
      currentUser: ''
    }
  },
  methods: {
    // 获取文章
    getPersonalArticle () {
      fetchAllArticles({
        userName: this.username
      }).then(res => {
        if (res.data.code === 0 && res.status === 200) {
          this.personArticle = res.data.data
        }
      })
    },
    // 获取选择文章内容
    getCurrentArticleContent (id) {
      fetchArticleContentById(id).then(res => {
        // console.log(res)
        if (res.data.code === 0 && res.status === 200) {
          this.$router.push({name: 'Detail', params: {articleData: res.data.data}})
        }
      }).catch(() => {
        this.$message.info('获取文章内容失败')
      })
    },
    // 删除文章
    handleDelArticle (id) {
      deleteArticle({
        id: id
      }).then(res => {
        if (res.data.code === 0) {
          this.getPersonalArticle()
          this.$message.success('删除成功')
        }
      })
    },
    // 编辑文章
    handleChangeArticle (id) {
      vaildToken().then(res => {
        if (res.data.code === 0) {
          fetchArticleContentById(id).then(res => {
            if (res.data.code === 0 && res.status === 200) {
              this.$router.push({name: 'Eidt', params: {changeArticle: res.data.data}})
            }
          })
        } else {
          this.$message({
            type: 'info',
            message: '请登录后再修改文章'
          })
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../../assets/scss/mixin.scss';

.person-article{
  @include flex-col;
  .article-info{
    @include flex-row;
    padding: 15px 0px;
    border-bottom: 1px solid #eee;
    .person-detail{
      flex: 1;
      width: 0;
      .title{
        font-size: 16px;
        line-height: 20px;
        font-weight: bold;
        color: #000;
        &:hover{
          color: #3a8b96;
        }
      }
      .username{
        padding: 5px 0;
        line-height: 20px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
      }
      .tag{
        font-size: 0;
        .tag-item{
          display: inline-block;
          min-width: 50px;
          line-height: 20px;
          margin: 0 5px 5px 0;
          font-size: 12px;
          border-radius: 5px;
          border: 1px solid #eee;
          text-align: center;
          cursor: pointer;
        }
      }
      .article-content{
        padding-right: 40px;
        font-size: 12px;
        line-height: 20px;
        color: #b1a9a9;
        cursor: pointer;
        .detail{
          @include ellipsis
        }
        &:hover{
          color: #888484;
        }
      }
    }
    .person-opration{
      @include flex-row;
      justify-content: flex-end;
      align-items: flex-end;
      width: 150px;
      font-size: 0;
      span{
        display: inline-block;
        min-width: 60px;
        border-radius: 5px;
        line-height: 25px;
        text-align: center;
        color: #fff;
        background: #3a8b96;
        border: 1px solid #eee;
        font-size: 16px;
        cursor: pointer;
        &:hover{
          box-shadow: inset 0 0 10px 1px #eee;
        }
      }
      .del{
        margin-right: 10px;
        background: #b86969;
      }
    }
  }
}
</style>
