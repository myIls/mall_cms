import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface DeRequestInterceptors<T = AxiosResponse> {
  requestInteceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestIterceptorsCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface DeRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: DeRequestInterceptors<T>
  showLoading?: boolean
}
