import deRequest from '../index'
import {
  IAccount,
  ILoginResult,
  IUserInfoResult,
  IUserMenusResult
} from './type'
import { IDataType } from '../types'

enum LoginAPI {
  AccountLogin = '/login',
  UserInfo = '/users/',
  UserMenus = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  return deRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return deRequest.get<IDataType<IUserInfoResult>>({
    url: LoginAPI.UserInfo + id,
    showLoading: false
  })
}

export function requestUserMenusByRoleId(id: number) {
  return deRequest.get<IDataType<IUserMenusResult[]>>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
