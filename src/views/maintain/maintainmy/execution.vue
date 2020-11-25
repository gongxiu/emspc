<template>
  <div class="home">
    <div class="scroll">
      <div class="scroll-left">
        <div class="se-input-con">
          <div class="se-input-row">
            <div>
              <select-tree v-model="mechanismId" placeholder="请选择机构" :options="dataTest" :props="defaultProps"/>
            </div>
            <div class="sb-select">
              <span>设备</span>
              <el-input
                v-model="modularName"
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
              v-model="name"
              :clearable="true"
              placeholder="请输入名称"
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
                       @click=""
                       @click="editExcu"
                       icon="el-icon-bianji" />
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
                label="项目编号"
                prop="name"
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
                label="保养要求"
                prop="name"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="保养要求"
                prop="name"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="项目频次"
                prop="name"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="执行人"
                prop="name"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="执行状态"
                prop="name"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="保养开始时间"
                prop="name"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="112"
                label="保养结束时间"
                prop="name"
                show-overflow-tooltip
              />
              <el-table-column
                min-width="60"
                label="操作"
                fixed="right">
                <template slot-scope="scope">
                  <div>

                    <el-button type="primary"
                               size="mini"
                               @click="handDetail(scope.row)"
                               icon="el-icon-chakan">
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
      :visible.sync="detailExeVisible"
      :before-close="$closeVis('detailExeVisible')"
      :center="true"
      title="保养项执行详情"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="1200px"
    >
      <detailExecu
        v-if="detailExeVisible"
        :data="data"
        @close="handleClose"
      />
    </el-dialog>
    <el-dialog
      :visible.sync="editExeVisible"
      :before-close="$closeVis('editExeVisible')"
      :center="true"
      title="修改状态"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="400px"
    >
      <editExecu
        v-if="editExeVisible"
        :data="data"
        @close="handleClose"
      />
    </el-dialog>
  </div>
</template>

<script>
  import detailExecu from '@/views/maintain/maintainmy/components/detailexecu'
  import editExecu from '@/views/maintain/maintainmy/components/editexecu'
  import Const from '@/utils/const'
  import selectTree from '@/components/selectTree/selecttree'
  export default {
    components: {
      selectTree,
      detailExecu,
      editExecu
    },
    data() {
      return {
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        mechanismId:'',// 组织机构
        dataTest: Const.testData,
        mineStatusValue:'',
        modularName:'',
        name:'',//名称
        detailExeVisible:false,//设备详情
        editExeVisible:false,//修改状态
        addStatus:1,
        data: Const.testData,
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
          label: "label"
        },
        loadingVisible:false,
      }
    },
    methods: {
      handDetail(data){
        this.detailExeVisible = true
      },
      editAcc(data){
        this.addStatus = 2
        this.editVisible = true
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

      },
      toUserDis(data){
        this.cpUserVisible = true
      },
      handleClose(){
        this.editExeVisible = false
        this.detailExeVisible = false
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
      editExcu(){
        this.addStatus = 2
        this.editExeVisible = true
      },
      append(node, data) {
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
        return;
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
        this.updateApiGroup(this.data)
      },
      editPer(data){
        this.addStatus = 2
        this.editVisible = true
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
    }
  }
</script>

<style lang="scss" scoped>

</style>
