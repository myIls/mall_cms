<template>
  <div class="page-search">
    <hu-form :="searchFormConfig" v-model="formData">
      <template v-slot:header>
        <h2>高级检索</h2>
      </template>
      <template v-slot:footer>
        <div class="handle-btns">
          <el-button type="info" :icon="Refresh" @click="handleResetClick">
            重置
          </el-button>

          <el-button type="primary" :icon="Search" @click="handleQueryClick">
            查询
          </el-button>
        </div>
      </template>
    </hu-form>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, defineEmits, defineExpose } from 'vue'
import { Refresh, Search } from '@element-plus/icons-vue'
import HuForm from '@/base-ui/form'
import { IForm } from '@/base-ui/form'

const props = defineProps({
  searchFormConfig: {
    type: Object as PropType<IForm>,
    required: true
  }
})

const emit = defineEmits(['resetBtnClick', 'queryBtnClick'])

// 动态获取所有表单项字段
const formOriginData: any = {}
for (const item of props.searchFormConfig.formItems) {
  formOriginData[item.field] = ''
}
const formData = ref(formOriginData)

// 重置按钮
const handleResetClick = () => {
  for (const key in formOriginData) {
    formData.value[key] = formOriginData[key]
  }
  emit('resetBtnClick')
}

// 查询按钮
const handleQueryClick = () => {
  emit('queryBtnClick', formData.value)
}

defineExpose({
  formData
})
</script>

<style scoped lang="less">
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
