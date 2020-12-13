<template>
  <div class="com-body">
    <div class="file-con">
      <div class="file-down" @click="downLoad">
        <i class="el-icon-excel"></i>
        <div class="el-upload__text">点击图标下载</div>
      </div>
      <div class="file-upload">
        <el-upload
          class="upload-demo"
          drag
          :headers="{
          Authorization:'Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJVc2VySWQiOiI0OTQ5NGVkZC0wNTRhLTZlMDQtMmFhMy02MTVjOTAxNDk0MGIiLCJleHAiOjE2MDc0NDI0MzksImlzcyI6IndlYmFwaS5jbiIsImF1ZCI6IldlYkFwaSJ9.QayMYp5bC20m7HI2SJPBTw8kAh00j-ZcxTLkaWcr3D8'
        }"
          :action="uploadInfo.url"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </div>
    </div>
    <div class="com-btn">
      <el-button type="" size="small" @click="$closFun('close')">取消</el-button>
      <el-button type="primary" size="small">确定</el-button>
    </div>
  </div>
</template>

<script>
  import importFile from '@/components/importFile'
  export default {
    name: "index",
    components: {
      importFile,
    },
    props:{
      uploadInfo:{
        type:Object,
        default:null
      }
    },
    methods:{
      downLoad(){

        this.$emit('getModule')
      }
    }
  }
</script>

<style lang="scss" scoped>
.file-con{
  display: flex;
  justify-content: space-between;
  >div{
    width: 45%;
  }
  .file-down{
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 300px;
    height: 180px;
    text-align: center;
    cursor: pointer;
    position: relative;
    i{
      font-size: 67px;
      color: #67C23A;
      margin: 40px 0 16px;
      line-height: 50px;
    }
    .el-upload__text{
      color: #67C23A;
      font-size: 14px;
      text-align: center;
    }
  }
}
</style>
