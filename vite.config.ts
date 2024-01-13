import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 浏览器渲染vue3-jsx语法需要插件：@vitejs/plugin-vue-jsx
import vueJsx from '@vitejs/plugin-vue-jsx'
import { svgstore } from './src/vite_plugins/svgstore.js';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    // base 是部署到github pages才用
    // base:'/bugu-fe/dist/',
    define: command === 'build' ? {
      isDev: false
    } : {
      isDev: true
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: any) {
            if (id.includes('echarts')) {
              return 'echarts';
            }
            if (id.includes('mock') || id.includes('faker')) {
              return 'mock';
            }
            if (id.includes('vant')) {
              return 'vant';
            }
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    },
    plugins: [
      vue(),
      vueJsx({
        // github官方：理论上babel能配什么，它就能配什么
        transformOn: true,
        mergeProps: true,
      }),
      svgstore(),
    ],
    server: {
      host: '0.0.0.0',	// 真机调试
      proxy: {
        "/api/v1": {
          target: "http://121.196.236.94:3000",
        },
      },
    },
  }
})
