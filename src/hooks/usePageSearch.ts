import PageContent from '@/components/page-content'

export function usePageSearch(): any {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  const handleResetClick = () => {
    pageContentRef.value?.getPageList()
  }
  const handleQueryClick = (queryInfo: any) => {
    pageContentRef.value?.getPageList(queryInfo)
  }

  return [pageContentRef, handleResetClick, handleQueryClick]
}
