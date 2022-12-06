<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { getShop } from '@/api'
import { ref } from 'vue'
import Tag from '@/components/Tag.vue'
import { useMainStore } from '@/store'

const userStore = useMainStore().user

const data = ref<any>({
  photos: []
})

const user = ref()

onLoad((query) => {
  if (query?.id) {
    fetchShop(+query?.id)
  }
})

const fetchShop = async (id: number) => {
  try {
    const res = await getShop(id)
    data.value = res
    user.value = res.user
  } catch (error) {
    console.log(error)
  }
}
</script>
<template>
  <view :class="[$style.container, 'relative']">
    <scroll-view :class="$style.scroll" scroll-y>
      <view :class="$style.content">
        <view :class="[$style.header, 'flex', 'items-center']">
          <image :class="$style.avatar" src="https://picsum.photos/200/300" mode="scaleToFill" />
          <view :class="[$style.userText, 'flex', 'flex-1', 'flex-col', 'justify-center']">
            <view class="flex flex-1 items-center justify-between">
              <view v-if="user?.nick_name" :class="[$style.name, 'font-bold']">{{
                user.nick_name
              }}</view>
              <view :class="[$style.time, 'font-normal']">{{ data.create_time }}</view>
            </view>
            <view :class="$style.area">{{ userStore?.address }}</view>
          </view>
        </view>
        <view :class="[$style.priceBox, 'flex', 'items-center']">
          <view :class="[$style.price, 'font-bold']">{{ data.price }}</view>
          <view v-if="data.old_price" :class="[$style.oldPrice, 'font-bold']">原价¥229</view>
        </view>
        <view :class="$style.article">
          <view :class="[$style.title, 'font-bold', 'ellipsis-2']">{{ data.title }}</view>
          <view :class="[$style.articleContent, 'font-normal']">{{ data.content }}</view>
          <Tag name="2222"></Tag>
          <view v-for="item in data.photos" :key="item.id" :class="$style.articleImg">
            <img :src="item.url" mode="scaleToFill" />
          </view>
        </view>
      </view>
      <view :class="$style.userBox">
        <view :class="[$style.userBoxHeader, 'flex', 'flex-col', 'items-center', 'justify-center']">
          <image
            v-if="user?.avatar_url"
            :class="$style.userAvatar"
            :src="user.avatar_url"
            mode="scaleToFill"
          />
          <image
            v-else
            :class="$style.userAvatar"
            src="../../assets/img/head_d.png"
            mode="scaleToFill"
          />
          <view v-if="user?.nick_name" :class="[$style.nickname, 'font-bold']">{{
            user.nick_name
          }}</view>
        </view>
        <view :class="[$style.items, 'flex', 'flex-1', 'justify-around']">
          <view :class="[$style.item, 'font-medium']">在售商品1</view>
          <view :class="[$style.item, 'font-medium']">已售商品1</view>
          <view :class="[$style.item, 'font-medium']">加入1393天</view>
        </view>
        <view :class="[$style.userFooter, 'flex']">
          <view :class="['font-medium', 'flex', 'flex-1', 'items-center', 'justify-center']"
            >已实名认证</view
          >
          <view :class="['font-medium', 'flex', 'flex-1', 'items-center', 'justify-center']"
            >开通微积分</view
          >
        </view>
      </view>
      <view :class="$style.commitBox">
        <view :class="[$style.commitHeader, 'flex', 'items-center', 'justify-between']">
          <view :class="[$style.commitHeaderName, 'font-font-medium']">留言·0</view>
        </view>
        <view :class="$style.commitContent"></view>
      </view>
    </scroll-view>

    <view :class="[$style.bottomBox, 'w-full', 'fixed', 'bottom-0']">
      <view :class="[$style.box, 'flex', 'items-center', 'justify-between']">
        <view>Icon</view>
        <button :class="[$style.button, 'font-medium']" hover-class="button-hover">询问购买</button>
      </view>
    </view>
  </view>
</template>
<style module lang="scss">
$bottom-height: 120rpx;
.container {
  background-color: #fafafa;

  .scroll {
    padding-bottom: calc(constant(safe-area-inset-bottom) + #{$bottom-height} + 20rpx);
    padding-bottom: calc(env(safe-area-inset-bottom) + #{$bottom-height} + 20rpx);
    .content {
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

    .userBox {
      margin: 0px 38rpx;
      margin-top: 30rpx;
      background-color: white;
      border-radius: 16rpx;
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

      .items {
        padding-bottom: 32rpx;
        & > .item {
          padding: 14rpx 38rpx;
          color: $text-color;
          font-size: 24rpx;
          background-color: $bg-gray;
          border-bottom: 1px solid #f1f1f1;
        }
      }

      & > .userFooter {
        border-top: 1px solid #f1f1f1;
        & > view {
          padding: 24rpx 0px;
          color: #3d3d3d;
          font-size: 24rpx;
        }
      }
    }

    .commitBox {
      margin-top: 30rpx;
      padding: 0px 30rpx;
      margin-bottom: 30rpx;
      background-color: $white;
      & > .commitHeader {
        padding: 32rpx 0px;
        & > .commitHeaderName {
          font-size: 24rpx;
          color: $text-color;
        }
      }
      & > .commitContent {
        min-height: 476rpx;
      }
    }
  }

  .bottomBox {
    height: $bottom-height;
    background-color: $white;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    & > .box {
      padding: 20rpx 38rpx;
      & > .button {
        min-width: 266rpx;
        height: 76rpx;
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        padding: 0;
        text-align: center;
        vertical-align: middle;
        -webkit-text-size-adjust: 100%;
        border-radius: 100rpx;
        margin: 0;
        background-color: $primary;
        &::after {
          border: none;
        }
        color: $text-color;
        font-size: 32rpx;
      }
    }
  }
}
</style>
