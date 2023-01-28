<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
      </div>
    </template>

    <div class="item">
      <slot></slot>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'

withDefaults(defineProps<{ title?: string }>(), {
  title: 'card标题'
})
</script>

<style scoped></style>
