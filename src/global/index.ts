import { App } from 'vue'
import registerProperties from './register-properties'
import elementPlusI18N from './elementPlus-I18N'

export default function globalRegister(app: App): void {
  app.use(registerProperties)
  app.use(elementPlusI18N)
}
