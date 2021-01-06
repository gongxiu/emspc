<template>
  <div class="home">
    <div class="scroll">
      <div class="scroll-left">
        <div class="se-input-con">
          <div class="se-input-row">
            <el-input
              v-model="modularName"
              :clearable="true"
              placeholder="请输入模块名称"
              style="width: 100%;margin-right: 10px"
              size="mini"
              @keyup.enter.native="getTemData"
            />
            <el-button type="primary"
                       size="mini"
                       @click="addTem"
                       icon="el-icon-xinzeng"/>
            <el-button type="primary"
                       size="mini"
                       @click="toImport"
                       icon="el-icon-shangchuan"/>
          </div>
        </div>
        <div class="user-list-left">
          <div class="user-li" :class="temId == item.id?'select-tree':''" v-for="(item,index) in temList"
               @click="selectUser(item)">
            <span>
              {{item.name}}
            </span>
            <span>
             <el-button type="primary"
                        size="mini"
                        @click="toDistribu(item)"
                        icon="el-icon-fenpei" />
            <el-button v-if="item.id!=1"
                       type="primary"
                       size="mini"
                       icon="el-icon-bianji"
                       @click="() => editTem(item)">
            </el-button>

            <el-button v-if="item.id!=1"
                       type="danger"
                       size="mini"
                       icon="el-icon-shanchu"
                       @click="() => removeTem(item)">
            </el-button>
          </span></div>

        </div>
        <!--<el-tree :data="orgTree"
                 node-key="value"
                 default-expand-all
                 :expand-on-click-node="false"
                 :props="defaultProps"
                 @node-click="nodeclick">
        <span class="custom-tree-node"
              slot-scope="{ node, data }">
          <span v-text="data.title"></span>
          <span>

          </span>
        </span>
        </el-tree>-->
      </div>
      <div class="scroll-right">
        <div class="body-title">
          <div class="ch-title-left">
            <el-input
              v-model="keyWord"
              :clearable="true"
              placeholder="请输入项目名称或编号"
              style="width: 200px"
              size="mini"
            />
          </div>
          <div class="ch-title-right">
            <el-button type="primary"
                       size="mini"
                       @click="toDistribu"
                       icon="el-icon-fenxiang" />
            <el-button type="primary"
                       size="mini"
                       @click=""
                       @click="addPro"
                       icon="el-icon-xinzeng"/>
            <el-button type="primary"
                       size="mini"
                       @click="toImport"
                       icon="el-icon-shangchuan"/>
          </div>
        </div>
        <div class="table-con">
          <el-scrollbar>
            <el-table
              v-loading="loadingVisible"
              :data="list"
              stripe
              :border="$bor()"
              size="small"
              style="width: 100%">
              <el-table-column
                type="selection"
                width="55"/>
              <el-table-column
                min-width="112"
                label="所属模块"
                prop="announcements"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="项目编号"
                prop="number"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="项目名称"
                prop="name"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="项目要求"
                prop="description"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="项目频次"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <div>
                    {{scope.row.frequencyCount}}
                    /
                    <span v-if="scope.row.frequencyType==0">日</span>
                    <span v-if="scope.row.frequencyType==1">周</span>
                    <span v-if="scope.row.frequencyType==2">月</span>
                    <span v-if="scope.row.frequencyType==3">年</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                min-width="112"
                label="操作"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <div>
                    <el-button type="primary"
                               size="mini"
                               @click="editPro(scope.row)"
                               icon="el-icon-bianji">
                    </el-button>
                    <el-button type="danger"
                               size="mini"
                               @click="handleDelete(scope.row)"
                               icon="el-icon-shanchu">
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-scrollbar>
          <div class="block" style="padding-top:20px;display:flex">
            <el-pagination
              :current-page="pagination.currentPage"
              :page-sizes="[10, 20, 50]"
              :page-size="pagination.pageSize"
              :total="pagination.total"
              background
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"/>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="cpTemVisible"
      :before-close="$closeVis('cpTemVisible')"
      :center="true"
      :title="addStatus==1?'新增模板':'编辑模板'"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="400px"
    >
      <editTem
        v-if="cpTemVisible"
        :data="data"
        @closeTemp="closeTemp"
        @close="handleClose"
      />
    </el-dialog>
    <el-dialog
      :visible.sync="cpModVisible"
      :before-close="$closeVis('cpModVisible')"
      :center="true"
      :title="addStatus==1?'新增保养项':'编辑保养项'"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="800px"
    >
      <editMod
        v-if="cpModVisible"
        :data="data"
        :temList="temList"
        @closeMod="closeMod"
        @close="handleClose"
      />
    </el-dialog>
    <el-dialog
      :visible.sync="cpAssVisible"
      :before-close="$closeVis('cpAssVisible')"
      :center="true"
      title="绑定设备"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="900px"
    >
      <trans
        v-if="cpAssVisible"
        :data="data"
        :type="3"
        @closeTemp="closeTemp"
        @close="handleClose"
      />
    </el-dialog>

  </div>
</template>

<script>
  import selectTree from "@/components/selectTree/selecttree";
  import trans from '@/components/trans/index'
  import Const from "@/utils/const";
  import {getByUrlUpkeep,getbyurlTem} from '@/api/upkeep'
  import {deleteTemp,deleteKeep} from "@/api/keeptemp"
  import editTem from "@/views/maintain/template/components/edittem";
  import editMod from "@/views/maintain/template/components/editMod";
  export default {
    name: "index",
    components: {
      editTem,
      selectTree,
      trans,
      editMod
    },
    data() {
      return {
        cpTemVisible:false,
        loadingVisible:false,
        cpAssVisible:false,
        cpModVisible:false,
        modularName: '',//模块
        keyWord:'',//项目名称或编号
       temList:[{
          id:2,
         name:'测试',
       }],
        list:[],
        temId:'',
        data:null,
        addStatus:false,
        defaultProps: {
          children: 'childrens',
          label: 'title'
        },
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
      }
    },
    mounted() {
      this.onSearch()
      this.getTemData()
    },
    methods:{
      closeTemp(){
        this.handleClose()
        this.getTemData()
      },
      closeMod(){
        this.handleClose()
        this.onSearch()
      },
      selectUser(data){

        this.temId = data.id
        this.onSearch()
      },
      handleClose(){
        this.cpTemVisible = false
        this.cpAssVisible = false
        this.cpModVisible = false
      },
      addTem(){
        this.addStatus = 1
        this.data = null
        this.cpTemVisible = true
      },
      editTem(data){
        this.addStatus = 2
        this.data = data
        this.cpTemVisible = true
      },
      removeTem(data){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTemp(data.id).then(res=>{
            this.$message.success('删除成功')
            this.getTemData()
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      toDistribu(data){
        this.data = data
        this.cpAssVisible = true
      },
      toImport(){

      },
      nodeclick(){

      },
      addPro(){
        this.addStatus = 1
        this.data = null
        this.cpModVisible = true
      },
      editPro(data){
        this.addStatus = 2
        this.data = data
        this.cpModVisible = true
      },
      handleDelete(data){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteKeep(data.id).then(res=>{
            this.$message.success('删除成功')
            this.onSearch()
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      onSearch(){
        this.pagination.currentPage = 1
        this.getData({

          pageindex:this.pagination.currentPage,
          pagedatacount:this.pagination.pageSize,
        }).then(res => {
          this.list  = res.data
          this.pagination.total = res.page.count
          this.pagination.currentPage = 1
        })
      },
      getData() {
        return new Promise((resolve, reject)=>{
          getByUrlUpkeep({
            UpkeepTemplateId:this.temId,
            pageindex:this.pagination.currentPage,
            pagedatacount:this.pagination.pageSize,
          }).then((res) => {
            resolve(res)
          });
        })
      },
      handleCurrentChange(param) {
        this.pagination.currentPage = param;
        this.getData().then((res) => {
          this.mainList  = res.data;
        });
      },
      handleSizeChange(param) {
        this.pagination.pageSize = param;
        this.pagination.currentPage = 1;
        this.onSearch();
      },
      getTemData(){
        getbyurlTem({
          Name:this.modularName,
        }).then(res=>{
          this.temList = res.data
        })
      }
    },

  }
</script>

<style lang="scss" scoped>
  .se-input-row{
    display: flex !important;
  }
  .user-list-left{
    color: #606266;
    font-weight: 500;
    font-size: 14px;

    .user-li{
      height: 40px;
      line-height: 40px;
      padding:0 0px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
    }
  }
  .select-tree{
    color: #409EFF;
    font-weight:700;
  }
  .el-scrollbar{

  }
</style>
