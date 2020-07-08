import {get, post} from "../utils/http";

export function listUser(params = {}, config = {contentLoading: true}) {
    return get("/api-base/user/list", params, config);
}

export function saveUser(data) {
    return post("/api-base/user/save", data);
}

export function getUser(id) {
    return get("/api-base/user/get/" + id, {}, {contentLoading: true});
}

export function rePassword(id, config = {contentLoading: true}) {
    return get("/api-base/user/rePassword/" + id, {}, config);
}

export function delUser(id, config = {contentLoading: true}) {
    return get("/api-base/user/delete/" + id, {}, config);
}

export function disableUser(params, config = {contentLoading: true}) {
    return get("/api-base/user/disable", params, config);
}

export function updateUser(data) {
    return post("/api-base/user/update", data);
}

export function getRoles(data) {
    return get("/api-base/role/all", data);
}

export function chekeUsername(params = {}) {
    return get("/api-base/user/check-username", params, {contentLoading: false});
}

export function chekeMobile(params = {}, config = {contentLoading: true}) {
    return get("/api-base/user/check-mobile", params, config);
}

export function updatePassword(params = {}, config = {contentLoading: true}) {
    return post("/api-base/user/updatePwd", params, config);
}


export function getUserInfo(params = {}) {
    return get("/api-base/user/login/user-info", params, {
        headers: {
            "Authorization": "Basic Y2xpZW50XzI6MTIzNDU2"
        }
    });
}












