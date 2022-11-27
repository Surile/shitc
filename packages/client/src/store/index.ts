import { defineStore } from 'pinia'
import { login } from '@/utils'
import { login as loginApi } from '@/api'
interface User {
  avatar_url: string
  create_time: string
  gender: number
  id: number
  latitude?: string
  longitude?: string
  nick_name?: string
  open_id: string
  phone?: string
  register_source: number
  union_id?: string
  update_time: string
  user_role: number
}

export const useMainStore = defineStore('main', {
  state: (): { user?: User; access_token?: string } => ({
    user: undefined,
    access_token: undefined
  }),
  actions: {
    async fetchToken() {
      try {
        const code = await login({ provider: 'weixin' })

        const res = await loginApi({ js_code: code })

        console.log('res', res)

        uni.setStorageSync('token', res.access_token)
        uni.setStorageSync('user', res.user)
      } catch (error) {
        console.log('error', error)
      }
    }
  }
})
