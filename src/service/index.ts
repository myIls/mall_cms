import DeRequest from './request'
import localCache from '@/utils/cache'

import { BASE_URL, BASE_TIMEOUT } from './request/config'

export default new DeRequest({
  baseURL: BASE_URL,
  timeout: BASE_TIMEOUT,
  interceptors: {
    requestInteceptors(config) {
      const token = localCache.getCache('token')
      if (token) {
        config.headers && (config.headers.Authorization = `Bearer ${token}`)
      }

      // console.log('单个实例拦截器: 请求成功的拦截')
      return config
    },
    requestIterceptorsCatch(error) {
      // console.log('单个实例拦截器: 请求失败的拦截')
      return Promise.reject(error)
    },
    responseInterceptor(res) {
      // console.log('单个实例拦截器: 响应成功的拦截')
      return res
    },
    responseInterceptorCatch(error) {
      // console.log('单个实例拦截器: 响应失败的拦截')
      return Promise.reject(error)
    }
  }
})
