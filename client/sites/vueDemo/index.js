// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './src/router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import store from './src/store'
import 'swiper/dist/css/swiper.css'
import './src/assets/styles/reset.css'
import './src/assets/styles/border.css'
import './src/assets/styles/iconfont.css'
import fastClick from 'fastClick'


Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(VueAwesomeSwiper)


/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
