import request from '@/utils/request'
import qs from "qs";

//用户列表

export function getByUrlUser(data) {
  console.log(data)
  return request({
    url: 'User/getbyurl',
    method: 'get',
    params:data
  })
}
//添加用户
export function addnewUser(data) {
  return request({
    url: '/User/addnew',
    method: 'put',
    data: qs.parse(data)
  })
}

//编辑用户
export function updateUser(data) {
  return request({
    url: '/User/update',
    method: 'post',
    data: qs.parse(data)
  })
}
//禁用用户
export function disableUser(data) {
  return request({

    // url: '/User/userEnableOrDisable​/'+data,

    url: '​User​/userEnableOrDisable​/'+data,
    method: 'post',
  })
}
//刪除用户
export function deleteUser(data) {
  return request({
    url: 'User/delete/'+data,
    method: 'delete',
  })
}
//用户详情
export function getbyIdUser(data) {
  return request({
    url: 'User/getbyid/'+data,
    method: 'get',
  })
}

//查询所有用户包含已授权的
export function queryAllUserIncludeAuthor(data,name) {
  return request({
    url: 'Role/queryAllUserIncludeAuthor/'+data+'/'+name,
    method: 'get',
  })
}
//用户授权
export function userAuthorization(data) {
  return request({
    url: 'User/userAuthorization',
    method: 'post',
    data: qs.parse(data)
  })
}

