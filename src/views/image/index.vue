<template>
  <div class="con">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <div style="margin-bottom:20px">
        <el-radio-group v-model="reqParams.collect" size="small">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" style="float:right" size="small">添加素材</el-button>
      </div>
      <!-- 图片列表 -->
      <ul class="img-list">
        <li v-for="item in 10" :key="item">
          <img src="../../assets/images/avatar.jpg" alt />
          <div class="fot">
            <span class="el-icon-star-off"></span>
            <span class="el-icon-delete"></span>
          </div>
        </li>
      </ul>
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 参数对象
      reqParams: {
        collect: false
      }
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
      }
    }
  }
}
.el-pagination {
    text-align: center;
}
</style>
