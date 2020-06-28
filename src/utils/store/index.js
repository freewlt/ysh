/**
 * Created by Administrator on 2020/6/19.
 */
import Vue from "vue";
import Vuex from "vuex";

import getters from "./getters";
import resource from "./modules/resource";
import permission from "./modules/permission";

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        token: null,
        loading: false,
    },
    modules: {
        resource,
        permission,
    },
    getters
});

export default store;
