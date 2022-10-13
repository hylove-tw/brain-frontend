import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dsv from '@rollup/plugin-dsv'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dsv(),
  ],
  define: {
    '__APP_VERSION__': JSON.stringify(process.env.npm_package_version),
  }
})
