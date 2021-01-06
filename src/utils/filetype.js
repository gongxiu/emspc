

const org = require("../api/organization");
let orgCon = []
//组织机构
function orgFun(){
 org.getOrgtree().then(res=>{
   orgCon = res.data
 })
}

exports.install = function (Vue, options) {

  Vue.prototype.$fileName = function(name) {
    if (!name || typeof name != 'string') return false;
    // console.log(name.substring((name.lastIndexOf("/") + 1), (name.lastIndexOf("?"))))
    return name.substring((name.lastIndexOf("/") + 1), (name.lastIndexOf("?")))
  }
  Vue.prototype.$fileType = function (urlList) {
    if (!urlList || typeof urlList != 'string') return false;
    let name = urlList.substring((urlList.lastIndexOf(".") + 1), (urlList.lastIndexOf("?")))
    if (name == 'jpg' || name == 'png' || name == 'jfif' || name == 'jpeg' || name == 'pjpeg' || name == 'pjp' || name == 'gif' || name == 'svg' || urlList.substring((urlList.lastIndexOf(".") + 1)) =='jpg') {
      return true
    } else {
      return false
    }
  }
  Vue.prototype.$hostUrl = function() {
    return 'http://www.emsapi.norain.top';
  }
  Vue.prototype.$bor = function() {
    return true;
  }
  Vue.prototype.$setCarQueue = function(n,t) {
    if(n==null || n == ''){
      n=t
    }else{
      if(!isNaN(Number(n))){
        n = Number(n)
      }
    }
    return n;
  }
  Vue.prototype.$setNumType = function(n) {
    if(n==null || n == ''){
      n=''
    }else{
      if(!isNaN(Number(n))){
        n = Number(n)
      }
    }
    return n;
  }
  Vue.prototype.$conShow = function(index,con){
    return  con.substring(con.length-index, con.length)
  }
  Vue.prototype.baseApi = function(index,con){
    return  process.env.BASE_API
  }
  Vue.prototype.$onlyImg = function (name) {
    console.log(name)
    if (name == 'image/jpg' || name == 'image/png' || name == 'image/jfif' || name == 'image/jpeg' || name == 'image/pjpeg' || name == 'image/pjp' || name == 'image/gif' || name == 'image/svg' ){
      return true;
    }else{
      // Message.error('请上传图片')
      this.$message({
        message:'请上传图片',
        type:'error'
      })
      return false;
    }
  }
  Vue.prototype.$unique = function(arr){
    var newArr = [];
    for(var i = 0; i < arr.length; i++){
      for(var j = i+1; j < arr.length; j++){
        if(arr[i].lat == arr[j].lat && arr[i].lng == arr[j].lng){
          ++i;
        }
      }
      newArr.push(arr[i]);
    }
    return newArr;
  },
   Vue.prototype.$seekDate = function(item){
     window.open(item,'_blank')
   },
   Vue.prototype.$check = function(str, s) {
     var start = str.indexOf(s);
     var n = str.indexOf(s, start + 1);
     if (n > 0) {
       return false;
     }
     return true;
  },
   Vue.prototype.$onlyNum = function(val,index) {
     val = val.slice(0,index)
      return val
   },
    //列表图片展示
    Vue.prototype.$showPhotos= function(index) {
      const viewer = this.$el.querySelector('#J_image_viewer_' +index).$viewer
      viewer.show()
   },
    //详情图片展示
    Vue.prototype.$showPhoto= function(index) {
      const viewer = this.$el.querySelector('#J_image_viewer_' +index).$viewer
      viewer.show()
    },
   Vue.prototype.$onlyImg = function (name) {
      console.log(name)
     if (name == 'image/jpg' || name == 'image/png' || name == 'image/jfif' || name == 'image/jpeg' || name == 'image/pjpeg' || name == 'image/pjp' || name == 'image/gif' || name == 'image/svg' ){
       return true;
     }else{
       // Message.error('请上传图片')
       this.$message({
         message:'请上传图片',
         type:'error'
       })
       return false;
     }
   }
  Vue.prototype.$onlyPhone = function (phone) {
    var strTemp = /^1[3|4|5|6|7|8|9][0-9]{9}$/;
    if (strTemp.test(phone)) {
      return true;
    }

    this.$message({
      message:'请输入正确手机号码',
      type:'error'
    })
    return false;
  }
  Vue.prototype.$closeVis = function (con) {
   this.con = false
  }
  Vue.prototype.$closFun = function (con) {
   this.$emit(con)
  }
  Vue.prototype.$closeModel = function () {
   return false
  }
  Vue.prototype.photoTest = function () {
    return 'https://resource.ycyh56.com/images/photo/16996264093568.jpg?1604326056616'
  },
  Vue.prototype.$orgFun = function () {
    orgFun()
    return orgCon
  }

}
