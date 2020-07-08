// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./appAdmin";
import router from "./router";
import store from "./utils/store";

import ElementUI from "element-ui";
import "./assets/theme/element-variables.scss";

Vue.config.productionTip = false;

// 全局配置 ElementUI 属性
ElementUI.Dialog.props.closeOnClickModal.default=false;

// 分页默认
ElementUI.Pagination.props.layout.default="prev, pager, next, jumper";
ElementUI.Pagination.props.pageSize.default=10;

Vue.use(ElementUI, {
    size: "small",
});

new Vue({
    router,
    store,
    render: t => t(App)
}).$mount("#app");
