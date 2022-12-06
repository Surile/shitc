const { PORT, WX_APPID, WX_SECRET, WX_BASE_URL, WX_MAP_KEY, WX_MAP_BASE_URL, WX_MAP_SCREEN } =
  process.env

export const configuration = () => ({
  port: parseInt(PORT, 10) || 3000,
  WX_MAP_SCREEN: WX_MAP_SCREEN || 'h8QQPcUBFB4cHUJ30Wrx6LDuvwcRr7c',
  WX_MAP_KEY: WX_MAP_KEY || 'RGNBZ-VYK6R-BVFWK-WSGZF-L3FZ3-XMB6M',
  WX_MAP_BASE_URL: WX_MAP_BASE_URL || 'https://apis.map.qq.com/ws/geocoder/v1',
  WX_BASE_URL: WX_BASE_URL || 'https://api.weixin.qq.com',
  WX_APPID: WX_APPID || 'wxf0416a9c20caefcd',
  WX_SECRET: WX_SECRET || '49cb6af4a3a6daa0cf7a36208fbb6974'
})
