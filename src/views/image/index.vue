<template>
  <div class="con">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div style="margin-bottom:20px">
        <el-radio-group v-model="reqParams.collect" size="small"  @change="search()">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
          type="success"
          style="float:right"
          size="small"
          @click="dialogVisible = true"
        >添加素材</el-button>
      </div>
      <!-- 图片列表 -->
      <ul class="img-list">
        <li v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="fot">
            <span class="el-icon-star-off" :class="{red:item.is_collected}" @click="toggle(item)"></span>
            <span class="el-icon-delete" @click="del(item.id)"></span>
          </div>
        </li>
      </ul>
      <el-pagination
        v-if="total>reqParams.per_page"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
    <!-- 对话框 -->
    <el-dialog title="添加素材" :visible.sync="dialogVisible" width="300px">
      <el-upload
        class="avatar-uploader"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="headers"
        :show-file-list="false"
        :on-success="handleSuccess"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 参数对象
      reqParams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      // 图片列表
      images: [],
      total: 0,
      // 添加素材相关数据
      dialogVisible: false,
      imageUrl: null,
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(window.sessionStorage.getItem('toutiao')).token
      }
    }
  },
  created () {
    this.getImage()
  },
  methods: {
    // 删除素材
    del (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.axios.delete('user/images/' + id)
        this.$message.success('删除成功')
        // 删除成功,重新加载页面
        this.getImage()
      }).catch(() => {

      })
    },
    // 切换到收藏
    search () {
      this.getImage()
    },
    // 添加收藏和取消收藏,发送请求
    // true是前台收藏了,后台中false-取消收藏，true-添加收藏 ,所以取反
    async  toggle (item) {
      const { data: { data } } = await this.axios.put('user/images/' + item.id,
        { collect: !item.is_collected })
      // 操作成功
      this.$message.success('操作成功')
      // 白色改成红色,红色改成白色   把当前的图片的状态改成操作后  ,后台给的状态
      item.is_collected = data.collect
    },
    // 上传成功时
    handleSuccess (res) {
    //   console.log(res)
    // 提示上传成功 预览两秒后关闭对话框,
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      window.setTimeout(() => {
        // 自动关闭对话框,然后渲染数据
        this.dialogVisible = false
        this.getImage()
        // 再次上传图片的时候,不在显示之间的图片,显示的是之间的按钮
        this.imageUrl = null
      }, 2000)
    },
    // 分页
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImage()
    },
    async getImage () {
      const {
        data: { data }
      } = await this.axios.get('user/images', { params: this.reqParams })
      // 获取数据成功
      this.images = data.results
      // 获取图片总个数
      this.total = data.total_count
    }
  }
}
</script>

<style scope lang="less">
.img-list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  li {
    width: 160px;
    height: 160px;
    border: 1px dashed #ddd;
    float: left;
    margin-right: 50px;
    margin-bottom: 20px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
    .fot {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      text-align: center;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
.el-pagination {
  text-align: center;
}
</style>
