<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import Shop from '@/components/Shop.vue'
import { ref } from 'vue'
import { getShopList } from '@/api'

const page = ref(1)

const list = ref<any>([])

const position = ref<{
  latitude?: string
  longitude?: string
}>()

onLoad((options: any) => {
  position.value = {
    latitude: options.latitude,
    longitude: options.longitude
  }
  fetchShops()
})

const fetchShops = async () => {
  try {
    const res = await getShopList({
      page: page.value,
      pageSize: 20,
      ...position.value
    })
    list.value = res.list
  } catch (error) {
    console.log('error', error)
  }
}

const onNavigation = (id: number) => {
  uni.navigateTo({
    url: `/pages/detail/index?id=${id}`
  })
}
</script>

<template>
  <view :class="[$style.container]">
    <view :class="[$style.card, 'fixed', 'top-0', 'w-full']">
      <input
        placeholder="请输入搜索词"
        :placeholder-class="$style['card__input--placeholder']"
        :class="$style['card__input']"
      />
    </view>
    <view :class="[$style.shopList, 'flex', 'flex-wrap', 'justify-around']">
      <view v-for="item in list" :key="item.id" :class="$style.shop">
        <Shop
          :id="item.id"
          :title="item.title"
          :img-url="item.photos[0].url"
          :price="item.price"
          :old-price="item.old_price"
          :avatar-url="item.user.avatar_url"
          :nickname="item.user.nick_name"
          :area="item.user.avatar_url"
          @navigation="onNavigation(item.id)"
        />
      </view>
    </view>
  </view>
</template>

<style lang="scss" module>
.container {
  height: calc(100vh - env(safe-area-inset-bottom));
  height: calc(100vh - constant(safe-area-inset-bottom));
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  background-color: #f8f8f8;

  .card {
    padding-bottom: 20rpx;
    background-color: $white;
    z-index: 9;
    &__input--placeholder {
      font-size: 28rpx;
    }
    &__input {
      margin: 0px 30rpx;
      padding: 8rpx 24rpx;
      border-radius: 100px;
      background-color: #f8f8f8;
      font-size: 28rpx;
    }
  }

  .shopList {
    padding: 0px 20rpx;
    margin-top: 60rpx;
    .shop {
      width: 346rpx;
      margin-top: 40rpx;
    }
  }
}
</style>
