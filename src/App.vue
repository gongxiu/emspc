<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {

    }
  },
  mounted() {
    if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
      // alert('移动端')
      // window.location.href = 'https://x.ycyh56.com/webpage/#/enroll'
    } else {
      // alert('pc端')
      // window.location.href = 'https://x.ycyh56.com/test-company/#/login'
    }
  }

}
</script>
<style lang="scss">
  body{
    background: #F2F2F2;
  }
  .home{
    min-width: 1000px;
  }
  .com-body{
    padding:20px;
    border-top:1px solid #DCDFE6;
    .com-btn{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 60px;

    }
  }
  label{
    font-weight: 400;
  }
  .body-title{
    display: flex;
    justify-content: space-between;
  }
  .el-table th.gutter{
    display: table-cell!important;
  }
  .table-con{
    padding: 20px 0
  }
</style>
