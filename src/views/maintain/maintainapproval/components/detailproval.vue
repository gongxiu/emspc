<template>
  <div class="com-body">
    <el-tabs v-model="activeName" >
      <el-tab-pane label="基本信息" name="a">
        <div>
          <div class="detail-des">
            <el-row :gutter="10">
              <el-col :span="24">
                <div class="label-wrap">
                  <label>审批标题：</label>
                  <span>测试</span>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="label-wrap">
                  <label>审批描述：</label>
                  <span>测试</span>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="detail-table">
            <div class="table-1">
              <div class="table-1-title">设备列表</div>
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
                    label="设备名称"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    min-width="112"
                    label="设备编码"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    min-width="112"
                    label="所属单位"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    min-width="112"
                    label="设备类别"
                    show-overflow-tooltip
                  />
                </el-table>
              </el-scrollbar>
            </div>
            <div class="table-2">
              <div class="table-2-title">保养项</div>
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
                    label="保养项名称"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    min-width="112"
                    label="项目编号"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    min-width="112"
                    label="保养要求"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    min-width="112"
                    label="执行人"
                    show-overflow-tooltip
                  />
                  <el-table-column
                    min-width="112"
                    label="执行时间"
                    show-overflow-tooltip
                  />
                </el-table>
              </el-scrollbar>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="审批流程" name="b">
        <div>
          <div class="detail-des">
            <el-row :gutter="10">
              <el-col :span="24">
                <div class="label-wrap">
                  <label>审批标题：</label>
                  <span>测试</span>
                </div>
              </el-col>
              <el-col :span="24">
                <div class="label-wrap">
                  <label>审批描述：</label>
                  <span>测试</span>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="block">
            <el-steps :active="1">
              <el-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></el-step>
              <el-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></el-step>
              <el-step title="步骤 3" description="这段就没那么长了"></el-step>
            </el-steps>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: "detailproval",
    data(){
      return{
        loadingVisible:false,
        activeName:'b',
        list:[]
      }
    }
  }
</script>

<style lang="scss" scoped>
.detail-table{
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #dfe6ec;
  .table-1{
    width: 48%;
    .table-1-title{
      height: 44px;
      line-height:44px ;
    }
  }
  .table-2{
    width: 48%;
    .table-2-title{
      height: 44px;
      line-height:44px ;
    }
  }
  .block{
    border-top: 1px solid #dfe6ec;
    padding-top: 20px;
  }
}
</style>
