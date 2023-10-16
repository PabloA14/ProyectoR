import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from "vue-router"
import piniaPersist from 'pinia-plugin-persist'
import App from './App.vue'
import { routes } from "./routes/routes.js"
import { Quasar, Notify } from 'quasar'
import './style.css'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/material-icons-sharp/material-icons-sharp.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'

import 'quasar/src/css/index.sass'

const app = createApp(App)

const pinia = createPinia()

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

app.use(Quasar, {
    plugins: {
        Notify
    }
})

app.use(pinia)
app.use(router)
pinia.use(piniaPersist)

app.mount('#app')
