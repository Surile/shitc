import { createSSRApp } from 'vue'
import App from './App.vue'
// import api from './api/api'

export function createApp() {
  const app = createSSRApp(App)
  // app.use(api)
  return {
    app
  }
}
