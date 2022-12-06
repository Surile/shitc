import { defineStore } from 'pinia'
import { login } from '@/utils'
import { login as loginApi, setLocation, User, fetchUser } from '@/api'

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
        this.access_token = res.access_token
        uni.setStorageSync('token', res.access_token)
        uni.setStorageSync('user', res.user)
        this.getPosition()
      } catch (error) {
        console.log('error', error)
      }
    },
    getPosition() {
      try {
        uni.getLocation({
          type: 'gcj02',
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          success: async (result) => {
            this.user = {
              ...this.user,
              longitude: result.longitude,
              latitude: result.latitude
            }
            await setLocation({
              longitude: result.longitude,
              latitude: result.latitude
            })
            await this.fetchUser()
          },
          fail: console.log
        })
      } catch (error: any) {
        uni.showToast({
          icon: 'none',
          title: error.message
        })
      }
    },
    async fetchUser() {
      try {
        const res = await fetchUser()
        this.user = res
      } catch (error) {
        console.log('error', error)
      }
    }
  }
})
