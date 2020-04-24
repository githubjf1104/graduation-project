<template>
    <div class="no-data" v-if="datalength===0">
      暂无数据
    </div>
</template>
<script>
export default {
  name: 'noData',
  props: {
    datalength: Number
  }
}
</script>
<style lang='scss' scoped>
 .no-data{
    height: 35px;
    line-height: 35px;
    font-size: 16px;
    text-align: center;
    border-bottom: 1px solid #eee;
  }
</style>
