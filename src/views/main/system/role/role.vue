<template>
  <div class="role">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
      ref="pageSearchtRef"
    ></page-search>

    <page-content
      :page-name="pageName"
      :contentTableConfig="contentTableConfig"
      :pageSearchInfo="pageSearchtRef?.formData"
      @createBtnClick="handleCreateClick"
      @editBtnClick="handleEditClick"
      ref="pageContentRef"
    ></page-content>

    <page-modal
      :page-name="pageName"
      :title="modalTitle"
      :formConfig="modalFromConfig"
      :otherInfo="otherInfo"
      ref="pageModalRef"
    >
      <!-- 完整菜单列表 -->
      <div class="menu-tree">
        <el-tree
          node-key="id"
          :props="treeProps"
          :data="menuList"
          show-checkbox
          @check="handleCheckChange"
          ref="elTreeRef"
        />
      </div>
    </page-modal>
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

import { menuMapLeafKeys } from '@/utils/map-menus'
import { ElTree } from 'element-plus'

/**********************************************当前页面 处理逻辑 开始*********************************************************/
const pageName = 'role'
const pageSearchtRef = ref<InstanceType<typeof PageSearch>>()
const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

const elTreeRef = ref<InstanceType<typeof ElTree>>()

const store = useStore()

const editCallback = (item: any) => {
  const leafkeys = menuMapLeafKeys(item.menuList)
  nextTick(() => {
    elTreeRef.value?.setCheckedKeys(leafkeys, false)
  })
}
// 调用hook 获取公共变量和数据
const [pageModalRef, modalTitle, handleCreateClick, handleEditClick] =
  usePageModal('角色', undefined, editCallback)

// 处理 完整的菜单列表
const treeProps = {
  label: 'name',
  children: 'children'
}
const menuList = computed(() => store.state.entrieMenu)
const otherInfo = ref({})

const handleCheckChange = (checkedNode: any, data: any) => {
  const { checkedKeys, halfCheckedKeys } = data
  otherInfo.value = { menuList: [...checkedKeys, ...halfCheckedKeys] }
}

// 当角色列表发生了更新, vuex中保存的初始信息也要发生改变
const roleList = computed(() => store.state.publicPage.roleList)
let isFirstRequest = true // 判断是否第一次请求roleList数据
watch(roleList, () => {
  if (!isFirstRequest) {
    store.dispatch('getInitialDataAction')
  }
  // 第一次请求数据 无需改变vuex中的初始信息
  isFirstRequest = !isFirstRequest
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 40px;
}
</style>
