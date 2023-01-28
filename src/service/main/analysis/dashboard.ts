import MyRequest from '../../index'
import { IDataType } from '@/service/types'

enum DashboardAPI {
  goodsCategoryCount = '/goods/category/count',
  goodsCategoryFavor = '/goods/category/favor',
  goodsCategorySale = '/goods/category/sale',
  goodsAddressSale = '/goods/address/sale'
}

export function getGoodsCategoryCount() {
  return MyRequest.get<IDataType>({
    url: DashboardAPI.goodsCategoryCount
  })
}

export function getGoodsCategoryFavor() {
  return MyRequest.get<IDataType>({
    url: DashboardAPI.goodsCategoryFavor
  })
}

export function getGoodsCategorySale() {
  return MyRequest.get<IDataType>({
    url: DashboardAPI.goodsCategorySale
  })
}

export function getGoodsAddressSale() {
  return MyRequest.get<IDataType>({
    url: DashboardAPI.goodsAddressSale
  })
}
