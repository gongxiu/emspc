
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
<<<<<<< HEAD
//角色编辑
export function uploadRole(data) {
  return request({
    url:'Role​/update',
    method: 'put',
    data
  })
}
=======

>>>>>>> 0cfeaaabdfa3fa15710815c7a49f59e82d25d398
//删除角色
export function deleteRole(data) {
  return request({
    url: 'Role/delete/'+data,
    method: 'delete',
  })
}
<<<<<<< HEAD
//树状角色
export function orgTreeRole(data) {
  return request({
    url: 'Role/getRoleOrgTree',
    method: 'get',
    data,
  })
}
//角色详情
export function getbyIdRole(data) {
  return request({
    url: 'Role/getbyid/'+data,
    method: 'get',
  })
}
//角色授权
export function roleAuthorization(data) {
  return request({
    url: 'Role/roleAuthorization',
    method: 'post',
    data: qs.parse(data)
  })
}
=======
>>>>>>> 0cfeaaabdfa3fa15710815c7a49f59e82d25d398
