import { IForm } from '@/base-ui/form'

export const modalFromConfig: IForm = {
  formItems: [
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
      field: 'password',
      type: 'input',
      label: '密码',
      rules: [],
      placeholder: '请输入密码',
      isHidden: true
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '手机号码',
      rules: [],
      placeholder: '请输入手机号码'
    },
    {
      field: 'departmentId',
      type: 'select',
      label: '选择部门',
      rules: [],
      placeholder: '请选择部门',
      options: []
    },
    {
      field: 'roleId',
      type: 'select',
      label: '选择角色',
      rules: [],
      placeholder: '请选择角色',
      options: []
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
