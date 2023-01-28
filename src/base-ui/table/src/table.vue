<template>
  <div class="hu-table">
    <!-- 表格头部 -->
    <div class="header">
      <slot name="header">
        <h4 class="title">{{ headerTitle }}</h4>
      </slot>
      <div class="handle-header">
        <slot name="handleHeader"></slot>
      </div>
    </div>

    <!-- 表格数据 展示区域 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <!-- 多选框列 -->
      <el-table-column
        v-if="isShowSelectionColumn"
        type="selection"
        align="center"
      />

      <!-- 索引列 -->
      <el-table-column
        v-if="isShowIndexColumn"
        type="index"
        label="编号"
        width="60"
        align="center"
      />

      <!-- 显示的数据的列 -->
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column :="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!-- 底部 分页器 -->
    <div class="footer" v-if="isSHowFooter">
      <slot name="footer">
        <el-pagination
          :current-page="pagingInfo.currentPage"
          :page-size="pagingInfo.pageSize"
          :page-sizes="[5, 10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType } from 'vue'

const emit = defineEmits(['selectionChange', 'update:pagingInfo'])

const props = defineProps({
  tableData: {
    type: Array as PropType<any[]>,
    required: true
  },
  propList: {
    type: Array as PropType<any[]>,
    required: true
  },
  isShowIndexColumn: {
    type: Boolean,
    default: false
  },
  isShowSelectionColumn: {
    type: Boolean,
    default: false
  },
  headerTitle: {
    type: String,
    default: '标题'
  },
  totalCount: {
    type: Number,
    required: true
  },
  pagingInfo: {
    type: Object as PropType<{ currentPage: number; pageSize: number }>,
    default: () => ({ currentPage: 1, pageSize: 5 })
  },
  childrenProps: {
    type: Object as PropType<{ rowKey: string; treeProp: object }>,
    default: () => ({})
  },
  isSHowFooter: {
    type: Boolean,
    default: true
  }
})

// 发送 分页 发生改变 事件
const handleSizeChange = (pageSize: number) => {
  emit('update:pagingInfo', { ...props.pagingInfo, pageSize })
}
const handleCurrentChange = (currentPage: number) => {
  emit('update:pagingInfo', { ...props.pagingInfo, currentPage })
}

// 发射 多选框改变事件
const handleSelectionChange = (e: Event) => {
  emit('selectionChange', e)
}
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 5px;
}
.footer {
  display: flex;
  justify-content: end;
  margin-top: 20px;
}
</style>
