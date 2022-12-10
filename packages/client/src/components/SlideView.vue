<script setup lang="ts">
import { getShopList } from '@/api'
import { onLoad } from '@dcloudio/uni-app'
import { ref, watch } from 'vue'
import Shop from './Shop.vue'
import Avatar from '@/assets/img/head_d.png'

interface EmitProps {
  (e: 'closed'): void
}

interface Props {
  show: boolean
  ids: number[]
  latitude?: string
  longitude?: string
}

const clientHeight = ref(0)
const height = ref(0)
const list = ref<AnyArray>([])

onLoad(() => {
  uni.getSystemInfo({
    success: (res) => {
      clientHeight.value = res.windowHeight
    }
  })
})

const fetchShops = async () => {
  try {
    const res = await getShopList({
      pageSize: 10,
      page: 1,
      ids: props.ids.slice(0, 4).join(',')
    })
    list.value = res.list
  } catch (error) {
    console.log('error', error)
  }
}

const props = defineProps<Props>()

const emit = defineEmits<EmitProps>()

const onNavigation = () => {
  if (!props.latitude || !props.longitude) return
  uni.navigateTo({
    url: `/pages/list/index?latitude=${props.latitude}&longitude=${props.longitude}`
  })
}

watch(
  () => props.show,
  (newVal) => {
    if (!newVal) {
      height.value = 0
    } else {
      height.value = Math.floor(clientHeight.value / 2.2)
    }
  }
)

watch(
  () => props.ids,
  (val) => {
    if (val.length) {
      fetchShops()
    }
  }
)

console.log('show', props.show)
</script>
<template>
  <template v-if="props.show">
    <view class="w-full h-full">
      <view class="w-full h-full" @click="emit('closed')"></view>
      <scroll-view
        :style="{ height: `${height}px` }"
        :scroll-y="true"
        :class="[$style.container, 'container', 'fixed', 'bottom-0']"
      >
        <view :class="[$style.header, 'flex', 'items-center', 'justify-between']">
          <text :class="$style.title">商品列表</text>
          <view class="flex items-center justify-between" @click="onNavigation">
            <text :class="$style.more">查看更多</text>
            <text :class="[$style.icon, 'iconfont icon-jinru']"></text>
          </view>
        </view>
        <view class="flex flex-wrap justify-around">
          <view v-for="item in list" :key="item.id" :class="$style.shop">
            <Shop
              :id="item.id"
              :title="item.title"
              :img-url="item.photos[0].url"
              :price="item.price"
              :old-price="item.old_price"
              :avatar-url="item.user.avatar_url ? item.user.avatar_url : Avatar"
              :nickname="item.user.nick_name"
              :area="item.user.street_number"
            />
          </view>
        </view>
      </scroll-view>
    </view>
  </template>
</template>

<style lang="scss" module>
.header {
  padding: 20rpx;
  border-top-right-radius: 30rpx;
  border-top-left-radius: 30rpx;
  .title {
    font-size: 32rpx;
  }
  .icon {
    color: #999;
    font-size: 20rpx;
    font-weight: bold;
  }
  .more {
    color: $text-second-color;
    font-size: 24rpx;
  }
}
.container {
  border-top-right-radius: 30rpx;
  border-top-left-radius: 30rpx;
  background-color: #f8f8f8;
  z-index: 99;
  transition: all 1s ease;
}

.shop {
  width: 346rpx;
  margin-bottom: 20rpx;
}
</style>
