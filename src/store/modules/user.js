import request from '@/utils/request'
import { removeToken,setToken } from '@/utils/auth'
import { getToken } from '@/utils/auth'
import { rsalogin ,logout, getInfo} from '@/api/login'

import md5 from '@/utils/md5'
let info={} //权限
const user = {
  state: {
    'salesmanId': '',
    'userId': '',
    'tokenId': '',
    'mobile': '',
    'companyName': '',
    'verifyStatus': 0,
    'regDate': 1541574644000,
    'status': 0,
    'roleName':'',
    'superiorId':'',
    roles: []
  },
  mutations: {

    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USER: (state, user) => {
      state.userId = user.userId
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {

      const { appId,account,password,enStr,time,validCode} = userInfo
      return new Promise((resolve, reject) => {
        rsalogin({appId,account,password,enStr,time,validCode}).then(response => {
          const { data} = response
          console.log(data)
         commit('SET_TOKEN', data)
          setToken(data)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Update({ commit }, userInfo) {
      setToken(userInfo)
      commit('SET_USER', userInfo)
    },
    GET_ROLES({ commit }) {
      // const user = JSON.parse(getToken())
      const user = {}
      let roles = []
     try{
       let companyRole =  JSON.parse(localStorage.getItem('companyRole'))
       const permissionList = companyRole.permissionList
       // 数组转换
       for (let i = 0; i < permissionList.length; i++) {
         roles.push(permissionList[i].prId)
       }
     }catch(e){

     }
      if (roles.length === 0) {
        roles = ['no roles']
      }
      commit('SET_USER', user)
      commit('SET_ROLES', roles)
      commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        removeToken()
        resolve()
      })
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        removeToken()
        resolve()
      })
    }
  }
}

export default user
