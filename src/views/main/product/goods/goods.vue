<template>
  <div class="goods">
    <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>
    <PageContent pageName="goods" :contentTableConfig="contentTableConfig">
      <template #status="scope">
        <el-button
          :type="scope.row.status ? 'success' : 'danger'"
          size="small"
          plain
        >
          {{ scope.row.status ? '启用' : '禁用' }}
        </el-button>
      </template>

      <template #oldPrice="scope"> ${{ scope.row.oldPrice }} </template>
      <template #newPrice="scope"> ${{ scope.row.newPrice }} </template>

      <template #imgUrl="scope">
        <el-image
          style="width: 80px; height: 80px"
          :src="scope.row.imgUrl"
          :zoom-rate="1.2"
          :preview-src-list="[scope.row.imgUrl]"
          fit="cover"
          preview-teleported
        >
        </el-image>
      </template>
    </PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'goods',
  components: {
    PageSearch,
    PageContent
  },
  setup() {
    return { searchFormConfig, contentTableConfig }
  }
})
</script>

<style scoped></style>
