import 'normalize.css'
import '@/asstes/css/index.less'
// import 'default-passive-events'

import App from './App.vue'
import { createApp } from 'vue'
import router from './router'
import store from './store'

import { setupStore } from './store'
import globalRegister from './global'

const app = createApp(App)

app.use(globalRegister) // 注册全局
app.use(store)
setupStore() // 同步state
app.use(router)

app.mount('#app')
