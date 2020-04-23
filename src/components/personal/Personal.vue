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
                           @delproblem="getPersonalProblem"/>
            </div>
        </div>
      </div>
      <div class="personal-right">
        <div class="right-content"></div>
      </div>
    </div>
</template>
<script>
import { fetchAllProblem } from '@/api/index'

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
      }],
      showContent: false
    }
  },
  created () {
    // debugger
    let username = this.$route.params.username
    if (username) {
      this.username = username
    } else {
      this.username = localStorage.getItem('username')
    }
    this.getPersonalProblem()
    this.showContent = true
  },
  beforeDestroy () {
    this.showContent = false
  },
  computed: {},
  methods: {
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
  .personal-right{
    width: 200px;
    margin-left: 20px;
    .right-content{
      position: fixed;
      min-height: 400px;
      width: 200px;
      background: #fff;
    }
  }
}
</style>
