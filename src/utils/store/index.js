/**
 * Created by Administrator on 2020/6/19.
 */
import Vue from "vue";
import Vuex from "vuex";

import contentLoading from "./modules/contentLoading";

Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        contentLoading,
    },
});

export default store;
