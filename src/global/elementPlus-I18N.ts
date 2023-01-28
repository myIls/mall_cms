import { App } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

export default function elementPlusI18N(app: App) {
  app.use(ElementPlus, {
    locale: zhCn
  })
}
