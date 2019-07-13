<template>
    <div class="welcome">
        <img src="../../assets/images/welcome.jpg" alt="">
    </div>
</template>

<script>
export default {
  created () {
    this.axios.get('articles').then(res => console.log(res.data))
  }
}
</script>

<style scope lang="less">
.welcome{
    text-align: center;
}
</style>
