<template>
  <div class="home">
    <div class="scroll">
      <div class="scroll-left">
        <el-tree :data="data"
                 node-key="id"
                 default-expand-all
                 :expand-on-click-node="false"
                 @node-click="nodeclick"
                 @node-drag-start="handleDragStart"
                 @node-drag-enter="handleDragEnter"
                 @node-drag-leave="handleDragLeave"
                 @node-drag-over="handleDragOver"
                 @node-drag-end="handleDragEnd"
                 @node-drop="handleDrop"
                 draggable
                 :allow-drop="allowDrop"
                 :allow-drag="allowDrag">
        <span class="custom-tree-node"
              slot-scope="{ node, data }">
          <!-- 如果是编辑状态 -->
          <!-- <template v-if="data.isEdit==1">
             <el-input ref="input"
                       @blur="() => submitEdit(node,data)"
                       v-model="newApiGroupName"
                       style="height:20px line-height:20px"></el-input>
             &lt;!&ndash; 放弃、提交按钮废弃，改为失去焦点自动提交 &ndash;&gt;

           </template>-->
          <!-- 如果不是编辑状态 -->
          <span v-text="data.label"></span>
          <span>
            <el-button v-if="data.id!=1"
                       type="primary"
                       size="mini"
                       icon="el-icon-bianji"
                       @click="() => edit(node,data)">
            </el-button>
            <el-button type="primary"
                       size="mini"
                       icon="el-icon-renwurenyuanxinzeng"
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
        :data="data"
        @close="handleClose"
      />
    </el-dialog>
  </div>
</template>

<script>
  import editPersonnel from '@/views/roles/personnel/components/editpersonnel'

  export default {
    components: {
      editPersonnel
    },
    data() {
      const data = [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }];
      return {
        cpPerVisible:false,
        addStatus:1,
        data: data,
      }
    },
    methods: {
      handleClose(){
        this.cpPerVisible = false
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

      append(node, data) {
        this.addStatus = 1
        this.cpPerVisible = true
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
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
        this.updateApiGroup(this.data)
      },

      edit(node, data) {
        this.addStatus = 2
        this.cpPerVisible = true
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
    .el-tree-node__content {
      margin: 10px 0
    }
  }
  .scroll-right{
    width: calc(100% - 300px - 40px);
    height: calc(100vh - 50px - 40px);
    background: #fff;
    margin: 20px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  }
</style>
