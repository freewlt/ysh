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


// --------------------------------------------------------------
// fetchResource
//
// saveResoucre
//
// getResource
//
// updateResoure
//
// deleteResource
//
// loadResourceTree
// 开发列表查询、添加、修改、删除、提示信息及错误处理
// 导航自动生成、拦截处理、组件封装、eslint

