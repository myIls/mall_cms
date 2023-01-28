import { createStore, Store, useStore as useVuexStore } from 'vuex'
import { IRootState, IStoreType } from './types'

import loginModule from './login/login'
import publicPageModule from './publicPage/publicPage'
import dashboardModule from './main/analysis/dashboard'

import { getPageListData } from '@/service/main/system/system'

const store = createStore<IRootState>({
  state() {
    return {
      entireDepartment: [],
      entireRole: [],
      entrieMenu: []
    }
  },
  getters: {},
  mutations: {
    changeEntireDepartment(state, departmentList: any) {
      state.entireDepartment = departmentList
    },
    changeEntireRole(state, roleList: any) {
      state.entireRole = roleList
    },
    changeEntireMenu(state, menuList: any) {
      state.entrieMenu = menuList
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      const departmentListURL = '/department/list'
      const roleListURL = '/role/list'
      const menuListURL = '/menu/list'
      const info = {
        offset: 0,
        size: 1000
      }

      const departmentResult = await getPageListData(departmentListURL, info)
      const roleResult = await getPageListData(roleListURL, info)
      const menuResult = await getPageListData(menuListURL, {})

      const { list: departmentList } = departmentResult.data
      const { list: roleList } = roleResult.data
      const { list: mneuList } = menuResult.data

      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', mneuList)
    }
  },
  modules: {
    login: loginModule,
    publicPage: publicPageModule,
    dashboard: dashboardModule
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalCache')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
