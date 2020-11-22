import request from "@/utils/request";
import qs from 'qs'
export function getByUrl(params) {
  return request({
    url: "diccate/getbyurl",
    method: "get",
    params
  });
}
//  字典类型列表
export function getAll(params) {
  return request({
    url: "diccate/getall",
    method: "get",
    params
  });
}
// 添加字典类别
export function addNew(params) {
  return request({
    url: "diccate/addnew",
    method: "put",
    params
  });
}
// 添加字典类别
export function dicIdDelete(params) {
  return request({
    url: "diccate/delete",
    method: "DELETE",
    params,
  });
}

export function dicUpdate(params) {
  return request({
    url: "diccate/update",
    method: "POST",
    data:qs.parse(params)
  });
}
