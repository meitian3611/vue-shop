<template>
  <div class="page-login">
    <div class="login-box">
      <!-- 头像区域 -->
      <div class="avatar-box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        class="login-form"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont iconuser"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            show-password
            prefix-icon="iconfont iconicon2"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      // 这是表单的验证规则
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginForm)

        if (res.meta.status !== 200) {
          return this.$message({
            message: '账号或密码不正确 ！',
            type: 'error',
            center: true
          })
        }
        this.$message({
          message: '欢迎进入，管理员 ！',
          type: 'success',
          center: true
        })
      })
    }
  }
}
</script>

<style lang="scss">
.page-login {
  background-color: #2b4b6b;
  color: #ffffff;
  height: 100%;
  .login-box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avatar-box {
      width: 130px;
      height: 130px;
      padding: 10px;
      border: 1px solid #eee;
      background-color: #fff;

      border-radius: 50%;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      img {
        background-color: #eee;
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .btns {
      display: flex;
      justify-content: flex-end;
    }
    .login-form {
      box-sizing: border-box;
      padding: 0 20px;
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
}
</style>
