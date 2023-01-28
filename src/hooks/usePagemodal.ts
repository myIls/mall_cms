import PageModal from '@/components/page-modal'

type CallbackFn = (item?: any) => void

/**
 *
 * @param title 模态框的标题
 * @param createCb 创建按钮的回调函数
 * @param editCb 编辑按钮的回调函数
 * @returns
 */
export function usePageModal(
  title = '标题',
  createCb?: CallbackFn,
  editCb?: CallbackFn
): any {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const modalTitle = ref('')

  // 点击创建
  const handleCreateClick = () => {
    modalTitle.value = '创建' + title
    pageModalRef.value!.defaultData = {}
    pageModalRef.value!.dialogVisible = true

    createCb && createCb()
  }

  // 点击编辑
  const handleEditClick = (row: any) => {
    modalTitle.value = '编辑' + title
    pageModalRef.value!.defaultData = { ...row }
    pageModalRef.value!.dialogVisible = true

    editCb && editCb(row)
  }

  return [pageModalRef, modalTitle, handleCreateClick, handleEditClick]
}
