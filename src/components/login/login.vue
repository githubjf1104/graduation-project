<template>
      <div class="login">
        <div class="login-img">
           <span class="iconfont">&#xe6bf;</span>
        </div>
        <div class="login-close iconfont" @click="handleLoginClose">&#xe75d;</div>
         <el-form :model="loginRuleForm" status-icon :rules="rules" ref="loginRuleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="loginRuleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="userpwd">
                <el-input type="password" v-model="loginRuleForm.userpwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('loginRuleForm')">登录</el-button>
                <el-button @click="resetForm('loginRuleForm')">重置</el-button>
            </el-form-item>
        </el-form>
      </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    // 校验用户名
    var validateUsername = (rule, value, callback) => {
      var reg = /^[a-zA-Z0-9]{6,11}$/
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (!(reg.test(value))) {
        callback(new Error('请输入6-11位数字或字符串的用户名'))
      } else {
        callback()
      }
    }
    // 校验密码
    var validatePass = (rule, value, callback) => {
      var reg = /^[a-zA-Z]\w{5,17}$/
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!(reg.test(value))) {
        callback(new Error('以字母开头，长度在6-18之间，只能包含字符、数字和下划线'))
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
  methods: {
    // 登录关闭按钮
    handleLoginClose () {
      this.$emit('loginclose')
    },
    // 提交表单
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
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
$navColor:rgb(51, 7, 245);
$navColor_opacity:rgba(51, 7, 245, 0.1);
$back_Color:#f5f5f5;
.login{
    position: relative;
    z-index: 30;
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
      top: 0;
      right: 5%;
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
</style>
