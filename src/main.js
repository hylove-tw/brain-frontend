import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import axios from 'axios'

import './index.css'

axios.defaults.baseURL = import.meta.env.VITE_APP_ENDPOINT || '/'
axios.defaults.withCredentials = false

createApp(App).use(router).use(store).mount('#app')