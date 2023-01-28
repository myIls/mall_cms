<template>
  <div class="login-account">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { defineExpose } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'
import localCache from '@/utils/cache'

import { rules } from '../config/account-config'

const account = reactive({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('pwd') ?? ''
})

const formRef = ref<InstanceType<typeof ElForm>>()

const store = useStore()

const loginAction = (isKeepPassword: boolean) => {
  formRef.value?.validate((isValid) => {
    if (isValid) {
      store.dispatch('login/accountLoginAction', { ...account })

      // 本地缓存
      if (isKeepPassword) {
        localCache.setCache('name', account.name)
        localCache.setCache('pwd', account.password)
      } else {
        localCache.deleteCache('name')
        localCache.deleteCache('pwd')
      }
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style scoped></style>
