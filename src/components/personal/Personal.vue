<template>
    <div class="personal-wrappwer">
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
              <router-view/>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'personal',
  data () {
    return {
      username: '',
      itemChild: 0,
      listInfo: [{
        label: '文章',
        value: 0,
        path: '/personal/personArticle'
      }, {
        label: '提问',
        value: 1,
        path: '/personal/askQuestion'
      }, {
        label: '答复',
        value: 2,
        path: '/personal/replay'
      }]
    }
  },
  created () {
    this.username = localStorage.getItem('username')
  },
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
    }
  }
}
</script>
<style lang='scss' scoped>
@import '../../assets/scss/mixin.scss';

.personal-wrappwer{
    position: relative;
    @include flex-col;
    max-width: 960px;
    margin: 20px auto 0 auto;
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
      min-height: 400px;
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
          color: #000;
          &:hover{
            background: rgb(138, 182, 245);
            color: #fff;
          }
        }
      }
      .content-item{
         flex: 1;
      }
    }
}
</style>
