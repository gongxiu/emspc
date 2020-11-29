<template>
  <div class="trans-con">

    <div v-if="type==1">
      <el-row :gutter="20" >
        <el-col :span="11">
          <div class="title-table">{{titleLeft}}</div>
          <div class="trans-form">
            <el-form :inline="true" label-width="0">
              <el-row :gutter="20" style="margin-bottom: 10px">
                <el-col :span="10">
                  <el-form-item label="">
                    <el-input v-model="form.keyword" :size="'small'" placeholder="请输入关键字"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item>
                    <el-button type="primary" :size="'small'" icon="el-icon-soushuo" @click="getStaffList" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-table
            ref="staffTable"
            v-loading="listLoading"
            :key="tableKey"
            :data="staffList"
            border
            fit
            size="small"
            row-key="getRowKey"
            highlight-current-row
            @selection-change="handleStaffChange"
          >
            <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
            <el-table-column label="设备名称" align="center">
              <template slot-scope="{row}">
                <span>{{ row.phone }}</span>
              </template>
            </el-table-column>

            <el-table-column label="设备编号" align="center">
              <template slot-scope="{row}">
                <span>{{ row.nickName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="所属单位" align="center">
              <template slot-scope="{row}">
                <span>{{ row.nickName }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="2" style="text-align:center;" justify="center">
          <el-button
            @click="addStaff"
            type="primary"
            :disabled="!staffData.length"
            icon="el-icon-arrow-right"
            circle
          ></el-button>
          <el-button
            @click="removeStaff"
            type="primary"
            :disabled="!selectedStaffData.length"
            icon="el-icon-arrow-left"
            circle
            style="margin-left: 0;margin-top: 10px;"
          ></el-button>
        </el-col>
        <el-col :span="11">
          <div class="title-table">{{titleRight}}</div>
          <div class="trans-form">
            <el-form :inline="true" label-width="0">
              <el-row :gutter="20"  style="margin-bottom: 10px">
                <el-col :span="10">
                  <el-form-item label="">
                    <select-tree  placeholder="请选择机构" width="100%" v-model="form1.mechanismId" :size="'small'"
                                  :options="dataTest"
                                  :props="defaultProps"/>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="">
                    <el-input v-model="form1.keyword" style="width:100%" :size="'small'" placeholder="请输入关键字"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item>
                    <el-button type="primary" :size="'small'" icon="el-icon-soushuo" @click="getStaffList" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-table
            ref="selectedStaffTable"
            v-loading="listLoading"
            :key="tableKey"
            :data="selectedStaffList"
            border
            fit
            size="small"
            row-key="getRowKey"
            highlight-current-row
            @selection-change="handleSelectedStaffChange"
          >
            <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
            <el-table-column label="设备名称" align="center">
              <template slot-scope="{row}">
                <span>{{ row.phone }}</span>
              </template>
            </el-table-column>
            <el-table-column label="设备编号" align="center">
              <template slot-scope="{row}">
                <span>{{ row.nickName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="所属单位" align="center">
              <template slot-scope="{row}">
                <span>{{ row.nickName }}</span>
              </template>
            </el-table-column>

            <!--<el-table-column label="类型" align="center">
              <template slot-scope="{row}">
                <el-select class="filter-item" placeholder="请选择" v-model="row.staffTypeId">
                  <el-option
                    v-for="item in staffOptions"
                    :key="item.key"
                    :label="item.display_name"
                    :value="item.key"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>-->
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div v-if="type==2">
      <el-row :gutter="20" >
        <el-col :span="11">
          <div class="title-table">{{titleLeft}}</div>
          <div class="trans-form">
            <el-form :inline="true" label-width="0">
              <el-row :gutter="20" style="margin-bottom: 10px">
                <el-col :span="10">
                  <el-form-item label="">
                    <select-tree  placeholder="请选择机构" v-model="form.mechanismId" :size="'small'"
                                  :options="dataTest"
                                  :props="defaultProps"/>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="">
                    <el-input v-model="form.keyword" :size="'small'" placeholder="请输入关键字"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item>
                    <el-button type="primary" :size="'small'" icon="el-icon-soushuo" @click="getStaffList" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-table
            ref="staffTable"
            v-loading="listLoading"
            :key="tableKey"
            :data="staffList"
            border
            fit
            size="small"
            row-key="getRowKey"
            highlight-current-row
            @selection-change="handleStaffChange"
          >
            <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
            <el-table-column label="项目编号" align="center">
              <template slot-scope="{row}">
                <span>{{ row.phone }}</span>
              </template>
            </el-table-column>
            <el-table-column label="项目名称" align="center">
              <template slot-scope="{row}">
                <span>{{ row.nickName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="项目要求" align="center">
              <template slot-scope="{row}">
                <span>{{ row.nickName }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="2" style="text-align:center;" justify="center">
          <el-button
            @click="addStaff"
            type="primary"
            :disabled="!staffData.length"
            icon="el-icon-arrow-right"
            circle
          ></el-button>
          <el-button
            @click="removeStaff"
            type="primary"
            :disabled="!selectedStaffData.length"
            icon="el-icon-arrow-left"
            circle
            style="margin-left: 0;margin-top: 10px;"
          ></el-button>
        </el-col>
        <el-col :span="11">
          <div class="title-table">{{titleRight}}</div>
          <div class="trans-form">
            <el-form :inline="true" label-width="0">
              <el-row :gutter="20"  style="margin-bottom: 10px">
                <el-col :span="10">
                  <el-form-item label="">
                    <el-input v-model="form1.keyword" style="width:100%" :size="'small'" placeholder="请输入关键字"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item>
                    <el-button type="primary" :size="'small'" icon="el-icon-soushuo" @click="getStaffList" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <el-table
            ref="selectedStaffTable"
            v-loading="listLoading"
            :key="tableKey"
            :data="selectedStaffList"
            border
            fit
            size="small"
            row-key="getRowKey"
            highlight-current-row
            @selection-change="handleSelectedStaffChange"
          >
            <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
            <el-table-column label="项目编号" align="center">
              <template slot-scope="{row}">
                <span>{{ row.phone }}</span>
              </template>
            </el-table-column>
            <el-table-column label="项目名称" align="center">
              <template slot-scope="{row}">
                <span>{{ row.nickName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="项目要求" align="center">
              <template slot-scope="{row}">
                <span>{{ row.nickName }}</span>
              </template>
            </el-table-column>

          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import Const from '@/utils/const'
import selectTree from '@/components/selectTree/selecttree'
export default {
  components: {selectTree},
  props:{
    type:{
      type:[String,Number],
      default:1,
    },
    titleLeft:{
      type:String,
      default:'待选设备',
    },
    titleRight:{
      type:String,
      default:'已选设备',
    },
  },
  data() {
    return {
      listLoading: false,
      form:{
        keyword:'',//关键字
        mechanismId:'',//机构
      },
      form1:{
        keyword:'',//关键字
        mechanismId:'',//机构
      },
      dataTest:Const.testData,
      defaultProps: {
        children: "children",
        label: "label"
      },
      staffList: [
        {
          id:1,
          nickName:'张三',
          phone:'18379637957'
        },
        {
          id:2,
          nickName:'张四',
          phone:'1339637957'
        }
      ],
      selectedStaffList: [

        {
          id:3,
          nickName:'张五',
          phone:'18379637956'
        },
        {
          id:4,
          nickName:'张六',
          phone:'1339637959'
        }
      ],
      staffData: [],
      selectedStaffData: [],
      tableKey: 0,
      rowKey: "rowKey",
      staffOptions: [
        { key: 28, display_name: "补货员" },
        { key: 29, display_name: "测试员" }
      ],
    }
  },
  methods: {
    getRowKey(row){
      return row.id;
    },
    // 从后台获取左边表格的数据
    getStaffList() {
      fetchStaffList(this.staffTemp).then(res => {
        if (res.value.staff.length === 0) {
          alert("查无此人");
        }
        this.staffList = res.value.staff;
      });
    },
    // 将左边表格选择项存入staffData中
    handleStaffChange(rows) {
      this.staffData = [];
      if (rows) {
        rows.forEach(row => {
          if (row) {
            this.staffData.push(row);
          }
        });
      }
    },
    // 左边表格选择项移到右边
    addStaff() {
      console.log(123)
      setTimeout(() => {
        this.$refs["staffTable"].clearSelection();
        this.$refs["selectedStaffTable"].clearSelection();
      }, 0);
      let repeat = false;
      this.selectedStaffList.forEach(item => {
        if (this.staffData[0] && item.id === this.staffData[0].id) {
          repeat = true;
          alert("此员工已添加");
          return;
        }
      });
      if (repeat === false) {
        this.staffData.forEach(item => {
          this.selectedStaffList.push(item);
        });
        for (let i = 0; i < this.staffList.length; i++) {
          for (let j = 0; j < this.staffData.length; j++) {
            if (
              this.staffList[i] &&
              this.staffData[j] &&
              this.staffList[i].id === this.staffData[j].id
            ) {
              this.staffList.splice(i, 1);
            }
          }
        }
      }
    },
    // 右边表格选择项移到左边
    removeStaff() {
      setTimeout(() => {
        this.$refs["staffTable"].clearSelection();
        this.$refs["selectedStaffTable"].clearSelection();
      }, 0);
      this.selectedStaffData.forEach(item => {
        this.staffList.push(item);
      });
      for (let i = 0; i < this.selectedStaffList.length; i++) {
        for (let j = 0; j < this.selectedStaffData.length; j++) {
          if (
            this.selectedStaffList[i] &&
            this.selectedStaffData[j] &&
            this.selectedStaffList[i].id === this.selectedStaffData[j].id
          ) {
            this.selectedStaffList.splice(i, 1);
          }
        }
      }
    },
    // 将右边表格选择项存入selectedStaffData中
    handleSelectedStaffChange(rows) {
      this.selectedStaffData = [];
      if (rows) {
        rows.forEach(row => {
          if (row) {
            this.selectedStaffData.push(row);
          }
        });
      }
    },
    // 提交
    modifyStaff() {
      let isEmpty = false;
      this.selectedStaffList.forEach(item => {
        if (!item.staffTypeId) {
          alert("请选择类型");
          isEmpty = true;
          return;
        }
      });
      if (isEmpty === false) {
        editStaff(this.selectedStaffList, this.deviceQuery.id).then(res => {
          this.staffListVisible = false;
          this.$notify({
            title: "成功",
            message: "修改成功",
            type: "success",
            duration: 2000
          });
        });
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .trans-con{
    display: flex;
    align-items: center;
    width: 100%;
    .el-row{
      display: flex;
      align-items: center;
    }
    .el-form-item__content{
      line-height: 0px;
    }
  }
  .trans-form .el-form-item{
    margin-bottom: 0;
  }
.title-table{
  height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
  font-size: 14px;
  padding-left: 20px;
  background: #eee;
}
</style>
