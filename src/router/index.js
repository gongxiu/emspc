import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import LayoutNew from '../views/layout/Layoutnew'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
//   {
//   path: '*',
//   redirect: '/404'
// },
{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},
{
  path: '/register',
  component: () => import('@/views/login/register'),
  hidden: true
},
{
  path: '/forgetPass',
  component: () => import('@/views/login/forgetPass'),
  hidden: true
},
{
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
},
{
  path: '/test',
  component: () => import('@/views/test'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  name: '管理看板',
  children: [{
    path: 'dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: {
      title: '管理看板',
      // icon: 'home'
      icon:'el-icon-s-tools'
    }
  }]
},
  {
    path: '/roles',
    component: Layout,
    redirect: '/roles/personnel',
    name: '权限管理',
    meta: {
      title: '权限管理',
      // icon: 'home'
      icon:'el-icon-s-tools'
    },
    children: [
      {
      path: 'personnel',
      component: () => import('@/views/roles/personnel/index'),
      meta: {
          title: '人员管理',
          // icon: 'home'
          icon:'el-icon-renyuan',
          roles: ['personnel_list']
        }
      },
      {
        path: 'station',
        component: () => import('@/views/roles/station/index'),
        meta: {
          title: '岗位管理',
          icon:'el-icon-s-tools'
        }
      },
      {
        path: 'role',
        component: () => import('@/views/roles/role/index'),
        meta: {
          title: '角色管理',
          icon:'el-icon-s-tools'
        }
      },
      {
        path: 'modular',
        component: () => import('@/views/roles/modular/index'),
        meta: {
          title: '模块管理',
          icon:'el-icon-s-tools'
        }
      },
      {
        path: 'interface',
        component: () => import('@/views/roles/interface/index'),
        meta: {
          title: '接口地址管理',
          icon:'el-icon-s-tools'
        }
      },
      {
        path: '/authorization',
        component: LayoutNew,
        redirect: '/authorization/authrole',
        name: '授权管理',
        meta: {
          title: '授权管理',
          // icon: 'home'
          icon:'el-icon-s-tools'
        },
        children: [
          {
            path: 'authrole',
            component: () => import('@/views/roles/authorization/authrole/index'),
            meta: {
              title: '角色授权',
              icon:'el-icon-s-tools'
            }
          },
          {
            path: 'authuser',
            component: () => import('@/views/roles/authorization/authuser/index'),
            meta: {
              title: '用户授权',
              icon:'el-icon-s-tools'
            }
          },
        ]

      },
    ]
  },
  {
    path: '/datamaintenance',
    component: Layout,
    redirect: '/datamaintenance/dictionary',
    name: '数据维护',
    children: [{
      path: 'dictionary',
      component: () => import('@/views/datamaintenance/dictionary/index'),
      meta: {
        title: '数据字典',
        // icon: 'home'
        icon:'el-icon-s-tools'
      }
    }]
  },
]

export const asyncRouterMap = [
  // {
  //   path: '*',
  //   component: () => import('@/views/404'),
  //   redirect:'/404',
  //   hidden: true
  // },

]

const router = new Router({
  mode: 'hash', // 后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
router.beforeEach((to, from, next) => {
  if (to.name === null && from.path != "/"){
    Message({
      message:'暂无权限操作,请联系管理员分配权限',
      type: 'error',
      duration: 5 * 1000
    })
    return;
 }else{
    if (to.meta && to.meta.title) {
      window.document.title = to.meta.title
    } else {
      // window.document.title = '大黄狗管车'
    }
    next()
 }

})
export default router
