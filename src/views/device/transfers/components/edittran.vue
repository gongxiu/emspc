<template>
  <div class="com-body">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="120px" size="small">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="调拨时间：" prop="transfersDate">
            <el-date-picker
              v-model="form.transfersDate"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <div class="tran-pd">
          <el-col :span="24">
            <el-form-item label="审批人：" prop="approved">
              <div class="tran-list">
                <div class="tran-li" v-for="(item,index) in testCheck">
                  <div class="tran-li-img">
                    <i class="el-icon-s-custom"></i>
                    <i class="el-icon-circle-close close-pos" @click="handleDelete(item,index)"></i>
                  </div>
                  <span>{{item.label}}</span>
                </div>
                <div class="tran-li" @click="openUser">
                  <div class="tran-li-img tran-li-plus">
                    <i class="el-icon-plus"></i>
                  </div>
                  <span></span>
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="调拨原因：" prop="remark">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4}"
                placeholder="请输入内容"
                v-model="form.remark">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div class="aggregate-list">
              <div class="agg-left">
                <span class="ps-imp">*</span>设备集合：
              </div>
              <div class="agg-right">
                <div>
                  <el-button type="" size="small" @click="addTran">添加</el-button>
                </div>
                <el-scrollbar>
                  <el-table
                    :data="list"
                    size="small"
                    style="width: 100%">
                    <el-table-column
                      prop="paymentMethod"
                      label="原机构"
                    >
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.mechanism"  size="small" placeholder="请选择" filterable>
                          <el-option v-for="(item,index) in testCheck" :key="index" :value="item.id"
                                     :label="item.label" />
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="paymentMethod"
                      label="设备名称"
                    >
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.name" size="small" placeholder="请选择" filterable>
                          <el-option v-for="(item,index) in testCheck" :key="index" :value="item.id"
                                     :label="item.label" />
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="paymentMethod"
                      label="调配到"
                    >
                      <template slot-scope="scope">
                        <select-tree  placeholder="请选择" v-model="scope.row.allocation" :size="'small'"
                                      :options="dataTest"
                                      :props="defaultProps"/>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="city"
                      label="操作"
                    >
                      <template slot-scope="scope">
                        <el-button type="danger"
                                   size="mini"
                                   @click="handleDeleteAgg(scope.$index, scope.row)"
                                   icon="el-icon-shanchu"></el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-scrollbar>

              </div>
            </div>
          </el-col>
        </div>

      </el-row>
      <el-row :gutter="10" style="margin-top: 20px">

        <el-row :gutter="10" style="margin-top: 20px">

        </el-row>
        <div class="com-btn">
          <el-button type="" size="small" @click="$closFun('close')">取消</el-button>
          <el-button type="primary" size="small">确定</el-button>
        </div>
      </el-row>
    </el-form>

    <el-dialog
      :visible.sync="userVisible"
      :before-close="$closeVis('userVisible')"
      :center="true"
      title="选择审核人"
      top="5vh"
      :close-on-click-modal="$closeModel()"
      width="400px"
      append-to-body
    >
      <addUser
        v-if="userVisible"
        @close="handleClose"
      />
    </el-dialog>

  </div>
</template>

<script>
  import Const from '@/utils/const'
  import addUser from "@/views/device/transfers/components/addUser"
  import selectTree from '@/components/selectTree/selecttree'
  export default {
    name: "edittran",
    components:{
      addUser,
      selectTree
    },
    data(){
      return{
        userVisible:false,
        testCheck:Const.testCheck,
        dataTest:Const.testData,
        defaultProps: {
          children: "children",
          label: "label"
        },
        form:{
          transfersDate:'',//调拨时间
          remark:'',//调拨原因
          approved:'',//审批人
        },
        rules:{
          transfersDate:[
            { required: true, message: '必填', trigger: 'blur' }
          ],
          approved:[
            { required: true, message: '必填', trigger: 'blur' }
          ],
          remark:[
            { required: true, message: '必填', trigger: 'blur' }
          ],
        },
        list:[
          {
            mechanism:'',//原机构
            name:'',//设备名称
            allocation:'',//调拨到
          }
        ]
      }
    },
    methods:{
      openUser(){
        this.userVisible = true
      },
      handleDelete(item,index){
        this.testCheck.splice(index,1)
      },
      handleDeleteAgg(item,index){
        this.list.splice(index,1)
      },
      handleClose(){
        this.userVisible = false
      },
      addTran(){
        this.list.push({
          mechanism:'',//原机构
          name:'',//设备名称
          allocation:'',//调拨到
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.tran-list{
  display: flex;

  .tran-li{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 10px;
    cursor: pointer;
    position: relative;
    .tran-li-img{
      width: 50px;
      height: 50px;

      text-align: center;
      line-height: 50px;
      font-size: 40px;

      color: #606266;
      border: 1px solid #606266;
    }
    .close-pos{
      position: absolute;
      font-size: 12px;
      top: -6px;
      right: -6px;
    }
    span{
      display: inline-block;
      width: 50px;
      text-align: center;
      height: 32px;
    }
  }
  .tran-li-plus{
    border: 1px solid #DCDFE6 !important;
    color: #DCDDE6 !important;
  }
}
  .tran-pd{
    padding-right: 80px;
  }
  .aggregate-list{
    display: flex;
    .agg-left{
     width: 120px;
      text-align: right;
      padding-right: 12px;
      display: inline-block;
      height: 32px;
      line-height: 32px;
    }
    .agg-right{
     width:  calc(100% - 120px);
    }
  }
  .ps-imp{
    color: #ff4949;
    margin-right: 4px;
  }
</style>
