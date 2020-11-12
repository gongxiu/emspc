<template>
    <div class="home">
      <div class="body-title">
        <div class="ch-title-left">
          <el-select v-model="selectVal" placeholder="请选择系统" size="mini" filterable>
            <el-option
              v-for="(item,index) in emptyArr"
              :key="index"
              :value="item.userId"
              :label="item.companyName"
            />
          </el-select>
          <el-input
            v-model="modularName"
            :clearable="true"
            placeholder="请输入字典类别名称"
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
                     @click="addCate"
                     icon="el-icon-xinzeng" />
          <el-button type="primary"
                     size="mini"
                     @click="addPro"
                     icon="el-icon-xinzeng1" />
          <el-button type="primary"
                     size="mini"
                     @click="toImport"
                     icon="el-icon-shangchuan" />
          <el-button type="primary"
                     size="mini"
                     @click="toDown"
                     icon="el-icon-xiazai" />
        </div>
      </div>
      <div class="scroll">
        <div class="scroll-left">
          <el-scrollbar>
            <el-table
              v-loading="loadingVisible"
              :data="list"
              stripe
              :border="$bor()"
              size="small"
              @row-click="rowClick"
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
                label="字典类别名称"
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
                               @click.stop="handleEdit(scope.row)"
                               icon="el-icon-bianji">
                    </el-button>
                    <el-button type="danger"
                               size="mini"
                               @click.stop="handDelete"
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
        <div class="scroll-right">
          <el-scrollbar>
            <el-table
              v-loading="loadingVisible1"
              :data="list1"
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
                label="字典名称"
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
                               @click="handleEdit1(scope.row)"
                               icon="el-icon-bianji">
                    </el-button>
                    <el-button type="danger"
                               size="mini"
                               @click="handDelete1"
                               icon="el-icon-shanchu">
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-scrollbar>
          <div class="block" style="padding-top:20px;display:flex">
            <el-pagination
              :current-page="pagination1.currentPage"
              :page-sizes="[10, 20, 50]"
              :page-size="pagination1.pageSize"
              :total="pagination1.total"
              background
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"/>
          </div>
        </div>
      </div>
      <el-dialog
        :visible.sync="cpCatVisible"
        :before-close="$closeVis('cpCatVisible')"
        :center="true"
        :title="addStatus==1?'添加字典类别':'编辑字典类别'"
        top="5vh"
        :close-on-click-modal="$closeModel()"
        width="400px"
      >
        <careGory
          v-if="cpCatVisible"
          :importFile="importFile"
          @close="handleClose"
        />
      </el-dialog>
      <el-dialog
        :visible.sync="cpProVisible"
        :before-close="$closeVis('cpProVisible')"
        :center="true"
        :title="addStatus==1?'添加字典项':'编辑字典项'"
        top="5vh"
        :close-on-click-modal="$closeModel()"
        width="400px"
      >
        <proJect
          v-if="cpProVisible"
          :importFile="importFile"
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
          :data="data"
          :importFile="importFile"
          @close="handleClose"
        />
      </el-dialog>
    </div>
</template>

<script>
  import Const from '@/utils/const'
  import careGory from '@/views/datamaintenance/dictionary/components/category'
  import proJect from '@/views/datamaintenance/dictionary/components/project'
  export default {
    name: 'index',
    components:{
      proJect,
      careGory
    },
    data(){
      return{
        loadingVisible:false,
        loadingVisible1:false,
        cpCatVisible:false,
        cpProVisible:false,
        cpfileVisible:false,
        addStatus:1,
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        pagination1: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        modularName:'',
        selectVal:'',
        emptyArr:'',
        importFile:Const.importFile.personnel,
        list:[
          {
            name:'我是测试'
          }
        ],
        list1:[]
      }
    },
    mounted() {
    },
    methods:{
      toImport(){
        this.cpfileVisible = true
      },
      toDown(){

      },
      addCate(){
        this.addStatus = 1
        this.cpCatVisible = true
      },
      addPro(){
        this.addStatus =1
        this.cpProVisible = true
      },
      handleEdit(data){
        this.addStatus = 2
        this.cpCatVisible = true
      },
      handleEdit1(data){
        this.addStatus = 2
        this.cpProVisible = true
      },
      handleClose(){
        this.cpCatVisible=false
        this.cpProVisible=false
        this.cpfileVisible=false
      },
      handDelete(){
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
      handDelete1(){
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
      rowClick(){
        this.list1=[{
          name:'我是测试的测试'
        }]
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
    }
  }
</script>

<style lang="scss" scoped>
.home{
  background: #fff;
  padding:20px 10px;
}
  .body-title{
    padding-bottom: 10px;
  }
  .scroll{
    display: flex;
    justify-content: space-between;

    .scroll-left{
      width: 48%;
      background: #fff;
    }
    .scroll-right{
      width: 48%;
      background: #fff;
    }
  }
</style>
