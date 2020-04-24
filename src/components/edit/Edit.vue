<template>
    <div class="edit-wrapper">
      <div class="edit-header">
        <span class="title">标题</span>
        <input class="tilte-input" type="text" v-model="title">
        <div class="article-type">
          <span class="type">文章类型</span>
          <el-select v-model="articleType" placeholder="请选择">
            <el-option
              v-for="item in articleTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="mavon-editor">
        <mavon-editor v-model="content"
          ref="md"
          :ishljs = "true"
          @change="change"
          @imgAdd="handleAddImg"
          style="min-height: 560px"/>
      </div>
        <div class="btn-group">
            <Button type="error" @click="submit" class="btn-submit">发布文章</Button>
            <Button type="default" @click="quit" class="btn-quit">退出</Button>
        </div>
        <div class="dialog">
          <el-dialog title="添加标签" :visible.sync="showAddTag"
            :modal-append-to-body="false">
            <el-tag
              :key="tag"
              v-for="tag in tagsList"
              closable
              color="#fff"
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="tagValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleAddTagConfirm"
              @blur="handleAddTagConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="addTag">+ New Tag</el-button>
            <div slot="footer" class="dialog-footer">
              <el-button @click="showAddTag = false">取 消</el-button>
              <el-button type="primary" @click="handlePublish">确 定</el-button>
            </div>
          </el-dialog>
        </div>
    </div>
</template>
<script>
import { pushArticle } from '@/api/index'

export default {
  name: 'edit',
  data () {
    return {
      content: '',
      html: '',
      showAddTag: false,
      tagsList: [],
      inputVisible: false,
      tagValue: '',
      title: '',
      id: '',
      articleType: '',
      articleTypeList: [{
        label: '软件工程',
        value: '软件工程'
      },
      {
        label: '计算机',
        value: '计算机'
      },
      {
        label: '数学与金融',
        value: '数学与金融'
      },
      {
        label: '教育',
        value: '教育'
      },
      {
        label: '艺术',
        value: '艺术'
      },
      {
        label: '就业',
        value: '就业'
      },
      {
        label: '考研',
        value: '考研'
      }]
    }
  },
  created () {
    let data = this.$route.params.changeArticle
    if (data) {
      this.id = data._id
      this.title = data.articleTitle
      this.articleType = data.articleType
      this.tagsList = data.articleTags
      this.content = data.articleContent
    }
  },
  methods: {
    // 所有操作都会被解析重新渲染
    change (value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render
      // console.log(render)
    },
    // 将图片上传到服务器，返回地址替换到md中
    handleAddImg (pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('image', $file)
      this.axios({
        url: 'server url',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((url) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
        * $vm 指为mavonEditor实例，可以通过如下两种方式获取
        * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
        * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
        */
        // $vm.$img2Url(pos, url)
        this.$refs.md.$img2Url(pos, url)
      })
    },
    // 提交
    submit () {
      // console.log(this.content)
      // console.log(this.html)
      this.showAddTag = true
    },
    quit () {
      this.$router.back()
      // this.$router.push('/index')
    },
    // 发表文章
    handlePublish () {
      const userName = localStorage.getItem('username')
      const articleObj = {
        id: this.id,
        articleTitle: this.title,
        articleType: this.articleType,
        articleContent: this.html,
        articleTags: this.tagsList,
        userName: userName
      }
      pushArticle(articleObj).then(res => {
        if (res.data.code === 0 && res.status === 200) {
          this.showAddTag = false
          this.$message.success('发表成功')
          this.quit()
        } else if (res.data.code === 1) {
          localStorage.setItem('token', '')
          this.$router.push('login')
          this.$message.error(res.data.msg)
        }
      }).catch(() => {
        localStorage.setItem('token', '')
        this.$router.push('login')
      })
    },
    // 删除标签
    handleClose (tag) {
      this.tagsList.splice(this.tagsList.indexOf(tag), 1)
    },
    // 添加标签
    addTag () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 完成添加标签
    handleAddTagConfirm () {
      let tagValue = this.tagValue
      if (tagValue) {
        this.tagsList.push(tagValue)
      }
      this.inputVisible = false
      this.tagValue = ''
    }
  }
}
</script>
<style lang="scss">
@import '../../assets/scss/mixin.scss';
.edit-wrapper{
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  height: 100vh;
  width: 100%;
  background: #fff;
  overflow: auto;
  .edit-header{
    position: fixed;
    top: 0;
    left: 0;
    @include flex-row;
    font-size: 0;
    height: 40px;
    width: 100%;
    padding: 5px 20px;
    background: #fff;
    z-index: 1;
    .title{
      font-size: 18px;
      line-height: 40px;
      width: 40px;
      font-weight: bold;
    }
    .tilte-input{
      flex: 1;
      display: inline-block;
      margin: 0 20px;
      padding: 0 10px;
      font-size: 16px;
      border: 1px solid #eee;
      border-radius: 5px;
    }
    .article-type{
      min-width: 200px;
      margin-right: 40px;
      .type{
        margin-right: 20px;
        font-size: 16px;
        line-height: 40px;
        font-weight: bold;
      }
    }
  }
  .mavon-editor{
    margin-top: 50px;
    .markdown-body{
      // margin-top: 50px;
      z-index: 0;
      min-height: 520px!important;
    }
   .v-note-wrapper .v-note-op{
      position: fixed;
      top: 50px;
      left: 0;
      padding: 0 10px;
    }
    .v-note-panel{
      margin-top: 50px;
    }
  }
  .btn-group {
    @include flex-row;
    justify-content: flex-end;
    margin: 5px 50px 5px 0;
    button {
      height: 40px;
      width: 100px;
      padding: 0 16px;
      font-size: 16px;
      border: none;
      border-radius: 4px;
      white-space: nowrap;
      color: #fff;
      cursor: pointer;
    }
    .btn-quit {
      margin-left: 40px;
      background: #aaa;
    }
    .btn-submit{
      background: rgb(51, 7, 245);
    }
  }
  .dialog{
    .el-dialog__body{
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      .el-tag{
        min-width: 40px;
        margin-left: 10px;
        margin-bottom: 5px;
      }
      .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
      }
      .input-new-tag {
        width: 90px;
        margin-left: 10px;
        margin-bottom: 5px;
        vertical-align: bottom;
      }
    }
  }
}
</style>
