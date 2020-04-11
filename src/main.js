// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/css/reset.css'
import './assets/css/border.css'
import './assets/css/iconfont.css'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 解决移动端300毫秒点击延迟问题
import fastClick from 'fastclick'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.Bus = new Vue()

Vue.use(mavonEditor)
Vue.use(ElementUI)
fastClick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
