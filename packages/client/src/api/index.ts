import { get } from '@/utils'

interface IData {
  page?: number
  pageSize: number
  title?: string
}

export const getShopList = (data: IData) => get('/shops', data)
