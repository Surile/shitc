import { get, post } from '@/utils'

interface IData {
  page?: number
  pageSize: number
  title?: string
  ids?: string
  latitude?: string
  longitude?: string
}

export interface User {
  avatar_url?: string
  create_time?: string
  gender?: number
  id?: number
  latitude?: string
  longitude?: string
  nick_name?: string
  open_id?: string
  phone?: string
  register_source?: number
  union_id?: string
  update_time?: string
  user_role?: number
  address?: string
  city?: string
  district?: string
  province?: string
  street?: string
  nation?: string
  street_number?: string
}

export const getShopList = (data: IData) => get('/shops', data)

export const login = (data: { js_code: string }) => post('/login', data)

export const fetchUser = async (): Promise<User> => get('/user')

export const setLocation = (data: { longitude: number; latitude: number }) =>
  post('/update_user_location', data)

export const publishShop = (data: {
  title: string
  content: string
  img_urls: string[]
  price: number
  latitude?: string
  longitude?: string
  old_price: number
}) => post('/shop', data)

export const getShop = (id: number) => get(`/shop/${id}`)
