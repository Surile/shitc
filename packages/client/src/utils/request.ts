type IParam = Pick<UniApp.RequestOptions, 'data' | 'method' | 'url'> & { hideLoading: boolean }

const APP_ENV = process.env.APP_ENV ?? 'dev'

let baseUrl = 'https://test.surile.cn'

if (APP_ENV === 'prod') {
  baseUrl = ''
} else if (APP_ENV === 'stage') {
  baseUrl = ''
}

export default class Request {
  async http(param: IParam) {
    const url = param.url
    const data = param.data ?? {}
    const method = param.method
    let header = {}
    const hideLoading = param.hideLoading || true
    const requestUrl = `${baseUrl}${url}`

    if (method === 'POST' || method === 'PUT') {
      header = {
        'content-type': 'application/x-www-form-urlencoded'
      }
    } else {
      header = {
        'content-type': 'application/json'
      }
    }

    if (!hideLoading) {
      uni.showLoading({
        title: '加载中...'
      })
    }
    return await new Promise((resolve, reject) => {
      uni.request({
        url: requestUrl,
        data,
        method,
        header,
        success: (res: any) => {
          if (res.statusCode !== 0 && res.statusCode !== 200) {
            uni.showToast({
              title: res.data.message,
              icon: 'none'
            })
            return false
          } else if (res.data.code === 200) {
            resolve(res.data)
          } else {
            reject(res)
            uni.showToast({
              title: res.data.message ?? '请求错误',
              icon: 'none'
            })
          }
        },
        fail: (err) => {
          uni.showToast({
            title: err.errMsg,
            icon: 'none'
          })
          resolve(err.errMsg)
        },
        complete() {
          if (!hideLoading) {
            uni.hideLoading()
          }
          return false
        }
      })
    })
  }
}
