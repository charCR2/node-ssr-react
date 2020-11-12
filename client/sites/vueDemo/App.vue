<template>
  <div class="example">
    <cascader :options='list' @click="handleClick"></cascader>
  </div>
</template>

<script>
import cascader from './src/components/Cascader'
  export default {
    name: 'CustomShow',
    components: { cascader },
    data() {
      return {
        list: [
          {
              "id": "1",
              "menuName": "项目管理",
              icon: 'iconfont header-icon',
              "childTree": [{
                  "menuName": "项目进度",
                  "childTree": [{
                      "menuName": "项目一",
                      "childTree": [{ "menuName": "详细信息" }]
                  }]
              }, {
                  "menuName": "任务安排"
              }]
          }, 
          {
              "id": "2",
              "menuName": "数据统计"
          }, 
          {
              "id": "3",
              "menuName": "人员管理"
          }]
      }
    },
    methods: {

      handleClick( model ) {
        console.log(model)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  main-color = #46a0fc
  main-color-bright = #ef5350
  .example
    background: #eee
    width 100%
    height 100vh
    display flex
    justify-content center
    align-items center
  .buttons
    padding: 5px 10px
    border-left: 1px solid main-color
    border-right: 1px solid main-color
    background-color: #fff
    &.bright
      border-color: main-color-bright
  .box
    position: relative
    width: 100%
    height: 120px
    line-height: 120px



</style>