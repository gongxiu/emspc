<template>
  <div class="home">
    <div class="scroll">
      <div class="scroll-left">
        <div class="se-input-con">
          <div class="se-input-row">
            <div>
              <select-tree v-model="mechanismId" :options="orgTree" :props="defaultProps"/>
            </div>
            <div class="sb-select">
              <span>设备</span>
              <el-input
                v-model="modularName"
                :clearable="true"
                placeholder="请输入模块名称"
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

                 :allow-drop="allowDrop"
                 :allow-drag="allowDrag">
        <span class="custom-tree-node"
              slot-scope="{ node, data }">
          <span v-text="data.label"></span>
        </span>
        </el-tree>
      </div>
      <div class="scroll-right">
        <el-tabs v-model="activeType" @tab-click="handleClickType" type="border-card">
          <el-tab-pane label="图纸" name="aa">
            <div>
              <div class="body-title">
                <div class="ch-title-left">
                  <el-select v-model="operType" size="mini" placeholder="选择设备类型" filterable>
                    <el-option
                      v-for="(item,index) in testCheck"
                      :key="index"
                      :value="item.id"
                      :label="item.label"

                    />
                  </el-select>

                  <el-button type="primary"
                             size="mini"

                             icon="el-icon-soushuo" />
                </div>
                <div class="ch-title-right">
                  <el-button type="danger"
                             size="mini"
                             @click="showDelete = !showDelete"
                             icon="el-icon-shanchu" v-if="activeName == 'b'"></el-button>
                  <el-button type="primary"
                             size="mini"
                             @click="toImport"
                             icon="el-icon-shangchuan" />
                </div>
              </div>
              <div  class="table-con">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="列表模式" size="mini"  name="a">
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
                          label="文件名称"
                          show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column
                          min-width="112"
                          label="文件类型"
                          show-overflow-tooltip
                        />
                        <el-table-column
                          min-width="112"
                          label="上传人"
                          show-overflow-tooltip
                        />
                        <el-table-column
                          min-width="112"
                          label="上传时间"
                          show-overflow-tooltip
                        />
                        <el-table-column
                          min-width="160"
                          label="操作"
                          fixed="right">
                          <template slot-scope="scope">
                            <div>
                              <el-button type="primary"
                                         size="mini"
                                         @click="handDetail(scope.row)"
                                         icon="el-icon-chakan">
                              </el-button>
                              <el-button type="danger"
                                         size="mini"
                                         @click="handDelete"
                                         icon="el-icon-shanchu">
                              </el-button>
                            </div>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-scrollbar>
                  </el-tab-pane>
                  <el-tab-pane label="卡片模式" name="b">
                    <div>
                      <el-checkbox-group v-model="documentCheck"  @change="handleCheckAllChange">
                        <el-scrollbar>
                          <div class="file-list">
                            <div class="file-li" v-for="(item,index) in 10" :key="index">
                              <i class="el-icon-tupian"></i>
                              <span>操作说明书</span>
                              <i class="el-icon-xiazai posAb" v-if="showDelete"></i>
                            </div>
                          </div>
                        </el-scrollbar>
                      </el-checkbox-group>

                    </div>
                  </el-tab-pane>
                </el-tabs>

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
          </el-tab-pane>
          <el-tab-pane label="说明书" name="bb"></el-tab-pane>
          <el-tab-pane label="Sop资料" name="cc"></el-tab-pane>
          <el-tab-pane label="设备检验书" name="dd"></el-tab-pane>
        </el-tabs>

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
        @close="handleClose"
      />
    </el-dialog>
    <el-dialog
      :visible.sync="cpParVisible"
      :before-close="$closeVis('cpParVisible')"
      :center="true"
      :title="addStatus==1?'新增设备':'编辑设备'"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="1200px"
    >
      <editPar
        v-if="cpParVisible"
        :data="data"
        @close="handleClose"
      />
    </el-dialog>
    <el-dialog
      :visible.sync="cpDetailVisible"
      :before-close="$closeVis('cpDetailVisible')"
      :center="true"
      title="设备详情"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="1200px"
    >
      <detailPar
        v-if="cpDetailVisible"
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
        :importFile="importFileOper"
        @close="handleClose"
      />
    </el-dialog>
  </div>
</template>

<script>
  import transFercon from '@/components/transfercon'
  import editModular from '@/views/roles/modular/components/editmodular'
  import editPar from '@/views/device/parameter/components/editpar'
  import detailPar from '@/views/device/parameter/components/detailpar'
  import Const from '@/utils/const'
  import importFile from '@/components/importFile'
  import selectTree from '@/components/selectTree/selecttree';
  import { getEqDocumentUrl } from '@/api/emsatt';
  export default {
    components: {
      editModular,
      importFile,
      transFercon,
      editPar,
      detailPar,
      selectTree
    },
    data() {
      return {
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        defaultProps: {
          children: "children",
          label: "title"
        },
        showDelete:'',
        activeName:'a',
        activeType:'aa',
        importFile:Const.importFile.modular,
        importFileOper:Const.importFile.document,
        testCheck:Const.testCheck,
        orgTree:Const.orgTree,
        mechanismId:'',
        modularName:'',
        jgName:'',//机构名称
        operType:'',//操作类型
        cpModVisible:false,//编辑修改
        cpfileVisible:false,//批量导入
        cpParVisible:false,
        cpUserVisible:false,
        cpDetailVisible:false,
        addStatus:1,
        data: Const.orgTree,
        testBool:true,
        documentCheck:[],//删除数组
        list:[
          {
            name:'我是测试',
            photo:'https://resource.ycyh56.com/images/photo/16996264093568.jpg?1604326056616',
            id:1,
          }
        ],
        loadingVisible:false,
      }
    },
    created() {
      this.onSubmit();
    },
    methods: {
      handleCheckAllChange(e){
        console.log(e)
      },
      handDetail(data){
        // this.cpDetailVisible = true
      },
      showPhoto (index) {
        const viewer = this.$el.querySelector('#J_image_viewer_' + index).$viewer
        viewer.show()
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleClickType(tab, event){
        console.log(tab, event);
      },
      onSubmit() {
        this.pagination.currentPage = 1
        this.getData().then(res => {
          this.list = res.data.rows
          console.log(this.list)
          this.pagination.total = res.data.count
          this.pagination.currentPage = 1
        })
      },
      handleCurrentChange(param) {
        this.pagination.currentPage = param
        this.getData().then(res => {
          this.list = res.data.rows
        })
      },
      handleSizeChange(param) {
        this.pagination.pageSize = param
        this.pagination.currentPage = 1
        this.onSubmit()
      },
      getData() {
        return new Promise((resolve, reject) => {
          getEqDocumentUrl({
            pageIndex: this.pagination.currentPage,
            pageDataCount: this.pagination.pageSize
          }).then((res) => {
            resolve(res)
          });
        })
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
        this.cpParVisible = false
        this.cpModVisible = false
        this.cpfileVisible = false
        this.cpUserVisible = false
        this.cpDetailVisible = false
      },
      handleDragStart(node, ev) {
        console.log('drag start', node.data.apiGroupName)
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        console.log('tree drag enter: ', dropNode.data.apiGroupName)
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        console.log('tree drag leave: ', dropNode.data.apiGroupName)
      },
      handleDragOver(draggingNode, dropNode, ev) {
        console.log('tree drag over: ', dropNode.data.apiGroupName)
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log(
          'tree drag end: ',
          dropNode && dropNode.data.apiGroupName,
          dropType
        )
        // 调后端更新
        this.updateApiGroup(this.data)
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
      editOper(){
        this.addStatus = 2
        this.cpParVisible = true
      },
      addOper(){
        this.addStatus = 1
        this.cpParVisible = true
      },
      addPer(){
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
          // this.$refs.input.focus()
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
      handDeleteAll(){

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
  .sb-select{
    display: flex;
    padding-top: 20px;
    align-items: center;
    span{
      display: inline-block;
      width: 40px;
      font-size: 14px;
      padding-right: 5px;
    }
  }
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
      position: relative;
      i{
        font-size: 50px;
      }
      span{
        font-size: 12px;
      }
      .posAb{
        font-size: 12px !important;
        position: absolute;
        top: 5px;
        right: 5px;
      }
    }
  }

</style>
