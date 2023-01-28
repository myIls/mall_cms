import { ILoginState } from './login/types'
import { IPublicPageState } from './publicPage/types'
import { IDashboardState } from './main/analysis/types'

export interface IRootState {
  entireDepartment: any[]
  entireRole: any[]
  entrieMenu: any[]
}

export interface IRootWithModule {
  login: ILoginState
  publicPage: IPublicPageState
  dashboard: IDashboardState
}

export type IStoreType = IRootState & IRootWithModule
