<template>
  <view class="content">
    <image class="logo" src="@/assets/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <button @click="onLogin">登录</button>
    <view class="value"> appid：{{ appid }} </view>
    <view class="value"> openid：{{ openid }} </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const title = ref('Hello World Uni-App')

const appid = ref('')

const openid = ref('')

const onLogin = () => {
  wx.cloud
    .callFunction({
      name: 'login'
    })
    .then((res) => {
      appid.value = res.result.appid
      openid.value = res.result.openid
      console.log('res', res)
    })
}
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

.value {
  color: #999;
  font-size: 32rpx;
}
</style>
