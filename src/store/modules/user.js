import request from '@/utils/request'
import { setToken } from '@/utils/auth'
import { removeToken } from '@/utils/auth'
import { getToken } from '@/utils/auth'
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
      state.tokenId = user.tokenId
      state.salesmanId = user.salesmanId
      state.mobile = user.mobile
      state.companyName = user.companyName
      state.regDate = user.regDate
      state.status = user.status
      state.verifyStatus = user.verifyStatus
      state.roleName = user.roleName
      state.superiorId = user.superiorId
      state.chargePeople  = user.chargePeople
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        request({
          url: 'user/companyUserLogin',
          method: 'get',
          params: {
            mobile: username,
            passWord: md5(userInfo.password)
          }
        }).then(res => {
          
        let conpanyInfo =  {
           chargePeople: res.data.chargePeople,
           companyName: res.data.companyName,
           depositPay: res.data.depositPay,
           depositStatus: res.data.depositStatus,
           driverCount: res.data.driverCount,
           materialUrl: res.data.materialUrl,
           mobile: res.data.mobile,
           regDate: res.data.regDate,
           roleId: res.data.roleId,
           roleName: res.data.roleName,
           status: res.data.status,
           subaccountId: res.data.subaccountId,
           superiorUserId: res.data.superiorUserId,
           tokenId: res.data.tokenId,
           userId: res.data.userId,
           verifyStatus: res.data.verifyStatus,
          salesmanId: res.data.salesmanId
          }
          setToken(conpanyInfo)
          localStorage.setItem('salesmanId', JSON.stringify(res.data.salesmanId))
          localStorage.setItem('companyRole', JSON.stringify(res.data.role))
          commit('SET_USER', res.data)
          info = {
            role: res.data.role
          }
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    Update({ commit }, userInfo) {
      setToken(userInfo)
      commit('SET_USER', userInfo)
    },
    GET_ROLES({ commit }) {
    
      let roles = []
     try{
      const user = JSON.parse(getToken())
       let companyRole =  JSON.parse(localStorage.getItem('companyRole'))
       console.log(companyRole)
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
