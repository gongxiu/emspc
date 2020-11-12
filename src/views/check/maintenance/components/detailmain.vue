<template>
  <div class="com-body">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="a">
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
      </el-tab-pane>
      <el-tab-pane label="维修记录" name="b">
        <div>

          <el-scrollbar>
            <el-table
              v-loading="loadingVisible"
              :data="list"
              stripe
              :border="$bor()"
              size="small"
              style="width: 100%">
              <el-table-column
                min-width="112"
                label="序号"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="变更时间"
                prop="name"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="变更人"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                min-width="112"
                label="变更前状态"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="变更后状态"
                show-overflow-tooltip
              />
            </el-table>
          </el-scrollbar>
          <div class="block" style="padding-top:20px;display:flex">
            <el-pagination
              :current-page="pagination2.currentPage"
              :page-sizes="[10, 20, 50]"
              :page-size="pagination2.pageSize"
              :total="pagination2.total"
              background
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"/>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="流转记录" name="c">
        <div>

          <el-scrollbar>
            <el-table
              v-loading="loadingVisible"
              :data="list"
              stripe
              :border="$bor()"
              size="small"
              style="width: 100%">
              <el-table-column
                min-width="112"
                label="序号"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="变更时间"
                prop="name"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="变更人"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                min-width="112"
                label="变更前处理人"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="变更后处理人"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="原因"
                show-overflow-tooltip
              />
            </el-table>
          </el-scrollbar>
          <div class="block" style="padding-top:20px;display:flex">
            <el-pagination
              :current-page="pagination2.currentPage"
              :page-sizes="[10, 20, 50]"
              :page-size="pagination2.pageSize"
              :total="pagination2.total"
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
