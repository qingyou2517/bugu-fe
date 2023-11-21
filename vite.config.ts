import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 浏览器渲染vue3-jsx语法需要插件：@vitejs/plugin-vue-jsx
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  // base 是部署到github pages才用
  // base:'/bugu-fe/dist/',
  plugins: [
    vue(),
    vueJsx({
      // github官方：理论上babel能配什么，它就能配什么
      transformOn: true,
      mergeProps: true,
    }),
  ],
  server: {				// ← ← ← ← ← ←
    host: '0.0.0.0'	// ← 新增内容 ←
  }		
})
