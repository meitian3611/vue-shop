<template>
  <div class="page-home">
    <el-container class="home-container">
      <!-- 头部区域 -->
      <el-header>
        <div class="home-top">
          <img src="../assets/logo.png" alt="" />
          <span>电商后台管理系统</span>
        </div>
        <el-button @click="exit">退出登录</el-button></el-header
      >
      <!-- 页面主体 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="collapse ? '64px' : '200px'">
          <div class="toggle-button" @click="toggleButton">
            <i class="iconfont iconcaidan"></i>
          </div>
          <!-- 侧边栏菜单区域 -->
          <el-menu
            :collapse-transition="false"
            :collapse="collapse"
            unique-opened
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409bff"
            router
            :default-active="activePath"
          >
            <!-- 一级菜单模板区域 -->
            <el-submenu
              :index="item.id + ''"
              v-for="item in menuList"
              :key="item.id"
            >
              <template slot="title">
                <!-- 图标 -->
                <i :class="icons[item.id]"></i>
                <!-- 文本 -->
                <span>{{ item.authName }}</span>
              </template>
              <!-- 二级菜单模板区域 -->
              <el-menu-item
                :index="'/' + subItem.path"
                v-for="subItem in item.children"
                :key="subItem.id"
                @click="saveNavState('/' + subItem.path)"
              >
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-menu"></i>
                  <!-- 文本 -->
                  <span>{{ subItem.authName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 右侧内容主体 -->
        <el-main>
          <!--路由占位符 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      // 是否折叠
      collapse: false,
      // 被激活的二级链接地址
      activePath: '',
      menuList: [],
      icons: {
        '125': 'iconfont iconyonghuguanli',
        '103': 'iconfont iconquanxianguanli',
        '101': 'iconfont iconshangpinguanli',
        '102': 'iconfont icondingdanguanli',
        '145': 'iconfont iconshujutongji'
      }
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    exit() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 获取所有菜单的数据
    async getMenuList() {
      const { data: res } = await axios.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
    },
    // 点击按钮折叠菜单
    toggleButton() {
      this.collapse = !this.collapse
    },
    // 保存二级菜单链接状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('acticePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="scss">
.page-home {
  height: 100%;
  .home-container {
    height: 100%;
    .el-header {
      background-color: #373d41;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .home-top {
        height: 100%;
        display: flex;
        align-items: center;
        img {
          height: 70%;
        }
        span {
          color: #ffffff;
          font-size: 20px;
          margin-left: 10px;
        }
      }
    }
    .el-aside {
      background-color: #333744;
      .toggle-button {
        color: #ffffff;
        font-size: 24px;
        text-align: center;
        cursor: pointer;
      }
    }
    .el-main {
      background-color: #eaedf1;
    }
    .iconfont {
      margin-right: 10px;
    }
  }
}
</style>
