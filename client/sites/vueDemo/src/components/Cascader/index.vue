<template>
  <div class="cascader-container">
    <ul>
        <item v-for="(model, index) in options" :model="model" :key="index" v-on="$listeners"></item>
    </ul>
  </div>
</template>

<script>
import item from './item'
export default {
    components: {item},
    props: {
        options: Array,
        
    },
}
</script>
<style>
.cascader-container{
  border-radius: 3px;
  box-shadow: #ccc 0px 0px 10px 1px;
  padding: 5px 0;
  box-sizing: border-box;
  background: #fff;

  cursor: pointer;
}
</style>