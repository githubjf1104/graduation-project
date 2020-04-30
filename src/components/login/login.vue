<template>
  <div class="login-wrapper">
    <div class="login">
      <div class="login-img">
          <span class="iconfont">&#xe6bf;</span>
      </div>
      <div class="login-close iconfont" @click="handleLoginClose">&#xe75d;</div>
        <el-form :model="loginRuleForm" status-icon :rules="rules" ref="loginRuleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
              <el-input
                type="text"
                v-model.trim="loginRuleForm.username"
                autocomplete="off"
                @keyup.enter.native="handleLoginInputFocus()">
              </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="userpwd">
              <el-input
                 type="password"
                 v-model.trim="loginRuleForm.userpwd"
                 ref="password"
                 autocomplete="off"
                 @keyup.enter.native="submitForm('loginRuleForm')">
              /</el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="submitForm('loginRuleForm')">登录</el-button>
              <el-button @click="resetForm('loginRuleForm')">重置</el-button>
          </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/index'
// import { mapMutations } from 'vuex'

export default {
  name: 'Login',
  data () {
    // 校验用户名
    var validateUsername = (rule, value, callback) => {
      var reg = /^[a-zA-Z0-9]{4,11}$/
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (!(reg.test(value))) {
        callback(new Error('请输入5-11位数字或字符串的用户名'))
      } else {
        callback()
      }
    }
    // 校验密码
    var validatePass = (rule, value, callback) => {
      var reg = /^[a-zA-Z]\w{4,17}$/
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!(reg.test(value))) {
        callback(new Error('以字母开头，长度在4-18之间，只能包含字符、数字和下划线'))
      } else {
        callback()
      }
    }
    return {
      loginRuleForm: {
        username: '',
        userpwd: ''
      },
      rules: {
        username: [
          { required: true, validator: validateUsername, trigger: 'blur' }
        ],
        userpwd: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  methods: {
    // ...mapMutations(['saveUsername']),
    // 登录关闭按钮
    handleLoginClose () {
      // this.$router.back()
      this.$router.push('/index')
    },
    // 处理input enter事件
    handleLoginInputFocus () {
      this.$refs.password.focus()
    },
    // 提交表单
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          login({
            user: this.loginRuleForm.username,
            password: this.loginRuleForm.userpwd
          }).then(res => {
            if (res.data.code === 0 && res.status === 200) {
              localStorage.setItem('token', res.data.data)
              localStorage.setItem('username', this.loginRuleForm.username)
              this.Bus.$emit('username', this.loginRuleForm.username)
              // this.saveUsername(this.loginRuleForm.username)
              this.$router.push('/index')
            } else if (res.data.code === -1) {
              this.$message({
                type: 'error',
                message: '该用户不存在'
              })
            } else {
              this.$message({
                type: 'error',
                message: '用户名或者密码错误'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置表单
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/mixin.scss';
$navColor:rgb(82, 165, 212);
$navColor_opacity:rgba(51, 7, 245, 0.1);
$back_Color:#f5f5f5;
.login-wrapper{
  position: fixed;
  z-index: 40;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  backdrop-filter: blur(3px);
  &::before{
    position:absolute;
    //一定要设置position:absolute,这样才能设置z-index，让背景处于内容的下一层
    // background-image: url('../../assets/img/login-back.jpg');
    background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('../../assets/img/login-back.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    width: 100%;
    content:'';
    opacity:0.3;
    // z-index: -1;
  }
  .login{
    position: relative;
    height: 100%;
    width: 375px;
    max-width: 375px;
    height: 400px;
    box-shadow: 2px 2px 1px $back_Color;
    margin: 30px auto 0 auto;
    text-align: center;
    background: #fff;
    border-radius: 20px;
    .login-img{
      position: absolute;
      top: 10%;
      left: 45%;
      height: 60px;
      width: 60px;
      background: $back_Color;
      border-radius: 50%;
      cursor: pointer;
      .iconfont{
        line-height: 60px;
        font-size: 30px;
      }
    }
    .login-close{
      position: absolute;
      top: 3%;
      right: 3%;
      padding: 0 5px;
      &.iconfont{
        font-size: 20px;
        cursor: pointer;
        &:hover{
          color: $navColor;
        }
      }
    }
    .el-form{
      position: absolute;
      top: 40%;
      .el-form-item{
        margin-bottom: 30px;
        .el-button--primary {
          color: #FFF;
          background-color: $navColor;
          border-color: $navColor;
          margin-right: 50px;
        }
        .el-button--default{
          &:hover {
            background: $navColor_opacity;
          }
        }
      }
    }
  }
}
</style>
