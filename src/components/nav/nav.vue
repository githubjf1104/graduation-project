<template>
    <div class="nav-wrapper">
        <div class="nav-title">
           <router-link to="/index">大学生分享问答平台</router-link>
        </div>
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
        <div class="nav-middle">
           <div class="nav-search">
                <input type="text" placeholder="请输入标签" v-model="searchTag">
                <span class="iconfont">&#xe672;</span>
            </div>
            <div class="nav-write"><span><i class="iconfont">&#xe61b;</i>发表文章</span></div>
        </div>
        <div class="nav-right">
            <div class="login" @click="handleLogin"><span>登录</span></div>
            <div class="register" @click="handleRegister"><span>注册</span></div>
        </div>
        <transition name="fade">
          <div class="login-wrapper" v-show="showLoginPage">
            <login @loginclose="handleLoginPageClose"></login>
          </div>
        </transition>
        <transition name="fade">
          <div class="register-wrapper" v-show="showRegisterPage">
            <register @regiterclose="handleRegisterClose"></register>
          </div>
        </transition>
    </div>
</template>
<script>
import login from '@/components/login/login.vue'
import register from '@/components/register/register.vue'

export default {
  name: 'vNav',
  components: {
    login,
    register
  },
  data () {
    return {
      searchTag: '',
      showLoginPage: false,
      showRegisterPage: false
    }
  },
  methods: {
    // 登录
    handleLogin () {
      this.showLoginPage = !this.showLoginPage
    },
    // 关闭注册页面
    handleRegisterClose () {
      this.showRegisterPage = !this.showRegisterPage
    },
    // 注册
    handleRegister () {
      this.showRegisterPage = !this.showRegisterPage
    },
    handleLoginPageClose () {
      this.showLoginPage = !this.showLoginPage
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/mixin.scss';
$navColor:rgb(51, 7, 245);
$navColor_opacity:rgba(51, 7, 245, 0.1);
$font_color: #333;
.nav-wrapper{
    @include flex-row;
    width: 960px;
    height: 100%;
    line-height: 60px;
    margin: 0 auto;
    .nav-title{
      margin-right: 20px;
      font-size: 25px;
      font-weight: 500;
      color: $navColor;
      a{
        color:$navColor;
      }
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
            a{
              color:$font_color;
              &:hover{
                color: $navColor;
              }
              &.active{
                color: $navColor;
              }
            }
         }
      }
    }
    .nav-middle{
      @include flex-row;
      flex: 1;
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
            border:1px solid rgb(148, 150, 250);
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
          padding: 0 5px;
          width: 100px;
          border: 1px solid $navColor;
          border-radius: 5px;
          font-size: 16px;
          background: $navColor;
          color: #fff;
          cursor: pointer;
          .iconfont{
              margin-right: 10px;
          }
        }
      }
    }
    .nav-right{
      @include flex-row;
      width: 100px;
      justify-content: flex-end;
      .login, .register{
        font-size: 0;
        text-align: center;
        span{
          display: inline-block;
          vertical-align: middle;
          height: 30px;
          padding: 5px;
          line-height: 30px;
          font-size: 16px;
          color: $navColor;
          cursor: pointer;
        }
      }
    }
    .login-wrapper, .register-wrapper{
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 20;
      backdrop-filter: blur(1px);
      background: $navColor_opacity;
      &.fade-enter-active, .fade-leave-active {
        opacity: 1;
        transition: all .5s;
      }
      &.fade-enter, .fade-leave-to{
        opacity: 0;
        background: rgba(0, 0, 0, 0);
      }
    }
}
</style>
