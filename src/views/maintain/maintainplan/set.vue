<template>
  <div>
    <div class="scroll">
      <div class="table-all">
        <div class="tabel-1">
          <div class="table-1-title">
            <el-row :gutter="10">
              <el-col :span="8">
                <el-select v-model="form.name" collapse-tags  size="mini" multiple placeholder="请选择">
                  <el-option
                    v-for="item in testCheck"
                    :key="item.value"
                    :label="item.label"


                    :value="item.id">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-input
                  v-model="form.keyword"
                  :clearable="true"
                  placeholder="请输入关键字"
                  style="width: 100%;margin-right: 10px"
                  size="mini"
                />
              </el-col>
              <el-button type="primary"
                         size="mini"
                         style="height: 28px"
                         icon="el-icon-soushuo"/>
            </el-row>

          </div>
          <div class="table-con">
            <el-scrollbar>
              <el-table
                v-loading="loadingVisible"
                :data="list"
                stripe
                :border="$bor()"
                size="small"
                style="width: 100%"
              >
                <el-table-column
                  min-width="112"
                  label="设备名称"
                  prop="name"
                  show-overflow-tooltip
                />
                <el-table-column
                  min-width="112"
                  label="设备编号"
                  show-overflow-tooltip
                />
                <el-table-column
                  min-width="112"
                  label="所属机构"
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
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </div>
        <div class="tabel-2">
          <div class="table-2-title">
            <div class="table-1-title">
              <el-row :gutter="10">
                <el-col :span="8">
                  <el-input
                    v-model="form1.keyword"
                    :clearable="true"
                    placeholder="请输入关键字"
                    style="width: 100%;margin-right: 10px"
                    size="mini"
                  />
                </el-col>
                <el-button type="primary"
                           size="mini"
                           style="height: 28px"
                           icon="el-icon-soushuo"/>
              </el-row>
            </div>
          </div>
          <div class="table-con">
            <el-scrollbar>
              <el-table
                v-loading="loadingVisible"
                :data="listTwo"
                stripe
                :border="$bor()"
                size="small"
                style="width: 100%"
              >
                <el-table-column
                  min-width="112"
                  label="保养项名称"
                  prop="name"
                  show-overflow-tooltip
                />
                <el-table-column
                  min-width="112"
                  label="保养项编号"
                  show-overflow-tooltip
                />
                <el-table-column
                  min-width="112"
                  label="要求"
                  show-overflow-tooltip
                />
                <el-table-column
                  min-width="112"
                  label="执行人"
                  show-overflow-tooltip
                />
                <el-table-column
                  min-width="112"
                  label="生效时间"
                  show-overflow-tooltip
                />
                <el-table-column
                  min-width="112"
                  label="项目次数"
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
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="com-btn">
      <el-button type="primary" size="small">保存</el-button>
    </div>
  </div>
</template>

<script>
  import selectTree from "@/components/selectTree/selecttree";
  import Const from "@/utils/const";
  export default {
    name: "set",
    components: {
      selectTree
    },
    data() {
      return {
        list: [],
        listTwo:[],
        loadingVisible:false,
        orgTree: Const.orgTree,
        testCheck:Const.testCheck,

        form:{
          name:'',//名称
          keyword:'',//关键字
        },
        form1:{
          keyword:'',//关键字
        },

        defaultProps: {
          children: "children",
          label: "title"
        },
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        pagination2: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        }
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
.table-all{
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding:20px;
  min-width: 900px;
  .tabel-1{
    width: 49%;
    background: #fff;
  }
  .tabel-2{
    width: 49%;
    background: #fff;
  }
  .table-con{
    padding: 20px;
  }
  .table-1-title{
    padding-left:20px;
    padding-top: 20px;
  }
  table-2-title{
    padding-left:20px;
    padding-top: 20px;
  }
}
.com-btn{
  display: flex;
  justify-content: center;
}
</style>
