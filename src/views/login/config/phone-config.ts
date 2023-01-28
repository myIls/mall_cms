// 验证规则
export const rules = {
  id: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    {
      pattern:
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
      message: '请输入11位的手机号',
      trigger: 'blur'
    }
  ],
  code: [
    { required: true, message: '请输入短信验证码', trigger: 'blur' },
    {
      pattern: /^[0-9]{4}$/,
      message: '请输入四位验证码',
      trigger: 'blur'
    }
  ]
}
