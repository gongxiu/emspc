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
            />
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
        </span>
        </el-tree>
      </div>
      <div class="scroll-right">
        <div class="body-title">
          <div class="ch-title-left">
            <el-input
              v-model="modularName"
              :clearable="true"
              placeholder="请输入岗位名称"
              style="width: 200px"
              size="mini"
            />
            <el-button type="primary"
                       size="mini"
                       icon="el-icon-soushuo"
                       @click="onSearch"/>
          </div>
          <div class="ch-title-right">
            <el-button type="primary"
                       size="mini"
                       @click=""
                       @click="addPer"
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
                label="序号"
                prop="seqNo"
                width="55" />
              <el-table-column
                min-width="112"
                label="名称"
                prop="name"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="岗位级别"
                prop="levelName"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="岗位类型"
                prop="typeName"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="140"
                label="描述"
                prop="describe"
                show-overflow-tooltip
              />
              <el-table-column
                width="140"
                label="操作">
                <template slot-scope="scope">
                  <div>

                    <el-button type="primary"
                               size="mini"
                               @click="toUserDis(scope.row)"
                               icon="el-icon-duoyonghu">

                      </el-button>
                    <el-button type="primary"
                               size="mini"
                               @click="editPer(scope.row)"
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
      :visible.sync="cpStaVisible"
      :before-close="$closeVis('cpStaVisible')"
      :center="true"
      :title="addStatus==1?'新增岗位':'编辑岗位'"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="400px"
    >
      <editStation
        v-if="cpStaVisible"
        :data="data"
        :orgTree="orgTree"
        @close="handleClose"
        @closeStation="closeStation"
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
        :id="transId"
        :type="2"
        @close="handleClose"
      />
    </el-dialog>
  </div>
</template>

<script>
  import editStation from '@/views/roles/station/components/editStation'
  import Const from '@/utils/const'
  import importFile from '@/components/importFile'
  import transFercon from '@/components/transfercon'
  import {getByUrlJob,deleteJob} from '@/api/job'
  import {getOrgTree} from '@/api/data'
  export default {
    components: {
      editStation,
      importFile,
      transFercon
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
        importFile:Const.importFile.station,
        modularName:'',
        cpStaVisible:false,//编辑修改
        cpfileVisible:false,//批量导入
        cpUserVisible:false,//人员分配
        addStatus:1,
        transId:'',
        data: Const.orgTree,
        orgTree:[],
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
      this.onSearch()
      this.getOrgData()
    },
    methods: {
      closeStation(){
        this.cpStaVisible = false
        this.onSearch()
      },
      getOrgData(){
        getOrgTree({

        }).then(res=>{
          this.orgTree = res.data
        })
      },
      onSearch() {
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
        this.onSearch()
      },
      getData() {

        return new Promise((resolve, reject)=>{
          getByUrlJob({
            // searchWord:this.modularName,
            pageindex:this.pagination.currentPage,
            pagedatacount:this.pagination.pageSize,
          }).then(res=>{
            resolve(res)
          })
        })
      },
      toUserDis(data){
        this.transId = data.id
        this.cpUserVisible = true
      },
      handDelete(data){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteJob(data.id).then(res=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.onSearch()
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleClose(){
        this.cpStaVisible = false
        this.cpfileVisible = false
        this.cpUserVisible = false
      },

      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ', dropNode.data.apiGroupName, dropType)
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
      addPer(){
        this.data = null
        this.addStatus = 1
        this.cpStaVisible = true
      },
      append(node, data) {
        this.addPer()
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
        this.handDelete()
        return;
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
        this.updateApiGroup(this.data)
      },
      editPer(data){
        this.data = data
        this.addStatus = 2
        this.cpStaVisible = true
      },
      edit(node, data) {
        this.editPer()
        console.log(
          'before:',
          data.id,
          // data.parentApiGroupId,
          data.apiGroupName,
          data.isEdit
        )
        this.$set(data, 'isEdit', 1)
        this.newApiGroupName = data.apiGroupName
        this.$nextTick(() => {
          this.$refs.input.focus()
        })
        console.log('after:', data.id, data.apiGroupName, data.isEdit)
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
</style>
