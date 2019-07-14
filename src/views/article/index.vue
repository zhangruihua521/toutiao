<template>
  <div class="article">
    <!-- 筛选区域 -->
    <!-- 结果区域 -->
    <el-card>
      <div slot="header">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="/">内容管理</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 筛选条件 -->
      <el-form :v-model="reqParams" label-width="80px" size="small">
        <el-form-item label="状态:">
          <el-radio-group v-model="reqParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道:">
          <el-select v-model="reqParams.channel_id">
            <el-option v-for="item in list" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期:">
            <el-date-picker
                v-model="pubdate"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card></el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        begin_pubdat: null,
        end_pubdate: null
      },
      list: [
        { name: 'java', id: '1' }
      ]

    }
  }
}
</script>

<style scope lang="less">
.el-card {
  margin-bottom: 20px;
}
</style>
