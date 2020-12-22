import request from '@/utils/request'
import qs from "qs";

//保养设置
export function getByUrlUpkeep(data) {
  return request({
    url: 'emsupkeep/getbyUrl',
    method: 'get',
    params:data
  })
}


//保养项模块emsupkeeptemp
export function getbyurlTem(data) {
  return request({
    url: 'emsupkeeptemp/getbyurl',
    method: 'get',
    params:data
  })
}
