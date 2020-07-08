import { get, post } from "../utils/http";

export function fetchPermission(params = {}, config = {contentLoading: true}) {
    return get("/api-base/permission/tree", params, config);
}

export function savePermission(data) {
    return post("/api-base/permission/save", data, {
        headers: { "content-type": "application/x-www-form-urlencoded" }
    });
}

export function getPermission(id, config = {contentLoading: true}) {
    return get("/api-base/permission/get/" + id, {}, config);
}

export function updatePermission(data) {
    return post("/api-base/permission/update", data);
}

export function deletePermission(id, config = {contentLoading: true}) {
    return get("/api-base/permission/delete/" + id, {}, config);
}

export function asyncPermission(params = {}, config = {contentLoading: true}) {
    return get("/api-base/permission/async-tree", params, config);
}

export function uploadPermission(data) {
    return post("/api-file/file/upload", data);
}
