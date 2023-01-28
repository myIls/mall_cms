<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path as string }">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue'
import { IBreadcrumb } from '../types'
defineProps({
  breadcrumbs: Array as PropType<IBreadcrumb[]>,
  default: () => []
})
</script>

<style scoped></style>
