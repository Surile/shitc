import { createSSRApp } from 'vue'
import App from './App.vue'
import api from './api'

export function createApp() {
  const app = createSSRApp(App)
  app.use(api as any)
  return {
    app
  }
}
