import request from '@/utils/request'

export function getByUrl(params) {
  return request({
    url: 'diccate/getbyurl',
    method: 'get',
    params
  })
}
