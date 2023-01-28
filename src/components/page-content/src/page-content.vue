<template>
  <div class="page-content">
    <hu-table
      :tableData="tableData"
      :totalCount="totalCount"
      v-model:pagingInfo="pagingInfo"
      :="contentTableConfig"
    >
      <!-- 头部区域处理按钮 -->
      <template #handleHeader v-if="isShowHeader">
        <el-button
          v-if="isCreate"
          type="primary"
          :icon="CirclePlus"
          @click="createBtnClick"
        >
          新增
        </el-button>
        <el-button :icon="RefreshRight"></el-button>
      </template>

      <!-- 公共列的 插槽 -->
      <template #status="scope">
        <el-button
          :type="scope.row.enable || scope.row.status ? 'success' : 'danger'"
          size="small"
          plain
        >
          {{ scope.row.enable || scope.row.status ? '启用' : '禁用' }}
        </el-button>
      </template>

      <template #createAt="scope">
        {{ $filters.formatTime(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ $filters.formatTime(scope.row.updateAt) }}
      </template>

      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            v-if="isUpdate"
            :icon="EditPen"
            size="small"
            link
            type="primary"
            @click="editBtnClick(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            v-if="isDelete"
            :icon="Delete"
            size="small"
            link
            type="primary"
            @click="handlerDeleteClick(scope.row.id)"
          >
            删除
          </el-button>
        </div>
      </template>

      <!-- 其他私有列 插槽 -->
      <template
        v-for="item in otherPropList"
        :key="item.prop"
        #[(item.slotName)]="scope"
      >
        <slot :name="item.slotName" :row="scope.row"></slot>
      </template>
    </hu-table>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType, defineExpose } from 'vue'

import { ElMessageBox, ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message-box.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-overlay.css'
import {
  CirclePlus,
  RefreshRight,
  EditPen,
  Delete
} from '@element-plus/icons-vue'

import { useStore } from '@/store'
import HuTable, { ITable } from '@/base-ui/table'
import { usePermissions } from '@/hooks/usePermissions'

/*************************************************************************************************/
const emit = defineEmits(['createBtnClick', 'editBtnClick'])
const props = defineProps({
  contentTableConfig: {
    type: Object as PropType<ITable>,
    required: true
  },
  pageName: {
    type: String,
    required: true
  },
  pageSearchData: {
    type: Object,
    default: () => ({})
  },
  isShowHeader: {
    type: Boolean,
    default: true
  }
})

const store = useStore()

// 按钮的权限
const isCreate = usePermissions(props.pageName, 'create')
const isUpdate = usePermissions(props.pageName, 'update')
const isDelete = usePermissions(props.pageName, 'delete')
const isQuery = usePermissions(props.pageName, 'query')

const pagingInfo = ref({ currentPage: 1, pageSize: 10 }) // 分页器 当前项目的默认值

// 发送网络请求，获取列表数据
const getPageList = (data: any = {}) => {
  if (!isQuery) return // 没有查询权限
  store.dispatch('publicPage/getPageListAction', {
    pageName: props.pageName,
    queryInfo: {
      offset: (pagingInfo.value.currentPage - 1) * pagingInfo.value.pageSize,
      size: pagingInfo.value.pageSize,
      ...data
    }
  })
}
getPageList()

// 监听分页发生改变，携带 pageSearch组件的参数 发送网络请求
watch(pagingInfo, () => {
  getPageList(props.pageSearchData)
})

// 从vuex中获取数据
const tableData = computed(() =>
  store.getters['publicPage/pageListData'](props.pageName)
)
const totalCount = computed(() =>
  store.getters['publicPage/pageCountData'](props.pageName)
)

// 剔除 公有插槽
const commonSlots = ['createAt', 'updateAt', 'handler', 'status'] // 公有插槽
const otherPropList = props.contentTableConfig.propList.filter((item) => {
  if (!item.slotName) return false

  return commonSlots.includes(item.slotName) ? false : true
})

// 删除按钮事件
const handlerDeleteClick = async (id: number) => {
  try {
    // 弹出确认框
    const result = await ElMessageBox.confirm('请确认删除?', '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      lockScroll: true,
      draggable: true
    })

    // 发送网络请求
    const { deleteCode, deleteMsg } = await store.dispatch(
      'publicPage/deletePageDataByIDAction',
      {
        pageName: props.pageName,
        id
      }
    )

    if (deleteCode === 0) {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    } else {
      ElMessage({
        type: 'error',
        message: `删除失败，原因: ${deleteMsg}`
      })
    }
  } catch (error) {
    if (error === 'cancel') return // 点击了 取消
    return Promise.reject(error)
  }
}

// 新增按钮事件
const createBtnClick = () => {
  emit('createBtnClick')
}

// 编辑按钮事件
const editBtnClick = (row: any) => {
  emit('editBtnClick', row)
}

defineExpose({
  getPageList
})
</script>

<style scoped lang="less">
.page-content {
  border-top: 20px solid #f5f5f5;
  padding: 20px;
}
.handle-btns {
  .el-button {
    margin: 0;
  }
}
</style>
