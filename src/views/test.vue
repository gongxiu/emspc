<template>
  <div class="custom-tree-container">
    <div
      style="width:300px">
      <p>使用 scoped slot</p>
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
          <template v-if="data.isEdit==1">
            <el-input ref="input"
              @blur="() => submitEdit(node,data)"
              v-model="newApiGroupName"
              style="height:20px line-height:20px"></el-input>
            <!-- 放弃、提交按钮废弃，改为失去焦点自动提交 -->

          </template>
          <!-- 如果不是编辑状态 -->
          <span v-else
            v-text="data.companyName"></span>
          <span>
            <el-button v-if="data.id!=1"
              type="text"
              size="mini"
              @click="() => edit(node,data)">
              E
            </el-button>
            <el-button type="text"
              size="mini"
              @click="() => append(node,data)">
              +
            </el-button>
            <el-button v-if="data.id!=1"
              type="text"
              size="mini"
              @click="() => remove(node, data)">
              D
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
// import { fetchList } from '@/api/article'


// let id = 1000
export default {
  name: 'appiumTree1',
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
      data1:data,
      data: [],
      newApiGroupName: '',
    }
  },
  created() {
    this.getApiGroupData()
  },
  methods: {
    // 调api获取接口分组数据
    getApiGroupData() {

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
      // var pid = data.parentApiGroupId + ':' + data.id
      var timestamp = new Date().getTime()
      const newChild = {
        id: timestamp,
        isEdit: 0,
        apiGroupName: 'T' + timestamp,
        children: []
      }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
      this.updateApiGroup(this.data)
    },

    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
      this.updateApiGroup(this.data)
    },

    edit(node, data) {
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

    cancelEdit(node, data) {
      // console.log('放弃编辑')
      // console.log(data.id, data.apiGroupName)
      this.newApiGroupName = ''
      this.$set(data, 'isEdit', 0)
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

    nodeclick(node, data, obj) {
      console.log('点击了：', node.userId, node.companyName)
      // this.$store.dispatch('appium/changeApiGroupId', node.id)

    },
    getNewDate(data){
      let arr = []
      if(data.length>0){
        data.map((item,index)=>{
          if(item.isGroup == 0){
            arr.push({
              userId:item.userId,
              companyIdentification:item.companyIdentification,
              companyName:item.companyName,
              mobile:item.mobile,
              verifyStatus:item.verifyStatus,
              materialUrl:item.materialUrl,
              regDate:item.regDate,
              isGroup:item.isGroup,
              children:[]
            })
          }else{
            if(item.photo == '' || item.photo == null){
              item.photo = []
            }else{
              item.photo = JSON.parse(item.photo)
            }
            arr.push({
              userId:item.cgId,
              companyIdentification:'',
              companyName:item.groupName,
              mobile:item.mobile,
              verifyStatus:99,
              materialUrl:item.photo,
              regDate:item.createTime,
              isGroup:item.isGroup,
              children:[]
            })
          }
          item.group.map((item1,index1)=>{
            if(item1.isGroup == 0){
              arr[index].group.push({
                userId:item1.userId,
                companyIdentification:item1.companyIdentification,
                companyName:item1.companyName,
                mobile:item1.mobile,
                verifyStatus:item1.verifyStatus,
                materialUrl:item1.materialUrl,
                regDate:item1.regDate,
                isGroup:item1.isGroup,
                children:[]
              })
            }else{
              if(item1.photo == '' || item1.photo == null){
                item1.photo = []
              }else{
                item1.photo = JSON.parse(item1.photo)
              }
              arr[index].children.push({
                userId:item1.cgId,
                companyIdentification:'',
                companyName:item1.groupName,
                mobile:item1.mobile,
                verifyStatus:99,
                materialUrl:item1.photo,
                regDate:item1.createTime,
                isGroup:item1.isGroup,
              })
            }
          })
        })
        arr[0].verifyStatus = 99
      }


      return arr
    },
  }
}
</script>
<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 20px;
}
/* 修改el-input高度，方案一： */
/* 某些预处理器(sass)无法识别>>>，建议使用方案二 */
/* >>> .el-input__inner {
  height: 20px;
} */
/* 修改el-input高度，方案二： */
/deep/ .el-input__inner {
  height: 20px;
}
</style>
