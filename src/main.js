import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
// 引入axios
import axios from 'axios'
// 全局配置根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 在请求头挂载数据验证 token
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 最后必须 return config
  return config
})
// 在原型上绑定 axios方法进行调用
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
