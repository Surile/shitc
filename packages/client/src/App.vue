<script setup lang="ts">
import { useMainStore } from '@/store'
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
const store = useMainStore()
onLaunch(() => {
  // @ts-ignore
  wx.cloud.init()

  store.fetchToken()
})

onShow(() => {
  console.log('App Show')
})

onHide(() => {
  console.log('App Hide')
})
</script>
<style lang="scss">
@import './styles/index.scss';
@import './styles/iconfont.scss';
</style>
