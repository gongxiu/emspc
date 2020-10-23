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
          action="https://jsonplaceholder.typicode.com/posts/"
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
  export default {
    name: "index",
    props:{
      importFile:{
        type:String,
        default:null
      }
    },
    methods:{
      downLoad(){
        if(!this.importFile){
          this.$message.error('下载模板链接有误')
          return;
        }
        window.open(this.importFile)
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
