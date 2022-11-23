<script setup lang="ts">
import Tag from '@/components/tag/index.vue'
</script>
<template>
  <view :class="[$style.container]">
    <view :class="$style.content">
      <view :class="[$style.header, 'flex', 'items-center']">
        <image :class="$style.avatar" src="https://picsum.photos/200/300" mode="scaleToFill" />
        <view :class="[$style.userText, 'flex', 'flex-1', 'flex-col', 'justify-center']">
          <view class="flex flex-1 items-center justify-between">
            <view :class="[$style.name, 'font-bold']">野生的屠夫先生</view>
            <view :class="[$style.time, 'font-normal']">刚刚来过</view>
          </view>
          <view :class="$style.area">上海市 虹口区</view>
        </view>
      </view>
      <view :class="[$style.priceBox, 'flex', 'items-center']">
        <view :class="[$style.price, 'font-bold']">131</view>
        <view :class="[$style.oldPrice, 'font-bold']">原价¥229</view>
      </view>
      <view :class="$style.article">
        <view :class="[$style.title, 'font-bold', 'ellipsis-2']"
          >数据收集就撒娇的叫啊叫谁大姐啊是家啊大姐姐啊姐啊姐的</view
        >
        <view :class="[$style.articleContent, 'font-normal']"
          >数据收集就撒娇的叫啊叫谁大姐啊是家啊大姐姐啊姐啊姐的</view
        >
        <Tag name="某某小区"></Tag>
        <view :class="$style.articleImg">
          <img src="https://picsum.photos/200/300" mode="scaleToFill" />
        </view>
      </view>
    </view>
    <view :class="$style.userBox">
      <view :class="[$style.userBoxHeader, 'flex', 'flex-col', 'items-center', 'justify-center']">
        <image :class="$style.userAvatar" src="https://picsum.photos/200/300" mode="scaleToFill" />
        <view :class="[$style.nickname, 'font-bold']">野生的屠夫先生</view>
      </view>
      <view :class="[$style.items, 'flex', 'flex-1', 'justify-around']">
        <view :class="[$style.item, 'font-medium']">在售商品1</view>
        <view :class="[$style.item, 'font-medium']">已售商品1</view>
        <view :class="[$style.item, 'font-medium']">加入1393天</view>
      </view>
    </view>
  </view>
</template>
<style module lang="scss">
.container {
  background-color: #fafafa;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  & > .content {
    padding: 0px 30rpx;
    padding-bottom: 102rpx;
    background-color: $white;
    & > .header {
      padding: 30rpx 0px;
      & > .avatar {
        width: 110rpx;
        height: 110rpx;
        border-radius: 50%;
      }
      & > .userText {
        margin-left: 22rpx;
        & > .name {
          color: $text-color;
          font-size: 32rpx;
        }
        & > .area {
          font-size: 28rpx;
          color: $text-second-color;
          margin-top: 8rpx;
        }
      }
      .time {
        color: $text-second-color;
        font-size: 28rpx;
      }
    }

    & > .priceBox {
      padding: 10rpx 0px;
      & > .price {
        color: $price-color;
        font-size: 36rpx;
        &::before {
          content: '¥';
          font-size: 24rpx;
          font-weight: bold;
        }
      }
      & > .oldPrice {
        margin-left: 28rpx;
        color: $text-second-color;
        font-size: 24rpx;
      }
    }

    & > .article {
      & > .title {
        color: $text-color;
        font-size: 36rpx;
      }
      & > .articleContent {
        color: $text-color;
        font-size: 28rpx;
        margin-top: 10rpx;
        min-height: 200rpx;
      }

      & > .articleImg {
        margin-top: 30rpx;
        height: 504rpx;
        & > image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  & > .userBox {
    margin: 0px 38rpx;
    margin-top: 30rpx;
    background-color: white;
    & > .userBoxHeader {
      padding-bottom: 38rpx;
      & > .userAvatar {
        width: 90rpx;
        height: 90rpx;
        border-radius: 50%;
        margin-top: 32rpx;
      }
      & > .nickname {
        color: #333333;
        font-size: 32rpx;
        margin-top: 16rpx;
      }
    }

    & > .items {
      padding-bottom: 32rpx;
      & > .item {
        padding: 14rpx 38rpx;
        color: $text-color;
        font-size: 24rpx;
        background-color: $bg-gray;
        border-bottom: 1px solid #f1f1f1;
      }
    }
  }
}
</style>
