<template>
  <div id="app">
     <div class="index-nav">
        <v-nav/>
      </div>
      <div class="index-main">
        <router-view :articlelist="articleList"/>
      </div>
  </div>
</template>

<script>
import vNav from '@/components/nav/nav.vue'
const CODE_OK = 200

export default {
  name: 'App',
  components: {
    vNav
  },
  data () {
    return {
      articleList: []
    }
  },
  created () {
    this.getArticleData()
  },
  methods: {
    getArticleData () {
      this.$axios.get('/api/article').then((res) => {
        if (res.status === CODE_OK && res.data.code === CODE_OK) {
          this.articleList = JSON.parse(JSON.stringify(res.data.data))
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './assets/scss/mixin.scss';
#app{
  position: relative;
  @include flex-col;
  // height: 100vh;
  width: 100vm;
  background: #f5f5f5;
  @media screen and (min-height: 0px) and (max-height: 100vm) {
    height: 100vh;
  }
  .index-nav{
    width:100%;
    height: 60px;;
    background: #fff;
    border-bottom: 1px solid #eee;
  }
  .index-main{
    width: 100%;
    flex: 1;
    overflow: hidden;
  }
}
</style>
