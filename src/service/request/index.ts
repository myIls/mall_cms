import axios from 'axios'
import { ElLoading } from 'element-plus'
import 'element-plus/es/components/loading/style/css'

import type { AxiosInstance } from 'axios'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
import type { DeRequestConfig, DeRequestInterceptors } from './type'

const DEFAULT_LOADING = true

class DeRequest {
  instance: AxiosInstance
  interceptors?: DeRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: DeRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    // 全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 是否显示 加载动画
        if (this.showLoading) {
          this.loading = ElLoading.service({
            text: '正在加载数据中...',
            lock: true,
            background: 'rgb(0, 0, 0, 0.2)'
          })
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()

        const data = res.data

        if (data.code !== 0) {
          console.log(`请求失败,返回错误信息:`, data)
          return data
        } else {
          return data
        }
      },
      (error) => {
        this.loading?.close()

        if (error.response.status === 404) {
          console.log('404 错误')
        }
        if (error.response.status === 401) {
          return { code: 401, data: error.response.data + '或者其他异常原因' }
        }
        return Promise.reject(error)
      }
    )

    // 单个实例的拦截器
    this.interceptors = config.interceptors
    this.instance.interceptors.request.use(
      this.interceptors?.requestInteceptors,
      this.interceptors?.requestIterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
  }

  request<T>(config: DeRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      // 局部拦截器
      if (config.interceptors?.requestInteceptors) {
        config = config.interceptors.requestInteceptors(config)
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          this.showLoading = DEFAULT_LOADING

          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((error) => {
          this.showLoading = DEFAULT_LOADING
          reject(error)
        })
    })
  }

  get<T>(config: DeRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: DeRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: DeRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: DeRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default DeRequest
