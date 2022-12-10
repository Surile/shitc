<script setup lang="ts">
import { publishShop } from '@/api'
import { ref } from 'vue'
import { useMainStore } from '@/store'

const user = useMainStore().user

const form = ref<{
  title: string
  content: string
  img_urls: string[]
  price: number
  old_price: number
}>({
  title: '',
  content: '',
  old_price: 0,
  price: 0,
  img_urls: []
})

const onUpload = () => {
  uni.chooseImage({
    sizeType: ['original', 'compressed'],
    success: (e) => {
      uni.showLoading({
        title: '正在上传...'
      })

      const names = e.tempFilePaths[0].split('/')

      // @ts-ignore
      wx.cloud.uploadFile({
        cloudPath: e.tempFilePaths[0].split('/')[names.length - 1], // 对象存储路径，根路径直接填文件名，文件夹例子 test/文件名，不要 / 开头
        filePath: e.tempFilePaths[0], // 微信本地文件，通过选择图片，聊天文件等接口获取
        config: {
          env: 'prod-3g66mg794d018e1e' // 微信云托管环境ID
        },
        success: (e: any) => {
          console.log('上传', e)
          // @ts-ignore
          wx.cloud.getTempFileURL({
            fileList: [e.fileID], // 文件唯一标识符 cloudID, 可通过上传文件接口获取
            success: (e: any) => {
              uni.hideLoading()
              form.value.img_urls.push(e.fileList[0].tempFileURL)
            },
            fail: console.error
          })
        },
        fail: console.error
      })
    }
  })
}

const onDeletedImg = (index: number) => {
  form.value.img_urls.splice(index, 1)
}

const onSubmit = async () => {
  try {
    if (!form.value.title) {
      uni.showToast({
        icon: 'none',
        title: '请填商品标题'
      })
      return
    }
    if (!form.value.content) {
      uni.showToast({
        icon: 'none',
        title: '请填商品描述'
      })
      return
    }
    if (!form.value.img_urls.length) {
      uni.showToast({
        icon: 'none',
        title: '至少上传一张图片'
      })
      return
    }
    const res = await publishShop({
      ...form.value,
      price: +form.value.price,
      old_price: +form.value.old_price,
      latitude: user!.latitude,
      longitude: user!.longitude
    })
    uni.showToast({
      icon: 'none',
      title: '发布成功'
    })
    uni.redirectTo({
      url: `../detail/index?id=${res.id}`
    })
  } catch (error) {
    console.log('error', error)
    uni.showToast({
      icon: 'none',
      title: '系统繁忙，请稍后再试'
    })
  }
}
</script>
<template>
  <view :class="[$style.container]">
    <view :class="[$style.titleRow, 'flex', 'items-center']">
      <text class="font-medium">标题</text>
      <input
        v-model="form.title"
        class="font-normal flex-1"
        placeholder="请输入标题"
        placeholder-class="font-normal"
      />
    </view>
    <view :class="[$style.textareaRow, 'flex']">
      <text class="font-medium">描述</text>
      <textarea
        v-model="form.content"
        placeholder="详情描述一下商品的新旧程度、使用情况及出售原因吧~"
        placeholder-class="font-normal"
      />
    </view>
    <view :class="[$style.pictures, 'flex', 'flex-wrap']">
      <template v-if="!!form.img_urls.length">
        <view
          v-for="(item, index) in form.img_urls"
          :key="index"
          :class="[$style.picture, 'flex', 'items-center', 'justify-center', 'relative']"
        >
          <image :src="item" mode="scaleToFill" />
        </view>
      </template>
      <view
        v-if="form.img_urls.length <= 9"
        :class="[$style.picture, 'flex', 'items-center', 'justify-center']"
        @click="onUpload"
      >
        +
      </view>
    </view>
    <view :class="[$style.locationBox, 'flex', 'items-center']">
      <text class="iconfont icon-dingwei"></text>
      <text :class="$style.name">{{ user?.street_number }}</text>
    </view>
    <view :class="$style.content">
      <view :class="[$style.title, 'flex', 'items-center', 'justify-center']">
        <text class="font-medium">想卖多少钱</text>
      </view>
      <view :class="[$style.priceBox]">
        <view :class="['flex']">
          <view :class="[$style.input, 'flex', 'flex-1', 'items-center']">
            <text>价格</text>
            <view class="flex">
              <input v-model="form.price" placeholder="0" placeholder-class="input-placeholder" />
            </view>
          </view>
          <view :class="[$style.input, 'flex', 'flex-1', 'items-center']">
            <text>入手价</text>
            <view class="flex">
              <input
                v-model="form.old_price"
                placeholder="0"
                placeholder-class="input-placeholder"
              />
            </view>
          </view>
        </view>
      </view>
      <view :class="$style.tagBox">
        <!-- <Tag name="有发票" /> -->
      </view>
    </view>
    <view :class="[$style.footer, 'w-full', 'fixed', 'bottom-0']">
      <button @click="onSubmit">确定发布</button>
    </view>
  </view>
</template>
<style module lang="scss">
.container {
  height: 100vh;
  background: #fafafa;
  & > .titleRow {
    padding: 30rpx;
    background-color: $white;
    border-bottom: 1px solid #f1f1f1;
    & > text {
      font-size: 32rpx;
    }
    & > input {
      margin-left: 20rpx;
      color: $text-second-color;
      font-size: 32rpx;
    }
  }

  & > .textareaRow {
    height: 200rpx;
    padding: 30rpx;
    background: $white;
    & > text {
      font-size: 32rpx;
    }

    & > textarea {
      margin-left: 20rpx;
      font-size: 28rpx;
    }
  }

  & > .pictures {
    background-color: $white;
    padding: 0px 10rpx;

    & > .picture {
      width: 160rpx;
      height: 160rpx;
      border-radius: 8rpx;
      background-color: #f8f8f8;
      font-size: 60rpx;
      color: $text-second-color;
      margin-top: 20rpx;
      margin-left: 20rpx;
      & > .icon {
        font-size: 24rpx;
        color: #222;
        position: absolute;
        top: 0;
        right: 0;
        width: 40rpx;
        height: 40rpx;
        text-align: center;
        line-height: 40rpx;
        background: rgb(0, 0, 0, 0.4);
        border-radius: 0px 8rpx 0px 0px;
      }
      & > image {
        width: 100%;
        height: 100%;
      }
    }
  }

  & > .locationBox {
    padding: 40rpx 30rpx;
    background-color: $white;
    & > .name {
      margin-left: 10rpx;
      font-size: 28rpx;
      color: $text-second-color;
    }
  }

  & > .content {
    margin-top: 20rpx;
    background-color: $white;

    & > .title {
      padding: 20rpx 0px;
      border-bottom: 1px solid #f1f1f1;
      & > text {
        font-size: 32rpx;
      }
    }

    & > .priceBox {
      .input {
        padding: 20rpx 30rpx;
        border-bottom: 1px solid #f1f1f1;
        &:first-child {
          border-right: 1px solid #f1f1f1;
        }
        & > text {
          width: 100rpx;
          font-size: 28rpx;
        }
        & > view {
          &::before {
            content: '¥';
            font-size: 28rpx;
            margin-right: 10rpx;
          }
          & > input {
            width: 150rpx;
            font-size: 28rpx;
          }
        }
      }
    }

    & > .tagBox {
      padding: 20rpx 30rpx;
    }
  }

  & > .footer {
    padding: 0px 30rpx;
    box-sizing: border-box;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    & > button {
      min-width: 100%;
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
      font-size: 30rpx;
      &::after {
        border: none;
      }
    }
  }
}
</style>
