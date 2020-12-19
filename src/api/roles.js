
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

//角色编辑
export function uploadRole(data) {
  return request({
    url:'Role​/update',
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
//获取角色下的模块
export function getRoleModule(data) {
  return request({
    url: 'Role/getRoleModule/'+data,
    method: 'get',
  })
}
//获取角色模块下的操作
export function getRoleModuleMenu(rolesId,data) {
  return request({
    url: 'Role/getRoleModuleMenu/'+rolesId,
    method: 'get',
    params:data
  })
}
//添加角色模块
export function addRoleModule(data) {
  return request({
    url: 'Role/addRoleModule',
    method: 'post',
    data: qs.parse(data)
  })
}
