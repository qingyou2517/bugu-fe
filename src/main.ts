import { createApp } from 'vue'
import { App } from './App'
import { createPinia } from 'pinia'

import { createRouter } from 'vue-router'
import { routes } from './config/routes'
import { history } from './shared/history';

import 'vant/lib/index.css';
import "@svgstore";

const router = createRouter({
  history,
  routes,
})

// 全局前置守卫
router.beforeEach((to, from) => {
  if (
    to.path === "/" ||
    to.path.startsWith("/welcome") ||
    to.path.startsWith("/sign_in")
  ) {
    return true;
  } else {
    const jwt = localStorage.getItem("jwt")
    const path = jwt ? true : "/sign_in?return_to=" + to.path
    return path;
  }
});
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
