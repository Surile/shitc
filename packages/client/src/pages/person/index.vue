<template>
  <view :class="[$style.container, 'container']">
    <view :class="$style.header"> </view>
    <view :class="[$style.headBox, 'w-full', 'absolute', 'top-0']">
      <view :class="[$style.head, 'w-full']">
        <view class="flex items-center">
          <image :class="$style.avatar" src="../../assets/img/head_d.png" mode="scaleToFill" />
          <view :class="[$style.userInfo, 'flex', 'flex-col']">
            <text :class="[$style.nickname, 'font-black']">马上登录</text>
            <text :class="[$style.tip]">让闲置来赚钱</text>
          </view>
        </view>
        <view :class="[$style.menu, 'flex items-center justify-around']">
          <view
            :class="[
              $style.menuItem,
              'flex',
              'flex-col',
              'flex-1',
              'items-center',
              'justify-center'
            ]"
          >
            <text :class="[$style.menuItemValue, 'font-medium']">0</text>
            <text :class="[$style.menuItemTitle, 'font-normal']">我的收藏</text>
          </view>
          <!-- <view
            :class="[
              $style.menuItem,
              'flex',
              'flex-col',
              'flex-1',
              'items-center',
              'justify-center'
            ]"
          >
            <text :class="[$style.menuItemValue, 'font-medium']">0</text>
            <text :class="[$style.menuItemTitle, 'font-normal']">优惠券</text>
          </view> -->
          <view
            :class="[
              $style.menuItem,
              'flex',
              'flex-col',
              'flex-1',
              'items-center',
              'justify-center'
            ]"
          >
            <text :class="[$style.menuItemValue, 'font-medium']">0元</text>
            <text :class="[$style.menuItemTitle, 'font-normal']">已赚</text>
          </view>
        </view>
      </view>
    </view>
    <view :class="[$style.content, 'flex', 'flex-col']">
      <view :class="[$style.icons, 'flex', 'items-center', 'justify-around']">
        <view class="items-center justify-center">
          <view>icon</view>
          <text :class="[$style['icon-name'], 'font-normal']">我发布的</text>
        </view>

        <view class="items-center justify-center">
          <view>icon</view>
          <text :class="[$style['icon-name'], 'font-normal']">已卖出</text>
        </view>

        <view class="items-center justify-center">
          <view>icon</view>
          <text :class="[$style['icon-name'], 'font-normal']">已下架</text>
        </view>
        <view class="items-center justify-center">
          <view>icon</view>
          <text :class="[$style['icon-name'], 'font-normal']">我卖的</text>
        </view>
      </view>
      <view :class="$style.menuBox">
        <view :class="[$style.menuItem, 'flex', 'items-center', 'justify-between']">
          <view :class="[$style.menu]">
            <text :class="$style.name">防骗指南</text>
          </view>
          <view>icon</view>
        </view>
        <view :class="[$style.menuItem, 'flex', 'items-center', 'justify-between']">
          <view :class="[$style.menu]">
            <text :class="$style.name">帮助中心</text>
          </view>
          <view>icon</view>
        </view>
        <view :class="[$style.menuItem, 'flex', 'items-center', 'justify-between']">
          <view :class="[$style.menu]">
            <text :class="$style.name">意见与反馈</text>
          </view>
          <view>icon</view>
        </view>
        <view :class="[$style.menuItem, 'flex', 'items-center', 'justify-between']">
          <view :class="[$style.menu]">
            <text :class="$style.name">消息助手</text>
          </view>
          <view>icon</view>
        </view>
      </view>
    </view>
    <view :class="[$style.footer, 'flex items-center justify-center']">
      <view>隐私政策</view>
      <view>用户协议</view>
      <view>注销服务</view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

type DefaultForm = {
  label: string
  value: string
  prop: string
}[]
// 定义变量
const editFormData = ref<DefaultForm>([])
// 使用
editFormData.value = [
  {
    label: '客户名称',
    value: '',
    prop: ''
  },
  {
    label: '单号',
    value: '',
    prop: ''
  }
]
</script>

<style module lang="scss">
.container {
  height: calc(100vh - constant(safe-area-inset-bottom));
  height: calc(100vh - env(safe-area-inset-bottom));
  background-color: #f8f8f8;
  & > .header {
    height: 220rpx;
    background-image: linear-gradient(to bottom, #fad951 40%, #fdeb71 100%);
  }
  & > .headBox {
    display: inline-flex;

    .head {
      border-radius: 20rpx;
      background-color: $white;
      margin: 0px 30rpx;
      padding: 30rpx;
      .avatar {
        width: 140rpx;
        height: 140rpx;
      }
      .userInfo {
        // margin-left: 20rpx;
        & > .nickname {
          font-size: 44rpx;
        }
        & > .tip {
          color: $text-second-color;
          font-size: 24rpx;
          margin-top: 20rpx;
        }
      }
    }

    .menu {
      margin-top: 30rpx;

      .menuItemValue {
        font-size: 36rpx;
      }
      .menuItemTitle {
        font-size: 24rpx;
        margin-top: 4rpx;
      }
    }
  }

  & > .content {
    margin-top: 120rpx;
    padding: 0px 30rpx;
    & > .icons {
      padding: 30rpx 0px;
      border-radius: 10rpx;
      background-color: $white;

      .icon-name {
        font-size: 26rpx;
      }
    }
    & > .menuBox {
      margin-top: 20rpx;
      border-radius: 10rpx;
      background-color: $white;

      & > .menuItem {
        padding: 30rpx;

        & > .menu {
          & > .name {
            font-size: 30rpx;
            margin-left: 8rpx;
          }
        }
      }
    }
  }

  .footer {
    & > view {
      padding: 40rpx 0px;
      color: $text-second-color;
      font-size: 26rpx;
      &:not(:last-child) {
        &::after {
          content: '|';
          margin: 0px 30rpx;
        }
      }
    }
  }
}
</style>
