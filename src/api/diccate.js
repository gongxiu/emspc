import request from "@/utils/request";
import qs from "qs";

const api = {
  getbyurl: "diccate/getbyurl",
  getAll: "diccate/getall",
  addNew: "diccate/addnew",
  delete: "diccate/delete/",
  update: "diccate/update",
  deleteids: "diccate/deleteids",
  updatecloumn: "diccate/updatecloumn",
  getbyid: "diccate/getbyid",
  getbycatename:"dicitem/getbycatename/"
};
// 根据url搜索字典类别
export function getByUrl(params) {
  return request({
    url: api.getbyurl,
    method: "get",
    params
  });
}
//  字典类型列表
export function getAll(params) {
  return request({
    url: api.getAll,
    method: "get",
    params
  });
}
// 添加字典类别
export function addNew(data) {
  return request({
    url: api.addNew,
    method:"put",
    data
  });

}
// 删除字典类别
export function dicIdDelete(data) {
  return request({
    url: api.delete+data,
    method: "DELETE",
  });
}
// 更新字典类别
export function dicUpdate(params) {
  return request({
    url: api.update,
    method: "POST",
    data: qs.parse(params)
  });
}
// 删除多条数据
export function deleteids(params) {
  return request({
    url: api.deleteids,
    method: "delete",
    params
  });
}
// 更新某些列
export function updatecloumn(params) {
  return request({
    url: api.updatecloumn + params,
    method: "post"
  });
}
// 根据id和状态查询数据
export function getbyid(params) {
  return request({
    url: api.getbyid,
    method: "get",
    params
  });
}
//获取字典类名
export  function getbycatename(params) {
  return request({
    url:api.getbycatename+params
  })
}
