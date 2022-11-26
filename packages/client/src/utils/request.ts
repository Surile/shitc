const APP_ENV = import.meta.env.MODE ?? 'dev'

let baseUrl = 'https://test.surile.cn'

const AUTH_TOKEN_NAME = 'auth_token_v1'

if (APP_ENV === 'prod') {
  baseUrl = ''
} else if (APP_ENV === 'stage') {
  baseUrl = ''
}

enum ErrorCode {
  TOKEN_EXPIRED = 401
}

function getAuthToken(): string | null {
  return uni.getStorageSync(AUTH_TOKEN_NAME)
}
function setAuthToken(token: string) {
  return uni.setStorageSync(AUTH_TOKEN_NAME, token)
}

type RequestOptionsWithoutCallback = Omit<UniApp.RequestOptions, 'success' | 'fail' | 'complete'>

type RequestSuccessCallbackResult = Omit<UniApp.RequestSuccessCallbackResult, 'data'> & {
  data: AnyObject
}

async function request(options: RequestOptionsWithoutCallback) {
  return await new Promise<RequestSuccessCallbackResult>((resolve, reject) => {
    uni.request({
      ...options,
      // @ts-expect-error
      success: (result: RequestSuccessCallbackResult) => resolve(result),
      fail: (result: UniApp.GeneralCallbackResult) => {
        console.error(result)
        reject(result)
      }
    })
  })
}

const showLog = process.env.NODE_ENV !== 'development'

function getRequestUrl(url: string) {
  if (/^http:|^https:/.test(url)) {
    return url
  }

  return `${baseUrl}${url}`
}

function makeAuthHeader(token?: string) {
  const header: any = {
    channel: 1
  }
  if (token !== null) {
    header['user-token'] = token
  }
  return header
}

async function fetch(option: RequestOptionsWithoutCallback) {
  const res = await request(option)
  if (showLog) {
    console.log('======================================')
    console.log('📌', option.method, ' ', option.url)
    console.log('参数:')
    console.log(option.data)
  }
  if (res.statusCode !== 200 || res.data.code !== 0) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw res.data
  }
  if (showLog) {
    console.log('返回:')
    console.log(res.data)
  }
  return res.data.data
}

export async function login(option: UniApp.LoginOptions): Promise<string> {
  return await new Promise((resolve, reject) => {
    return uni.login({
      ...option,
      success: (result) => {
        resolve(result.code)
      },
      fail: (error) => {
        reject(error)
      }
    })
  })
}

async function loginRequiredRequest({
  url,
  method = 'GET',
  data
}: {
  url: string
  method: UniApp.RequestOptions['method']
  data: any
}) {
  try {
    return await fetch({
      url: getRequestUrl(url),
      header: makeAuthHeader(),
      data,
      method
    })
  } catch (error: any) {
    console.log('错误：')
    console.log(error)
    if (error.code === ErrorCode.TOKEN_EXPIRED) {
      uni.removeStorageSync(AUTH_TOKEN_NAME)
    } else {
      throw error
    }
  }
}

async function http({
  url,
  method = 'GET',
  data
}: {
  url: string
  method?: UniApp.RequestOptions['method']
  data: AnyObject
}) {
  return await loginRequiredRequest({ url, method, data })
}

async function get(url: string, data?: any) {
  return await http({
    url,
    data
  })
}

async function post(url: string, data?: any) {
  return await http({
    url,
    data: data ?? {},
    method: 'POST'
  })
}

export { request, get, post }
