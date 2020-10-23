const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.userName,
  roles: state => state.user.roles,
  userId: state => state.user.userId,
  superiorUserId: state => state.user.superiorUserId,
  tokenId: state => state.user.tokenId,
  salesmanId: state => state.user.salesmanId,
  companyName: state => state.user.companyName,
  verifyStatus: state => state.user.verifyStatus,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  roleName: state => state.user.roleName,
  superiorId: state => state.user.superiorId,
  chargePeople: state => state.user.chargePeople
}
export default getters
