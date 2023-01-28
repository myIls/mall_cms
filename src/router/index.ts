import {
  createRouter,
  createWebHashHistory
  // createWebHistory,
} from 'vue-router'

import type { RouteRecordRaw } from 'vue-router'

import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () =>
      import(/* webpackChunkName: "main" */ '@/views/main/main.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () =>
      import(
        /* webpackChunkName: "not-found" */ '@/views/not-found/not-found.vue'
      )
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const token = localCache.getCache('token')
  if (to.path !== '/login') {
    if (!token) {
      return '/login'
    }
    if (to.name === 'main') {
      return firstMenu.url
    }
  } else {
    // 登录页
    if (token) {
      return '/main'
    }
  }
})
export default router
