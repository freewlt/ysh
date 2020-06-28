import { get, post } from "../utils/http";

const apiBase = "/api-base/permission";

export function fetchResource (params = {}, showLoading = () => {}) {
    return get(apiBase + "/tree", params, { showLoading });
}

export function saveResource (data, showLoading) {
    return post(apiBase + "/save", data, { showLoading, headers: { "content-type": "application/x-www-form-urlencoded" } });
}

export function getResource (id) {
    return get(apiBase + "/get/" + id);
}

export function updateResource (data, showLoading = () => {}) {
    return post(apiBase + "/update", data, { showLoading });
}

export function deleteResource(id) {
    return get(apiBase + "/delete/" + id);
}

export function asyncResource(params = {}, showLoading = () => {}) {
    return get(apiBase + "/async-tree", params, { showLoading });
}
