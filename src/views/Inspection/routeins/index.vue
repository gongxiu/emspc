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
              <el-input
                v-model="modularName"
                :clearable="true"
                placeholder="请输入设备名称或编码"
                style="width: 100%;margin-right: 10px"
                size="mini"
              />
              <el-button type="primary"
                         size="mini"
                         icon="el-icon-soushuo" />
            </div>
          </div>
        </div>
        <el-tree :data="data"
                 node-key="id"
                 default-expand-all
                 :expand-on-click-node="false"
                 :allow-drop="allowDrop"
                 :allow-drag="allowDrag">
        <span class="custom-tree-node"
              slot-scope="{ node, data }">
          <span v-text="data.label"></span>
          <el-button type="primary"
                     size="mini"
                     @click="editRoute"
                     icon="el-icon-bianji">
                    </el-button>
                    <el-button type="danger"
                               size="mini"
                               @click="handDelete"
                               icon="el-icon-shanchu">
                    </el-button>
        </span>
        </el-tree>
      </div>
      <div class="scroll-right">
        <div class="add-device" @click="addRoute">
          <i class="el-icon-xinzeng2"></i>
          <span>新增设备</span>
        </div>
        <div class="com-step">
          <div class="step-li" v-for="item in 5">
            <i class="el-icon-youjiantou" v-if="item != 1" style="font-size: 60px;color: #999"></i>
            <div class="li-con">
              <div>燃油机</div>
              <div>awdadasdasdas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="editVisible"
      :before-close="$closeVis('editVisible')"
      :center="true"
      :title="addStatus==1?'新增路线':'编辑路线'"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="400px"
    >
      <editRoute
        v-if="editVisible"
        :data="data"
        @close="handleClose"
      />
    </el-dialog>
    <el-dialog
      :visible.sync="detailVisible"
      :before-close="$closeVis('detailVisible')"
      :center="true"
      title="项目详情"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="1200px"
    >
      <detailIns
        v-if="detailVisible"
        :data="data"
        @close="handleClose"
      />
    </el-dialog>
  </div>
</template>

<script>
  import transFercon from '@/components/transfercon'
  import editRoute from '@/views/inspection/routeins/components/addroute'
  import detailIns from '@/views/inspection/checkitem/components/detailIns'
  import Const from '@/utils/const'
  import selectTree from '@/components/selectTree/selecttree'
  export default {
    components: {
      editRoute,
      transFercon,
      detailIns,
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
        testCheck:Const.testCheck,
        orgTree:Const.orgTree,
        mechanismId:'',
        modularName:'',
        operName:'',//操作名称
        jgName:'',//机构名称
        operType:'',//操作类型
        editVisible:false,//编辑修改
        cpParVisible:false,
        cpUserVisible:false,
        detailVisible:false,
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
    methods: {
      toDistribu(){
        this.$router.push({
          path:'/inspection/inspectitem'
        })
      },
      handleCheckAllChange(e){
        console.log(e)
      },
      handDetail(data){
        this.detailVisible = true
      },
      addRoute(){
        this.addStatus = 1
        this.editVisible = true
      },
      editRoute(){
        this.addStatus = 2
        this.editVisible = true
      },
      handleAdd(){
        this.addStatus = 1
        this.editVisible = true
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
        this.editVisible = false
        this.cpUserVisible = false
        this.detailVisible = false
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
        this.editVisible = true
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
    display: flex;
    .add-device{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      align-content: space-around;
      width: 100px;
      height: 80px;
      border: 1px solid #DCDFE6;
      font-size: 14px;
      padding:10px 0;
      color: #999;
      cursor: pointer;
      margin-right: 10px;
      i{
        font-size: 32px;

      }
    }
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
  .com-step {
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
    .step-li {
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      margin-bottom: 20px;

      .li-con {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 120px;
        height: 60px;
        text-align: center;
        background: #F8B300;
        overflow: hidden;
      }
    }
  }
</style>
