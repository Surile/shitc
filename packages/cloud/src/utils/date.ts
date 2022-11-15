import * as dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

export const dateToNumber = (date?: string): any => {
  // 毫秒
  const unixTime = dayjs(date).valueOf()

  if (isNaN(unixTime)) {
    throw new Error(`Invalid Date Type: ${date}`)
  }

  console.log('unixTime', unixTime)

  return unixTime
}

// 获取 2020-08-08 格式的时间
export const getFullDate = (date?: string) => {
  // 毫秒
  return dayjs(date).format('YYYY-MM-DD')
}
