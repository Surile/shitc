<template>
  <view :class="$style.shop" @click="emit('navigation')">
    <view :class="$style['shop_image']">
      <image :src="props.imgUrl" mode="scaleToFill" />
    </view>
    <view :class="$style['shop_title']">
      <view :class="['ellipsis-2']">
        <text class="font-black">商品标题商品标题商品标题商品标题商品标题商品标题商品标题</text>
      </view>
    </view>
    <view :class="[$style['shop_price_box'], 'flex', 'items-center']">
      <view :class="[$style['shop_price_box_price'], 'font-black']">{{ props.price }}</view>
      <view :class="$style['shop_price_box_old_price']">{{ props.oldPrice }}</view>
    </view>
    <view :class="[$style['shop_avatar_box'], 'flex', 'items-center']">
      <image :src="props.avatarUrl" mode="scaleToFill" />
      <view :class="[$style['user-info'], 'flex', 'flex-col', 'items-start']">
        <text :class="[$style.nickname, 'font-black']">{{ props.nickname }}</text>
        <text :class="[$style.area, 'font-medium']">{{ props.area }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
interface Props {
  imgUrl: string
  price: number
  oldPrice: number
  avatarUrl: string
  nickname: string
  area: string
}

interface EmitProps {
  (e: 'navigation'): void
}

const props = defineProps<Props>()

const emit = defineEmits<EmitProps>()
</script>
<style module lang="scss">
.shop {
  background-color: $white;
  border-radius: 12rpx;

  &_image {
    width: 100%;
    height: 268rpx;
    & > image {
      width: 100%;
      height: 100%;
      border-radius: 12rpx 12rpx 0px 0px;
    }
  }
  &_title {
    margin-top: 20rpx;
    padding: 0px 20rpx;
    color: $text-color;
    font-size: 32rpx;
  }
  &_price_box {
    padding: 0 20rpx;
    height: 70rpx;
    border-bottom: 2rpx solid #f1f1f1;
    &_price {
      position: relative;
      color: $price-color;
      font-size: 36rpx;
      &::before {
        content: '¥';
        font-size: 26rpx;
        color: $price-color;
      }
    }
    &_old_price {
      color: $text-second-color;
      font-size: 28rpx;
      text-decoration: line-through;
      margin-left: 12rpx;
      &::before {
        content: '¥';
      }
    }
  }
  &_avatar_box {
    padding: 12rpx 18rpx;
    border-radius: 0px 0px 12rpx 12rpx;
    & > image {
      width: 60rpx;
      height: 60rpx;
      border-radius: 100px;
    }

    & > .user-info {
      margin-left: 10rpx;
      & > .nickname {
        color: $text-color;
        font-size: 24rpx;
      }
      & > .area {
        color: $text-second-color;
        font-size: 20rpx;
      }
    }
  }
}
</style>
