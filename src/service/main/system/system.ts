import deRequest from '@/service'
import { IDataType } from '@/service/types'

export function getPageListData(url: string, queryInfo: any) {
  return deRequest.post<IDataType>({
    url,
    data: queryInfo
  })
}

//  url: /users/id
export function deletePageDataByID(url: string) {
  return deRequest.delete<IDataType>({
    url
  })
}

// /users
export function createPageData(url: string, newData: any) {
  return deRequest.post<IDataType>({
    url,
    data: newData
  })
}

// /users/3
export function editPageData(url: string, editData: any) {
  return deRequest.patch<IDataType>({
    url,
    data: editData
  })
}
