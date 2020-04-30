<template>
    <div class="personal-wrapper">
      <div class="personal-left">
        <div class="personal-header">
           <div class="bg"></div>
            <div class="personal-name">{{username}}</div>
        </div>
        <div class="personal-content">
            <div class="conten-info">
                <router-link
                    v-for="(item, index) in listInfo"
                    :style="handleLinkStyle(item.value)"
                    :to="item.path"
                    :key="index"
                    class="link-item"
                    @click.native="navLinkItemsClick(item.value)">
                    {{item.label}}
                 </router-link>
            </div>
            <div class="content-item">
              <router-view :username="username"
                           :problemdata="problemList"
                           :showcontent="showContent"
                           :collectdata="collectData"
                           @delproblem="getPersonalProblem"
                           @personArticle="receiveNum"/>
            </div>
        </div>
      </div>
      <div class="category-right">
        <div class="person-info">
          <div class="profile">
            <span class="iconfont">&#xe6bf;</span>
            <span class="username">{{username}}</span>
          </div>
          <div class="user-list">
            <div class="article">
              <p>文章</p>
              <p class="count">{{articleNum}}</p>
            </div>
             <div class="focus">
              <p>收藏</p>
              <p class="count">{{total}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { fetchAllProblem, fetchCollect } from '@/api/index'

export default {
  name: 'personal',
  data () {
    return {
      problemList: [],
      username: '',
      itemChild: 0,
      listInfo: [{
        label: '文章',
        value: 0,
        path: '/personal/personArticle'
      },
      {
        label: '等待答复',
        value: 2,
        path: '/personal/waitReply'
      },
      {
        label: '收藏',
        value: 3,
        path: '/personal/collect'
      }],
      showContent: false,
      articleNum: 0,
      collectData: [],
      total: 0
    }
  },
  created () {
    let name = this.$route.params.username
    if (name) {
      this.username = name
      localStorage.setItem('name', name)
    } else {
      this.username = localStorage.getItem('name')
    }
    this.getPersonalProblem()
    this.showContent = true
    this.getCollectData()
  },
  beforeDestroy () {
    this.showContent = false
  },
  computed: {},
  // 个人文章数量
  methods: {
    receiveNum (num) {
      this.articleNum = num
    },
    navLinkItemsClick (value) {
      this.itemChild = value
    },
    handleLinkStyle (value) {
      if (this.itemChild === value) {
        return { 'color': '#3E84E9' }
      } else {
        return {}
      }
    },
    getPersonalProblem () {
      fetchAllProblem({
        username: this.username
      }).then(res => {
        if (res.data.code === 0 && res.status === 200) {
          this.problemList = res.data.data
        } else {
          this.$message.success('获取数据失败')
        }
      }).catch(err => {
        console.log(err)
        this.$message.success('获取数据失败')
      })
    },
    getCollectData () {
      let obj = {
        username: this.username
      }
      fetchCollect(obj).then(res => {
        if (res.data.code === 0 && res.status === 200) {
          this.collectData = res.data.data
          this.total = res.data.total
        } else {
          this.$message.error('获取数据失败')
        }
      }).catch(() => {
        this.$message.error('获取数据失败')
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../../assets/scss/mixin.scss';

.personal-wrapper{
  position: relative;
  @include flex-row;
  max-width: 960px;
  margin: 20px auto 0 auto;
  .personal-left{
    flex: 1;
    width: 0;
    @include flex-col;
    .personal-header{
      height: 150px;
      width: 100%;
      border: 1px solid #eee;
      background: #fff;
      .bg{
        height: 70px;
        background: #3e4c52;
      }
      .personal-name{
        // line-height: 80px;
        font-size: 20px;
        margin-left: 30px;
        font-weight: bold;
      }
    }
    .personal-content{
      flex: 1;
      @include flex-col;
      min-height: 370px;
      width: 100%;
      margin-top: 20px;
      background: #fff;
      .conten-info{
          height: 50px;
          width: 100%;
          line-height: 50px;
          border-bottom: 1px solid #eee;
          font-size: 0;
        .link-item{
          display: inline-block;
          min-width: 60px;
          text-align: center;
          font-size: 16px;
          font-weight: 400;
          padding: 0 10px;
          color: #000;
          &:hover{
            background: rgb(138, 182, 245);
            color: #fff;
          }
        }
      }
      .content-item{
        flex: 1;
        padding: 20px;
      }
    }
  }
  .category-right{
    flex: 0 0 200px;
    width: 200px;
    margin-left: 15px;
    border-radius: 2px;
    .person-info{
      @include flex-col;
      height: 160px;
      background: #fff;
      .profile{
        @include flex-row;
        padding: 10px;
        height: 80px;
        font-size: 0px;
        .iconfont{
          width: 40px;
          height: 40px;
          border: 1px solid #eee;
          border-radius: 50%;
          text-align: center;
          line-height: 40px;
          box-shadow: 0 2px 4px 0 #eee;
          font-size: 30px;
         }
        .username{
          display: inline-block;
          line-height: 40px;
          margin-left: 10px;
          flex: 1;
          font-size: 16px;
        }
      }
      .user-list{
        @include flex-row;
        border-top:1px solid #eee;
        line-height: 20px;
        padding: 10px;
        font-size: 16px;
        .article{
          flex: 1;
          text-align: center;
          border-right: 1px solid #eee;
          .count{
            font-weight: bold;
          }
        }
        .focus{
          flex: 1;
          text-align: center;
          .count{
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
