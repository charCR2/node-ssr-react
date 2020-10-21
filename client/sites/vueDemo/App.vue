<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    // 在客户端打印一下state
    console.log(this.$store.state)
  }

}
</script>

<style>

</style>
