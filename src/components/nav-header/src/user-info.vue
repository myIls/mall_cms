<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar size="small" :src="circleUrl" />
        <span>{{ name }}</span>
        <el-icon class="el-icon--right">
          <i-ep-arrow-down />
        </el-icon>
      </span>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="SwitchButton" @click="handleSignOut"
            >退出登录</el-dropdown-item
          >
          <el-dropdown-item :icon="User" divided>用户信息</el-dropdown-item>
          <el-dropdown-item :icon="Setting" divided>系统管理</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'
import router from '@/router'

import { SwitchButton, User, Setting } from '@element-plus/icons-vue'

import localCache from '@/utils/cache'

const circleUrl = ref('https://avatars.githubusercontent.com/u/12124478?v=4') // 头像链接

const store = useStore()

const name = computed(() => store.state.login.userInfo.name)

// 处理退出登录
const handleSignOut = () => {
  localCache.deleteCache('token')

  router.push({
    path: '/login'
  })
}
</script>

<style scoped lang="less">
.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;

  span {
    padding-left: 6px;
  }
}
</style>
