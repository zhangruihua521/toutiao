<template>
  <el-container class="home-container">
    <el-aside :width="collapse?'64px':'200px'" class="my-aside">
      <div class="logo" :class="{close:collapse}"></div>
      <el-menu
      router
      style="border-right:none"
        default-active="/"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="collapse"
        :collapse-transition="false"
        >
      <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span>首页</span>
      </el-menu-item>
       <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span>内容管理</span>
      </el-menu-item>
       <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span>素材管理</span>
      </el-menu-item>
       <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span>发布文章</span>
      </el-menu-item>
       <el-menu-item index="/comment">
          <i class="el-icon-s-comment"></i>
          <span>评论管理</span>
      </el-menu-item>
       <el-menu-item index="/fans">
          <i class="el-icon-s-cooperation"></i>
          <span>粉丝管理</span>
      </el-menu-item>
     <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span>个人设置</span>
      </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="my-header">
        <span class="el-icon-s-fold" @click="toggleMenu()"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <el-dropdown style="float:right">
          <span class="el-dropdown-link" >
              <img src="../../assets/images/avatar.jpg" alt="" style="vertical-align:middle" width="30" height="30">
           <span style="vertical-align:middle;padding-left:5px">黑马小妹</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 二级路由要显示的位置 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      // false是展开,true是收起
      collapse: false
    }
  },
  methods: {
    toggleMenu () {
      this.collapse = !this.collapse
    }
  }
}
</script>
<style  lang="less">
.home-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .my-aside {
    background: #002033;
    .logo{
      width:100%;
      height: 60px;
      //背景图定位/背景图尺寸
      background: #0333 url('../../assets/images/logo_admin.png') no-repeat center/140px auto;
    }
    .close{
      background: url('../../assets/images/logo_admin_01.png') no-repeat;
      font-size: 36px auto;
    }
  }
  .my-header {
    border-bottom: 1px solid #ddd;
    line-height: 60px;
    .el-icon-s-fold {
      font-size: 26px;
      vertical-align: middle;
    }
    .text {
      margin-left: 10px;
      vertical-align: middle;
    }
  }
}
</style>
