// 验证规则
export const rules = {
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      // pattern: /^[a-zA-Z0-9_-]{4,16}$/,
      message: '4到16位（字母，数字，下划线，减号）',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9_-]{4,16}$/,
      message: '4到16位（字母，数字，下划线，减号）',
      trigger: 'blur'
    }
  ]
}
