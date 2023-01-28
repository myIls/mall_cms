<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
      ref="pageSearchtRef"
    ></page-search>

    <page-content
      :page-name="pageName"
      :contentTableConfig="contentTableConfig"
      :pageSearchData="pageSearchtRef?.formData"
      @createBtnClick="handleCreateClick"
      @editBtnClick="handleEditClick"
      ref="pageContentRef"
    ></page-content>

    <page-modal
      :page-name="pageName"
      :title="modalTitle"
      :formConfig="modalFromConfigRef"
      ref="pageModalRef"
    ></page-modal>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalFromConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePagemodal'

const pageName = 'users'
const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
const pageSearchtRef = ref<InstanceType<typeof PageSearch>>()

/**
 * 辅助函数,方便获取 配置文件中指定的 表单项
 * @param arr
 * @param key
 * @param value
 */
const _HelperFn = (arr: any[], key: string, value: any) => {
  return arr.find((item) => item[key] === value)
}
const passwordInput = _HelperFn(modalFromConfig.formItems, 'field', 'password')
const departmentSelect = _HelperFn(
  modalFromConfig.formItems,
  'field',
  'departmentId'
)
const roleSelect = _HelperFn(modalFromConfig.formItems, 'field', 'roleId')

// 动态添加 部门和角色列表
const store = useStore()
const modalFromConfigRef = computed(() => {
  departmentSelect.options = store.state.entireDepartment.map((item) => {
    return { text: item.name, value: item.id }
  })

  roleSelect.options = store.state.entireRole.map((item) => {
    return { text: item.name, value: item.id }
  })
  return modalFromConfig
})

// 处理 模态框里的密码输入框的逻辑
const createCallBack = () => {
  passwordInput.isHidden = false
}
const editCallBack = () => {
  passwordInput.isHidden = true
}

// 调用hook 获取公共变量和数据
const res = usePageModal('用户', createCallBack, editCallBack)
const [pageModalRef, modalTitle, handleCreateClick, handleEditClick] = res
</script>

<style scoped lang="less"></style>
