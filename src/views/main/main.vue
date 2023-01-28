<template>
  <div class="main">
    <el-container class="main-content">
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '60px' : '210px'" class="main-aside">
        <nav-menu :collapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @foldChange="handleFoldChange" />
        </el-header>
        <el-main class="page-content">
          <div class="page-main">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'

const isCollapse = ref(false)

const handleFoldChange = (isFold: boolean) => {
  isCollapse.value = isFold
}
</script>

<style scoped lang="less">
.main {
  position: fiexed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 48px);

  .page-main {
    background-color: #fff;
    border-radius: 5px;
  }
}

.page-header {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
  height: 48px !important;
}

.main-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.page-content {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>
