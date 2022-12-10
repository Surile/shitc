import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

Object.assign(global, {
  Array,
  Date,
  Error,
  Function,
  Math,
  Object,
  RegExp,
  String,
  TypeError,
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval
})

export function createApp() {
  const app = createSSRApp(App)
  app.use(createPinia())
  return {
    app
  }
}
