import { createApp } from 'vue'
import { App } from './App'

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
router.beforeEach(async (to, from) => {
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

const app = createApp(App)
app.use(router)
app.mount('#app')
