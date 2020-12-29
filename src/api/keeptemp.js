import request from '@/utils/request';
import qs from 'qs';

export function getKeepTempData(params) {
    return request({
        url: 'emsupkeeptemp/getbyurl',
        method: 'get',
        params
    })
}

//模板详情
export function getbyidKeep(id) {
  console.log(id)
  return request({
    url: 'emsupkeeptemp/getbyid/'+id,
    method: 'get',
  })
}

//保养模板新增
export function addnewTemp(params) {
  return request({
    url: '/emsupkeeptemp/addnew',
    method: 'put',
    data: qs.parse(params)
  })
}
//保养模板编辑
export function updataTemp(params) {
  return request({
    url: '/emsupkeeptemp/update',
    method: 'post',
    data: qs.parse(params)
  })
}
//保养模板删除
export function deleteTemp(params) {
  return request({
    url: '/emsupkeeptemp/delete/'+params,
    method: 'delete',
  })
}
//获取未分配的设备
export function getnotempequiplist(params) {
  return request({
    url: '/emsupkeeptemp/getnotempequiplist',
    method: 'get',
    params,
  })
}
//获取已分配的设备
export function gettempequiplist(params) {
  return request({
    url: '/emsupkeeptemp/gettempequiplist',
    method: 'get',
    params,
  })
}
//添加保养项
export function addnewKeep(data) {
  return request({
    url: '/emsupkeep/addnew',
    method: 'put',
    data:qs.parse(data)
  })
}

//保存保养项
export function updateKeep(data) {
  return request({
    url: '/emsupkeep/update',
    method: 'post',
    data:qs.parse(data)
  })
}
//保养项详情
export function getbyidEmsKeep(id) {
  console.log(id)
  return request({
    url: 'emsupkeep/getbyid/'+id,
    method: 'get',
  })
}
//保养项删除
export function deleteKeep(params) {
  return request({
    url: '/emsupkeep/delete/'+params,
    method: 'delete',
  })
}
