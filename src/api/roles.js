
import request from '@/utils/request'

export function addRole(data) {
  return request({
    url:'Role/addnew',
    method: 'put',
    data
  })
}
