<template>
  <div class="article">
    <!-- 筛选区域 -->
    <!-- 结果区域 -->
    <el-card>
      <div slot="header">
        <my-bread>内容管理</my-bread>
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
           <!-- :value="reqParams.channel_id"  @input="把改变的数据设置给reqParams.channel_id" -->
          <my-channel v-model="reqParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期:">
          <el-date-picker
            @change="changeDate"
            value-format="yyyy-MM-dd"
            v-model="dateValues"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="filters">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header">
        根据筛选条件共查询到
        <b>{{total}}</b>条结果：
      </div>
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:100px;heigth:75px">
              <div slot="error">
                <img src="../../assets/images/error.gif" alt width="100" height="75" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <!-- {{scope.row.id}} -->
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
            <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button plain type="primary" @click="edit(scope.row.id)" icon="el-icon-edit" circle></el-button>
            <el-button plain type="danger" @click="del(scope.row.id)" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="box">
        <!-- total总条数 -->
        <el-pagination
          background
          layout="prev, pager, next"
          @current-change="pager"
          :current-page="reqParams.page"
          :page-size="reqParams.per_page"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 提交后的筛选条件数据
      reqParams: {
        // 当前页数
        page: 1,
        // 每页数量
        per_page: 20,
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
      },
      // 文章列表数据
      articles: [],
      // 日期数据
      dateValues: [],
      // 获取总条数
      total: 0
    }
  },
  created () {
    // 获取文件列表的数据
    this.getArticle()
  },
  methods: {
    // 编辑
    edit (id) {
      this.$router.push(`/publish?id=${id}`)
    },
    // 删除
    del (id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.axios.delete(`articles/${id}`)
        this.message.success('删除成功')
        this.getArticle()
      }).catch(() => {

      })
    },
    // 点击切换当前页
    pager (newPage) {
      // 提交当前页吗给后台,才能获取对应的数据
      this.reqParams.page = newPage
      this.getArticle()
    },
    // 点击筛选的时候,根据筛选条件重新渲染页面
    filters () {
      // 在当前页码为6时,点击筛选条件,应返回到第一页
      this.reqParams.page = 1
      this.getArticle()
    },
    // 获取日期的数据 组件绑定值。格式与绑定值一致
    changeDate (values) {
      this.reqParams.begin_pubdate = values[0]
      this.reqParams.end_pubdate = values[1]
    },

    // 获取文件列表的数据
    // post 传参  post('url',{参数对象})
    // get 传参 get('url?key=value&....') get('url',{params:{参数对象}})
    async getArticle () {
      const {
        data: { data }
      } = await this.axios.get('articles', { params: this.reqParams })
      this.articles = data.results
      // 获取总条数
      this.total = data.total_count
    }
  }
}
</script>

<style scope lang="less">
.el-card {
  margin-bottom: 20px;
}
.box {
  margin-top: 20px;
  text-align: center;
}
</style>
