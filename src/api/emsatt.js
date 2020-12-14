import request from '@/utils/request';
import qs from 'qs';



export function getEqDocumentUrl(param) {
    return request({
        url: 'emsatt/getbyurl',
        param
    })
}