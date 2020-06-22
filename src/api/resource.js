/**
 * Created by Administrator on 2020/6/20.
 */
import { get, post } from '../utils/http';

export function fetchResource (params = {}, showLoading = () => {}) {
  return get('/resource/tree', params, { showLoading })
}

export function saveResource (data, showLoading = () => {}) {
    return post('/resource/save', data, { showLoading })
}

export function getResource (id, showLoading = () => {}) {
    return get('/resource/get/' + id, { showLoading })
}

export function updateResource (data, showLoading = () => {}) {
    return post('/resource/update', data, { showLoading })
}

export function deleteResource(id, showLoading = () => {}) {
  return get('/resource/delete/' + id, { showLoading })
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
