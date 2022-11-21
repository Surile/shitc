const { PORT, WX_APPID, WX_SECRET } = process.env

export const configuration = () => ({
  port: parseInt(PORT, 10) || 3000,
  WX_APPID: WX_APPID || 'wx60b3b2b731c9d0b4',
  WX_SECRET: WX_SECRET || '06e22f8505b7bae407a0e57a3f820bc2'
})
