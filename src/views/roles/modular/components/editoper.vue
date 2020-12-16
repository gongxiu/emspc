<template>
  <div class="com-body">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="100px" size="small">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="所属模块：" >
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
          <el-form-item label="名称：" prop="name">
            <el-input
              v-model="form.name"
              :clearable="true"
              placeholder="请输入机构名称"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" >
          <el-form-item label="图标：" prop="icon">
            <el-select v-model="form.icon" placeholder="请选择图标" style="width: 100%;" filterable>
              <el-option
                v-for="(item,index) in iconArr"
                :key="index"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" >
          <el-form-item label="操作业务：" prop="business">
            <el-select v-model="form.business" placeholder="请选择操作业务" style="width: 100%;" filterable>
              <el-option
                v-for="(item,index) in operArr"
                :key="index"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>



        <el-col :span="24" >
          <el-form-item label="接口地址：" prop="interface">
            <el-select v-model="form.interface" placeholder="请选择接口地址" style="width: 100%;" multiple collapse-tags filterable>
              <el-option
                v-for="(item,index) in addArr"
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
  import {addnewMenu} from '@/api/module'
  import {getByCateName} from '@/api/data'
  export default {
    components:{
      treeSelect
    },
    props:{
      orgTree:{
        type:Array,
        default:[]
      },
      data:{
        type:Object,
        default: null
      },
    },
    data() {
      return {
        operArr:[],
        addArr:[],
        iconArr:[],
        orgTree: Const.orgTree,
        mineStatusValue:'',
        defaultProps: {
          children: "childrens",
          label: "title",
          value:'vaule'
        },
        form:{
          mechanismId:'',//父级机构
          name:'',//名称
          business:'',//业务
          interface:'',//接口
          icon:'',//图标
          no:'',//序号
          describe:''//描述
        },

        rules: {
          name: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          icon:[
            { required: true, message: '必填', trigger: 'change' }
          ],
          code:[
            { required: true, message: '必填', trigger: 'blur' }
          ],
          business:[
            { required: true, message: '必填', trigger: 'blur' }
          ],
          interface:[
            { required: true, message: '必填', trigger: 'blur' }
          ],
          // customerType: [
          //   { required: true, message: '必填', trigger: 'blur' }
          // ],
          // returnTime: [
          //   { required: true, message: '必填', trigger: 'blur' }
          // ],
          // content: [
          //   { required: true, message: '必填', trigger: 'blur' }
          // ]
        },
      }
    },
    mounted() {
      this.getName()
    },
    methods:{
      getName(){
        getByCateName('操作业务').then(res=>{
          this.operArr= res.data
        })
        getByCateName('接口地址').then(res=>{
          this.addArr =  res.data
        })
        getByCateName('图标').then(res=>{
          this.iconArr= res.data
        })
      },
      getValue(value){
        this.form.mechanismId = value
      },
      onSubmit(){
        console.log(this.data)
        // this.$message.success(res.msg)
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            if (this.data) {
              updateMod({
                id:this.data.value,
                "AppId":this.appId,
                "Description":this.form.describe,
                "ParentId":this.form.mechanismId,
                "SeqNo":this.form.no,
                "Name":this.form.name,
                "Icon":this.form.icon,
                "Url":this.form.url,
              }).then(res=>{
                this.$emit('closeMod')
                this.$message.success(res.msg)
              })
            }else {
              addnewMenu({
                "Description":this.form.describe,
                "Icon":this.form.icon,
                "ModuleId":this.form.mechanismId,
                "Name":this.form.name,
                "OptionSource":this.form.business,
                "SeqNo":this.form.no,
                "Url":this.form.interface,
              }).then(res=>{
                this.$emit('closeOper')
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
