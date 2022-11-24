<template>
  <view class="container">
    <view class="container-header">
      <uni-row class="demo-uni-row">
        <uni-col :span="6">
          <view class="demo-uni-col dark">
            <image src="../../assets/img/head_d.png" />
          </view>
        </uni-col>
        <uni-col :span="17">
          <view class="demo-uni-col light uni-login">
            <text class="login" selectable="false" space="false" decode="false">
              点击此处登录
            </text>
          </view>
          <view class="demo-uni-col light uni-status">
            <text class="" selectable="false" space="false" decode="false">
              登陆表示你已同意《用户协议》
            </text>
          </view>
        </uni-col>
      </uni-row>
    </view>
    <view class="container-content">
      <uni-grid :column="3" :show-border="false" :square="false" @change="change">
        <uni-grid-item v-for="(item, index) in list" :key="index" :index="index">
          <view class="grid-item-box">
            <image class="image" :src="item.url" mode="aspectFill" />
            <text class="text">{{ item.text }}</text>
            <view v-if="item.badge" class="grid-dot">
              <uni-badge :text="item.badge" :type="item.type" />
            </view>
          </view>
        </uni-grid-item>
      </uni-grid>
    </view>
    <view class="container-list">
      <uni-row class="demo-uni-row" :gutter="gutter" :width="nvueWidth">
        <uni-col :span="4">
          <view class="demo-uni-col dark">
            <image src="../../assets/img/back-home.png" lazy-load="false" />
          </view>
        </uni-col>
        <uni-col :span="16">
          <view class="demo-uni-col light">支持二手平台</view>
        </uni-col>
        <uni-col :span="4">
          <view class="demo-uni-col dark"><uni-icons type="right" size="30"></uni-icons></view>
        </uni-col>
      </uni-row>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
// export default {
//   name: 'Personal'
// }
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

<style scoped lang="scss">
.container {
  .container-header {
    .uni-row {
      width: 95%;
      margin: auto;
    }
    .dark {
      image {
        width: 170rpx;
        height: 170rpx;
      }
    }
    .uni-login {
      margin: 28rpx;
      width: 249rpx;
      padding: 13rpx;
      border: 1px solid;
      border-radius: 50rpx;
      text-align: center;
    }
    .uni-status {
      margin-left: 30rpx;
    }
  }
}
</style>
