import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: '角色ID',
      placeholder: '请输入角色ID'
    },
    {
      field: 'name',
      type: 'input',
      label: '角色名',
      rules: [],
      placeholder: '请输入角色名'
    },
    {
      field: 'intro',
      type: 'input',
      label: '角色介绍',
      rules: [],
      placeholder: '请输入角色概述'
    },
    {
      field: 'createAt',
      type: 'datepicker',
      label: '创建的时间',
      rules: [],
      placeholder: '请选择创建时间的范围',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  labelWidth: '120px',
  itemStyle: {
    padding: '10px 10px'
  },
  colLayout: {
    span: 8
  }
}
