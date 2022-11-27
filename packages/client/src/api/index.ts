import { get, post } from '@/utils'

interface IData {
  page?: number
  pageSize: number
  title?: string
}

export const getShopList = (data: IData) => get('/shops', data)

export const login = (data: { js_code: string }) => post('/login', data)

export const setLocation = (data: { longitude: number; latitude: number }) =>
  post('/update_user_location', data)

export const publishShop = (data: {
  title: string
  content: string
  img_urls: string[]
  price: number
  latitude: number
  longitude: number
  old_price: number
}) => post('/shop', data)

export const getShop = (id: number) => get(`/shop/${id}`)
