import { post } from '@/utils'

interface IData {
  page?: number
  pageSize: number
  title?: string
}

export default {
  getShopList: (data: IData) => post('shops', data)
}
