export const contentTableConfig = {
  propList: [
    { prop: 'id', label: '角色ID', minWidth: '50' },
    { prop: 'name', label: '角色名', minWidth: '100' },
    { prop: 'intro', label: '角色概述', minWidth: '200' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateAt'
    },
    { prop: 'handler', label: '操作', minWidth: '120', slotName: 'handler' }
  ],

  isShowIndexColumn: false,
  isShowSelectionColumn: true,
  headerTitle: '角色列表'
}
