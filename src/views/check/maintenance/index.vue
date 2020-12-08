<template>
  <div class="home">
    <div class="home-pd">
      <div class="body-title">
        <div class="ch-title-left">
          <div class="select-tree-pd">
            <select-tree v-model="form.mechanismId" :size="'mini'" @selected="selectedInfo" :options="dataTest"
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
          <el-button type="primary"
                     size="mini"
                     @click="toImport"
                     icon="el-icon-shangchuan"/>
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
              type="selection"
              width="55" />
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
            <el-table-column
              min-width="220"
              label="操作"
              fixed="right">
              <template slot-scope="scope">
                <div>
                  <el-button type="primary"
                             size="mini"
                             @click="through(scope.row)"
                             icon="el-icon-zu" />
                  <el-button type="danger"
                             size="mini"
                             @click="refused(scope.row)"
                             icon="el-icon-chehui" />
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
        :visible.sync="mainVisible"
        :before-close="$closeVis('mainVisible')"
        :center="true"
        :title="addStatus==1?'新增维修记录':'编辑维修记录'"
        top="5vh"
        :close-on-click-modal="$closeModel()"
        width="1200px"
      >
        <editMain
          v-if="mainVisible"
          :data="data"
          @close="handleClose"
        />
      </el-dialog>
      <el-dialog
        :visible.sync="cpfileVisible"
        :before-close="$closeVis('cpfileVisible')"
        :center="true"
        title="文件导入"
        top="5vh"
        :close-on-click-modal="$closeModel()"
        width="800px"
      >
        <importFile
          v-if="cpfileVisible"
          :importFile="importFile"
          @close="handleClose"
        />
      </el-dialog>
      <el-dialog
        :visible.sync="detailVisible"
        :before-close="$closeVis('detailVisible')"
        :center="true"
        title="维修详情"
        top="5vh"
        :close-on-click-modal="$closeModel()"
        width="1200px"
      >
        <detailMain
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
  </div>
</template>

<script>
  import editMain from '@/views/check/maintenance/components/editmain'
  import detailMain from '@/views/check/maintenance/components/detailmain'
  import importFile from '@/components/importFile'
  import Const from '@/utils/const'
  import selectTree from '@/components/selectTree/selecttree'
  import Editmain from "./components/editmain";
  export default {
    name: "index",
    components:{
      Editmain,
      importFile,
      editMain,
      selectTree,
      detailMain
    },
    data(){
      return{
        refuseVisible:false,
        detailVisible:false,
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        defaultProps: {
          children: "children",
          label: "label"
        },
        dataTest:Const.testData,
        testCheck:Const.testCheck,
        mainVisible:false,
        mineStatusValue:'',
        form:{
          mechanismId:'1',//机构
          mainStatus:'',//维修状态
          no:'',//维修单号

        },
        remark:'',//备注
        importFile:Const.importFile.interface,
        cpfileVisible:false,//批量导入
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
      console.log(this.dataTest)
    },
    methods:{

      handleDetail(data){
        this.detailVisible = true
      },
      selectedInfo(data){
        console.log(data)
      },
      //通过
      through(data){
        this.$confirm('是否通过?', '提示', {
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
            message: '已取消'
          });
        });
      },
      //不通过
      refused(data){
        this.refuseVisible = true
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
        if(data){
          this.data = data
        }else {
          this.data = null
        }
        this.addStatus = 1
        this.mainVisible = true
      },
      handleEdit(data){
        this.data = data
        this.addStatus = 2
        this.mainVisible = true
      },
      toImport(){
        this.cpfileVisible = true
      },
      handleClose(){
        this.mainVisible = false
        this.cpfileVisible = false
        this.refuseVisible = false
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
