/**
 * Created by Administrator on 2020/6/20.
 */
import Vue from 'vue'
import App from './appAdmin'
import router from './router'
import store from './utils/store'

import ElementUI from 'element-ui'
import '../static/theme/element-variables.scss'

Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: 'small'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
