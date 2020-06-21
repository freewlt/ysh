/**
 * Created by Administrator on 2020/6/20.
 */
import { get, post } from '@/utils/http'
// import store from '@/utils/store'
// //import * as types from '@/utils/store/types'
//
// const showLoading = (show) => {
//   _this.$store.commit(ISSHOW, show);
// }

export function fetchMenu (params = {}, showLoading = () => {}) {
  return get('/resource/tree', params, { showLoading })
}
export function addMenu (data, showLoading = () => {}) {
  return post('/resource/save', data, { showLoading })
}
export function updateResource (data, showLoading = () => {}) {
  return post('/resource/update', data, { showLoading })
}
export function saveResource (data, showLoading = () => {}) {
  return post('/resource/save', data, { showLoading })
}
export function getResource (id, showLoading = () => {}) {
  return get('/resource/get/' + id, { showLoading })
}
export function editMenu (params = {}, showLoading = () => {}) {
  return get('/resource/tree', params, { showLoading })
}
export function deleteTreeData (id, showLoading = () => {}) {
  return get('/resource/delete/' + id, { showLoading })
}
