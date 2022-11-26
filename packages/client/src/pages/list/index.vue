<script setup lang="ts">
import Shop from '@/components/Shop.vue'

const onNavigation = () => {
  uni.navigateTo({
    url: '/pages/detail/index'
  })
}
</script>

<template>
  <view :class="[$style.container, 'container']">
    <view :class="[$style.card, 'fixed', 'top-0', 'w-full']">
      <input
        placeholder="请输入搜索词"
        :placeholder-class="$style['card__input--placeholder']"
        :class="$style['card__input']"
      />
    </view>
    <view :class="[$style.shopList, 'flex', 'flex-wrap', 'justify-around']">
      <view v-for="(item, index) in [1, 2, 3, 4, 5, 6]" :key="index" :class="$style.shop">
        <Shop
          img-url="https://picsum.photos/346/268"
          :price="131"
          :old-price="199"
          avatar-url="https://picsum.photos/200/200"
          nickname="野生的屠夫先生"
          area="上海市 虹口区"
          @navigation="onNavigation"
        />
      </view>
    </view>
  </view>
</template>

<style lang="scss" module>
.container {
  background-color: #f8f8f8;
  .card {
    padding-bottom: 20rpx;
    background-color: $white;
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
