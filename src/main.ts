import { createApp } from 'vue'
import { App } from './App'

import {createRouter, createWebHashHistory} from 'vue-router'
import { routes } from './config/routes'
import { history } from './shared/history';

const router = createRouter({
  history,
  routes, 
})

const app = createApp(App)
app.use(router)
app.mount('#app')
