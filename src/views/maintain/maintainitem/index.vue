<template>
  <div class="home">
    <div class="scroll">
      <div class="scroll-left">
        <div class="se-input-con">
          <div class="se-input-row">
            <!--<select-tree v-model="mechanismId" :size="'mini'"  style="width: 100%;margin-right: 10px" @selected="selectedInfo"  :options="orgTree"
                         :props="defaultProps"/>-->
           <div style="width: 100%">
             <treeSelect
               :props="defaultProps"
               :options="orgTree"
               :value="mechanismId"
               :clearable="true"
               :size="'mini'"
               :accordion="true"
               placeholder="请选择机构"
               @getValue="getValue($event)"
             />
           </div>
           <div style="width: 100%;margin-top: 18px">
             <el-input
               v-model="spareName"
               :clearable="true"
               placeholder="请输入设备名称或编码"
               style="width: 100%;margin-right: 10px"
               size="mini"
             />
           </div>
          </div>
        </div>
        <el-tree :data="data"
                 node-key="id"
                 default-expand-all
                 :expand-on-click-node="false"
                 @node-click="nodeclick"
                 @node-drop="handleDrop"
                 :allow-drop="allowDrop"
                 :allow-drag="allowDrag">
        <span class="custom-tree-node"
              slot-scope="{ node, data }">

          <span v-text="data.label"></span>

          <span>
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
              placeholder="请输入操作名"
              style="width: 200px"
              size="mini"
            />

            <el-button type="primary"
                       size="mini"
                       icon="el-icon-soushuo" />
          </div>
          <div class="ch-title-right">
            <el-button
              type="primary"
              size="mini"
              @click="setMaintain"
              icon="el-icon-peizhi"
            />
            <el-button type="primary"
                       size="mini"
                       @click="addItem"
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
              <<el-table-column
              type="selection"
              width="55"/>
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
                label="生效时间"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="执行人"
                prop="execUserName"
                show-overflow-tooltip
              />
              <!--<el-table-column
                label="操作"
                fixed="right">
                <template slot-scope="scope">
                  <div>
                    <el-button type="primary"
                               size="mini"
                               @click="handDetail(scope.row)"
                               icon="el-icon-chakan">
                    </el-button>
                    <el-button type="primary"
                               size="mini"
                               @click="handleEdit"
                               icon="el-icon-bianji">
                    </el-button>
                    <el-button type="danger"
                               size="mini"
                               @click="handDelete"
                               icon="el-icon-shanchu">
                    </el-button>
                  </div>
                </template>
              </el-table-column>-->
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
      :title="addStatus==1?'新增库位':'编辑库位'"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="400px"
    >
      <editModular
        v-if="cpModVisible"
        :data="data"
        @close="handleClose"
      />
    </el-dialog>

    <el-dialog
      :visible.sync="itemVisible"
      :before-close="$closeVis('itemVisible')"
      :center="true"
      :title="addStatus==1?'新增项目':'编辑项目'"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="400px"
    >
      <edititem
        v-if="itemVisible"
        :data="data"
        :userList="userList"
        @close="handleClose"
      />
    </el-dialog>
    <el-dialog
      :visible.sync="itemDetailVisible"
      :before-close="$closeVis('itemDetailVisible')"
      :center="true"
      title="设备详情"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="1200px"
    >
      <detailitem
        v-if="itemDetailVisible"
        :data="data"
        @close="handleClose"
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
  </div>
</template>

<script>
  import selectTree from '@/components/selectTree/selecttree'
  import treeSelect from '@/components/tree'
  import transFercon from '@/components/transfercon'
  import editModular from '@/views/roles/modular/components/editmodular'
  import edititem from '@/views/maintain/maintainitem/components/setitem'
  import detailitem from '@/views/maintain/maintainitem/components/detailitem'
  import Const from '@/utils/const'
  import importFile from '@/components/importFile'
  import {getByUrlUpkeep} from '@/api/upkeep'
  import {getOrgtree,} from "@/api/organization"
  import {getByUrlUser} from '@/api/user'
  export default {
    components: {
      editModular,
      importFile,
      transFercon,
      edititem,
      detailitem,
      selectTree,
      treeSelect
    },
    data() {
      return {
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        defaultProps: {
          children: "childrens",
          label: "title",
          value:'value'
        },
        orgTree:[],
        testCheck:Const.testCheck,
        mechanismId:'',//机构id
        spareName:'',//仓库名称
        importFile:Const.importFile.mainItem,
        testCheck:Const.testCheck,
        modularName:'',
        userList:[],
        operType:'',//操作类型
        cpModVisible:false,//编辑修改
        cpfileVisible:false,//批量导入
        itemVisible:false,
        cpUserVisible:false,
        itemDetailVisible:false,
        addStatus:1,
        data: Const.orgTree,
        testBool:true,

        list:[
        ],
        loadingVisible:false,
      }
    },
    mounted() {
      this.orgTree = this.$orgFun()
      this.onSearch()
      this.getUser()
    },
    methods: {
      closeItem(){
        this.cpModVisible = false
        this.onSearch()
      },
      getUser(){
        getByUrlUser({
          pageindex:1,
          pagedatacount:1000,
        }).then(res=>{
          console.log(res.data)
          this.userList = res.data
        })
      },

      getValue(data){
        this.mechanismId = data
      },
      handDetail(){
        this.itemDetailVisible = true
      },
      setMaintain() {
        this.$router.push({
          path:'/maintain/maintenequ'
        })
      },
      selectedInfo(){
      },
      addSpare(){
        this.itemVisible = true
        this.addStatus = 1
      },
      handleEdit(){
        this.itemVisible = true
        this.addStatus = 2
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
            // UpkeepTemplateId:this.temId,
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
      handDelete(){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
        this.cpModVisible = false
        this.cpfileVisible = false
        this.cpUserVisible = false
        this.itemVisible = false
        this.itemDetailVisible = false
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
      addItem(){
        this.addStatus = 1
        this.itemVisible = true
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
        this.handDelete()
        return;
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
        this.updateApiGroup(this.data)
      },
      editPer(){
        this.addStatus = 2
        this.cpModVisible = true
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
        flex-direction: column;
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
