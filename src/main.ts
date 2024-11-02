import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import '@/style.css'
import { router } from "@/routes";
import fr from 'element-plus/es/locale/lang/fr'



const app = createApp(App)
app.use(ElementPlus, { locale: fr })
app.use(router)
app.mount('#app')