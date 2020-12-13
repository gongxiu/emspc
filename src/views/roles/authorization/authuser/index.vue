<template>
  <div class="home">
    <div class="scroll">
      <div class="scroll-left">
        <div class="se-input-con">
          <div class="se-input-row">
            <el-input
              v-model="modularName"
              :clearable="true"
              placeholder="请输入用户名称"
              style="width: 100%;margin-right: 10px"
              size="mini"
            />
          </div>
        </div>

      </div>
      <div class="scroll-right">
        <div  class="table-con">
          <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="用户" name="a">
              <div class="body-title">
                <div class="ch-title-left">
                  <el-input
                    v-model="modularName"
                    :clearable="true"
                    placeholder="请输入用户名称"
                    style="width: 200px"
                    size="mini"
                  />
                  <el-checkbox v-model="selectCheck">隐藏已勾选</el-checkbox>
                  <el-button type="primary"
                             size="mini"
                             icon="el-icon-soushuo" />
                </div>
                <div class="ch-title-right">

                </div>
              </div>
              <div class="user-list">
                <div class="user-temp">
                  <div class="user-li" v-for="(item,index) in testCheck">
                    <el-checkbox v-model="item.check">{{item.label}}</el-checkbox>
                  </div>
                </div>
              </div>
              <div class="tab-btn">
                <el-button type="primary" size="small">保存</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="模块" name="b">
              <div class="body-title">
                <div class="ch-title-left">
                  <el-input
                    v-model="modularName"
                    :clearable="true"
                    placeholder="请输入用户名称"
                    style="width: 200px"
                    size="mini"
                  />
                  <el-checkbox v-model="selectCheck">隐藏已勾选</el-checkbox>
                  <el-button type="primary"
                             size="mini"
                             icon="el-icon-soushuo" />
                </div>
                <div class="ch-title-right">

                </div>
              </div>
              <div class="mod-con">
                <div class="mod-tree">
                  <el-tree
                    :data="orgTree"

                    node-key="id"
                    :default-expanded-keys="[2, 3]"
                    :default-checked-keys="[5]"
                    :props="defaultProps">
                  </el-tree>
                </div>
                <div class="mod-oper">
                  <div class="oper-title">
                    <span>操作合集</span>
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                  </div>

                  <div style="margin: 15px 0;"></div>
                  <div class="oper-list">
                    <div class="oper-li" v-for="(item,index) in testCheck">
                      <el-checkbox v-model="item.check"  @change="handleCheckedCitiesChange">{{item.label}}</el-checkbox>
                    </div>
                  </div>
                </div>
                <div class="tab-btn">
                  <el-button type="primary" size="small">保存</el-button>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="cpStaVisible"
      :before-close="$closeVis('cpStaVisible')"
      :center="true"
      :title="addStatus==1?'新增机构':'编辑机构'"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="400px"
    >
      <editStation
        v-if="cpStaVisible"
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
        :data="data"
        :importFile="importFile"
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
  export default {
    components: {
      editStation,
      importFile,
      transFercon
    },
    data() {
      return {
        isIndeterminate:true,//只负责样式空置
        checkAll:false,//全选
        defaultProps: {
          children: 'children',
          label: 'label'
        },

        testCheck:Const.testCheck,
        orgTree:Const.orgTree,
        selectCheck:false,
        activeName: 'a',
        importFile:Const.importFile.station,
        modularName:'',
        cpStaVisible:false,//编辑修改
        cpfileVisible:false,//批量导入
        cpUserVisible:false,//人员分配
        addStatus:1,
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
    methods: {
      handleCheckAllChange(val) {
        let checkArr = []
        this.testCheck.map((item,index)=>{
          if(item.check){
            checkArr.push(item)
          }
        })
        console.log(checkArr.length == this.testCheck.length)
        if(checkArr.length == this.testCheck.length){
          this.testCheck.map((item,index)=>{
            item.check = false
          })

        }else{
          this.testCheck.map((item,index)=>{
            item.check = true
          })
        }
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkArr = []
        this.testCheck.map((item,index)=>{
          if(item.check){
            checkArr.push(item)
          }
        })
        this.checkAll = checkArr.length == this.testCheck.length?true:false
        this.isIndeterminate = checkArr.length > 0 && checkArr.length < this.testCheck.length;
      },

      handleClick(tab, event) {
        console.log(tab, event);
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
        this.cpStaVisible = false
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
    padding: 0px 10px 10px;
    width: calc(100% - 300px - 40px);
    height: calc(100vh - 50px - 40px);
    min-height: 600px;
    background: #fff;
    margin: 20px 20px 20px 0;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    position: relative;
    .user-list{
      min-height: 460px;
      .user-temp{
        display: flex;
        flex-wrap: wrap;
      }
      .user-li{
        width: calc(100% / 6);
        padding-bottom: 20px;

      }
    }
    .mod-con{
      .mod-tree{
        min-height: 300px;
        overflow: auto;
      }
      .mod-oper{
        border-top: 1px solid  #DCDFE6;
        padding-top: 20px;
        min-height: 200px;
        .oper-title{
          display: flex;
          justify-content: space-between;
        }
        .oper-list{
          display: flex;
          flex-wrap: wrap;
          .oper-li{
            width: calc(100% / 6);
            padding-bottom: 20px;
          }
        }
      }
    }
    .tab-btn{
      /*position: absolute;
      bottom: 0;*/
      display: flex;
      justify-content: center;
    }
  }
  .body-title{
    margin-bottom: 30px;
  }
</style>
