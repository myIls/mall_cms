<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="@/asstes/img/logo.svg" alt="logo" />
      <span class="title" v-if="!collapse">后台管理</span>
    </div>
    <el-menu
      active-text-color="#0a60bd"
      background-color="#0c2135"
      text-color="#b7bdc3"
      class="el-menu-vertical"
      :default-active="defaultValue"
      :collapse="collapse"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 顶层菜单 有子菜单 -->
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id.toString()">
            <template #title>
              <el-icon>
                <component :is="formatIcon(item.icon)"></component>
                <!-- <i-ep-chat-line-round /> -->
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <!-- 子菜单 -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id.toString()"
                @click="handleMenuItemClick(subitem)"
              >
                <!-- <el-icon v-if="subitem.icon"
                  ><component :is="formatIcon(subitem.icon)"></component>
                </el-icon> -->
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>

        <!-- 顶层菜单  没有子菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id.toString()">
            <component :is="formatIcon(item.icon)"></component>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useStore } from '@/store'
import { useRouter, useRoute, createWebHistory } from 'vue-router'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { IUserMenusChild } from '@/service/login/type'
import { pathMapToMenu } from '@/utils/map-menus'
import { createLoadingComponent } from 'element-plus/es/components/loading/src/loading'

defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})

const store = useStore()
const router = useRouter()
const route = useRoute()

const userMenus = computed(() => store.state.login.userMenus)

const activeMenu = computed(() => {
  const currentPath = route.path
  return pathMapToMenu(userMenus.value, currentPath)
})

const defaultValue = computed(() => {
  return activeMenu.value?.id.toString()
})

// 格式化图标
const formatIcon = (icon: string) => {
  let IconString = icon.replace('el-icon-', '')
  const IconArr = IconString.split('-').map((item) => {
    const newItem = item[0].toUpperCase() + item.slice(1)
    return newItem
  })
  const IconKey = IconArr.join('')

  const newElePlusIconsVue = Object.create(ElementPlusIconsVue)
  return newElePlusIconsVue[IconKey]
}

// 处理路由跳转
const handleMenuItemClick = (item: IUserMenusChild) => {
  router.push({
    path: item.url ?? '/not-found'
  })
}
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    justify-content: flex-start;
    align-items: center;
  }
  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
  }
}

.el-menu-vertical {
  border-right: none;
}

// 目录
.el-submenu {
  background-color: #001529 !important;
  // 二级菜单 ( 默认背景 )
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135 !important;
  }
}

::v-deep .el-submenu__title {
  background-color: #001529 !important;
}

// hover 高亮
.el-menu-item:hover {
  color: #fff !important; // 菜单
}

.el-menu-item.is-active {
  color: #fff !important;
  background-color: #0a60bd !important;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
