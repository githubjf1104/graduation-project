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
          <div class="person-operation" v-if="username==currentUser">
            <span class="del" @click="handleDelArticle(item._id)"><i class="iconfont">&#xe64c;</i>删除</span>
            <span class="fix" @click="handleChangeArticle(item._id)"><i class="iconfont">&#xe61b;</i>修改</span>
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
        username: this.username
      }).then(res => {
        if (res.data.code === 0 && res.status === 200) {
          this.personArticle = res.data.data
          this.$emit('personArticle', res.data.total)
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
        if (res.data.code === 0 && res.status === 200) {
          this.$confirm('是否确定删除此问题?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.getPersonalArticle()
            this.$message.success('删除成功')
          })
        } else {
          this.$message.error('删除失败')
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
@import '@/assets/scss/mixin.scss';

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
        cursor: pointer;
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
    .person-operation{
      @include flex-row;
      justify-content: flex-end;
      align-items: flex-end;
      width: 150px;
      font-size: 0;
      span{
        display: inline-block;
        padding: 0 5px;
        min-width: 60px;
        border-radius: 5px;
        line-height: 25px;
        text-align: center;
        color: #5d5b5b;
        font-size: 14px;
        cursor: pointer;
        border: 1px solid #eee;
        &:hover{
          box-shadow: inset 0 0 10px 1px #eee;
          border: 1px solid #528aaa;
        }
      }
      .iconfont{
        margin-right: 5px;
      }
      .del{
        margin-right: 10px;
      }
    }
  }
}
</style>
