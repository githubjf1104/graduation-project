<template>
    <div class="change-pwd-wrapper">
        <div class="change-pwd">
        <div class="word">修改密码</div>
          <el-form :model="changepwdForm" status-icon :rules="rules" ref="changepwdForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="旧密码" prop="oldpwd">
                  <el-input
                    type="password"
                    ref="oldword"
                    v-model="changepwdForm.oldpwd"
                    autocomplete="off"
                    show-password
                    placeholder="请输入旧密码"
                    @keyup.enter.native="handleRegiterInputFocus('newpwd')">
                </el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newpwd">
                  <el-input
                    type="password"
                    ref="newpwd"
                    v-model="changepwdForm.newpwd"
                    autocomplete="off"
                    show-password
                    placeholder="请输入新密码"
                    @keyup.enter.native="handleRegiterInputFocus('oldword')">
                  </el-input>
              </el-form-item>
                <el-form-item label="确认新密码" prop="checknewpwd">
                  <el-input
                    type="password"
                    v-model="changepwdForm.checknewpwd"
                    autocomplete="off"
                    show-password
                    placeholder="请确认密码"
                   @keyup.enter.native="changePwdSubmit('changepwdForm')">
                  </el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="changePwdSubmit('changepwdForm')">修改</el-button>
              </el-form-item>
          </el-form>
        </div>
    </div>
</template>
<script>
import { changePwd } from '@/api/index'
export default {
  name: 'ChangePwd',
  data () {
    // 校验密码
    var validatePass = (rule, value, callback) => {
      var reg = /^[a-zA-Z]\w{4,17}$/
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!(reg.test(value))) {
        callback(new Error('以字母开头，长度在5-18之间，只能包含字符、数字和下划线'))
      } else {
        callback()
      }
    }
    var validateCheckPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认密码'))
      } else if (value !== this.changepwdForm.newpwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      changepwdForm: {
        oldpwd: '',
        newpwd: '',
        checknewpwd: ''
      },
      rules: {
        oldpwd: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        newpwd: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checknewpwd: [
          { required: true, validator: validateCheckPwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    changePwdSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let name = localStorage.getItem('username')
          let obj = {
            user: name,
            oldPwd: this.changepwdForm.oldpwd,
            password: this.changepwdForm.newpwd
          }
          changePwd(obj).then((res) => {
            if (res.data.code === 0 && res.status === 200) {
              this.$message.success({
                message: '修改成功'
              })
              localStorage.clear()
              this.Bus.$emit('changepwd')
              this.$router.push('/login')
            } else if (res.data.code === -1) {
              this.$message.error({
                message: '用户不存在'
              })
            } else if (res.data.code === 2) {
              this.$message.error({
                message: '旧密码错误'
              })
            } else {
              this.$message.error({
                message: '修改失败'
              })
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/mixin.scss';

.change-pwd-wrapper{
    max-width: 700px;
    min-height: 450px;
    margin: 20px auto 0 auto;
    .change-pwd{
      padding: 20px 30px;
      background: #fff;
      box-shadow: 0 0 10px 0px #d8d5d5;
      .word{
        margin-bottom: 20px;
        font-size: 20px;
        font-weight: bold;
        line-height: 30px;
        border-bottom: 1px solid #eee;
      }
      /deep/ .el-form-item__content{
          @include flex-row;
          justify-content: flex-end;
      }
    }
}
</style>
