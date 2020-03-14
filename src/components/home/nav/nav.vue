<template>
    <div class="nav-wrapper">
        <div class="nav-title">大学生分享问答平台</div>
        <div class="nav-left">
            <div class="nav-list">
                <div class="nav-item">
                    <router-link to="/index">首页</router-link>
                </div>
                <div class="nav-item">
                    <router-link to="/category">专栏</router-link>
                </div>
            </div>
        </div>
        <div class="nav-right">
            <div class="nav-search">
                <input type="text" placeholder="请输入标签" v-model="searchTag">
                <span class="iconfont">&#xe672;</span>
            </div>
            <div class="nav-write"><span>写文章</span></div>
            <div class="login"><span>登录</span></div>
            <div class="register"><span>注册</span></div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'nav',
  data () {
    return {
      searchTag: ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/scss/mixin.scss';
$navColor:rgb(168, 161, 165);
$navColor_opacity:rgba(168, 161, 165, .2);
$font_color: #333;
.nav-wrapper{
    @include flex-row;
    width: 960px;
    height: 100%;
    line-height: 60px;
    margin: 0 auto;
    color: $font_color;
    .nav-title{
      margin-right: 20px;
      font-size: 20px;
      color: $navColor;
    }
    .nav-left{
      .nav-list{
         @include flex-row;
         .nav-item{
            width: 60px;
            padding: 0 5px;
            text-align: center;
            font-size: 20px;
            cursor: pointer;
            &:hover{
              background: $navColor_opacity;
            }
            a{
              color:$font_color;
              &.active{
                color: $navColor;
              }
            }
         }
      }
    }
    .nav-right{
      @include flex-row;
      flex: 1 ;
      justify-content: flex-end;
      .nav-search{
        font-size: 0;
        margin-right: 40px;
        input{
          display: inline-block;
          vertical-align: middle;
          width: 150px;
          height: 30px;
          border: 1px solid $navColor;
          border-radius: 5px;
          padding: 0 5px;
          font-size: 14px;
          background: rgb(255, 253, 253);
          &:focus{
            background: #fff;
            color: rgb(12, 12, 12);
            border:1px solid rgb(186, 226, 231);
          }
        }
        .iconfont{
          display: inline-block;
          vertical-align: middle;
          margin-left: 10px;
          font-size: 25px;
          color: $navColor;
          cursor: pointer;
        }
      }
      .nav-write{
        font-size: 0;
        text-align: center;
        margin-right: 20px;
        span{
          display: inline-block;
          vertical-align: middle;
          height: 30px;
          line-height: 30px;
          width: 100px;
          border: 1px solid $navColor;
          border-radius: 5px;
          font-size: 16px;
          background: $navColor;
          color: #fff;
          cursor: pointer;
        }
      }
      .login, .register{
        font-size: 0;
        text-align: center;
        span{
          display: inline-block;
          vertical-align: middle;
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          color: $navColor;
          cursor: pointer;
        }
      }
      .login{
          margin-right: 20px;
      }
    }
}
</style>
