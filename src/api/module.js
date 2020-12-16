import request from '@/utils/request'
import qs from "qs";
//新增模块
export function addnewMod(data) {
  return request({
    url:'Module/addnew',
    method: 'put',
    data: qs.parse(data)
  })
}
//编辑模块
export function updateMod(data) {
  return request({
    url: '/Module/update',
    method: 'post',
    data: qs.parse(data)
  })
}
//模块列表
export function getbyUrlMod(data) {
  return request({
    url: 'Module/getbyurl',
    method: 'get',
    data
  })
}
//模块详情
export function getbyIdMod(data) {
  return request({
    url: 'Module/getbyid/'+data,
    method: 'get',
  })
}
//删除模块
export function deleteMod(data) {
  return request({
    url: 'Module/delete/'+data,
    method: 'delete',
  })
}

//模块详情
export function getRoleModule(data) {
  return request({
    url: 'Role/getRoleModule/'+data,
    method: 'get',
  })
}

export function getorgtreeMod(data) {
  return request({
    url: 'Module/getorgtree',
    method: 'get',
    params:data
  })
}

//列表操作
export function getbyUrlMenu(data) {
  return request({
    url: 'Menu/getbyurl',
    method: 'get',
    params:data
  })
}
//新增操作
export function addnewMenu(data) {
  return request({
    url: 'Menu/addnew',
    method: 'put',
    data: qs.parse(data)
  })
}
//操作详情
export function getbyIdMenu(data) {
  return request({
    url: '/Menu/getbyid/'+data,
    method: 'get',
  })
}
//操作编辑
export function updateMenu(data) {
  return request({
    url: '/Menu/update',
    method: 'post',
    data: qs.parse(data)
  })
}
// 操作删除
export function deleteMenu(data) {
  return request({
    url: 'Menu/delete/'+data,
    method: 'delete',
  })
}
