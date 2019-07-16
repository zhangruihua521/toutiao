<template>
  <el-select :value="value" @change="fn">
    <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      // 频道列表
      list: []
    }
  },
  created () {
  // 获取频道的数据
    this.getChannel()
  },
  methods: {
    fn (value) {
      // value当前选中的值
      this.$emit('input', value)
    },
    // 获取频道的数据
    async getChannel () {
      // data的响应的内容 {data:{data:{channels:[id:,name:]}}}
      const {
        data: { data }
      } = await this.axios.get('channels')
      this.list = data.channels
    }
  }
}
</script>

<style>
</style>
