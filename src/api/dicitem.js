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
