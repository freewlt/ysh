/**
 * Created by Administrator on 2020/6/19.
 */
import axios from 'axios'
import store from '@/utils/store'
import router from '@/router'

import { Loading, Message } from 'element-ui'

 
const locationURl = 'http://192.168.0.114:7000/api-base';
const config = {
  baseURL: process.env.NODE_ENV === 'production' ? process.env.BASE_API : locationURl,
  timeout: 1000
}

const service = axios.create(config)

// 跨域请求，允许保存cookie
service.defaults.withCredentials = true

// 进度条
let globalLoading

function startLoading () {
  globalLoading = Loading.service({
    lock: true,
    text: '加载中…',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading () {
  setTimeout(() => {
    globalLoading.close()
  }, 2000)
}

let needLoadingRequestCount = 0
export function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

// request拦截器
service.interceptors.request.use(
  config => {
    // startLoading()
    const isToken = (config.headers || {}).isToken === false
    let token = store.getters.access_token
    if (token && !isToken) {
      config.headers['Authorization'] = 'Bearer ' + token// token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// 响应拦截器
service.interceptors.response.use(
  res => {
    // endLoading ()
    if (res.status === 401) {
        router.push({path: '/login'})
    }
    let tipMessage = res.data.message + `[${res.data.errorMsg}]`
    if (res.status !== 200 || res.data.result !== 'SUCCESS') {
       Message({
        message: tipMessage,
        type: 'error'
      });
      return Promise.reject(new Error(res.data.message))
    }
    if (res.status == 200 || res.data.result === 'SUCCESS') {
          return res
    }
  },
  err => {
    // endLoading ()
    return Promise.reject(err)
  }
)

const wLoading = (callback, showLoading) => {
  return new Promise((resolve, reject) => {
    showLoading(true)
    // startLoading()
    callback().then(response => {
      showLoading(false)
      // endLoading()
      resolve(response.data)
    },
    err => {
      showLoading(false)
      // endLoading()
      reject(err)
    }
    )
  })
}

const get = (url, params = {}, {showLoading} = { showLoading: () => {} }) => {
  return wLoading(() => service.get(url, { params, showLoading }), showLoading)
}

const post = (url, data, {showLoading} = { showLoading: () => {} }) => {
  return wLoading(() => service.post(url, data, { showLoading }), showLoading)
}
// const post = (url, data, {showLoading} = { showLoading: () => {} }) => {
//   return wLoading(() => service.post(url, {data, showLoading}), showLoading)
// }

const patch = (url, data, showLoading = () => {}) => {
  return wLoading(() => service.patch(url, data, { showLoading }), showLoading)
}

const put = (url, data, {showLoading} = () => {}) => {
  return wLoading(() => service.put(url, data, { showLoading }), showLoading)
}

export { get, post, patch, put }
export default service
