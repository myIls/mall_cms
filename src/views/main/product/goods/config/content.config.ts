export const contentTableConfig = {
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '120' },
    { prop: 'oldPrice', label: '旧价格', minWidth: '80', slotName: 'oldPrice' },
    { prop: 'newPrice', label: '新价格', minWidth: '80', slotName: 'newPrice' },
    { prop: 'status', label: '状态', minWidth: '100', slotName: 'status' },
    { prop: 'imgUrl', label: '商品图片', minWidth: '90', slotName: 'imgUrl' },
    { prop: 'address', label: '地址', minWidth: '100' },
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

  isShowIndexColumn: true,
  isShowSelectionColumn: true,
  headerTitle: '商品列表'
}
