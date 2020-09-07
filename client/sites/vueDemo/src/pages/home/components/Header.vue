<template>
<div class="header">
<div class="header-left">
    <span class="iconfont back-icon">&#xe658;</span>
</div>
<div class="header-input">
    <span class="iconfont">&#xe63c;</span>
    输入城市/景点/游玩主题</div>
    <router-link to="/city">
      <div class="header-right">
          {{this.city}}
          <span class="iconfont arrow-icon">&#xe6aa;</span>
      </div>
    </router-link>
</div>
</template>

<script>
export default {
  name: 'HomeHeader',
  props: {
    // eslint-disable-next-line no-undef
    city: String
  }
}
</script>

<style lang="stylus" scoped>
@import '../../../assets/styles/varibles.styl'
.header
   display: flex
   line-height:  $headerHeight
   background: $bgColor
   color: #fff
  .header-left
    width: .64rem
    float:left
    .back-icon
      text-align: center
      font-size: .4rem
  .header-input
    flex:  1
    line-height: .64rem
    height:  .64rem
    margin-top:  .12rem
    margin-left: .2rem
    padding-left: .2rem
    background: #fff
    border-radius:  .1rem
    color: #ccc
  .header-right
    width: 1.24rem
    float:  right
    text-align:  center
    color: #fff
    .arrow-icon
      margin-left:-.04rem
      font-size: .24rem
</style>
