import request from "@/utils/request";
import qs from "qs";


// 添加字典项
export function addNewItem(data) {
  return request({
    url: 'dicitem/addnew',
    method: "put",
    data
  });
}

// 编辑字典项
export function updateItem(data) {
  return request({
    url: 'dicitem/update',
    method: "post",
    data
  });
}
//删除字典项
export function deleteItem(data) {
  return request({
    url: 'dicitem/delete/'+data,
    method: "delete",
  });
}
