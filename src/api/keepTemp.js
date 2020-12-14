import request from '@/utils/request';
import qs from 'qs';

export function getKeepTempData(params) {
    return request({
        url: 'emsupkeeptemp/getbyurl',
        method: 'get',
        params
    })
}