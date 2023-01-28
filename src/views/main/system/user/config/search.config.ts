import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  formItems: [
    { field: 'id', type: 'input', label: 'id', placeholder: '请输入ID' },
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      rules: [],
      placeholder: '请输入用户名'
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      rules: [],
      placeholder: '请输入真实姓名'
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '手机号码',
      rules: [],
      placeholder: '请输入手机号码'
    },
    {
      field: 'enable',
      type: 'select',
      label: '当前状态',
      rules: [],
      placeholder: '请选择当前状态',
      options: [
        { text: '启用', value: 1 },
        { text: '禁用', value: 0 }
      ]
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
  }
  // colLayout: {
  //   span: 8
  // }
}
