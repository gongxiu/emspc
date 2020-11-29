<template>
  <div class="com-body">
   <div class="proval">
     <div class="pro-trans">
       <transCom />
     </div>
     <div class="pro-right">
       <el-form ref="ruleForm" :model="form" label-width="80px" size="small">
         <el-row :gutter="10"  style="margin-bottom: 10px">
           <el-col :span="24">
             <el-form-item label="配置模板">
               <el-select v-model="form.template" size="mini" style="width: 100%" placeholder="选择配置模板" filterable>
                 <el-option
                   v-for="(item,index) in testCheck"
                   :key="index"
                   :value="item.id"
                   :label="item.label"
                 />
               </el-select>
             </el-form-item>
           </el-col>
           <el-col :span="24">
             <el-form-item label="审批标题">
               <el-input
                 v-model="form.title"
                 :clearable="true"
                 placeholder="请输入审批标题"
                 style="width: 100%"
               />
             </el-form-item>
           </el-col>
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
             <el-form-item label="描述：" >
               <el-input
                 type="textarea"
                 :autosize="{ minRows: 4}"
                 placeholder="请输入内容"
                 v-model="form.describe">
               </el-input>
             </el-form-item>
           </el-col>
           <el-col :span="24">
             <div class="com-btn">
               <el-button type="primary" size="small">确定</el-button>
             </div>
           </el-col>

         </el-row>
       </el-form>
     </div>
   </div>
  </div>
</template>

<script>
  import transCom from '@/components/trans/index'
  import Const from "@/utils/const"
  export default {
    name: "editproval",
    components:{
      transCom
    },
    data(){
      return{
        testCheck:Const.testCheck,

        form:{
          template:'',//模板
          title:'',//审批标题
          approved:'',//审批人
          describe:'',//描述
        }
      }
    },
    methods:{
      openUser(){
        this.userVisible = true
      },
      handleDelete(item,index){
        this.testCheck.splice(index,1)
      },
    }
  }
</script>

<style lang="scss" scoped>
.proval{
  display: flex;
  justify-content: space-between;
  .pro-trans{
    width: 65%;
  }
  .pro-right{
    width:32%;
    .tran-list{
      display: flex;
      flex-wrap: wrap;
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
  }
}
</style>
