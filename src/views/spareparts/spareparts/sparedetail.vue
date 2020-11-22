<template>
  <div class="body-pd">
    <div class="body-bg">
      <div class="body-title">
        <div class="ch-title-left">
          <el-input
            v-model="keyword"
            :clearable="true"
            placeholder="请输入关键词"
            style="width: 200px"
            size="mini"
          />

          <el-button type="primary"
                     size="mini"
                     icon="el-icon-soushuo"/>
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
              min-width="112"
              label="序号"
              prop="name"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="112"
              label="备件编号"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              min-width="112"
              label="备件名称"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="112"
              label="备件条码"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="112"
              label="所属仓库"
              show-overflow-tooltip
            />
            <el-table-column
              label="操作"
              fixed="right">
              <template slot-scope="scope">
                <el-button type="primary"
                           size="mini"
                           @click="handDetail(scope.row)"
                           icon="el-icon-chakan">
                </el-button>
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
    <el-dialog
      :visible.sync="detailVisible"
      :before-close="$closeVis('detailVisible')"
      :center="true"
      title="设备配件详情"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="1200px"
    >
      <detail
        v-if="detailVisible"
        :data="data"
        @close="handleClose"
      />
    </el-dialog>
  </div>
</template>

<script>
  import detail from "@/views/spareparts/spareparts/components/detail"
  export default {
    name: "sparedetail",
    components:{
      detail
    },
    data() {
      return {
        loadingVisible:false,
        detailVisible:false,
        keyword:'',

        list:[
          {
            name:'我是测试'
          }
        ],
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        data:null,
      }
    },
    methods:{
      handleSizeChange(){

      },
      handleCurrentChange(){

      },
      handDetail(){
        this.detailVisible = true
      },
      handleClose(){
        this.detailVisible = false
      }
    }
  }
</script>

<style lang="scss" scoped>
.body-bg{
  background: #fff;
  padding:20px;
}
</style>
