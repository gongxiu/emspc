import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'
import settings from './modules/settings'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    settings
  },
  getters
})

export default store
