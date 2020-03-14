<template>
  <div id="app">
     <div class="index-nav">
        <v-nav/>
      </div>
      <div class="index-main">
        <router-view/>
      </div>
  </div>
</template>

<script>
import vNav from '@/components/home/nav/nav.vue'
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
  height: 100%;
  width: 100%;
  .index-nav{
    width:100%;
    height: 60px;;
  }
  .index-main{
    flex: 1;
    width:100%;
  }
}
</style>
