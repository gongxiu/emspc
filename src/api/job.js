import request from "@/utils/request";
import qs from 'qs'
//根据url参数搜索岗位列表
export function getByUrlJob(params) {
  return request({
    url: "/job/getbyurl",
    method: "get",
    params
  });
}

//添加岗位
export function addNewJob(params) {
  return request({
    url: "job/addnew",
    method: "put",
    data: qs.parse(params)
  });
}
//编辑岗位
export function updateJob(params) {
  return request({
    url: "job/update",
    method: "post",
    data: qs.parse(params)
  });
}
//删除岗位
export function deleteJob(data) {
  return request({
    url: "job/delete/"+data,
    method: "delete",
  });
}
//岗位详情
export function getbyIdJob(data) {
  return request({
    url: 'Job/getbyid/'+data,
    method: 'get',
  })
}
//获取不在该岗位下的用户
export function getNoInJobUsers(data) {
  return request({
    url: 'job/getnoinjobusers/'+data,
    method: 'get',
  })
}
//获取在该岗位下的用户
export function getInJobUsers(data) {
  return request({
    url: 'job/getinjobusers/'+data,
    method: 'get',
  })
}
//给岗位分配用户
export function setJobUsers(data,userId) {
  return request({
    url: 'job/setjobusers/'+data,
    method: 'post',
    data: qs.parse(userId)
  })
}
