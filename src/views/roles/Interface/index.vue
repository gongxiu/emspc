<template>
  <div class="home  body-pd">
    <div class="home-pd">
      <div class="body-title">
        <div class="ch-title-left">
          <el-input
            v-model="modularName"
            :clearable="true"
            placeholder="请输入接口名称"
            style="width: 200px"
            size="mini"
          />
          <el-button type="primary"
                     size="mini"
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
              label="序号"
              prop="name"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="112"
              label="名称"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="112"
              label="地址"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="112"
              label="描述"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="112"
              label="操作"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <div>
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
        :visible.sync="cpIntVisible"
        :before-close="$closeVis('cpIntVisible')"
        :center="true"
        :title="addStatus==1?'新增接口':'编辑接口'"
        top="5vh"
        :close-on-click-modal="$closeModel()"
        width="400px"
      >
        <editInt
          v-if="cpIntVisible"
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
    </div>
  </div>
</template>

<script>
  import editInt from '@/views/roles/interface/components/editInt'
  import importFile from '@/components/importFile'
  import Const from '@/utils/const'
  export default {
    name: "index",
    components:{
      importFile,
      editInt
    },
    data(){
      return{
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        cpIntVisible:false,
        modularName:'',
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
      console.log(this.list)
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
      handleAdd(data){
        if(data){
          this.data = data
        }else {
          this.data = null
        }
        this.addStatus = 1
        this.cpIntVisible = true
      },
      handleEdit(data){
        this.data = data
        this.addStatus = 2
        this.cpIntVisible = true
      },
      toImport(){
        this.cpfileVisible = true
      },
      handleClose(){
        this.cpIntVisible = false
        this.cpfileVisible = false
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
