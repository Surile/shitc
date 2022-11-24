import Request from '@/utils/index.ts'
const request = new Request()

interface IData {
  page?: number
  pageSize: number
  title?: string
}

interface IResult {
  id: number
}

export default {
  // map页面
  // async getShopList(data: IData): Promise<IResult[]> {
  //   return await request.http({})
  // }
}
