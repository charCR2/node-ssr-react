import Vue from 'vue'
import Vuex from 'vuex'

let initState = global.__INIT_STATE__

if(!initState) initState = {
  city: '上海',
}
const store = {

  state: initState,
  mutations :{
    changeCity (state, city) {
      state.city = city
      // localStorage.city = city
    },
  },
  actions: {

  }
};
Vue.use(Vuex)
if(!initState) store = new Vuex.Store(store)
export default store
