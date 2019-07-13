// 导入路由模块
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
import Home from '../views/home/index.vue'
import Welcome from '../views/welcome/index.vue'
import NotFound from '../views/404/index.vue'
Vue.use(VueRouter)
// 初始化路由对象
const router = new VueRouter({
  // 配置路由规则
  routes: [
    { name: 'login', path: '/login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        { name: 'welcome', path: '/', component: Welcome }
      ] },
    // 有很多规则,当没有找到页面的时候出现404
    { name: 'notfound', path: '*', component: NotFound }
  ]
})
// 设置拦截未登录的路由 前置守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') next()
  // 如果存储了用户信息,放行
  const user = window.sessionStorage.getItem('toutiao')
  if (user) return next()
  next('/login')
})

// 导出router
export default router
