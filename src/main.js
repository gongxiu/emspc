import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import Viewer from 'v-viewer'
import ElementUI,{ Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/element-variables.scss'
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // permission control
// import echarts from 'echarts'
import Const from '@/utils/const'
import moment from 'moment/moment'
import 'viewerjs/dist/viewer.css'
import request from '@/utils/request'
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import Blob from './excel/Blob.js'
import allFun from '@/utils/filetype'
import animated from 'animate.css'
import '@/assets/font/iconfont.css'
//识别条形码
import VueBarcode from '@xkeshi/vue-barcode';
Vue.component('barcode', VueBarcode);
// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts
Vue.use(allFun)
Vue.component(VueCropper)
Vue.use(VueCropper)
Vue.use(animated)
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 99999
  }})

Viewer.setDefaults({
  Options: {
    "inline": true,  //启动inline模式
    "button": true,  //显示右上角关闭按钮
    "navbar": true,  //显示缩略图导航
    "title": true,  //显示当前图片标题
    "toolbar": true,  //显示工具栏
    "tooltip": true,  //显示缩放百分比
    "movable": true,  //图片是否可以移动
    "zoomable": true,  //图片是否可以缩放
    "rotatable": true,  //图片是否可以旋转
    "scalable": true,  //图片是否可以翻转
    "transition": true,  //使用CSS3过度
    "fullscreen": true,  //播放时是否全屏
    "keyboard": true,  //是否支持键盘
    "url": "data-source" //设置大图片的 url
  }
})
  //全局存储该账号的userid，方便后面账号判断
Vue.prototype.store = store.getters
Vue.filter('moment', (value, formatString) => {
  if (typeof (value) != "string" && value != "" && value !== undefined && value !== null){
    let val = value.toString()
    if (val.length == 10){
      val = val*1000
    }

    val = Number(val)
    if (val !== undefined && val !== '') {
      formatString = formatString || 'YYYY-MM-DD HH:mm'
      // return moment(value).format(formatString); // value可以是普通日期 20170723
      return moment(val).format(formatString) // 这是时间戳转时间
    } else {
      return '无'
    }
  }else{
    return value
  }
})
Vue.filter('moment2', (value, formatString) => {
  if (typeof (value) != "string" && value != "" && value !== undefined && value !== null) {
    let val = value.toString()
    if (val.length == 10) {
      val = val * 1000
    }
    val = Number(val)
    if (val !== undefined && val !== '' && val != 0) {
      formatString = formatString || 'YYYY-MM-DD'
      // return moment(value).format(formatString); // value可以是普通日期 20170723
      return moment(val).format(formatString) // 这是时间戳转时间
    } else {
      return '无'
    }
  } else {
    if (value == '' || value == null || value == 0) {
      return
    }
    value = value.substring(0, (value.lastIndexOf(" ")))
    return value
  }
})
Vue.filter('moment1', (value, formatString) => {
  if (typeof (value) != "string" && value != "" && value !== undefined && value !== null) {
    let val = value.toString()
    if (val.length == 10) {
      val = val * 1000
    }
    val = Number(val)
    if (val !== undefined && val !== '') {
      formatString = formatString || 'HH:mm:ss'
      // return moment(value).format(formatString); // value可以是普通日期 20170723
      return moment(val).format(formatString) // 这是时间戳转时间
    } else {
      return '无'
    }
  } else {
    if (value == '' || value == null || value == 0) {
      return
    }
    value = value.substring((value.lastIndexOf(" ")), (value.length))
    return value
  }
})
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

Vue.prototype.formatStrToDate = function(str) {
  str = str.substring(0, 19)
  str = str.replace(/-/g, '/')
  return new Date(str)
}
