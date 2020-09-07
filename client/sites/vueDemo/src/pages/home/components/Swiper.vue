/* eslint-disable vue/valid-v-for */
<template>
<div class="swiper" border-bottom>
  <swiper :options="swiperOption" class="border-bottom" v-if="showSwiper">
      <swiper-slide v-for="item of list" :key="item.id">
          <img class="swiper-img" :src="item.imgUrl" />
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
</div>
</template>

<script>
export default {
  name: 'HomeSwiper',
  props: {
    list: Array
  },
  data () {
    return {
      swiperOption: {
        pagination: '.swiper-pagination',
        loop: true
      }
    }
  },
  computed: {
    showSwiper () {
      return this.list.length
    }
  }
}
</script>

<style lang="stylus" scoped>
.swiper >>> .swiper-pagination-bullet
   background-color: #fff !important
.swiper
  overflow: hidden
  width: 100%
  height: 0
  padding-bottom: 25.6%
  background-color:#eee
  .swiper-img
    width: 100%
</style>
