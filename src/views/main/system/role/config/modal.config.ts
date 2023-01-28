import { IForm } from '@/base-ui/form'

export const modalFromConfig: IForm = {
  formItems: [
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
    }
  ],
  labelWidth: '90px',
  itemStyle: {
    padding: '5px 10px'
  },
  colLayout: {
    span: 24
  }
}
