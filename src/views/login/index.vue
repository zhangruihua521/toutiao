<template>
    <div class="login-container">
        <el-card class="login-box">
            <img src="../../assets/images/logo_index.png" alt="">
            <el-form :model="loginform" :rules="rules" :status-icon="true" ref="loginform">
                <el-form-item prop="mobile">
                    <el-input v-model="loginform.mobile" placeholder="请输入手机号" ></el-input>
                </el-form-item>
                  <el-form-item prop="code">
                    <el-input v-model="loginform.code" placeholder="请输入验码" style="width:240px"></el-input>
                    <el-button style="float:right">发送验证码</el-button>
                </el-form-item>
                  <el-form-item>
                    <el-checkbox :value="true" >我已阅读并同意用户协议和隐私条款</el-checkbox>
                </el-form-item>
                 <el-form-item>
                   <el-button style="width:100%" type="primary" @click="login()">登陆</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>

export default {
  data () {
    // 验证手机号
    const checkmobile = (rule, value, callback) => {
      // 校验逻辑
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机格式不正确!'))
      }
    }
    return {
      loginform: {
        mobile: '13911111111',
        code: '246810'
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkmobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginform.validate((valid) => {
        if (valid) {
          // 提交登陆请求
          this.axios.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginform)
            .then((res) => {
              // 后台返回的数据
              // console.log(res.data)
              // 保存用户的信息,用来判断用户的状态
              // sessionStorage用来保存信息
              window.sessionStorage.setItem('toutiao', JSON.stringify(res.data.data))
              this.$router.push('/')
            })
            .catch(() => {
              this.$message.error('手机号或验证码错误')
            })
        }
      })
    }
  }
}
</script>

<style lang="less">
.login-container{
  width:100%;
  height:100%;
  position: absolute;
  top:0;
  left:0;
  background: url(../../assets/images/login_bg.jpg) no-repeat center/cover;
  .login-box{
    width:400px;
    height:340px;
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    img{
      display:block;
      width:200px;
      margin:10px auto;
     }
    }
}
</style>
