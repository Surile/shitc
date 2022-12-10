<script setup lang="ts">
import { ref } from 'vue'
import { getShopList } from '@/api'
import { useMainStore } from '@/store'
import { onLoad } from '@dcloudio/uni-app'
import SlideView from '@/components/SlideView.vue'
const store = useMainStore()
const show = ref(false)
const markerIds = ref<number[]>([])
const _mapContext = uni.createMapContext('map', this)

onLoad(() => {
  createMapContext()
})

const createMapContext = () => {
  // @ts-ignore
  _mapContext.on('markerClusterClick', (res) => {
    markerIds.value = res.cluster.markerIds
    show.value = true
    console.log('markerClusterClick', res)
  })

  // @ts-ignore
  _mapContext.initMarkerCluster({
    enableDefaultStyle: false,
    zoomOnClick: true,
    complete(res: any) {
      console.log('initMarkerCluster', res)
    }
  })

  // @ts-ignore
  _mapContext.on('markerClusterCreate', (res) => {
    const clusters = res.clusters
    const clusterMarkers = clusters.map((cluster: any) => {
      const { center, clusterId, markerIds } = cluster
      return {
        ...center,
        width: 0,
        height: 0,
        clusterId, // 必须
        label: {
          content: markerIds.length + '',
          fontSize: 16,
          width: 40,
          height: 40,
          bgColor: '#fbbe0b',
          borderRadius: 25,
          textAlign: 'center',
          anchorX: -10,
          anchorY: -35
        }
      }
    })

    // @ts-ignore
    _mapContext?.addMarkers({
      markers: clusterMarkers,
      clear: true
    })
  })
}

const addMarkers = async ({ latitude, longitude }: { latitude?: string; longitude?: string }) => {
  try {
    const res = await getShopList({
      page: 1,
      pageSize: 100,
      latitude,
      longitude
    })
    if (!res.list) return
    const markers: any = []
    res.list
      .filter((item: any) => Number(item.latitude) && Number(item.longitude))
      .forEach((data: any) => {
        markers.push({
          width: 32,
          height: 32,
          id: data.id,
          latitude: data.latitude,
          longitude: data.longitude,
          joinCluster: true,
          zIndex: 9999,
          anchor: {
            x: 0.5,
            y: 1
          }
        })
      })
    console.log('markers', markers)
    // @ts-ignore
    _mapContext?.addMarkers({
      markers,
      clear: false
    })
  } catch (error) {
    console.log('error', error)
  }
}

const toPerson = () => {
  uni.navigateTo({
    url: '../person/index'
  })
}

const onNavigation = () => {
  uni.navigateTo({
    url: '../publish/index'
  })
}

const closed = () => {
  show.value = false
}

const onRegionChange = (e: any) => {
  if (
    e.detail.type === 'end' &&
    e.target.centerLocation.latitude &&
    e.target.centerLocation.longitude
  ) {
    addMarkers({
      latitude: e.target.centerLocation.latitude,
      longitude: e.target.centerLocation.longitude
    })
  }
}
</script>
<template>
  <view class="container">
    <map
      id="map"
      style="width: 100vw; height: 100vh"
      :show-location="true"
      :latitude="store.user?.latitude"
      :longitude="store.user?.longitude"
      :enable-poi="true"
      @regionchange="onRegionChange"
    >
      >
      <view class="nav" @click="onNavigation">
        <view class="icon w-full h-full flex items-center justify-center">
          <text class="iconfont icon-xinzeng"></text>
        </view>
      </view>
      <SlideView
        :latitude="store.user?.latitude"
        :longitude="store.user?.longitude"
        :show="show"
        :ids="markerIds"
        @closed="closed"
      />
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
<style scoped lang="scss">
.nav {
  width: 40px;
  height: 40px;
  color: #222;
  font-weight: bold;
  position: fixed;
  bottom: 120rpx;
  right: 50rpx;
  border-radius: 100px;
  background-color: $primary;
  .icon {
    font-size: 32px;
  }
}

.hairline-top,
.hairline-left {
  border-top: 1rpx solid #f0f0f0;
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

.dialog {
  height: 40%;
  background-color: #fff;
}
</style>
