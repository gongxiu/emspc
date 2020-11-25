import request from "@/utils/request";
import qs from 'qs'
//根据url参数搜索设备或配件
export function getByUrlEqu(params) {
  return request({
    url: "emsequip/getbyurl",
    method: "get",
    params
  });
}
//新增设备或配件
export function addNewEqu(params) {
  return request({
    url: "emsequip/addnew",
    method: "put",
    params
  });
}

//修改设备或配件
export function updateEqu(params) {
  return request({
    url: "emsequip/update",
    method: "put",
    params
  });
}
//获取设备状态集合
export function geteQuipstatusList(params) {
  return request({
    url: "/api/emsequip/getequipstatuslist",
    method: "get",
    params
  });
}
//设置设备的配件
export function setEquipAcc(params) {
  return request({
    url: "emsequip/setequipacc"+params,
    method: "post",
  });
}
//根据id删除实体
export function deleteEqiId(params) {
  return request({
    url: "/emsequip/getbyid"+params,
    method: "delete",
  });
}
//根据id和状态查询数据
export function getById(params) {
  return request({
    url: "/emsequip/getbyid"+params,
    method: "get",
  });
}
//删除多条数据
export function deletesEqiId(params) {
  return request({
    url: "/emsequip/deleteids",
    method: "delete",
    params
  });
}
//根据id和状态查询数据
export function updateColumn(params) {
  return request({
    url: "/emsequip/updatecolumn"+params,
    method: "post",
  });
}
