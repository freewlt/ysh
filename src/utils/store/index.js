/**
 * Created by Administrator on 2020/6/19.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
      token: null,
      isShow: false
  },
  mutations,
  getters
})

export default store
