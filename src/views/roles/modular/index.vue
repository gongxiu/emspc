<template>
  <div class="home">
    <div class="scroll">
      <div class="scroll-left">
        <div class="se-input-con">
          <div class="se-input-row">
            <div >
              <el-select
                v-model="selectVal"
                placeholder="请选择系统"
                size="mini"
                filterable
                :clearable="true"
                style="width: 100%"
              >
                <el-option
                  v-for="(item, index) in systemArr"
                  :key="index"
                  :value="item.id"
                  :label="item.name"
                />
              </el-select>
            </div>
            <div class="sb-select" style="margin-bottom: 18px;">
              <el-input
                v-model="modularName"
                :clearable="true"
                placeholder="请输入模块名称"
                style="margin-right: 10px"
                size="mini"
              />
              <el-button type="primary"
                         size="mini"
                         @click="addPer"
                         icon="el-icon-xinzeng" />
              <el-button type="primary"
                         size="mini"
                         @click="toImport"
                         icon="el-icon-shangchuan" />
            </div>

          </div>
        </div>
        <el-tree :data="orgTree"
                 node-key="value"
                 default-expand-all
                 :expand-on-click-node="false"
                 :props="defaultProps"
                 @node-click="nodeclick"
                 :allow-drop="allowDrop"
                 :allow-drag="allowDrag">
        <span class="custom-tree-node"
              slot-scope="{ node, data }">
          <span v-text="data.title"></span>
          <span>
            <el-button v-if="data.id!=1"
                       type="primary"
                       size="mini"
                       icon="el-icon-bianji"
                       @click="() => edit(node,data)">
            </el-button>
            <el-button v-if="data.id!=1"
                       type="danger"
                       size="mini"
                       icon="el-icon-shanchu"
                       @click="() => remove(node, data)">
            </el-button>
          </span>
        </span>
        </el-tree>
      </div>
      <div class="scroll-right">
        <div class="body-title">
          <div class="ch-title-left">
            <el-input
              v-model="modularName"
              :clearable="true"
              placeholder="请输入模块名称"
              style="width: 200px"
              size="mini"
            />
            <el-button type="primary"
                       size="mini"
                       icon="el-icon-soushuo" />
          </div>
          <div class="ch-title-right">
            <el-button type="primary"
                       size="mini"
                       @click="addOper"
                       icon="el-icon-xinzeng" />
            <el-button type="primary"
                       size="mini"
                       @click="toImport"
                       icon="el-icon-shangchuan" />
          </div>
        </div>
        <div  class="table-con">
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
                width="55" />
              <el-table-column
                min-width="112"
                label="序号"
                prop="seqNo"

                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="操作名称"
                prop="name"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="图标"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <div><i class="el-icon-bianji"></i></div>
                </template>
              </el-table-column>
              <el-table-column
                min-width="112"
                label="接口地址"
                prop="interfaceUrls"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="操作类型"
                prop="name"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="操作">
                <template slot-scope="scope">
                  <div>
                    <el-button type="primary"
                               size="mini"
                               @click="editOper(scope.row)"
                               icon="el-icon-bianji">
                    </el-button>
                    <el-button type="danger"
                               size="mini"
                               @click="handDelete(scope.row)"
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
      :visible.sync="cpModVisible"
      :before-close="$closeVis('cpModVisible')"
      :center="true"
      :title="addStatus==1?'新增模块':'编辑模块'"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="400px"
    >
      <editModular
        v-if="cpModVisible"
        :data="data"
        :orgTree="orgTree"
        @close="handleClose"
        :selectVal="selectVal"
        @closeMod="closeMod"
      />
    </el-dialog>
    <el-dialog
      :visible.sync="cpOperVisible"
      :before-close="$closeVis('cpOperVisible')"
      :center="true"
      :title="addStatus==1?'新增操作':'编辑操作'"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="400px"
    >
      <editOper
        v-if="cpOperVisible"
        :data="data"
        @close="handleClose"
        @closeOper="closeOper"
        :orgTree="orgTree"
      />
    </el-dialog>
    <el-dialog
      :visible.sync="cpfileVisible"
      :before-close="$closeVis('cpfileVisible')"
      :center="true"
      title="文件导入"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="800px"
    >
      <importFile
        v-if="cpfileVisible"
        :data="data"
        :importFile="importFileOper"
        @close="handleClose"
      />
    </el-dialog>
    <el-dialog
      :visible.sync="cpUserVisible"
      :before-close="$closeVis('cpUserVisible')"
      :center="true"
      title="人员分配"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="800px"
    >
      <transFercon
        v-if="cpUserVisible"
        :importFile="importFile"
        @close="handleClose"
      />
    </el-dialog>
  </div>
</template>

<script>
  import transFercon from '@/components/transfercon'
  import editModular from '@/views/roles/modular/components/editmodular'
  import editOper from '@/views/roles/modular/components/editoper'
  import Const from '@/utils/const'
  import importFile from '@/components/importFile'
  import {getOrgTreeMod,getByCateName} from "@/api/data"
  import {getbyUrlMenu,deleteMod,deleteMenu} from "@/api/module"


  export default {
    components: {
      editModular,
      importFile,
      transFercon,
      editOper
    },
    data() {
      return {
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        importFile:Const.importFile.modular,
        importFileOper:Const.importFile.oper,
        defaultProps: {
          children: 'childrens',
          label: 'title',
          value:'value',
        },
        selectVal:[],
        systemArr:[],
        modularName:'',
        cpModVisible:false,//编辑修改
        cpfileVisible:false,//批量导入
        cpOperVisible:false,
        cpUserVisible:false,
        addStatus:1,
        orgTree: [],
        data:null,
        testBool:true,
        list:[
          {
            name:'我是测试'
          }
        ],
        loadingVisible:false,
      }
    },
    mounted(){
      this.getOrgData()
      this.onSubmit()
      this.systemData()
    },
    methods: {
      closeOper(){
        this.cpOperVisible = false
        this.onSubmit()
      },
      closeMod(){
        this.getOrgData()
        this.cpModVisible = false
      },
      systemData(){
        getByCateName('系统').then(res=>{
          this.systemArr = res.data
          this.selectVal = res.data[0].id
        })
      },
      getOrgData(){
        getOrgTreeMod({
          searchWord:this.modularName1,
        }).then(res=>{
          this.orgTree = res.data
        })
      },
      onSubmit() {
        this.pagination.currentPage = 1
        this.getData().then(res => {
          this.list = res.data
          console.log(this.list)
          this.pagination.total = res.page.count
          this.pagination.currentPage = 1
        })
      },
      handleCurrentChange(param) {
        this.pagination.currentPage = param
        this.getData().then(res => {
          this.list = res.data
        })
      },
      handleSizeChange(param) {
        this.pagination.pageSize = param
        this.pagination.currentPage = 1
        this.onSubmit()
      },
      getData() {
        return new Promise((resolve, reject)=>{
          getbyUrlMenu({
            pageindex:this.pagination.currentPage,
            pagedatacount:this.pagination.pageSize,
          }).then(res=>{
            resolve(res)
          })
        })

      },
      handDelete(data){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteMenu(data.id).then(res=>{
            this.onSubmit()
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleClose(){
        this.cpOperVisible = false
        this.cpModVisible = false
        this.cpfileVisible = false
        this.cpUserVisible = false
      },

      nodeclick(node, data, obj) {
        console.log('点击了：', node.userId, node.companyName)
        // this.$store.dispatch('appium/changeApiGroupId', node.id)

      },
      allowDrop(draggingNode, dropNode, type) {
        if (dropNode.data.id === 1) {
          return false
        } else {
          return true
        }
      },
      allowDrag(draggingNode) {
        // 顶层默认分组不允许拖拽
        if (draggingNode.data.id === 1) {
          return false
        } else {
          return true
        }
        // return draggingNode.data.apiGroupName.indexOf('三级 3-2-2') === -1
      },
      editOper(data){
        this.data = data
        this.addStatus = 2
        this.cpOperVisible = true
      },
      addOper(){
        this.addStatus = 1
        this.cpOperVisible = true
      },
      addPer(){
        this.data= null
        this.addStatus = 1
        this.cpModVisible = true
      },
      append(node, data) {
        this.cpUserVisible = true
        // var pid = data.parentApiGroupId + ':' + data.id
        var timestamp = new Date().getTime()
        /*const newChild = {
          id: timestamp,
          isEdit: 0,
          apiGroupName: 'T' + timestamp,
          children: []
        }*/
        /* if (!data.children) {
           this.$set(data, 'children', [])
         }
         data.children.push(newChild)
         this.updateApiGroup(this.data)*/
      },

      remove(node, data) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          deleteMod(data.value).then(res=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getOrgData()
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      editPer(){
        this.addStatus = 2
        this.cpModVisible = true
      },
      edit(node, data) {
        this.data = data
        this.editPer()

      },

      submitEdit(node, data) {
        // console.log('点击了保存按钮')
        if (data.apiGroupName == this.newApiGroupName) {
          console.log('没有修改')
          this.newApiGroupName = ''
          this.$set(data, 'isEdit', 0)
        } else {
          this.$set(data, 'apiGroupName', this.newApiGroupName)
          this.newApiGroupName = ''
          this.$set(data, 'isEdit', 0)
          // console.log('after:', data.id, data.apiGroupName)
          // console.log(this.data)
          this.updateApiGroup(this.data)
        }
      },
      updateApiGroup(data) {
        console.log(data)
        alert('已更新')
        // updateApiGroup(1, data)
        //   .then(response => {
        //     console.log(response)
        //   })
        //   .catch(err => {
        //     console.log(err)
        //   })
      },
      toImport(){
        this.cpfileVisible = true
      },
    }
  }
</script>

<style lang="scss" scoped>
  .scroll{
    display: flex;
    justify-content: space-between;
  }
  .scroll-left {
    width: 300px;
    height: calc(100vh - 50px - 40px);
    background: #fff;
    overflow: auto;
    margin: 20px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    padding: 20px 10px;
    .se-input-con{
      margin-bottom: 10px;
      .se-input-row{
        /*display: flex;*/
        align-items: center;
      }
      .sb-select{
        display: flex;
        align-items: center;
      }
    }
    .el-tree-node__content {
      margin: 10px 0
    }
  }
  .scroll-right{
    padding: 20px 10px;
    width: calc(100% - 300px - 40px);
    height: calc(100vh - 50px - 40px);
    background: #fff;
    margin: 20px 20px 20px 0;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  }
  .custom-tree-node{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
</style>
