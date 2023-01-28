<template>
  <div class="page-modal">
    <el-dialog
      :title="title"
      width="30%"
      destroy-on-close
      center
      v-model="dialogVisible"
    >
      <hu-form :="formConfig" v-model="formData"></hu-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, defineExpose } from 'vue'
import { ElMessage } from 'element-plus'

import 'element-plus/theme-chalk/el-message.css'

import HuForm from '@/base-ui/form'
import { IForm } from '@/base-ui/form'
import { useStore } from '@/store'

const props = defineProps({
  pageName: {
    type: String,
    required: true
  },
  title: {
    title: String,
    default: '标题'
  },
  formConfig: {
    type: Object as PropType<IForm>,
    required: true
  },
  otherInfo: {
    type: Object,
    default: () => ({})
  }
})

const dialogVisible = ref(false)
const defaultData = ref<any>({}) // 默认传入的数据
const formData = ref<any>({})

watch(defaultData, (newValue) => {
  formData.value = newValue
})

const store = useStore()
const handleConfirmClick = async () => {
  dialogVisible.value = false

  let result // 保存请求的网络数据

  if (Object.keys(defaultData.value).length) {
    // 修改请求

    const finalData: any = {}
    // 把多余的字段剔除
    props.formConfig.formItems.forEach((item) => {
      finalData[item.field] = formData.value[item.field]
    })

    result = await store.dispatch('publicPage/editPageDataAction', {
      pageName: props.pageName,
      id: defaultData.value?.id,
      editData: { ...finalData, ...props.otherInfo }
    })
  } else {
    // 新建请求
    result = await store.dispatch('publicPage/creaetPageDataAction', {
      pageName: props.pageName,
      newData: { ...formData.value, ...props.otherInfo }
    })
  }

  // 弹出提示框
  if (result.code === 0) {
    ElMessage({
      type: 'success',
      message: result.data
    })
  } else {
    ElMessage({
      type: 'error',
      message: result.data
    })
  }

  // 拉取最新的数据
  store.dispatch('publicPage/getPageListAction', {
    pageName: props.pageName,
    queryInfo: {
      offset: 0,
      size: 10
    }
  })
}

defineExpose({
  dialogVisible,
  defaultData
})
</script>

<style scoped></style>
