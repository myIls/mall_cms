import { Module } from 'vuex'
import router from '@/router'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from '@/service/login/login'
import localCache from '@/utils/cache'
import { mapMenusToRoutes, mapMenusToPermission } from '@/utils/map-menus'

import {
  IAccount,
  IUserInfoResult,
  IUserMenusResult
} from '@/service/login/type'
import { ILoginState } from './types'
import { IRootState } from '../types'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: IUserInfoResult) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: IUserMenusResult[]) {
      state.userMenus = userMenus

      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 收集角色的按钮权限
      state.permissions = mapMenusToPermission(userMenus)
    }
  },
  actions: {
    // 账号密码登录
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 请求登录
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 请求角色菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 获取 初始化数据
      dispatch('getInitialDataAction', null, { root: true })

      // 跳转首页
      router.push('/main')
    },

    // 手机号登录
    phoneLoginAction({ commit }, payload: any) {
      console.log(commit, payload)
    },
    //同步state
    loadLocalCache({ commit, dispatch }) {
      const token = localCache.getCache('token')
      token && commit('changeToken', token)

      const userInfo = localCache.getCache('userInfo')
      userInfo && commit('changeUserInfo', userInfo)

      const userMenus = localCache.getCache('userMenus')
      userMenus && commit('changeUserMenus', userMenus)

      // 获取 初始化数据
      dispatch('getInitialDataAction', null, { root: true })
    }
  }
}

export default loginModule
