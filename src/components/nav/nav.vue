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
                <div class="nav-item">
                    <router-link to="/question">提问</router-link>
                </div>
            </div>
        </div>
        <div class="nav-middle">
           <div class="nav-search">
                <input type="text" placeholder="请输入标签" v-model="searchcontent" @keyup.enter="handleSearch(searchcontent)">
                <span class="iconfont" @click="handleSearch(searchcontent)">&#xe672;</span>
            </div>
            <div class="nav-write" @click="handleEditArticle"><span><i class="iconfont">&#xe61b;</i>发表文章</span></div>
        </div>
        <div class="navwrite-small" @click="handleEditArticle"><i class="iconfont">&#xe61b;</i></div>
        <div class="nav-right" v-show="!username">
            <div class="login" @click="handleLogin"><span>登录</span></div>
            <div class="register" @click="handleRegister"><span>注册</span></div>
        </div>
        <div class="nav-right-username" v-show="username">
          <el-dropdown @command="handleDropdownEvent" trigger="click">
            <span class="el-dropdown-link">
              {{username}}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-right" command="loginOut">退出登录</el-dropdown-item>
              <el-dropdown-item icon="el-icon-user" command="personal">个人中心</el-dropdown-item>
              <el-dropdown-item command="changePwd"><i class="iconfont">&#xe605;</i>修改密码</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
    </div>
</template>
<script>
import { loginOut, vaildToken } from '@/api/index'

export default {
  name: 'vNav',
  props: {},
  components: {
  },
  data () {
    return {
      searchcontent: '',
      showLoginPage: false,
      showRegisterPage: false,
      username: ''
    }
  },
  computed: {
  },
  created () {
    this.Bus.$on('username', (username) => {
      this.$nextTick(() => {
        this.username = username
      })
    })
    this.Bus.$on('changepwd', () => {
      this.$nextTick(() => {
        this.username = ''
      })
    })
  },
  mounted () {
    this.$nextTick(() => {
      this.username = localStorage.getItem('username')
    })
  },
  directives: {
  },
  methods: {
    handleDropdown () {
      this.isDropdown = !this.isDropdown
    },
    handleSearch (content) {
      this.Bus.$emit('handlesearch', content)
    },
    // 登录
    handleLogin () {
      this.$router.push('/login')
    },
    handleRegister () {
      this.$router.push('/register')
    },
    // 发表文章
    handleEditArticle () {
      vaildToken().then(res => {
        if (res.data.code === 0) {
          this.$router.push('/edit')
          return
        }
        this.$message({
          type: 'info',
          message: '请登录后再发表文章'
        })
      })
    },
    handleDropdownEvent (command) {
      if (command === 'loginOut') {
        this.$confirm('是否确定退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleLoginOut()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消退出'
          })
        })
      } else if (command === 'personal') {
        vaildToken().then(res => {
          if (res.data.code === 0) {
            this.$router.push({name: 'PersonArticle', params: {username: this.username}})
          } else {
            this.$message({
              type: 'info',
              message: '请先登录'
            })
          }
        })
      } else if (command === 'changePwd') {
        vaildToken().then(res => {
          if (res.data.code === 0) {
            this.$router.push('/changepwd')
          } else {
            this.$message({
              type: 'info',
              message: '请先登录'
            })
          }
        })
      }
    },
    // 退出登录
    handleLoginOut () {
      loginOut({
        user: this.username
      }).then(res => {
        if (res.data.code === 0 && res.status === 200) {
          this.$message({
            type: 'success',
            message: '退出登录成功'
          })
          this.username = ''
          localStorage.clear()
          this.$router.push('/index')
        } else {
          this.$message({
            type: 'error',
            message: '退出登录失败'
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';
$navColor:rgb(82, 138, 170);
$navColor_opacity:rgba(82, 138, 170, 0.1);
$font_color: #333;
.nav-wrapper{
    @include flex-row;
    max-width: 960px;
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
    .navwrite-small{
      display: none;
      cursor: pointer;
      .iconfont{
        min-width: 20px;
        height: 20px;
        line-height: 20px;
        padding: 5px;

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
    .nav-right-username{
      position: relative;
      min-width: 60px;
      text-align: right;
      @include flex-col;
      .el-dropdown-link{
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        cursor: pointer;
      }
    }
}
@media screen and (max-width: 767px) {
  .nav-wrapper{
    .nav-title{
      font-size: 18px;
      margin-right: 0;
    }
    .nav-left{
      .nav-list{
        .nav-item{
          width: 40px!important;
          font-size: 16px!important;
        }
      }
    }
    .nav-middle{
      display: none;
    }
    .navwrite-small{
      display: block;
    }
  }
}
@media screen and (max-width: 890px) and (min-width: 768px) {
  .nav-wrapper{
    .nav-search,.nav-righ{
      display: none;
    }
    .navwrite-small{
      display: block;
    }
  }
}
@media screen and (max-width: 375px) {
  .nav-wrapper{
    .nav-left{
      .nav-list{
        .nav-item{
          width: 35px!important;
          font-size: 16px!important;
        }
      }
    }
    .nav-right-username{
     min-width: 50px!important;
    }
    .nav-right{
      width: 50px;
      .register{
        display: none;
      }
    }
  }
}
</style>
