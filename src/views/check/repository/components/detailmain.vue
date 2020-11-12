<template>
  <div class="com-body">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <div class="">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="label-wrap">
              <label>所在机构：</label>
              <span>测试</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label-wrap">
              <label>设备：</label>
              <span>测试</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label-wrap">
              <label>故障类别：</label>
              <span>测试</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label-wrap">
              <label>故障时间：</label>
              <span>测试</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label-wrap">
              <label>开始处理时间：</label>
              <span>测试</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label-wrap">
              <label>结束处理时间：</label>
              <span>测试</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label-wrap">
              <label>维修类型：</label>
              <span>测试</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label-wrap">
              <label>处理人：</label>
              <span>测试</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label-wrap">
              <label>抄送人：</label>
              <span>测试</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label-wrap">
              <label>维修商家：</label>
              <span>测试</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label-wrap">
              <label>委外师傅：</label>
              <span>测试</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label-wrap">
              <label>委外师傅电话：</label>
              <span>测试</span>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="label-wrap">
              <label>故障原因：</label>
              <span>测试</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="label-wrap">
              <label>故障处理过程：</label>
              <span>测试</span>
            </div>
          </el-col>
          <el-col :span="24">
            <div class="label-wrap">
              <label>故障图片：</label>
              <div
                v-viewer="{toolbar: {
                  prev: false,
                  play: false,
                  next: false,
                  rotateLeft:{
                    show:1,
                    size:'large'
                  },
                  rotateRight:{
                    show:1,
                    size:'large'
                  }
                }}"
                v-show="true"
                :id="'J_image_viewer_'"
              ><img :src="photo" class="detail-img"></div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-tabs>
  </div>
</template>

<script>
  import Const from '@/utils/const'
  export default {
    name: "detailpar",
    data(){
      return{
        activeName:'a',
        parts:'',//配件配件
        no:'',//配件单号
        fileType:'',//文件类型
        trsNo:'',//调拨单号
        testCheck:Const.testCheck,
        list:[
          {
            name:'我是测试',
            photo:'https://resource.ycyh56.com/images/photo/16996264093568.jpg?1604326056616',
            id:1,
          }
        ],
        loadingVisible:false,
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        pagination2: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        pagination3: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        photo:'https://resource.ycyh56.com/images/photo/16996264093568.jpg?1604326056616',
      }
    },
    methods:{
      handleClick(){

      },
      handleCurrentChange(param) {
        this.pagination.currentPage = param
        this.getData().then(res => {
        })
      },
      handleSizeChange(param) {
        this.pagination.pageSize = param
        this.pagination.currentPage = 1
      },
      handleCurrentChange2(param) {
        this.pagination2.currentPage = param
        this.getData().then(res => {
        })
      },
      handleSizeChange(param) {
        this.pagination2.pageSize = param
        this.pagination2.currentPage = 1
      },
      handleCurrentChange3(param) {
        this.pagination3.currentPage = param
        this.getData().then(res => {
        })
      },
      handleSizeChange(param) {
        this.pagination3.pageSize = param
        this.pagination3.currentPage = 1
      },
    }
  }
</script>

<style lang="scss" scoped>
  .file-list{
    padding: 20px;
    border:1px solid #DCDFE6 ;
    display: flex;
    flex-wrap: wrap;
    .file-li{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      width: 100px;
      height: 100px;
      padding:10px;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.09);
      border-radius: 6px;
      margin: 0 20px 20px 0;
      i{
        font-size: 50px;
      }
      span{
        font-size: 12px;
      }
    }
  }
</style>
