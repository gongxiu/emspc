import request from '@/utils/request'

//机构查询接口
export function getOrganization(data) {
  return request({
    url:'Organization/getbyurl',
    method: 'get',
    data
  })
}
//获取机构树
export function getOrgtree(data) {
  return request({
    url:'Organization/getorgtree',
    method: 'get',
    data
  })
}
//添加机构
export function addnewOrg(data) {
  return request({
    url:'Organization/addnew',
    method: 'put',
    data
  })
}
//删除机构
export function deleteOrg(data) {
  return request({
    url:'Organization/deleteOrganization/'+data,
    method: 'delete',
  })
}
//查询此机构下的员工信息
export function orgUser(data) {
  return request({
    url:'Organization/queryToOrganizationUser',
    method: 'get',
    data
  })
}
