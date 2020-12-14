import request from '@/utils/request';
import qs from 'qs';



export function getEqDocumentUrl(params) {
    return request({
        url: 'emsatt/getbyurl',
        method: 'get',
        params
    })
}