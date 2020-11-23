<template>
  <div class="com-body">
    <div class="body-title">
      <div class="ch-title-left">

        <el-input
          v-model="keyword"
          :clearable="true"
          placeholder="请输入账号或姓名"
          style="width: 200px"
          size="mini"
        />

        <el-button type="primary"
                   size="mini"
                   icon="el-icon-soushuo" />
      </div>
    </div>
    <div class="table-con">
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
            label="账号"
            show-overflow-tooltip
          />
          <el-table-column
            min-width="112"
            label="姓名"
            show-overflow-tooltip
          />
        </el-table>
      </el-scrollbar>
    </div>
    <div class="com-btn">
      <el-button type="" size="small" @click="$closFun('close')">取消</el-button>
      <el-button type="primary" size="small">确定</el-button>
    </div>
  </div>
</template>

<script>

  export default {
    name: "addUser",
    data(){
      return{
        loadingVisible:false,
        keyword:'',//账号或姓名
        list:[
          {
            name:'我是测试',
            photo:'https://resource.ycyh56.com/images/photo/16996264093568.jpg?1604326056616',
            id:1,
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
