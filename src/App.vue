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
  .label-wrap{
    line-height: 28px;
    display: flex;
    margin-bottom: 10px;
    label{
      display: inline-block;
      color: #999;
      text-align: right;
      width: 130px;
    }
  }
  .detail-pd{
    padding-bottom: 10px;
    display: flex;
    .el-input,.el-select {
      margin-right: 10px;
    }
  }
  .scroll-right{
    padding: 20px 10px;
    width: calc(100% - 300px - 40px);
    height: calc(100vh - 50px - 40px);
    background: #fff;
    margin: 0px 20px 20px 0;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    .ch-title-left{
      display: flex;
      .el-input,.el-select {
        margin-right: 10px;
      }
    }
  }
  .body-title{
    .ch-title-left{
      display: flex;
      .el-input,.el-select {
        margin-right: 10px;
      }
    }
  }
  //图片
  .detail-img{
    width:50px; height:50px;
  }
  .col189{
    color: #1890ff !important;
  }
  .body-pd{
    padding: 20px;
  }
  .select-tree-pd{
    margin-right: 10px;
  }
</style>
