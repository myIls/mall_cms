import { Module } from 'vuex'
import { IRootState } from '../types'
import { IPageQueryInfo, IPublicPageState } from './types'

import {
  createPageData,
  deletePageDataByID,
  editPageData,
  getPageListData
} from '@/service/main/system/system'

const publicPageModule: Module<IPublicPageState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      roleList: [],
      roleCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageCountData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  mutations: {
    changePageList(state, { pageName, list }) {
      ;(state as any)[`${pageName}List`] = list
    },
    changePageCount(state, { pageName, totalCount }) {
      ;(state as any)[`${pageName}Count`] = totalCount
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: IPageQueryInfo) {
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`

      // 发送网络请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      const { list = [], totalCount = 0 } = pageResult.data
      commit(`changePageList`, { pageName, list })
      commit(`changePageCount`, { pageName, totalCount })
    },

    async deletePageDataByIDAction(
      { dispatch },
      { pageName, id }
    ): Promise<{ deleteCode: number; deleteMsg: string }> {
      const url = `/${pageName}/${id}`

      // 调用删除网络请求
      const { code: deleteCode, data: deleteMsg } = await deletePageDataByID(
        url
      )

      // 拉取最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })

      return { deleteCode, deleteMsg }
    },

    async creaetPageDataAction(content, { pageName, newData }) {
      const url = `/${pageName}`
      const result = await createPageData(url, newData)

      return result
    },

    async editPageDataAction(content, { pageName, id, editData }) {
      const url = `/${pageName}/${id}`
      const result = await editPageData(url, editData)

      return result
    }
  }
}

export default publicPageModule
