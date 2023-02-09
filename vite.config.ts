import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // base 是部署到github pages才用
  // base:'/bugu-fe/dist/',
  plugins: [vue()]
})
