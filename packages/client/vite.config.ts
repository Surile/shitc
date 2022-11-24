import { resolve } from 'path'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variable.scss";`
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/common': resolve(__dirname, 'src/common'),
      '@/utils': resolve(__dirname, 'src/utils'),
      '@/styles': resolve(__dirname, 'src/styles'),
      '@/assets': resolve(__dirname, 'src/assets'),
      '@/components': resolve(__dirname, 'src/components')
    }
  }
})
