<template>
  <div class="home">
    <div class="scroll">
      <div class="scroll-left">
        <div class="se-input-con">
          <div class="se-input-row">
            <el-input
              v-model="modularName1"
              :clearable="true"
              placeholder="请输入模块名称"
              style="width: 100%;margin-right: 10px"
              size="mini"
              @keyup.enter.native="getOrgData"
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
            <el-button type="primary"
                       size="mini"
                       icon="el-icon-duoyonghu"
                       @click="() => append(node,data)">
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
                       icon="el-icon-soushuo" @click="onSubmit"/>
          </div>
          <div class="ch-title-right">
            <el-button type="primary"
                       size="mini"
                       @click=""
                       @click="addPerson"
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
                label="姓名"
                prop="trueName"

                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="账号"
                prop="account"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="电话号码"
                prop="mobilePhoneNum"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="邮箱"
                prop="email"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="性别"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <div>{{scope.row.gender==0?'男':'女'}}</div>
                </template>
              </el-table-column>
              <el-table-column
                min-width="112"
                label="是否禁用"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-switch
                    style="display: block"
                    v-model="scope.row.isDeleted"
                    active-color="#13ce66"
                    @change="isDelete(scope.row)"
                    inactive-color="#dfe6ec">
                  </el-switch>
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
                               @click="editPerson(scope.row)"
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
      :visible.sync="cpPerVisible"
      :before-close="$closeVis('cpPerVisible')"
      :center="true"
      :title="addStatus==1?'新增机构':'编辑机构'"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="400px"
    >
      <editPersonnel
        v-if="cpPerVisible"
        :orgTree="orgTree"
        :data="data"
        @close="handleClose"
        @closeDialog="closePer"
      />
    </el-dialog>
    <el-dialog
      :visible.sync="cpPersonVisible"
      :before-close="$closeVis('cpPersonVisible')"
      :center="true"
      :title="addStatus==1?'新增人员':'编辑人员'"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="400px"
    >
      <editPerson
        v-if="cpPersonVisible"
        :orgTree="orgTree"
        :data="data"
        @close="handleClose"
        @closeUser="closeUser"
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
        :importFile="importFile"
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
        :type="1"
        :id="transId"
        @close="handleClose"
      />
    </el-dialog>
  </div>
</template>

<script>
  import transFercon from '@/components/transfercon'
  import editPersonnel from '@/views/roles/personnel/components/editpersonnel'
  import editPerson from '@/views/roles/personnel/components/editperson'
  import Const from '@/utils/const'
  import importFile from '@/components/importFile'
  import {getOrgTree} from "@/api/data"
  import {getByUrlUser,disableUser,deleteUser} from "@/api/user"
  import {deleteOrg,orgUser} from "@/api/organization"
  export default {
    components: {
      editPersonnel,
      importFile,
      transFercon,
      editPerson
    },
    data() {
      return {
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        defaultProps: {
          children: 'childrens',
          label: 'title'
        },
        orgTree:Const.orgTree,
        cpUserVisible:false,
        cpPersonVisible:false,
        importFile:Const.importFile.personnel,
        modularName:'',
        modularName1:'',
        cpPerVisible:false,//编辑修改
        cpfileVisible:false,//批量导入
        addStatus:1,
        transId:'',
        data: Const.orgTree,
        testBool:true,
        list:[
          {
            name:'我是测试'
          }
        ],
        loadingVisible:false,
      }
    },
    mounted() {
      this.getOrgData()
      this.onSubmit()
    },
    methods: {
      isDelete(data){
        disableUser(data.id).then(res=>{
          this.$message.success(res.msg)
          this.onSubmit()
        })

      },
      closePer(){
        this.cpPerVisible = false
        this.getOrgData()
      },
      closeUser(){
        this.cpPersonVisible = false
        this.onSubmit()
      },
      getOrgUser(){
        orgUser().then(res=>{
          console.log(res)
        })
      },
      getOrgData(){
        getOrgTree({
          searchWord:this.modularName1,
        }).then(res=>{
          this.orgTree = res.data
        })
      },
      onSubmit() {
        this.pagination.currentPage = 1
        this.getData().then(res => {
          this.list = res.data
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
          getByUrlUser({
            searchWord:this.modularName,
            pageindex:this.pagination.currentPage,
            pagedatacount:this.pagination.pageSize,
          }).then(res=>{
            resolve(res)
          })
        })
      },
      handDelete(data){
        console.log(data)

        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUser(data.id).then(res=>{
            console.log(res)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.onSubmit()
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleClose(){
        this.cpPerVisible = false
        this.cpfileVisible = false
        this.cpUserVisible = false
        this.cpPersonVisible = false
      },


      nodeclick(node, data, obj) {
        // console.log('点击了：', node.userId, node.companyName)
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
      addPer(){
        this.data = null
        this.addStatus = 1
        this.cpPerVisible = true
      },
      addPerson(){
        this.data = null
        this.cpPersonVisible = true

      },
      editPerson(data){
        this.addStatus = 2
        this.data = data
        this.cpPersonVisible = true
      },
      append(node, data) {
        this.transId =node.value
        this.cpUserVisible = true

      },

      remove(node, data) {
        console.log(data.value)
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteOrg(data.value).then(res=>{
            this.closePer()
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      editPer(data){
        this.data = data
        this.addStatus = 2
        this.cpPerVisible = true
      },
      edit(node, data) {
        this.editPer(data)

      },

      submitEdit(node, data) {
        // console.log('点击了保存按钮')
        if (data.apiGroupName == this.newApiGroupName) {
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
