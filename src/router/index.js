// 导入路由模块
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
Vue.use(VueRouter)
// 初始化路由对象
const router = new VueRouter({
  // 配置路由规则
  routes: [
    { name: 'login', path: '/login', component: Login }
  ]
})

// 导出router
export default router
