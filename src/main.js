import Vue from 'vue'
import App from './App.vue'
// 导入element-ui
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
// 1. 默认索引  文件夹下 存在 index.js index.vue index.json 默认加载这些文件
// 2. 在使用vue-cli的时候 @符号在路径中作为前缀使用的时候 代表src目录
import router from './router/index.js'
Vue.prototype.axios = axios
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)

}).$mount('#app')
