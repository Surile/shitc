<template>
  <view :class="[$style.tag, 'font-medium']">{{ props.name }}</view>
</template>
<script setup lang="ts">
const props = defineProps<{
  name: string
}>()
</script>
<style module lang="scss">
.tag {
  padding: 6rpx 16rpx;
  display: inline-block;
  color: $text-color;
  font-size: 24rpx;
  background-color: #f7f7f7;
}
</style>
