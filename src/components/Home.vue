<template>
  <div class="page-home">
    <el-button @click="exit">退出登录</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    exit() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss">
.page-home {
  height: 100%;
}
</style>
