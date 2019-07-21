<template>
  <div class="article-con">
    <el-card>
      <div slot="header">
        <my-bread>{{articleId ?'修改':'发布'}}文章</my-bread>
      </div>
      <el-form :model="articleForm" label-width="100px">
        <el-form-item label="标题:">
          <el-input style="width:400px" v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容:">
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面:">
          <el-radio-group v-model="articleForm.cover.type" @change="changeType">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 图片按钮 -->
          <!-- 单图 -->
          <div v-if="articleForm.cover.type === 1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <!-- 三图 -->
          <div v-if="articleForm.cover.type === 3">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
            <my-image v-model="articleForm.cover.images[1]"></my-image>
            <my-image v-model="articleForm.cover.images[2]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道:">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="!articleId">
          <el-button type="primary" @click="publish(false)">发表</el-button>
          <el-button @click="publish(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button type="primary" @click="edit(false)">修改</el-button>
          <el-button @click="edit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 导入文本编译器的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      // 文本编译器对象
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],

            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }]
          ]
        }
      },
      // 提交给后台的文章数据
      articleForm: {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null,
        articleId: null
      }
    }
  },
  created () {
    this.articleId = this.$route.query.id
    // 可能拿不到,当你是发布时
    // 内容填充,获取文章的数据
    if (this.articleId) {
      this.getArticle()
    }
  },
  // 在内容管理点击修改的时候,跳转到修改发布的页面,再点击发布文章的时候,显示的还是修改的页面,
  // 监听参数是否改变,重新渲染数据 ,监听$route
  watch: {
    $route () {
      this.articleId = null
      this.articleForm = {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      }
    }
  },
  methods: {
    // 获取地址的键值对传参 $route.query.id
    // 如果有id就是修改,没有就是发布
    // 面包屑文字切换,修改时需要获取内容,内容填充 ,按钮需要切换
    // 获取文章的数据
    async getArticle () {
      const {
        data: { data }
      } = await this.axios.get('articles/' + this.articleId)
      this.articleForm = data
    },
    // 修改文章或存入草稿
    async edit (draft) {
      await this.axios.put(`articles/${this.articleId}?draft=${draft}`, this.articleForm)
      this.$$message.success(draft ? '存入草稿成功' : '修改成功')
      this.$router.push('/article')
    },
    // 发布文章或存入草稿
    async publish (draft) {
      await this.axios.post(`articles?draft=${draft}`, this.articleForm)
      // 如果draft为true时存入草稿,为false时发布成功\
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      // 跳转到内容管理
      this.$router.push('/article')
    },
    // 重新选择图片时,清空数据
    changeType () {
      this.articleForm.cover.images = []
    }
  }
}
</script>

<style scope lang="less">
</style>
