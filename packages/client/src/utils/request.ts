const APP_ENV = import.meta.env.MODE ?? 'dev'

// let baseUrl = 'https://test.surile.cn'
// let baseUrl = 'http://192.168.1.4:3000'
let baseUrl = 'http://127.0.0.1:3000'

const AUTH_TOKEN_NAME = 'auth_token_v1'

if (APP_ENV === 'prod') {
  baseUrl = ''
} else if (APP_ENV === 'stage') {
  baseUrl = 'https://express-23ig-18124-5-1310400494.sh.run.tcloudbase.com'
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

function makeAuthHeader(token?: string | null) {
  const header: any = {}
  if (token != null) {
    header.Authorization = `Bearer ${token}`
  }
  return header
}

class AsyncLock {
  #locking: boolean
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  #resolve?: (val: void) => void
  #promise: Promise<void> | null
  constructor() {
    this.#promise = null
    this.#locking = false
  }

  async acquire() {
    // 锁被占用
    if (this.#locking) {
      if (this.#promise == null) {
        this.#promise = new Promise((resolve) => {
          this.#resolve = resolve
        })
      }
      return await this.#promise
    } else {
      this.#locking = true
    }
  }

  release() {
    this.#resolve?.()
    this.#promise = null
    this.#locking = false
  }
}

const loginLock = new AsyncLock()

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
  /**
   * 保证调接口之前处于登录状态
   * token过期，自动登录并且重新调接口
   */
  async function ensureToken() {
    let token = getAuthToken()
    if (token) {
      return token
    }

    await loginLock.acquire()
    token = getAuthToken()
    if (token) {
      return token
    }

    const code = await login({ provider: 'weixin' })

    const res = await fetch({
      url: getRequestUrl('/login'),
      header: makeAuthHeader(),
      method: 'POST',
      data: {
        js_code: code
      }
    })
    const newToken = res.access_token
    setAuthToken(newToken)
    loginLock.release()
    return newToken
  }

  async function callApi(token: string): Promise<any> {
    try {
      return await fetch({
        url: getRequestUrl(url),
        header: makeAuthHeader(token),
        data,
        method
      })
    } catch (error: any) {
      console.log('错误：')
      console.log(error)
      if (error.code === ErrorCode.TOKEN_EXPIRED) {
        uni.removeStorageSync(AUTH_TOKEN_NAME)
        // return await callApi(await ensureToken())
      } else {
        throw error
      }
    }
  }

  const token = await ensureToken()
  return await callApi(token)
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
