<template>
  <div id="app">
     <div class="index-nav">
        <v-nav/>
      </div>
      <div class="index-main">
        <transition name="fade">
            <router-view/>
        </transition>
      </div>
  </div>
</template>

<script>
import vNav from '@/components/nav/Nav.vue'

export default {
  name: 'App',
  components: {
    vNav
  }
}
</script>

<style lang="scss" scoped>
@import './assets/scss/mixin.scss';
#app{
  position: relative;
  @include flex-col;
  // height: 100vh;
  width: 100%;
  background: #f5f5f5;
  .index-nav{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
    width:100%;
    height: 60px;;
    background: #fff;
    border-bottom: 1px solid #eee;
    // background: rgb(7, 17, 27);
  }
  .index-main{
    margin-top: 60px;
    width: 100%;
    flex: 1;
    .fade-enter-active, .fade-leave-active {
      // opacity: 1;
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-active{
      opacity: 0;
    }
    .fade-leave-to{
      display: none;
    }
  }
}
</style>
