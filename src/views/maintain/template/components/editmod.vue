<template>
  <div class="com-body">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="120px" size="small">
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="所属模板：" prop="name">
            <el-select v-model="form.template"  multiple collapse-tags style="width: 100%" placeholder="请选择">
              <el-option
                v-for="item in temList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="项目名称：" prop="name">
            <el-input
              v-model="form.name"
              :clearable="true"
              placeholder="请输入项目名称"
              style="width: 100%"
            />
          </el-form-item>

        </el-col>
        <el-col :span="12">
          <el-form-item label="项目编码：" prop="proNo">
            <el-input
              v-model="form.proNo"
              :clearable="true"
              placeholder="请输入项目编码"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="保养频次类别：" prop="type">
            <el-select v-model="form.type" style="width: 100%" placeholder="请选择保养频次类别">
              <el-option
                v-for="item in FrequencyType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="保养频次：" prop="count">
            <el-input
              v-model="form.count"
              :clearable="true"
              type="number"
              placeholder="请输入保养频次"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="项目要求：">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="form.proReq"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="注意事项：">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="form.matterItem"
            >
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="描述：">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="form.remarks"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="com-btn">
      <el-button type="" size="small" @click="$closFun('close')">取消</el-button>
      <el-button type="primary" size="small" @click="onSubmit">确定</el-button>
    </div>
  </div>
</template>

<script>
  import Const from '@/utils/const'
  import {addnewKeep,updateKeep,getbyidEmsKeep} from '@/api/keeptemp'
  export default {
    name: "editmod",
    props:{
      temList:{
        type:[Array],
        default: null
      },
      data:{
        type:Object,
        default: null
      },

    },
    data(){
      return{
        FrequencyType:Const.FrequencyType,
        form:{
          template:[],//搜索模板
          name:'',//项目名称
          proNo:'',//项目编号
          type:'',//保养频次类型
          count:'',//保养频次
          proReq:'',//项目要求
          matterItem:'',//注意事项
          remarks:'',//描述
        },
        rules:{

        }
      }
    },
    mounted() {
      if(this.data){
        this.getDetail()
      }
    },
    methods:{
      getDetail(){
        getbyidEmsKeep(this.data.id).then(res=>{
          let info = res.data
          this.form={
            template:info.upkeepTemplateIds?info.upkeepTemplateIds:[],//搜索模板
              name:info.name,//项目名称
              proNo:info.number,//项目编号
              type:String(info.frequencyType),//保养频次类型
              count:info.frequencyCount,//保养频次
              proReq:info.required,//项目要求
              matterItem:info.announcements,//注意事项
              remarks:info.description,//描述
          }
        })
      },
      onSubmit(){
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            if (this.data) {
              updateKeep({
                id:this.data.id,
                "Announcements":this.form.matterItem,
                "Description":this.form.remarks,
                "FrequencyCount":this.form.count,
                "FrequencyType":this.form.type,
                "Name":this.form.name,
                "Number":this.form.proNo,
                "Required":this.form.proReq,
                "UpkeepTemplateIds":this.form.template,
              }).then(res=>{
                this.$message.success(res.msg)
                this.$emit('closeMod')
              })
            }else {
              addnewKeep({
                "Announcements":this.form.matterItem,
                "Description":this.form.remarks,
                "FrequencyCount":this.form.count,
                "FrequencyType":this.form.type,
                "Name":this.form.name,
                "Number":this.form.proNo,
                "Required":this.form.proReq,
                "UpkeepTemplateIds":this.form.template,
              }).then(res=>{
                this.$message.success(res.msg)
                this.$emit('closeMod')
              })

            }
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
