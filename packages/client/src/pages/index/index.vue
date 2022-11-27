<template>
  <view class="container">
    <map
      id="map"
      style="width: 100vw; height: 100vh"
      :latitude="position.latitude"
      :longitude="position.longitude"
      show-location="true"
      enable-poi="true"
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
        <view class="nav-right hairline-top" @click="checkSting">
          <view class="flex flex-justify-content">
            <image src="../../assets/img/location_fixed.png" class="imgs"></image>
          </view>
          <view>我的位置</view>
        </view>
      </view>
      <view class="site-info">
        <view
          class="site-info-count flex flex-justify-between"
          :class="{ hideSiteInfo: showSiteInfo == 0 }"
        >
          <view class="show-info">
            <view class="site-no">商品名称：{{ siteInfo.companyName }}</view>
            <view class="address">{{ siteInfo.companyAddress }}</view>
            <view class="flex title">
              商品距离
              <!-- <cover-view class="hairline-left distance">{{
                utils.getDistance(position.latitude, position.longitude, siteInfo.lat, siteInfo.lng)
              }}</cover-view> -->
            </view>
          </view>
          <view
            class="nav-position flex flex-align-center flex-justify-content"
            @click="toNavigation"
          >
            <view>
              <view class="flex flex-align-center flex-justify-content">
                <image class="nav-img" src="../../assets/img/navigation.png"></image>
              </view>
              <view>导航</view>
            </view>
          </view>
        </view>
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
import { onLoad } from '@dcloudio/uni-app'
const markers = reactive<any>([]) // 标记点
const siteInfo = ref({
  id: '',
  companyName: '',
  companyAddress: '',
  lat: '',
  lng: ''
}) // 选中磅点信息
const showSiteInfo = ref(0) // 显示商品信息
const position = ref({
  latitude: '31.076562', // 纬度
  longitude: '121.518135' // 经度
}) // 位置信息
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
const checkSting = () => {
  uni.getSetting({
    success: (res) => {
      console.log('res', res)
      if (res.authSetting['scope.userLocation'] === false) {
        uni.showModal({
          title: '获取位置信息失败',
          content: '检测到您未开启地理位置授权，无法获取附近地磅信息，是否前往权限管理页面进行授权',
          success: function (res) {
            if (res.confirm) {
              uni.openSetting()
            }
          }
        })
      } else {
        getLocation()
      }
    }
  })
}
const getLocation = () => {
  uni.getLocation({
    type: 'gcj02',
    altitude: true,
    success(res) {
      position.value.latitude = res.latitude.toString()
      position.value.longitude = res.longitude.toString()
    },
    fail(err) {
      console.log('error', err)
      uni.showModal({
        showCancel: false,
        title: '获取位置信息失败',
        content: '请检查手机是否开启定位权限，请开启定位权限后再次刷新页面'
      })
    }
  })
}
const toNavigation = () => {
  uni.openLocation({
    latitude: parseFloat(siteInfo.value.lat),
    longitude: parseFloat(siteInfo.value.lng),
    name: siteInfo.value.companyName,
    address: siteInfo.value.companyAddress,
    scale: 18
  })
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
