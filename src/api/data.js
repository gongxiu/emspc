import request from "@/utils/request";
import qs from "qs";

//获取设备状态集合
export function geteQuipstatusList(params) {
  return request({
    url: "/emsequip/getequipstatuslist",
    method: "get",
    params
  });
}

//获取设备类型
export function getByCateName(params) {
  return request({
    url: "/dicitem/getbycatename/"+params,
    method: "get",

  });
}

//获取组织机构
export function getOrgTree(params) {
  return request({
    url: "/Organization/getorgtree",
    method: "get",
    params
  });
}
