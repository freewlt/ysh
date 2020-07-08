/**
 * Created by Administrator on 2020/6/19.
 */
import axios from "axios";
import store from "@/utils/store";
import router from "@/router";

import { Loading, Message } from "element-ui";

const config = {
    baseURL: process.env.VUE_APP_URL,
    timeout: 20,
    validateStatus: function(status) {
        return status >= 200 && status < 500; // 默认的
    },
};

const service = axios.create(config);

// 跨域请求，允许保存cookie
service.defaults.withCredentials = false;

// 进度条
let globalShowLoading;

function startLoading() {
    globalShowLoading = Loading.service({
        lock: true,
        text: "加载中…",
        background: "rgba(0, 0, 0, 0.7)"
    });
}

function endLoading() {
    globalShowLoading.close();
}

// request拦截器
service.interceptors.request.use(
    config => {

        if (config.contentLoading == true) {
            store.dispatch("contentLoading", true);
        } else if (config.globalLoading == true) {
            startLoading();
        } else {
            if (config.globalLoading !== undefined) {
                store.dispatch("contentLoading", false);
                endLoading();
            }
        }

        if(config.timeout > 60000){
            Message({
                message: "请求超时",
                type: "error"
            });
            endLoading();
        }

        return config;
    },
    err => {
        store.dispatch("contentLoading", false);
        return Promise.reject(err);
    }
);

// 响应拦截器
service.interceptors.response.use(
    res => {

        if (res.config.contentLoading == true) {
            store.dispatch("contentLoading", false);
        }
        if (res.config.globalLoading == true) {
            endLoading();
        }

        if (res.status === 401) {
            router.push({ path: "/login" });
        }
        let tipMessage = res.data.message + `[${res.data.errorMsg}]`;
        if (res.status !== 200 || res.data.result !== "SUCCESS") {
            Message({
                message: tipMessage,
                type: "error"
            });
        }
        if (res.status == 200 || res.data.result === "SUCCESS") {
            return res;
        }

    },
    err => {
        Message({
            message: err,
            type: "error"
        });
        store.dispatch("contentLoading", false);
        // endLoading();

        return Promise.reject(err);
    }
);

function get(url, params = {}, config) {
    return service.get(url, { params, ...config });
}

function post(url, data, config) {
    return service.post(url, data, config);
}

function put(url, data, config) {
    return service.put(url, data, config);
}

export { get, post, put };

export default service;