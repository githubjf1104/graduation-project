<template>
      <div class="register">
        <div class="register-img">
           <span class="iconfont">&#xe6bf;</span>
        </div>
        <div class="register-close iconfont" @click="handleregiterClose">&#xe75d;</div>
         <el-form :model="registerRuleForm" status-icon :rules="rules" ref="registerRuleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model.number="registerRuleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="userpwd">
                <el-input type="password" v-model="registerRuleForm.userpwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkpwd">
                <el-input type="password" v-model="registerRuleForm.checkpwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('registerRuleForm')">注册</el-button>
                <el-button @click="resetForm('registerRuleForm')">重置</el-button>
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
          { validator: validateUsername, trigger: 'blur' }
        ],
        userpwd: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkpwd: [
          { validator: validateCheckPwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 关闭注册页面
    handleregiterClose () {
      this.$emit('regiterclose')
    },
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
$login_Color:#f5f5f5;
.register{
    position: relative;
    z-index: 30;
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
      top: 0;
      right: 5%;
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
</style>
