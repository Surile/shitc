const { PORT, COS_REGION, COS_BUCKET } = process.env

export const configuration = () => ({
  port: parseInt(PORT, 10) || 3000,
  COS_BUCKET: COS_REGION || '7072-prod-7gty8ctr4dee73db-1259440243',
  COS_REGION: COS_BUCKET || 'ap-shanghai'
})
