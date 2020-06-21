import {getStore, setStore} from '../../localStorage'

const user = {
  state: {
    isShow: false,
    access_token: getStore('access_token') || ''
  },
  actions: {
    // 注销session
    FedLogOut ({commit}) {
      return new Promise(resolve => {
        commit('SET_ACCESS_TOKEN', '')
        resolve()
      })
    }
  },
  mutations: {
    // loading是否显示
    isShow: (state, data) => {
      state.isShow = data
    },
    SET_ACCESS_TOKEN: (state) => {
      setStore({
        name: 'access_token',
        content: state.access_token,
        type: 'session'
      })
    }
  }

}
export default user
