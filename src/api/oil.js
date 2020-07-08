/**
 * 角色管理 Api url
 *
 * Created by xxx on 2020/7/1.
 */
import {get,post} from "../utils/http";

export function list(params = {}, config = {contentLoading: true}) {
    return get("/api-base/oil/list", params, config);
}

export function saveOil(data) {
    return post("/api-base/oil/save/", data);
}

export function updateOil(data) {
    return post("/api-base/oil/update/", data);
}

export function getOil(id, config = {contentLoading: true}) {
    return get("/api-base/oil/get/" + id, {}, config);
}

export function deleteOil(id, config = {contentLoading: true}) {
    return get("/api-base/oil/delete/" + id, {}, config);
}





