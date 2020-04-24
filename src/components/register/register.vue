<template>
    <div class="register-wrapper">
        <div class="register">
          <div class="register-img">
              <span class="iconfont">&#xe6bf;</span>
          </div>
          <div class="register-close iconfont" @click="handleregiterClose">&#xe75d;</div>
            <el-form :model="registerRuleForm" status-icon :rules="rules" ref="registerRuleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户名" prop="username">
                  <el-input
                    type="text"
                    v-model="registerRuleForm.username"
                    autocomplete="off"
                    @keyup.enter.native="handleRegiterInputFocus('password')">
                  </el-input>
              </el-form-item>
              <el-form-item label="密码" prop="userpwd">
                  <el-input
                    type="password"
                    ref="password"
                    v-model="registerRuleForm.userpwd"
                    autocomplete="off"
                    @keyup.enter.native="handleRegiterInputFocus('checkpwd')"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkpwd">
                  <el-input
                    type="password"
                    ref="checkpwd"
                    v-model="registerRuleForm.checkpwd"
                    autocomplete="off"
                    @keyup.enter.native="registerSubmit('registerRuleForm')"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="registerSubmit('registerRuleForm')">注册</el-button>
                  <el-button @click="resetForm('registerRuleForm')">重置</el-button>
              </el-form-item>
          </el-form>
        </div>
    </div>
</template>
<script>
import { register } from '@/api/index'

export default {
  name: 'Register',
  data () {
    // 校验用户名
    var validateUsername = (rule, value, callback) => {
      var reg = /^[a-zA-Z0-9]{4,11}$/
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (!(reg.test(value))) {
        callback(new Error('请输入4-11位数字或字符串的用户名'))
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
    var validateCheckPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerRuleForm.userpwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerRuleForm: {
        username: '',
        userpwd: '',
        checkpwd: ''
      },
      rules: {
        username: [
          { required: true, validator: validateUsername, trigger: 'blur' }
        ],
        userpwd: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkpwd: [
          { required: true, validator: validateCheckPwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 关闭注册页面
    handleregiterClose () {
      // this.$router.back()
      this.$router.push('/index')
    },
    // enter事件
    handleRegiterInputFocus (refName) {
      if (refName === 'password') {
        this.$refs.password.focus()
      } else {
        this.$refs.checkpwd.focus()
      }
    },
    registerSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          register({
            user: this.registerRuleForm.username,
            password: this.registerRuleForm.userpwd
          }).then(res => {
            if (res.data.code === 0 && res.status === 200) {
              this.$message({
                type: 'success',
                message: '注册成功，请登录'
              })
              this.$router.push('/login')
            } else if (res.data.code === -1) {
              this.$message({
                type: 'error',
                message: '该用户已存在'
              })
            } else {
              this.$message({
                type: 'error',
                message: '注册失败'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/scss/mixin.scss';
$navColor:rgb(124, 205, 252);
$navColor_opacity:rgba(51, 7, 245, 0.1);
$login_Color:#f5f5f5;
.register-wrapper{
  position: fixed;
  z-index: 40;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  backdrop-filter: blur(3px);
  &::before{
    position:absolute;
    // 一定要设置position:absolute,这样才能设置z-index，让背景处于内容的下一层
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
  .register{
    position: relative;
    height: 100%;
    width: 375px;
    max-width: 375px;
    height: 400px;
    box-shadow: 2px 2px 1px $login_Color;
    margin: 30px auto 0 auto;
    text-align: center;
    background: #fff;
    border-radius: 20px;
    .register-img{
      position: absolute;
      top: 10%;
      left: 45%;
      height: 60px;
      width: 60px;
      background: $login_Color;
      border-radius: 50%;
      .iconfont{
        line-height: 60px;
        font-size: 30px;
      }
    }
    .register-close{
      position: absolute;
      top: 2%;
      right: 3%;
      padding: 5px;
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
      top: 30%;
      .el-form-item{
        margin-bottom: 25px;
        .el-button--primary {
          color: #FFF;
          background-color: $navColor;
          border-color: $navColor;
          margin-right: 50px;
        }
        .el-input__inner {
          border: 1px solid $navColor;
        }
      }
    }
  }
}
</style>
