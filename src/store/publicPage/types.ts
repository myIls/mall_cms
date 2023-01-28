export interface IUserState {
  id: number
  name: string
  realname: string
  cellphone: any
  enable: number
  departmentId: number
  roleId: number
  createAt: Date
  updateAt: Date
}
export interface IGoodsState {
  id: number
  name: string
  oldPrice: string
  newPrice: string
  desc: string
  status: number
  imgUrl: string
  inventoryCount: number
  saleCount: number
  favorCount: number
  address: string
  categoryId: number
  createAt: Date
  updateAt: Date
}

export interface IPublicPageState {
  usersList: IUserState[]
  usersCount: number
  goodsList: IGoodsState[]
  goodsCount: number
  menuList: any[]
  menuCount: number
  roleList: any[]
  roleCount: number
}

export interface IPageQueryInfo {
  pageName: string
  queryInfo: any
}
