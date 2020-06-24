/**
 * Created by Administrator on 2020/6/19.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import resource from './modules/resource'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        token: null,
        loading: false,
    },
    modules: {
        resource,
    },
    getters
})

export default store
