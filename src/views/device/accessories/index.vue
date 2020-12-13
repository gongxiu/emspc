<template>
  <div class="home">
    <div class="scroll">
      <div class="scroll-left">
        <div class="se-input-con">
          <div class="se-input-row">
            <div>
              <select-tree v-model="mechanismId" node-key="value" :options="orgTree" :props="defaultProps"/>
            </div>
            <div class="sb-select">
              <span>设备</span>
              <el-input
                v-model="modularName"
                :clearable="true"
                placeholder="请输入模块名称1"
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
        <div class="body-title">
          <div class="ch-title-left">
            <el-input
              v-model="gWName"
              :clearable="true"
              placeholder="请输入岗位名称"
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
                min-width="112"
                label="所属名称"
                prop="name"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="岗位级别"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <div>
                    <div  v-viewer="{toolbar: {
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
                          v-show="false"
                          :id="'J_image_viewer_'+scope.row.id">
                      <img style="width:20px"  :src="scope.row.photo" >
                    </div>

                    <span style="display: inline-block; padding-right: 10px">起重机</span><i
                    class="el-icon-chakan1" @click="$showPhotos(scope.row.id)"></i></div>
                </template>
              </el-table-column>
              <el-table-column
                min-width="112"
                label="配件名称"
                show-overflow-tooltip
                prop='name'
              />
              <el-table-column
              min-width="112"
              label="配件编号"
              show-overflow-tooltip
              prop="code"
            />
              <el-table-column
                min-width="112"
                label="配件条码"
                show-overflow-tooltip
                prop="barCode"
              />
              <el-table-column
                min-width="112"
                label="入厂编号"
                show-overflow-tooltip
                prop='factoryNumber'
              />
              <el-table-column
                min-width="112"
                label="购置时间"
                show-overflow-tooltip
                prop='buyTime'
              />
              <el-table-column
                min-width="112"
                label="规格参数"
                show-overflow-tooltip
                prop='specifications'
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
                    <el-button type="primary"
                               size="mini"
                               @click="editAcc(scope.row)"
                               icon="el-icon-bianji">
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
      :visible.sync="accVisible"
      :before-close="$closeVis('accVisible')"
      :center="true"
      :title="addStatus==1?'新增设备配件':'编辑设备配件'"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="1200px"
    >
      <editAcc
        v-if="accVisible"
        :data="data"
        @close="handleClose"
        @refresh="onSubmit"
        :addStatus="addStatus"
        :id="currentEditRowId"
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
      :visible.sync="accDetailVisible"
      :before-close="$closeVis('accDetailVisible')"
      :center="true"
      title="设备配件详情"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="1200px"
    >
      <detailAcc
        v-if="accDetailVisible"
        :data="data"
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
        :data="data"
        :importFile="importFile"
        @close="handleClose"
      />
    </el-dialog>
  </div>
</template>

<script>
  import editAcc from '@/views/device/accessories/components/editacc'
  import detailAcc from '@/views/device/accessories/components/detailacc'
  import Const from '@/utils/const'
  // import {orgDate} from '@/'
  import importFile from '@/components/importFile'
  import transFercon from '@/components/transfercon'
  import selectTree from '@/components/selectTree/selecttree';
  import { getByUrlEqu } from '@/api/equipment';

  export default {
    components: {
      editAcc,
      importFile,
      transFercon,
      selectTree,
      detailAcc
    },
    data() {
      return {
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        mechanismId:'',// 组织机构
        orgTree: Const.orgTree,
        mineStatusValue:'',
        importFile:Const.importFile.accessories,
        modularName:'',
        gWName:'',//岗位名称
        accVisible:false,//编辑修改
        cpfileVisible:false,//批量导入
        cpUserVisible:false,//人员分配
        accDetailVisible:false,//设备详情
        addStatus:1,
        /**
         * 当前编辑列的id
         */
        currentEditRowId: null,
        data: Const.orgTree,
        testBool:true,
        list:[
          {
            name:'我是测试',
            photo:'https://resource.ycyh56.com/images/photo/16996264093568.jpg?1604326056616',
            id:1,
          },
          {
            name:'我是测试',
            photo:'https://resource.ycyh56.com/images/photo/17103423388288.png?1604744647633',
            id:2,
          },
        ],
        defaultProps: {
          children: "children",
          label: "title"
        },
        loadingVisible:false,
      }
    },
    created() {
      this.onSubmit();
    },
    methods: {

      handDetail(data){
        this.accDetailVisible = true
      },
      editAcc(data){
        this.addStatus = 2
        this.accVisible = true;
        this.currentEditRowId = data.id;
      },
      showPhoto (index) {
        const viewer = this.$el.querySelector('#J_image_viewer_' + index).$viewer
        viewer.show()
      },
      selectChange(e){
        var arrNew = [];
        var dataLength = this.mineStatusValue.length;
        var eleng = e.length;
        for(let i = 0; i< dataLength ;i++){
          for(let j = 0; j < eleng; j++){
            if(e[j] === this.mineStatusValue[i].label){
              arrNew.push(this.mineStatusValue[i])
            }
          }
        }
        this.$refs.tree.setCheckedNodes(arrNew);//设置勾选的值
      },
      handleCheckChange() {
        let res = this.$refs.tree.getCheckedNodes(true, true); //这里两个true，1. 是否只是叶子节点 2. 是否包含半选节点（就是使得选择的时候不包含父节点）
        let arrLabel = [];
        let arr = [];
        res.forEach(item => {
          arrLabel.push(item.label);
          arr.push(item);
        });
        this.mineStatusValue = arr;
        this.mineStatus = arrLabel;
        console.log('arr:'+JSON.stringify(arr))
        console.log('arrLabel:'+arrLabel)
      },
      onSubmit() {
        this.pagination.currentPage = 1
        this.getData().then(res => {
          this.list = res.data
          console.log(res.data)
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
        return new Promise((resolve, reject)=>{
          getByUrlEqu({
            EquipCate: 1,
            pageindex:this.pagination.currentPage,
            pagedatacount:this.pagination.pageSize,
          }).then((res) => {
            resolve(res)
          });
        })
      },
      toUserDis(data){
        this.cpUserVisible = true
      },
      handDelete(data){
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
        this.accVisible = false
        this.cpfileVisible = false
        this.cpUserVisible = false
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
      addPer(){
        this.addStatus = 1
        this.accVisible = true
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
        this.addStatus = 2
        this.accVisible = true
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

</style>
