<template>
  <div class="image-con">
    <!-- 图片按钮 -->
    <div class="image-btn">
      <!-- 当父组件没有传value图片地址时,就使用默认的 -->
      <img :src="value || defaultImage" @click="open()" />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="700px" height="500px">
      <!-- //tabs切换 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <div class="ss">
            <el-radio-group v-model="reqParams.collect" size="small" @change="search()">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>

          <!-- //图片列表 -->
          <div
            class="image-item "
            v-for="item in images"
            :key="item.id"
            :class="{selected:selectedImageUrl===item.url}"
            @click="selected(item.url)"
          >
            <img :src="item.url" alt />
          </div>
          <!-- //分页 -->
          <el-pagination
            v-if="total>reqParams.per_page"
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="pager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">
          <!-- 上传图片 -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleSuccess"
            name="image"
          >
            <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmImage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import defaultImage from '../assets/images/default.png'
export default {
  name: 'my-image',
  data () {
    return {
      // 提交给后台的数据
      reqParams: {
        // 是否删除
        collect: false,
        per_page: 8,
        page: 1
      },
      headers: {
        Authorization:
          'Bearer ' + JSON.parse(window.sessionStorage.getItem('toutiao')).token
      },
      // 控制对话框的显示隐藏
      dialogVisible: false,
      // 控制选中的选项卡
      activeName: 'image',
      // 图片列表
      images: [],
      // 总个数
      total: 0,
      // 上传图片后预览的地址
      uploadImageUrl: null,
      // 选中的当前的图片地址
      selectedImageUrl: null,
      // 你选中的图片  默认的是图片
      // 注意：webpack不会去打包在数据中定义的地址对应的资源，打包标签上的src或url的资源
      // 注意：本地的资源不会去打包，如果是网络资源就没关系。
      // 自己主动导入 你需要的图片资源
      // value: dafaultImage
      defaultImage
    }
  },
  // 父组件中的值传入到子组件中
  props: ['value'], // 只读的,不能修改
  methods: {
    // 确认封面图
    confirmImage () {
      // 判断如果是素材库, 使用selectedImageUrl作为封面图
      // 如果是上传图片,使用uploadImageUrl作为封面图
      if (this.activeName === 'image') {
        // 如果没有选择,提示请选择素材
        if (!this.selectedImageUrl) return this.$message.warning('请选择素材')
        // this.value = this.selectedImageUrl
        // 子组件中的值传入到父组件中
        this.$emit('input', this.selectedImageUrl)
      } else {
        if (!this.uploadImageUrl) return this.$message.warning('请上传图片')
        // this.value = this.uploadImageUrl
        this.$emit('input', this.uploadImageUrl)
      }
      // 关闭对话框
      this.dialogVisible = false
    },
    // 选中图片根据唯一的标识url来进行判断,如果一致选中,不一致,不选中
    selected (url) {
      this.selectedImageUrl = url
    },
    // 上传成功后的回调函数
    handleSuccess (res) {
      this.uploadImageUrl = res.data.url
    },
    // 渲染图片数据
    async getImage () {
      const {
        data: { data }
      } = await this.axios.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    // 分页
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImage()
    },
    // 切换全部和收藏
    search () {
      this.reqParams.page = 1
      this.getImage()
    },
    // 打开对话框
    open () {
      this.dialogVisible = true
      // 再次打开的时候清空图片
      this.selectedImageUrl = ''
      this.uploadImageUrl = ''
      // 做其他的事情,渲染素材列表
      this.getImage()
    }
  }
}
</script>

<style scope lang="less">
.image-item {
  width: 150px;
  height: 120px;
  border: 1px dashed #ddd;
  display: inline-block;
  margin-top: 10px;
  margin-right: 10px;
  position: relative;
  &.selected {
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2) url(../assets/images/selected.png)
        no-repeat center / 50px 50px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    //属性的作用：图片填充的规则，等比例缩放 完整显示在容器内 css3
    object-fit: contain;
  }
}
.image-btn {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
