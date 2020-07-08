/**
 * 角色管理 Api url
 *
 * Created by wsf on 2020/7/1.
 */
import {get, post} from "../utils/http";

export function list(params = {}, config = {contentLoading: true}) {
    return get("/api-base/role/list", params, config);
}

export function saveRole(data) {
    return post("/api-base/role/save", data);
}

export function updateRole(data) {
    return post("/api-base/role/update", data);
}

export function getRole(id, config = {contentLoading: true}) {
    return get("/api-base/role/" + id, {}, config);
}

export function disabledRole(id, config = {contentLoading: true}) {
    return get("/api-base/role/status/" + id, {}, config);
}

export function deleteRole(id, config = {contentLoading: true}) {
    return get("/api-base/role/delete/" + id, {}, config);
}





