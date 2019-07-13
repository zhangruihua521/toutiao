// 配置axios
import axios from 'axios'
const instance = axios.create({
  // 配置对象
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  headers: {
    // json.parse() 将字符串转化为对象取token的值
    // Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('toutiao')).token
  }
})
// 请求拦截器
instance.interceptors.request.use((config) => {
// 请求之间做些什么事 config是配置项 如果有token就加头部的信息,如果没token就不加头部的信息
  const user = window.sessionStorage.getItem('toutiao')
  if (user) {
    config.headers = {
      Authorization: 'Bearer ' + JSON.parse(user).token
    }
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
// 响应拦截
instance.interceptors.response.use((response) => {
  // 对响应数据做点什么
  return response
}, (error) => {
// 对响应错误的数据做点什么
// 如果状态码为401,拦截到登陆页
  if (error.response.status === 401) {
    // hash 是url#开始后的字符串
    location.hash('#/login')
  }
  return Promise.reject(error)
})
// 导出instence
export default instance
