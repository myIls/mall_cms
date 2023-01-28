export const contentTableConfig = {
  headerTitle: '菜单列表',
  isShowIndexColumn: false,
  isShowSelectionColumn: false,
  isSHowFooter: false,
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '100' },
    { prop: 'type', label: '类型', minWidth: '50' },
    { prop: 'url', label: '路由地址', minWidth: '100' },
    { prop: 'icon', label: '菜单图标', minWidth: '100' },
    { prop: 'permission', label: '权限', minWidth: '100' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '100',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '100',
      slotName: 'updateAt'
    },
    { prop: 'handler', label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  }
}
