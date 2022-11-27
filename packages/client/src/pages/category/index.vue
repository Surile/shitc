<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

interface TabProps {
  id: number
  name: string
}

const tabs = ref<TabProps[]>([
  {
    id: 1,
    name: '我发布的'
  },
  {
    id: 2,
    name: '已卖出'
  },
  {
    id: 3,
    name: '已下架'
  }
])

const index = ref(1)

onLoad((query) => {
  if (query?.id) {
    index.value = +query?.id
  }
})
</script>
<template>
  <view :class="$style.container">
    <view :class="[$style.tabs, 'flex', 'items-center']">
      <view
        v-for="item in tabs"
        :key="item.id"
        :class="[
          $style.tab,
          'flex',
          'flex-col',
          'flex-1',
          'items-center',
          'justify-center',
          'font-medium',
          'relative',
          index == item.id && $style.active
        ]"
        @click="index = item.id"
      >
        {{ item.name }}
        <view v-if="index === item.id" class="absolute bottom-0"></view>
      </view>
    </view>
    <view :class="$style.shop">
      <view class="flex">
        <image src="https://picsum.photos/200/300" mode="scaleToFill" />
        <view>
          <view :class="[$style.textBox, 'flex', 'items-center']">
            <text class="ellipsis-2"
              >【次日达】商品标题【次日达】商品标题【次日达】商品标题【次日达】商品标题【次日达】商品标题</text
            >
            <view :class="[$style.priceBox, 'flex', 'flex-col', 'items-end']">
              <view :class="[$style.price, 'font-black']">￥46.00</view>
              <view :class="[$style.oldPrice, 'font-medium']">￥97.00</view>
            </view>
          </view>
        </view>
      </view>
      <view :class="[$style.buttons, 'flex', 'items-end', 'justify-end']">
        <view>编辑</view>
        <view>下架</view>
      </view>
    </view>
  </view>
</template>
<style module lang="scss">
.container {
  height: 100vh;
  background-color: #f7f7f7;
  & > .tabs {
    background-color: $white;
    & > .tab {
      color: #666;
      padding: 30rpx 0px;
      & > view {
        width: 30%;
        height: 6rpx;
        border-radius: 20rpx;
        background-color: #333333;
        transition: all 0.5s ease;
      }
    }
    & > .active {
      color: #333333;
    }
  }

  & > .shop {
    padding: 20rpx 30rpx;
    margin-top: 20rpx;
    background-color: $white;
    image {
      height: 160rpx;
      border-radius: 8rpx;
    }

    .textBox {
      margin-left: 28rpx;
      & > text {
        font-size: 28rpx;
      }
    }

    .priceBox {
      & > .price {
        color: #333333;
        font-size: 28rpx;
      }
      & > .oldPrice {
        color: $text-second-color;
        font-size: 22rpx;
        text-decoration: line-through;
      }
    }

    .buttons {
      & > view {
        padding: 8rpx 26rpx;
        border: 1px solid #f1f1f1;
        font-size: 28rpx;
        border-radius: 100px;
        &:not(:last-child) {
          margin-right: 30rpx;
        }
      }
    }
  }
}
</style>
