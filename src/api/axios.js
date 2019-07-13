// 配置axios
import axios from 'axios'
const instance = axios.create({
  // 配置对象
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  headers: {
    // json.parse() 将字符串转化为对象取token的值
    Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('toutiao')).token
  }
})

// 导出instence
export default instance
