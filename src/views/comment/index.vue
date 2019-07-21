<template>
  <div class="con">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <el-table :data="comments">
        <el-table-column label="标题" width="400" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
            <template slot-scope="scope">
                {{scope.row.comment_status?'正常':'关闭'}}
            </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
            <template slot-scope="scope">
               <el-button @click="toggleStatus(scope.row)" v-if="!scope.row.comment_status" type="success" size="mini">打开评论</el-button>
               <el-button @click="toggleStatus(scope.row)" v-else type="danger" size="mini">关闭评论</el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        style="margin-top:20px"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 评论信息
      comments: [],
      // 参数信息
      reqParams: {
        page: 1,
        per_page: 20,
        response_type: 'comment'
      },
      total: 0
    }
  },
  created () {
    // 获取评论信息
    this.getComments()
  },
  methods: {
    // 修改文章评论状态
    toggleStatus (row) {
      const text1 = '你确定要打开该文章的评论状态吗?'
      const text2 = '你确定要关闭该文章的评论状态吗?'
      this.$confirm(row.comment_status ? text2 : text1, '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: { data } } = await this.axios.put('comments/status?article_id=' + row.id, {
          allow_comment: !row.comment_status
        })
        // 请求成功
        this.$message.success('修改评论状态成功')
        // 修改数据驱动视图更新
        row.comment_status = data.allow_comment
      }).catch(() => {

      })
    },
    // 分页
    pager (newPage) {
      this.reqParams.page = newPage
      this.getComments()
    },
    async getComments () {
      const {
        data: { data }
      } = await this.axios.get('articles', { params: this.reqParams })
      this.comments = data.results
      // 获取总条数
      this.total = data.total_count
    }
  }
}
</script>

<style scope lang="less">
</style>
