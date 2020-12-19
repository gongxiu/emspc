import request from '@/utils/request'
import qs from "qs";

export function login(username, password) {
  return request({
    url: '/static/login.json',
    method: 'get',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/static/info.json',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
//获取加密参数
export function getrsapubkey() {
  return request({
    url: 'Login/getrsapubkey',
    method: 'get'
  })
}
export function rsalogin(data) {
  console.log('user',data)
  return request({
    url: 'Login/rsalogin',
    method: 'post',
    data: qs.parse(data)
  })
}

