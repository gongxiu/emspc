<template>
  <div class="com-body">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="100px" size="small">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="组织机构：" >
            <treeSelect
              :props="defaultProps"
              :options="orgTree"
              :value="form.mechanismId"
              :clearable="true"
              :accordion="true"
              @getValue="getValue($event)"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="岗位名称：" prop="name">
            <el-input
              v-model="form.name"
              :clearable="true"
              placeholder="请输入岗位名称"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" >
          <el-form-item label="岗位级别：" prop="mechanismLevel">
            <el-select v-model="form.mechanismLevel" placeholder="请选择岗位类型" style="width: 100%;" filterable>
              <el-option
                v-for="(item,index) in levelArr"
                :key="index"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" >
          <el-form-item label="岗位类型：" prop="mechanismType">
            <el-select v-model="form.mechanismType" placeholder="请选择机构类型" style="width: 100%;" filterable>
              <el-option
                v-for="(item,index) in typeArr"
                :key="index"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="序号：" >
            <el-input
              v-model="form.no"
              :clearable="true"
              placeholder="请输入序号"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="描述：" >
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="form.describe">
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
  import treeSelect from '@/components/tree'
  import {addNewJob,updateJob,getbyIdJob} from '@/api/job'
  import {getByCateName} from '@/api/data'
  export default {
    components:{
      treeSelect
    },
    props:{
      data:{
        type:Object,
        default:null
      },
      orgTree:{
        type:Array,
        default:null
      },
    },
    data() {
      return {
        levelArr:[],
        typeArr:[],
        orgTree: Const.orgTree,
        mineStatusValue:'',
        defaultProps: {
          children: "childrens",
          label: "title",
          value:'value'
        },
        form:{
          mechanismId:'',// 组织机构
          name:'',//岗位名称
          mechanismLevel:'',//岗位级别
          mechanismType:'',//岗位类型
          no:'',//序号
          describe:''//描述
        },
        rules: {
          name: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          mechanismType:[
            { required: true, message: '必填', trigger: 'change' }
          ],
          mechanismLevel:[
            { required: true, message: '必填', trigger: 'change' }
          ],
        },
      }
    },
    mounted() {
      if(this.data){

        this.getDetail()
      }
      this.getOtherData()
    },
    methods:{
      getDetail(){
        getbyIdJob(this.data.id).then(res=>{
          let info = res.data
          this.form={
            mechanismId:info.organizationId || '',// 组织机构
            name:info.name,//岗位名称
            mechanismLevel:info.level,//岗位级别
            mechanismType:info.jobCategoryId,//岗位类型
            no:info.seqNo,//序号
            describe:info.description//描述
          }
          console.log(this.form)
        })

      },
      getValue(data){
        this.form.mechanismId = data
      },
      getOtherData(){
        getByCateName('岗位级别').then(res=>{
          this.levelArr = res.data
        })
        getByCateName('岗位类型').then(res=>{
          this.typeArr = res.data
        })
      },
      onSubmit(){

        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            if (this.data) {
              updateJob({
                id:this.data.id,
               JobCategoryId:this.form.mechanismType,
               Level:this.form.mechanismLevel,
               SeqNo:this.form.no,
               OrganizationId:this.form.mechanismId,
               Description:this.form.describe,
               name:this.form.name,
             }).then(res=>{
               this.$emit('closeStation')
               this.$message.success(res.msg)
             })
            } else {
             addNewJob({
               JobCategoryId:this.form.mechanismType,
               Level:this.form.mechanismLevel,
               SeqNo:this.form.no,
               OrganizationId:this.form.mechanismId,
               Description:this.form.describe,
               name:this.form.name,
             }).then(res=>{
               this.$emit('closeStation')
               this.$message.success(res.msg)
             })
            }
          }
        })
      },
    }
  }
</script>
<style>

</style>
