<template>
  <div class="home">
    <div class="home-pd">
      <div class="body-title">
        <div class="ch-title-left">
          <div class="select-tree-pd">
            <select-tree v-model="form.mechanismId" :size="'mini'" @selected="selectedInfo" :options="orgTree"
                         :props="defaultProps"/>
          </div>
          <el-select v-model="form.mainStatus" size="mini" placeholder="选择维修状态" filterable>
            <el-option
              v-for="(item,index) in testCheck"
              :key="index"
              :value="item.id"
              :label="item.label"
            />
          </el-select>
          <el-input
            v-model="form.no"
            :clearable="true"
            placeholder="请输入维修单号"
            style="width: 200px"
            size="mini"
          />
          <el-button type="primary"
                     size="mini"
                     style="height: 28px"
                     icon="el-icon-soushuo"/>
        </div>
        <div class="ch-title-right">
          <el-button type="primary"
                     size="mini"
                     @click="handleAdd"
                     icon="el-icon-xinzeng"/>
        </div>
      </div>
      <div  class="table-con">
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
              label="任务名称"
            />
            <el-table-column
              min-width="112"
              label="使用路线"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="112"
              label="预计开始时间"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="112"
              label="预计结束时间"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="112"
              label="实际开始时间"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="112"
              label="实际结束时间"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="112"
              label="执行人"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="112"
              label="抄送人"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="112"
              label="状态"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="140"
              label="操作"
              fixed="right">
              <template slot-scope="scope">
                <div>
                  <el-button type="primary"
                             size="mini"
                             @click="handleDetail(scope.row)"
                             icon="el-icon-chakan" />

                  <el-button type="primary"
                             size="mini"
                             @click="handleEdit(scope.row)"
                             icon="el-icon-bianji">
                  </el-button>
                  <el-button type="danger"
                             size="mini"
                             @click="handDelete(scope.row)"
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
      <el-dialog
        :visible.sync="editVisible"
        :before-close="$closeVis('editVisible')"
        :center="true"
        :title="addStatus==1?'新增配置':'编辑配置'"
        top="5vh"
        :close-on-click-modal="$closeModel()"
        width="1200px"
      >
        <editTask
          v-if="editVisible"
          @close="handleClose"
        />
      </el-dialog>
      <el-dialog
        :visible.sync="detailVisible"
        :before-close="$closeVis('detailVisible')"
        :center="true"
        title="配置详情"
        top="5vh"
        :close-on-click-modal="$closeModel()"
        width="1200px"
      >
        <detailTask
          v-if="detailVisible"
          @close="handleClose"
        />
      </el-dialog>



    </div>
  </div>
</template>

<script>
  import editTask from "@/views/inspection/taskins/components/edittask"
  import detailTask from "@/views/inspection/taskins/components/detailtask"
  import Const from '@/utils/const'
  import selectTree from '@/components/selectTree/selecttree'
  export default {
    name: "index",
    components:{
      editTask,
      selectTree,
      detailTask
    },
    data(){
      return{
        editVisible:false,
        detailVisible:false,

        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        defaultProps: {
          children: "children",
          label: "title"
        },
        orgTree:Const.orgTree,
        testCheck:Const.testCheck,
        mainVisible:false,
        mineStatusValue:'',
        form:{
          mechanismId:'1',//机构
          mainStatus:'',//维修状态
          no:'',//维修单号

        },
        remark:'',//备注
        addStatus:1,
        list:[
          {
            name:'我是测试'
          }
        ],
        loadingVisible:false,
        data:null
      }
    },
    mounted() {
      console.log(this.orgTree)
    },
    methods:{
      handleDetail(data){
        this.detailVisible = true
      },
      selectedInfo(data){
        console.log(data)
      },
      selectChange(e){
        var arrNew = [];
        var dataLength = this.mineStatusValue.length;
        var eleng = e.length;
        for(let i = 0; i< dataLength ;i++){
          for(let j = 0; j < eleng; j++){
            if(e[j] === this.mineStatusValue[i].label){
              arrNew.push(this.mineStatusValue[i])
            }
          }
        }
        this.$refs.tree.setCheckedNodes(arrNew);//设置勾选的值
      },
      handleCheckChange() {
        let res = this.$refs.tree.getCheckedNodes(true, true); //这里两个true，1. 是否只是叶子节点 2. 是否包含半选节点（就是使得选择的时候不包含父节点）
        let arrLabel = [];
        let arr = [];
        res.forEach(item => {
          arrLabel.push(item.label);
          arr.push(item);
        });
        this.mineStatusValue = arr;
        this.mineStatus = arrLabel;
        console.log('arr:'+JSON.stringify(arr))
        console.log('arrLabel:'+arrLabel)
      },
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
      handleAdd(data){
        this.addStatus = 1
        this.editVisible = true
      },
      handleEdit(data){
        this.data = data
        this.addStatus = 2
        this.editVisible = true
      },
      handleClose(){
        this.editVisible = false
        this.detailVisible = false
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
    }
  }
</script>

<style lang="scss" scoped>
  .home-pd{
    padding: 20px;
    background: #fff;
  }
</style>
