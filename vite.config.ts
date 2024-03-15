import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression2'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), compression()],
  server: {
    port: 4040
  }
})
