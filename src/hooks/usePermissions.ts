import { useStore } from '@/store'

export function usePermissions(
  pageName: string,
  permissionName: string
): boolean {
  const store = useStore()

  const fillPermission = `system:${pageName}:${permissionName}`

  const result = store.state.login.permissions.find(
    (permission) => permission === fillPermission
  )

  return !!result
}
