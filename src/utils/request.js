import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
const service = axios.create({
  baseURL: process.env.BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
// request interceptor
service.interceptors.request.use(
  config => {
    console.log(config)
    // !store.getters.token 跳过token的存储验证
    config.headers['Content-Type']= 'application/json'
    if (!store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] ='Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJVc2VySWQiOiI0OTQ5NGVkZC0wNTRhLTZlMDQtMmFhMy02MTVjOTAxNDk0MGIiLCJleHAiOjE2MDczNTk4MzQsImlzcyI6IndlYmFwaS5jbiIsImF1ZCI6IldlYkFwaSJ9.7J8Pc9qePHRSC-Ej2NgD7Za4PX6e81KE2In1M3IfEpI'
        // 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    console.log(2)
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 0) {
      console.log(1)
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code == 401) {
        console.log(123,res.code )
        // to re-login
        Message({
          message: '登录失效',
          type: 'error',
          duration: 5 * 1000
        })
        window.open('http://www.emsapi.norain.top/api/Login/gettoken/2167a4cb-466e-4efc-9679-880b0ec76dc6/49494edd-054a-6e04-2aa3-615c9014940b')
        // store.dispatch('user/resetToken').then(() => {
        //   location.reload()
        // })
      }
      // return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
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

export default service


