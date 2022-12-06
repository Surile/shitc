<template>
  <view class="container">
    <map
      style="width: 100vw; height: 100vh"
      show-location="true"
      enable-poi="true"
      :latitude="store.user?.latitude"
      :longitude="store.user?.longitude"
      scale="20"
      :markers="markers"
      enable-zoom="true"
      @callouttap="getSiteInfo"
      @markertap="getSiteInfo"
      @tap="setSiteInfo"
    >
      <view class="nav">
        <navigator :url="getUrl()" hover-class="none">
          <view>
            <view class="flex flex-justify-content">
              <image src="../../assets/img/nearby.png" class="imgs"></image>
            </view>
            <view>商品列表</view>
          </view>
        </navigator>
        <view class="nav-right hairline-top" @click="onNavigation">
          <view class="flex flex-justify-content">
            <image src="../../assets/img/scanning.png" class="imgs"></image>
          </view>
          <view>扫码过磅</view>
        </view>
        <!-- <view class="nav-right hairline-top" @click="checkSting">
          <view class="flex flex-justify-content">
            <image src="../../assets/img/location_fixed.png" class="imgs"></image>
          </view>
          <view>我的位置</view>
        </view> -->
      </view>
    </map>
    <view class="user-info" @click="toPerson">
      <image class="avatar" src="../../assets/img/avatar_frame.gif"></image>
      <!-- <image
        class="head-img"
        v-if="userInfo.avatarUrl"
        :src="userInfo.avatarUrl"
        mode="cover"
      ></image> -->
      <image class="head-img" src="../../assets/img/head_d.png"></image>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { getShopList } from '@/api'
import { useMainStore } from '@/store'
import { onLoad } from '@dcloudio/uni-app'
const store = useMainStore()
const markers = reactive<any>([]) // 标记点
onLoad(() => {
  init()
})

const init = () => {
  getShopList({
    page: 1,
    pageSize: 10
  })
    .then((res) => {
      if (res.list.length === 0) return
      const mapCtx = uni.createMapContext('map') // 创建初始地图
      res.list.forEach((item: any) => {
        markers.push({
          id: item.id,
          latitude: item.latitude,
          longitude: item.longitude,
          iconPath: item.photos[0].url,
          width: 32,
          joinCluster: true,
          height: 32,
          callout: {
            content: item.title,
            color: '#222',
            fontSize: 12,
            borderRadius: 4,
            bgColor: '#fad951',
            padding: 5,
            display: 'ALWAYS',
            textAlign: 'center'
          }
        })
      })
      console.log('markers', markers)

      // @ts-ignore
      mapCtx?.addMarkers({
        markers,
        success: (res: any) => {
          console.log('res', res)
        }
      })
    })
    .catch((error) => {
      console.log('error', error)
    })
}

const toPerson = () => {
  uni.navigateTo({
    url: '../person/index'
  })
}

const getUrl = () => {
  return '../list/index'
}

const onNavigation = () => {
  uni.navigateTo({
    url: '../publish/index'
  })
}

const getSiteInfo = (e: any) => {
  console.log(e)
  const markerId = e.markerId
  uni.navigateTo({
    url: `../detail/index?id=${markerId}`
  })
}

const setSiteInfo = (e: any) => {
  console.log('e', e)
}
</script>

<style scoped lang="scss">
.nav {
  position: fixed;
  top: 180rpx;
  right: 20rpx;
  font-size: 22rpx;
  padding: 20rpx 12rpx;
  border-radius: 16rpx;
  background-color: #fff;
  color: $theme-color;
}

.hairline-top,
.hairline-left {
  border-top: 1rpx solid #f0f0f0;
}

.nav-right {
  margin-top: 16rpx;
  padding-top: 16rpx;
}

.imgs {
  width: 64rpx;
  height: 64rpx;
  margin-bottom: 12rpx;
}

.site-info {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 20rpx;
}

.site-info-count {
  margin: 20rpx 20rpx;
  padding: 20rpx 20rpx;
  background-color: #fff;
}
.hideSiteInfo {
  display: none;
}

.title {
  font-size: 28rpx;
  margin-top: 18rpx;
}

.distance {
  margin-left: 12rpx;
  padding-left: 12rpx;
  color: $theme-color;
}

.address {
  font-size: 25rpx;
  overflow: hidden;
  margin-top: 14rpx;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: $grey-color;
}
.show-info {
  flex: 1;
}
.site-no {
  overflow: hidden;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.nav-position {
  color: #fff;
  width: 126rpx;
  height: 126rpx;
  font-size: 28rpx;
  margin-left: 20rpx;
  border-radius: 50%;
  background-color: $theme-color;
}

.nav-img {
  width: 36rpx;
  height: 36rpx;
}
.user-info {
  z-index: 99999;
  position: fixed;
  top: 160rpx;
  left: 20rpx;
  overflow: hidden;
}

.avatar {
  width: 160rpx;
  height: 160rpx;
}
.user-info .head-img {
  width: 122rpx;
  height: 122rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: -1;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}
</style>
