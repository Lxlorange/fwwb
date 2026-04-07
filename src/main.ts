import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import App from '@/App.vue'
import router from '@/router'
import 'element-plus/dist/index.css'
import '@/assets/scss/normalize.scss'
import '@/assets/scss/global.scss'
import '@/assets/scss/rest.scss'
import 'animate.css'

const app = createApp(App)

app.use(ElementPlus as any)
app.use(createPinia())
app.use(router)
app.mount('#app')
