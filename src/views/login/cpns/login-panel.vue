<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>

    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon class="icon-margin-right"><i-ep-user /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>

      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon class="icon-margin-right"><i-ep-iphone /></el-icon>
            <span>手机登录</span>
          </span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button @click="handleLogin" type="primary" class="login-btn">
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

import { loginTabs } from '../types'

const isKeepPassword = ref(false)

const accountRef = ref<InstanceType<typeof LoginAccount>>()
const phoneRef = ref<InstanceType<typeof LoginPhone>>()

const currentTab = ref<loginTabs>('account') // 当前菜单栏名称

const handleLogin = () => {
  if (currentTab.value === 'account') {
    accountRef.value?.loginAction(isKeepPassword.value)
  } else {
    phoneRef.value?.loginAction()
  }
}
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;

  transform: translateY(-25%);

  .title {
    text-align: center;
  }

  .icon-margin-right {
    margin-right: 0.25em;
    vertical-align: middle;
  }

  .account-control {
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
