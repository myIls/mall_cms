<template>
  <div class="nav-header">
    <el-icon @click="handleFoldClick" class="fold-menu" :size="20">
      <i-ep-fold v-if="isFold" />
      <i-ep-expand v-else />
    </el-icon>
    <div class="content">
      <breadcrumb :breadcrumbs="breadcrumbs"></breadcrumb>
      <user-info></user-info>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
import UserInfo from './user-info.vue'
import Breadcrumb from '@/base-ui/breadcrumb'
import { pathMapBreadcrumb } from '@/utils/map-menus'
import { useStore } from '@/store'

const emit = defineEmits(['foldChange'])

const store = useStore()
const route = useRoute()

const isFold = ref(false)
const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}

const breadcrumbs = computed(() => {
  const menus = store.state.login.userMenus
  const currentPath = route.path
  return pathMapBreadcrumb(menus, currentPath)
})
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;

  width: 100%;

  .fold-menu {
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
