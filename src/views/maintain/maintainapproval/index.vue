<template>
  <div  class="body-pd">
    <el-tabs v-model="transfersType" type="border-card">
      <el-tab-pane label="我的保养" name="a">
        <div>
          <div class="body-title">
            <div class="ch-title-left">
              <el-select v-model="approvalType" size="mini" placeholder="选择审批状态" filterable>
                <el-option
                  v-for="(item,index) in testCheck"
                  :key="index"
                  :value="item.id"
                  :label="item.label"
                />
              </el-select>
              <el-input
                v-model="no"
                :clearable="true"
                placeholder="请输入调拨单号"
                style="width: 200px"
                size="mini"
              />

              <el-button type="primary"
                         size="mini"
                         icon="el-icon-soushuo" />
            </div>
            <div class="ch-title-right">
              <el-button type="primary"
                         size="mini"
                         @click="addTran(1)"
                         icon="el-icon-xinzeng" />
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
                  label="审批单号"
                  prop="name"
                  show-overflow-tooltip
                />
                <el-table-column
                  min-width="112"
                  label="保养审批标题"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  min-width="112"
                  label="下一审批人"
                  show-overflow-tooltip
                />
                <el-table-column
                  min-width="112"
                  label="审批时间"
                  show-overflow-tooltip
                />
                <el-table-column
                  min-width="112"
                  label="申请状态"
                  show-overflow-tooltip
                />
                <el-table-column
                  min-width="160"
                  label="操作"
                  fixed="right">
                  <template slot-scope="scope">
                    <div>
                      <el-button type="primary"
                                 size="mini"
                                 @click="handDetail(scope.row)"
                                 icon="el-icon-chakan">
                      </el-button>
                      <el-button type="primary"
                                 size="mini"
                                 @click="editProval"
                                 icon="el-icon-bianji">
                      </el-button>
                      <el-button type="danger"
                                 size="mini"
                                 @click="handDelete"
                                 icon="el-icon-shanchu">
                      </el-button>
                    </div>
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
      </el-tab-pane>
      <el-tab-pane label="我的审批" name="b">
        <div>
          <div class="body-title">
            <div class="ch-title-left">
              <el-select v-model="approvalType" size="mini" placeholder="选择审批状态" filterable>
                <el-option
                  v-for="(item,index) in testCheck"
                  :key="index"
                  :value="item.id"
                  :label="item.label"
                />
              </el-select>
              <el-input
                v-model="no"
                :clearable="true"
                placeholder="请输入调拨单号"
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
                  label="审批单号"
                  prop="name"
                  show-overflow-tooltip
                />
                <el-table-column
                  min-width="112"
                  label="保养审批标题"
                  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  min-width="112"
                  label="申请人"
                  show-overflow-tooltip
                />
                <el-table-column
                  min-width="112"
                  label="审批时间"
                  show-overflow-tooltip
                />
                <el-table-column
                  min-width="112"
                  label="申请状态"
                  show-overflow-tooltip
                />
                <el-table-column
                  min-width="180"
                  label="操作"
                  fixed="right">
                  <template slot-scope="scope">
                    <div>
                      <el-button type="primary"
                                 size="mini"
                                 @click="handDetail(scope.row)"
                                 icon="el-icon-chakan">
                      </el-button>
                      <el-button type="primary"
                                 icon="el-icon-pinglunicon-"
                                 size="mini" @click="handleAdopt(scope.row)">
                      </el-button>
                      <el-button type="danger"
                                 icon="el-icon-butongguo1"
                                 @click="handleRefuse(scope.row)"
                                 size="mini">
                      </el-button>
                    </div>
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
      </el-tab-pane>
    </el-tabs>
    <el-dialog
      :visible.sync="editVisible"
      :before-close="$closeVis('editVisible')"
      :center="true"
      :title="addStatus==1?'新增审批配置':'编辑审批配置'"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="1400px"
    >
      <editProval
        v-if="editVisible"
        @close="handleClose"
      />
    </el-dialog>
    <el-dialog
      :visible.sync="detailVisible"
      :before-close="$closeVis('detailVisible')"
      :center="true"
      title="备件申领详情"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="900px"
    >
      <detailTran
        v-if="detailVisible"
        @close="handleClose"
      />
    </el-dialog>
    <el-dialog
      :visible.sync="refuseVisible"
      :before-close="$closeVis('refuseVisible')"
      :center="true"
      title="不通过"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="400px">
      <div class="com-body">
        <div>
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="remark">
          </el-input>
        </div>
        <div class="com-btn">
          <el-button type="" size="small" @click="handleClose">取消</el-button>
          <el-button type="primary" size="small">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Const from '@/utils/const'
  import editProval from "@/views/maintain/maintainapproval/components/editproval"
  import detailTran from "@/views/spareparts/apply/components/detailtran"
  export default {
    name: "index",
    components:{
      editProval,
      detailTran
    },
    data(){
      return{
        loadingVisible:false,
        editVisible:false,
        detailVisible:false,
        refuseVisible:false,
        transfersType:'a',
        traStatus:'',//审批状态
        testCheck:Const.testCheck,
        addStatus:1,
        approvalType:'',//审批状态
        no:'',//备件编号
        remark:'',//不通过理由
        list:[
          {
            name:'我是测试',
            photo:'https://resource.ycyh56.com/images/photo/16996264093568.jpg?1604326056616',
            id:1,
          }
        ],
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
      }
    },
    methods:{
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
      handDetail(data){
        this.detailVisible = true
      },
      editProval(data){
        this.addStatus = 2
        this.editVisible = true
      },
      handleRefuse(data){
        this.refuseVisible = true
      },
      handleAdopt(data){
        this.$confirm('是否通过, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '通过!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消通过'
          });
        });
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
        this.editVisible = false
        this.detailVisible = false
        this.refuseVisible = false
      },
      addTran(index){
        if(index==1){
          this.addStatus = 1
          this.editVisible = true

        }
      }
    }
  }
</script>

<style scoped>

</style>
