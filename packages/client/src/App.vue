<script setup lang="ts">
import { setLocation } from '@/api'
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

onLaunch(() => {
  // @ts-ignore
  wx.cloud.init()

  getLocation()
})

onShow(() => {
  console.log('App Show')
})

onHide(() => {
  console.log('App Hide')
})

const getLocation = () => {
  uni.getLocation({
    type: 'gcj02',
    success: ({ longitude, latitude }) => {
      setLocation({ longitude, latitude })
    },
    fail: console.log
  })
}
</script>
<style lang="scss">
@import './styles/index.scss';
</style>
