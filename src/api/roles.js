
import request from '@/utils/request'
import qs from "qs";

//角色列表
export function getbyurlRole(data) {
  return request({
    url:'Role/getbyurl',
    method: 'get',
    params:data
  })
}
//角色新增
export function addRole(data) {
  return request({
    url:'Role/addnew',
    method: 'put',
    data
  })
}
//删除角色
export function deleteRole(data) {
  return request({
    url: 'Role/delete/'+data,
    method: 'delete',
  })
}
