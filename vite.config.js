import { createVuePlugin } from 'vite-plugin-vue2'
import path from 'path'

export default {
  plugins: [createVuePlugin()],
  server: {
    host: '0.0.0.0', // 配置ip 可以本地ip访问到项目
    port: 8080,
    open: true
  },
  resolve: {
    extensions:['.js', '.vue'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
}