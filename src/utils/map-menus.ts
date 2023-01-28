import { RouteRecordRaw } from 'vue-router'
import {
  IUserMenusResult,
  IUserMenusChild,
  IUserMenusChild2
} from '@/service/login/type'
import { IBreadcrumb } from '@/base-ui/breadcrumb'
import { Menu } from '@element-plus/icons-vue'

let firstMenu: IUserMenusChild

// 映射角色菜单到路由
export function mapMenusToRoutes(
  userMenus: IUserMenusResult[]
): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  const allRoutes: RouteRecordRaw[] = []

  const routeFiles = require.context('@/router/main', true, /\.ts$/)

  routeFiles.keys().forEach((routePath) => {
    const route = require('@/router/main' + routePath.split('.')[1])

    allRoutes.push(route.default)
  })

  const _recurseGetRoute = (menus: IUserMenusResult[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        if (!firstMenu) {
          firstMenu = menu as unknown as IUserMenusChild
        }

        const route = allRoutes.find((route) => route.path === menu.url)
        route && routes.push(route)
      } else {
        _recurseGetRoute(menu.children as unknown as IUserMenusResult[])
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

export function pathMapToMenu(
  userMenus: IUserMenusResult[],
  currentPath: string,
  Breadcrumbs?: IBreadcrumb[]
): IUserMenusChild | undefined {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(
        (menu.children as unknown as IUserMenusResult[]) ?? [],
        currentPath
      )

      if (findMenu) {
        Breadcrumbs?.push({ name: menu.name, path: menu.url })
        Breadcrumbs?.push({ name: findMenu.name, path: findMenu.url })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu as unknown as IUserMenusChild
    }
  }
}

export function pathMapBreadcrumb(
  userMenus: IUserMenusResult[],
  currentPath: string
): IBreadcrumb[] {
  const Breadcrumbs: IBreadcrumb[] = []

  pathMapToMenu(userMenus, currentPath, Breadcrumbs)
  return Breadcrumbs
}

// 提取 菜单的按钮权限
export function mapMenusToPermission(userMenus: IUserMenusResult[]) {
  const permissions: string[] = []

  const _recurseGetPermission = (Menus: IUserMenusResult[]) => {
    for (const menu of Menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(
          (menu.children as unknown as IUserMenusResult[]) || []
        )
      } else if (menu.type === 3) {
        const menu1 = menu
        permissions.push((menu1 as unknown as IUserMenusChild2)['permission'])
      }
    }
  }

  _recurseGetPermission(userMenus)

  return permissions
}

// 返回 所有叶子节点的id
export function menuMapLeafKeys(Menus: IUserMenusResult[]) {
  const leafKyes: number[] = []

  const _recurseGetLeaf = (menuList: IUserMenusResult[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf((menu.children as unknown as IUserMenusResult[]) || [])
      } else {
        leafKyes.push(menu.id)
      }
    }
  }

  _recurseGetLeaf(Menus)

  return leafKyes
}

export { firstMenu }
