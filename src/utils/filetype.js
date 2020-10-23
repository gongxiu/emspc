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
  Vue.prototype.$setColor = function(index) {
    if(index==1){
      return 'color:#FC6F04' //黄色
    }
    if(index == 2){
      return'background:linear-gradient(180deg,#FEE139 0%,#F8B300 100%)';//黄色渐变色
    }
    if(index==3){
      return 'color:#fff' //白色
    }
    if(index==4){
      return 'color:#000' //黑色
    }
    if(index == 5){
      return {
        background:'#FFE700',
        color:'#161616'
      }

    }

  }
  Vue.prototype.$conShow = function(index,con){
    return  con.substring(con.length-index, con.length)
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
    console.log(con)
   this.$emit(con)
  }
  Vue.prototype.$closeModel = function () {
   return false
  }
}
