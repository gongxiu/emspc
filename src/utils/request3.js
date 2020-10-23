import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import store from '../store'
// import { getToken, removeToken } from '@/utils/auth'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.PHP_API,
  timeout: 60000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authori-zation'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    if (store.getters.tokenId) {
      config.params = {
        ...config.params,
        userId: store.getters.userId,
        tokenId: store.getters.tokenId,
        salesmanId: store.getters.salesmanId,
        superiorUserId: store.getters.superiorUserId
      }
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.status !== 200) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(res.data)
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
const request = (option) => {
  const url = option.url
  let params = option.params
  if (option.method && option.method.toUpperCase() === 'POST') {
    params = qs.stringify(params)
    return service({
      url: url,
      method: 'POST',
      data: params
    })
  } else {
    return service({
      url: url,
      method: 'GET',
      params: params
    })
  }
}
export default request
