import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    //启动默认打开浏览器
    open:true,
    //主机
    host:"localhost",
    //端口
    port:3001,
    //本地代理
    proxy:{
      '/api':{
        target:'http://localhost:3000',
        changeOrigin:true,
        rewrite(path){
          return path.replace(/^\/api/,'')
        }
      }
    }
  }
})


