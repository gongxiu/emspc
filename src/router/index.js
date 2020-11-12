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
    path: '/device',
    component: Layout,
    redirect: '/device/parameter',
    name: '设备管理',
    meta: {
      title: '设备管理',
      // icon: 'home'
      icon:'el-icon-shebeiguanli'
    },
    children: [
      {
        path: 'parameter',
        component: () => import('@/views/device/parameter/index'),
        meta: {
          title: '设备台账',
          // icon: 'home'
          icon:'el-icon-taizhang'
        }
      },
      {
        path: 'accessories',
        component: () => import('@/views/device/accessories/index'),
        meta: {
          title: '设备配件',
          // icon: 'home'
          icon:'el-icon-beijian'
        }
      },
      {
        path: 'document',
        component: () => import('@/views/device/document/index'),
        meta: {
          title: '设备文档',
          // icon: 'home'
          icon:'el-icon-wendang'
        }
      },
      {
        path: 'transfers',
        component: () => import('@/views/device/transfers/index'),
        meta: {
          title: '设备调拨',
          // icon: 'home'
          icon:'el-icon-tiaobo'
        }
      },
    ]
  },
  {
    path: '/check',
    component: Layout,
    redirect: '/check/maintenance',
    name: '检修管理',
    meta: {
      title: '检修管理',
      // icon: 'home'
      icon:'el-icon-jianxiuguanli'
    },
    children: [
      {
        path: 'maintenance',
        component: () => import('@/views/check/maintenance/index'),
        meta: {
          title: '设备维修',
          // icon: 'home'
          icon:'el-icon-shebeiweixiu'
        }
      },
      {
        path: 'my',
        component: () => import('@/views/check/my/index'),
        meta: {
          title: '我的维修',
          // icon: 'home'
          icon:'el-icon-icon_weixiu'
        }
      },
      {
        path: 'repository',
        component: () => import('@/views/check/repository/index'),
        meta: {
          title: '维修知识库',
          // icon: 'home'
          icon:'el-icon-tianlun-shebeiweixiuzhishiku'
        }
      },
    ]
  },
  {
    path: '/roles',
    component: Layout,
    redirect: '/roles/personnel',
    name: '权限管理',
    meta: {
      title: '权限管理',
      // icon: 'home'
      icon:'el-icon-quanxian'
    },
    children: [
      {
      path: 'personnel',
      component: () => import('@/views/roles/personnel/index'),
      meta: {
          title: '人员机构',
          // icon: 'home'
          icon:'el-icon-renyuanjigou',
          roles: ['personnel_list']
        }
      },
      {
        path: 'station',
        component: () => import('@/views/roles/station/index'),
        meta: {
          title: '岗位管理',
          icon:'el-icon-gangweiguanli'
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
          icon:'el-icon-module'
        }
      },
      {
        path: 'interface',
        component: () => import('@/views/roles/interface/index'),
        meta: {
          title: '接口地址管理',
          icon:'el-icon-icon-menu-m0640'
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
          icon:'el-icon-quanxian'
        },
        children: [
          {
            path: 'authrole',
            component: () => import('@/views/roles/authorization/authrole/index'),
            meta: {
              title: '角色授权',
              icon:'el-icon-jiaose1'
            }
          },
          {
            path: 'authuser',
            component: () => import('@/views/roles/authorization/authuser/index'),
            meta: {
              title: '用户授权',
              icon:'el-icon-jiaoseshouquan'
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
    meta: {
      title: '数据维护',
      // icon: 'home'
      icon:'el-icon-shujuweihu'
    },
    children: [{
      path: 'dictionary',
      component: () => import('@/views/datamaintenance/dictionary/index'),
      meta: {
        title: '数据字典',
        // icon: 'home'
        icon:'el-icon-shujuzidian'
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
