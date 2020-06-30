/**
 * Created by Administrator on 2020/6/20.
 */
import { get, post } from "../utils/http";

export function fetchResource (params = {}, showLoading = () => {}) {
  return get("/api-base/resource/tree", params, { showLoading });
}

export function saveResource (data, showLoading) {
    return post("/api-base/resource/save", data, { showLoading, headers: { "content-type": "application/x-www-form-urlencoded" } });
}

export function getResource (id) {
    return get("/api-base/resource/get/" + id);
}

export function updateResource (data, showLoading = () => {}) {
    return post("/api-base/resource/update", data, { showLoading });
}

export function deleteResource(id) {
  return get("/api-base/resource/delete/" + id);
}

export function asyncResource(params = {}, showLoading = () => {}) {
    return get("/api-base/resource/async-tree", params, { showLoading });
}


// export function fetchResource(params = {}, loading = () => {}) {
//     return get("/api-base/resource/tree", params, { loading });
// }

// export function saveResource(data, loading) {
//     return post("/api-base/resource/save", data, { loading, headers: { "content-type": "application/x-www-form-urlencoded" } });
// }

// export function getResource(id) {
//     return get("/api-base/resource/get/" + id);
// }

// export function updateResource(data, loading = () => {}) {
//     return post("/api-base/resource/update", data, { loading });
// }

// export function deleteResource(id) {
//     return get("/api-base/resource/delete/" + id);
// }

// export function asyncResource(params = {}) {
//     return get("/api-base/resource/async-tree", params, { loading:false, globalLoading: true  });
// }

