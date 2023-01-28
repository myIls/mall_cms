import { Module } from 'vuex'

import { IDashboardState } from './types'
import { IRootState } from '@/store/types'

import {
  getGoodsCategoryCount,
  getGoodsCategorySale,
  getGoodsCategoryFavor,
  getGoodsAddressSale
} from '@/service/main/analysis/dashboard'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      goodsCategoryCount: [],
      goodsCategoryFavor: [],
      goodsCategorySale: [],
      goodsAddressSale: []
    }
  },
  mutations: {
    changeCategoryCount(state, list) {
      state.goodsCategoryCount = list
    },
    changeCategoryFavor(state, list) {
      state.goodsCategoryFavor = list
    },
    changeCategorySale(state, list) {
      state.goodsCategorySale = list
    },
    changeAddressSale(state, list) {
      state.goodsAddressSale = list
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryCountResult = await getGoodsCategoryCount()
      const categorySaleResult = await getGoodsCategorySale()
      const categoryFavorResult = await getGoodsCategoryFavor()
      const addressSaleResult = await getGoodsAddressSale()

      commit('changeCategoryCount', categoryCountResult.data)
      commit('changeCategorySale', categorySaleResult.data)
      commit('changeCategoryFavor', categoryFavorResult.data)
      commit('changeAddressSale', addressSaleResult.data)
    }
  }
}

export default dashboardModule
