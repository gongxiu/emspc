<template>
  <div class="home">
    <div class="home-pd">
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
              width="55"/>
            <el-table-column
              min-width="112"
              label="维修单号"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="112"
              label="设备名称"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="112"
              label="设备编号"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="112"
              label="故障类型"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="112"
              label="停机时间"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="112"
              label="维护类型"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="112"
              label="处理人"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="112"
              label="开始处理时间"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="112"
              label="结束处理时间"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="112"
              label="维修状态"
              show-overflow-tooltip
            />
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
</template>

<script>
  export default {
    name: "seeItem",
    data(){
      return{
        loadingVisible:false,
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
      }
    },
    methods:{
      handleSizeChange(){

      },
      handleCurrentChange(){

      }
    }
  }
</script>

<style lang="scss" scoped>
  .home-pd{
    padding: 20px;
    background: #fff;
  }
</style>
