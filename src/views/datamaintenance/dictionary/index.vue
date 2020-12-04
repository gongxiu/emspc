<template>
  <div class="home">
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
          placeholder="请输入字典类别名称"
          style="width: 200px"
          size="mini"
        />
        <el-button type="primary" @click="onSearch" size="mini" icon="el-icon-soushuo" />
      </div>
      <div class="ch-title-right">
        <el-button
          type="primary"
          size="mini"
          @click="addCate"
          icon="el-icon-xinzeng"
        />
        <el-button
          type="primary"
          size="mini"
          @click="addPro"
          icon="el-icon-xinzeng1"
        />
        <el-button
          type="primary"
          size="mini"
          @click="toImport"
          icon="el-icon-shangchuan"
        />
        <el-button
          type="primary"
          size="mini"
          @click="toDown"
          icon="el-icon-xiazai"
        />
      </div>
    </div>
    <div class="scroll">
      <div class="scroll-left">
        <el-scrollbar>
          <el-table
            v-loading="loadingVisible"
            :data="dicCateList"
            stripe
            :border="$bor()"
            size="small"
            @row-click="rowClick"
            style="width: 100%"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column
              min-width="112"
              label="序号"
              prop="seqNo"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="112"
              label="字典类别名称"
              prop="name"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="112"
              label="描述"
              show-overflow-tooltip
              prop="remark"
            />
            <el-table-column min-width="112" label="操作" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>
                  <el-button
                    type="primary"
                    size="mini"
                    @click.stop="handleEdit(scope.row)"
                    icon="el-icon-bianji"
                  >
                  </el-button>
                  <el-button
                    type="danger"
                    size="mini"
                    @click.stop="handDelete(scope.row.id)"
                    icon="el-icon-shanchu"
                  >
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
        <div class="block" style="padding-top: 20px; display: flex">
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
      <div class="scroll-right">
        <el-scrollbar>
          <el-table
            v-loading="loadingVisible1"
            :data="list1"
            stripe
            :border="$bor()"
            size="small"
            style="width: 100%"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column
              min-width="112"
              label="序号"
              prop="seqNo"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="112"
              label="字典项名称"
              prop="name"
              show-overflow-tooltip
            />
            <el-table-column
              min-width="112"
              label="描述"
              prop="remark"
              show-overflow-tooltip
            />

            <el-table-column min-width="112" label="操作" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="handleEdit1(scope.row)"
                    icon="el-icon-bianji"
                  >
                  </el-button>
                  <el-button
                    type="danger"
                    size="mini"
                    @click="handDelete1"
                    icon="el-icon-shanchu"
                  >
                  </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
        <div class="block" style="padding-top: 20px; display: flex">
          <el-pagination
            :current-page="pagination1.currentPage"
            :page-sizes="[10, 20, 50]"
            :page-size="pagination1.pageSize"
            :total="pagination1.total"
            background
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="cpCatVisible"
      :before-close="$closeVis('cpCatVisible')"
      :center="true"
      :title="addStatus == 1 ? '添加字典类别' : '编辑字典类别'"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="400px"
    >
      <careGory
        v-if="cpCatVisible"
        @closeCate="closeCate"
        :data="data"
      />
    </el-dialog>
    <el-dialog
      :visible.sync="cpProVisible"
      :before-close="$closeVis('cpProVisible')"
      :center="true"
      :title="addStatus == 1 ? '添加字典项' : '编辑字典项'"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="400px"
    >
      <proJect
        v-if="cpProVisible"

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
import Const from "@/utils/const";
import careGory from "@/views/datamaintenance/dictionary/components/category";
import proJect from "@/views/datamaintenance/dictionary/components/project";
import { getByUrl, addNew, dicIdDelete } from "@/api/diccate";
import { getByCateName } from "@/api/data";
export default {
  name: "index",
  components: {
    proJect,
    careGory,
  },
  data() {
    return {
      loadingVisible: false,
      loadingVisible1: false,
      cpCatVisible: false,
      cpProVisible: false,
      cpfileVisible: false,
      addStatus: 1,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      pagination1: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      modularName: "",
      selectVal: "",
      systemArr: [],
      importFile: Const.importFile.personnel,
      list1: [],
      dicCateList: [],
      dicItem:'',
      data:null
    };
  },
  mounted() {
    this.onSearch();
    this.getAllData();
  },
  methods: {
    closeCate(){
      this.onSearch()
      this.cpCatVisible = false
    },
    onSearch(){
      this.pagination.currentPage = 1
      this.getData().then(res => {
        console.log(res.page)
        this.dicCateList  = res.data
        this.pagination.total = res.page.pageIndex
        this.pagination.currentPage = 1
      })
    },
    getData() {
      return new Promise((resolve, reject)=>{
        getByUrl({
          searchword:this.modularName,
          pageindex:this.pagination.currentPage,
          pagedatacount:this.pagination.pageSize,

        }).then((res) => {
          console.log(res)
          resolve(res)
        });
      })
    },
    getAllData() {

    },
    toImport() {
      this.cpfileVisible = true;
    },
    toDown() {},
    addCate() {
      this.data = null
      this.addStatus = 1;
      this.cpCatVisible = true;
    },
    addPro() {
      this.addStatus = 1;
      this.cpProVisible = true;
    },
    handleEdit(data) {
      this.data = data
      this.addStatus = 2;
      this.cpCatVisible = true;
    },
    handleEdit1(data) {
      this.addStatus = 2;
      this.cpProVisible = true;
    },
    handleClose() {
      this.cpCatVisible = false;
      this.cpProVisible = false;
      this.cpfileVisible = false;
    },
    handDelete(id) {
      console.log(id, 213123);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          dicIdDelete(id).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.onSearch()
          });

        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handDelete1() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    rowClick(e) {
      console.log(e.name)
      this.dicItem = e.name
      this.getDataItem().then(res=>{
        console.log(res)
        this.list1 = res.data
      })
    },
    getDataItem(){
      let that = this
      return new Promise((resolve, reject)=>{
        getByCateName(that.dicItem).then((res) => {
          resolve(res)
        });
      })

    },
    handleCurrentChange(param) {
      this.pagination.currentPage = param;
      this.getData().then((res) => {
        this.dicCateList  = res.data;
      });
    },
    handleSizeChange(param) {
      this.pagination.pageSize = param;
      this.pagination.currentPage = 1;
      this.onSearch();
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  background: #fff;
  padding: 20px 10px;
}
.body-title {
  padding-bottom: 10px;
}
.scroll {
  display: flex;
  justify-content: space-between;

  .scroll-left {
    width: 48%;
    background: #fff;
  }
  .scroll-right {
    width: 48%;
    background: #fff;
  }
}
</style>
