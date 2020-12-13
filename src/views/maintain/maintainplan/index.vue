<template>
  <div class="home">
    <div class="scroll">
      <div class="scroll-left">
        <div class="se-input-con">
          <div class="se-input-row">
            <div>
              <select-tree
                size="mini"
                v-model="mechanismId"
                :options="orgTree"
                :props="defaultProps"
              />
            </div>
            <div class="sb-select">
              <span>设备</span>
              <el-input
                v-model="modularName"
                :clearable="true"
                placeholder="请输入模块名称"
                style="width: 100%;margin-right: 10px"
                size="mini"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-right">
        <div class="body-title">
          <div class="ch-title-left"></div>
          <div class="ch-title-right">
            <el-button
              type="primary"
              size="mini"
              @click="setMaintain"
              icon="el-icon-peizhi"
            />
          </div>
        </div>
        <div class="table-all">
          <div class="tabel-1">
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
    </div>
  </div>
</template>

<script>
  import selectTree from "@/components/selectTree/selecttree";
  import Const from "@/utils/const";
  export default {
    name: "index",
    components: {
      selectTree
    },
    data() {
      return {
        loadingVisible: false,

        list: [],
        listTwo: [],
        mechanismId: "", //机构
        modularName: "", //用户或账号
        orgTree: Const.orgTree,

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
      };
    },

    methods: {
      handleSizeChange() {},
      handleCurrentChange() {},
      setMaintain() {
        this.$router.push({
          path:'/maintain/maintenequ'
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  .table-all {
    min-width: 900px;
    display: flex;
    .tabel-1 {
      width: 48%;
      margin-right: 2%;
    }
    .tabel-2 {
      width: 50%;
    }
  }
</style>
