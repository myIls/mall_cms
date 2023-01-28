<template>
  <div class="login-phone">
    <el-form label-width="80px" :rules="rules" :model="phone" ref="formRef">
      <el-form-item label="手机号" prop="id">
        <el-input type="tel" v-model="phone.id" />
      </el-form-item>

      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input type="text" v-model="phone.code" />
          <el-button type="primary" class="btn-code">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'
import { rules } from '../config/phone-config'

export default defineComponent({
  setup() {
    const phone = reactive({
      id: '',
      code: ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const store = useStore()

    const loginAction = () => {
      formRef.value?.validate((isValid) => {
        if (isValid) {
          store.dispatch('login/phoneLoginAction', { ...phone })
        }
      })
    }

    return {
      rules,
      phone,
      formRef,
      loginAction
    }
  }
})
</script>

<style scoped lang="less">
.get-code {
  display: flex;
  .btn-code {
    margin-left: 8px;
  }
}
</style>
