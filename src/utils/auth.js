import Cookies from 'js-cookie'

const TokenKey = 'companyAdminToken'
const TokenMapKey = 'mapKey'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getMapToken(plate) {
  return Cookies.get(TokenMapKey + plate)
}

export function setMapToken(value, plate) {
  var millisecond = new Date().getTime();
  var expiresTime = new Date(millisecond + 10 * 60 * 1000); 
  return Cookies.set(TokenMapKey + plate, value, { expires: expiresTime })
}

export function removeMapToken(plate) {
  return Cookies.remove(TokenMapKey+plate)
}

