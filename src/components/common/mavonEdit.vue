<template>
    <div class="mavon">
      <mavon-editor
        class="md"
        :value="content"
        :subfield = "false"
        :defaultOpen = "'preview'"
        :toolbarsFlag = "false"
        :editable="false"
        :scrollStyle="true"
        :ishljs = "true">
      </mavon-editor>
    </div>
</template>
<script>
export default {
  name: 'mavonEdit',
  props: {
    content: {
      type: String
    }
  }
}
</script>
<style lang="scss" scoped>
.mavon{
  .markdown-body{
    z-index: 0;
    min-height: 100px!important;
  }
  .v-note-wrapper.shadow {
    box-shadow: none!important;
  }
}
</style>
