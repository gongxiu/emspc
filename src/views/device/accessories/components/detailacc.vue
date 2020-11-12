<template>
  <div class="com-body">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="a">
        <div class="">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="label-wrap">
                <label>配件名称：</label>
                <span>测试</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-wrap">
                <label>配件编码：</label>
                <span>测试</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-wrap">
                <label>配件条码：</label>
                <span>测试</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-wrap">
                <label>配件类型：</label>
                <span>测试</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-wrap">
                <label>所属设备：</label>
                <span>测试</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-wrap">
                <label>规格型号：</label>
                <span>测试</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-wrap">
                <label>主要技术参数：</label>
                <span>测试</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-wrap">
                <label>品牌：</label>
                <span>测试</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-wrap">
                <label>出厂编号：</label>
                <span>测试</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-wrap">
                <label>供应商：</label>
                <span>测试</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-wrap">
                <label>单价：</label>
                <span>测试</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-wrap">
                <label>资产原值：</label>
                <span>测试</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-wrap">
                <label>购置时间：</label>
                <span>2020-10-12 10:10:10</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-wrap">
                <label>出厂日期：</label>
                <span>2020-10-12</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-wrap">
                <label>生产日期：</label>
                <span>2020-10-12</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-wrap">
                <label>保修日期：</label>
                <span>2020-10-12</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-wrap">
                <label>投产日期：</label>
                <span>2020-10-12</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="label-wrap">
                <label>配件封面：</label>
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
      </el-tab-pane>
      <el-tab-pane label="配件文档" name="b">
        <div>
          <div class="detail-pd">
            <el-select v-model="no" size="mini" placeholder="选择文件类型" filterable>
              <el-option
                v-for="(item,index) in testCheck"
                :key="index"
                :value="item.id"
                :label="item.label"

              />
            </el-select>
            <el-input
              v-model="trsNo"
              :clearable="true"
              placeholder="请输入调拨单号"
              style="width: 200px"
              size="mini"
            />

            <el-button type="primary"
                       size="mini"
                       icon="el-icon-soushuo" />
          </div>
          <el-scrollbar>
            <div class="file-list">
              <div class="file-li" v-for="item in 10">
               <i class="el-icon-tupian"></i>
                <span>操作说明书</span>
              </div>
            </div>
          </el-scrollbar>
          <div class="block" style="padding-top:20px;display:flex">
            <el-pagination
              :current-page="pagination3.currentPage"
              :page-sizes="[10, 20, 50]"
              :page-size="pagination3.pageSize"
              :total="pagination3.total"
              background
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"/>
          </div>
        </div>
      </el-tab-pane>
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
