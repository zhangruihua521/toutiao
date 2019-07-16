import Mybread from '@/components/my-bread.vue'
import MyChannel from '@/components/my-channel.vue'
export default {
  install (Vue) {
    Vue.component(Mybread.name, Mybread)
    Vue.component(MyChannel.name, MyChannel)
  }
}
