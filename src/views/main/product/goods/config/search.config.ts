import { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  formItems: [
    { field: 'id', type: 'input', label: 'id', placeholder: '请输入商品ID' },
    {
      field: 'name',
      type: 'input',
      label: '商品名称',
      rules: [],
      placeholder: '请输入商品名称'
    },
    {
      field: 'oldPrice',
      type: 'input',
      label: '旧价格',
      rules: [],
      placeholder: '请输入旧价格'
    },
    {
      field: 'newPrice',
      type: 'input',
      label: '新价格',
      rules: [],
      placeholder: '请输入新价格'
    },
    {
      field: 'status',
      type: 'select',
      label: '当前状态',
      rules: [],
      placeholder: '请选择当前状态',
      options: [
        { text: '启用', value: 1 },
        { text: '禁用', value: 1 }
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
