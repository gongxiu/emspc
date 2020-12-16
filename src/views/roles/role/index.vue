<template>
  <div class="home  body-pd">
   <div class="home-pd">
     <div class="body-title">
       <div class="ch-title-left">
         <el-select
           v-model="selectVal"
           placeholder="请选择系统"
           size="mini"
           filterable
           :clearable="true"
         >
           <el-option
             v-for="(item, index) in systemArr"
             :key="index"
             :value="item.id"
             :label="item.name"
           />
         </el-select>
         <el-input
           v-model="modularName"
           :clearable="true"
           placeholder="请输入角色名称"
           style="width: 200px"
           size="mini"
         />
         <el-button type="primary"
                    size="mini"
                    icon="el-icon-soushuo" @click="onSubmit"/>
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
             label="父级角色"
             prop="parentName"
             show-overflow-tooltip
           />
           <el-table-column
             min-width="112"
             label="名称"
             prop="name"
             show-overflow-tooltip
           />
           <el-table-column
             min-width="112"
             label="子角色数"
             prop="sonNum"
             show-overflow-tooltip
           />
           <el-table-column
             min-width="112"
             label="描述"
             prop="remark"
             show-overflow-tooltip
           />
           <el-table-column
             min-width="112"
             label="操作">
             <template slot-scope="scope">
               <div>
                 <el-button type="primary"
                            size="mini"
                            @click="handleAdd(scope.row)"
                            icon="el-icon-xinzeng">
                 </el-button>
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
       :visible.sync="cpRoleVisible"
       :before-close="$closeVis('cpRoleVisible')"
       :center="true"
       :title="addStatus==1?'新增角色':'编辑角色'"
       top="5vh"
       :close-on-click-modal="$closeModel()"
       width="400px"
     >
       <editRole
         v-if="cpRoleVisible"
         :data="data"
         @closeRole="closeRole"
         @close="handleClose"
         :selectVal="selectVal"
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
  import editRole from '@/views/roles/role/components/editrole'
  import importFile from '@/components/importFile'
  import {getbyurlRole,deleteRole} from '@/api/roles'
  import {getByCateName} from '@/api/data'

  export default {
    name: "index",
    components:{
      importFile,
      editRole
    },
    data(){
      return{
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        orgTree:[],
        selectVal:'',
        systemArr:[],

        cpRoleVisible:false,
        modularName:'',
        cpfileVisible:false,//批量导入
        addStatus:1,
        list:[

        ],
        loadingVisible:false,
        data:null
      }
    },
    mounted() {
      this.onSubmit()
      this.systemData()
    },
    methods:{
      closeRole(){
        this.cpRoleVisible = false
        this.onSubmit()
      },
      systemData(){
        getByCateName('系统').then(res=>{
          this.systemArr = res.data
          this.selectVal = res.data[0].id
        })
      },
      onSubmit() {
        this.pagination.currentPage = 1
        this.getData().then(res => {
          this.list = res.data
          this.pagination.total = res.page.count
          this.pagination.currentPage = 1
        })
      },
      handleCurrentChange(param) {
        this.pagination.currentPage = param
        this.getData().then(res => {
          this.list = res.data
        })
      },
      handleSizeChange(param) {
        this.pagination.pageSize = param
        this.pagination.currentPage = 1
        this.onSubmit()
      },
      getData() {
        return new Promise((resolve, reject)=>{
          getbyurlRole({
            seachWord:'',
            pageindex:this.pagination.currentPage,
            pagedatacount:this.pagination.pageSize,
          }).then(res=>{
            console.log(res)
            resolve(res)
          })
        })
      },
      handleAdd(){
        this.data = null
        this.addStatus = 1
        this.cpRoleVisible = true
      },
      handleEdit(data){
        this.data = data
        this.addStatus = 2
        this.cpRoleVisible = true
      },
      toImport(){
        this.cpfileVisible = true
      },
      handleClose(){
        this.cpRoleVisible = false
        this.cpfileVisible = false
      },
      handDelete(data){
        console.log(data.id)
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteRole(data.id).then(res=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.onSubmit()
          })
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
