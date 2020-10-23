import request from '@/utils/request'

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
