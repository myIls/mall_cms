<template>
  <div class="menu">
    <PageContent
      pageName="menu"
      :contentTableConfig="contentTableConfig"
      :isShowHeader="false"
    ></PageContent>
  </div>
</template>

<script lang="ts" setup>
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
</script>

<style scoped></style>
