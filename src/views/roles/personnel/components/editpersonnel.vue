<template>
  <div class="com-body">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="100px" size="small">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="父级机构：" >
            <treeSelect
              :props="defaultProps"
              :options="orgTree"
              :value="form.mechanismId"
              :clearable="true"
              :accordion="true"
              :disabled="isBool"
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
          <el-form-item label="机构类型：" prop="mechanismType">
            <el-select v-model="form.mechanismType" placeholder="请选择机构类型" style="width: 100%;" filterable>
              <el-option
                v-for="(item,index) in mechanArr"
                :key="index"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="机构编码：" prop="code">
            <el-input
              v-model="form.code"
              :clearable="true"
              placeholder="请输入机构编码"
              style="width: 100%"
            />
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
  import {addnewOrg} from "@/api/organization"
  import {getOrgbyurl,getByCateName} from "@/api/data"
  import selectTree from '@/components/selectTree/selecttree'
  import treeSelect from '@/components/tree'
  export default {
    props:{
      orgTree:{
        type:Array,
        default:null
      },
      data:{
        type:Object,
        default: null
      },
    },
    components:{
      selectTree,
      treeSelect
    },
    data() {

      return {
        emptyArr:[],
        mechanArr:[],
        mineStatusValue:'',
        isBool:false,
        defaultProps: {
          children: "childrens",
          label: "title",
          value:'value',
        },
        form:{
          mechanismName:'',//机构名称
          mechanismId:'',//父级机构
          name:'',//名称
          mechanismType:'',//机构类型
          code:'',//机构编码
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
          code:[
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
      if(this.data){
        this.isBool = true
        this.form.mechanismId = this.data.value
      }
      this.getbyUrl()
    },
    methods:{
      getbyUrl(){
        getByCateName('机构类型').then((res)=>{
          this.mechanArr = res.data
        })
      },
      // 取值
      getValue(value) {
        this.form.mechanismId = value;
        console.log(this.form.mechanismId);
      },
      selected(data){
        // console.log(123)
        // console.log(data)
      },
      onSubmit(){

        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            if (this.data) {
            } else {
              addnewOrg({
                "Code":this.form.code,
                "Description":this.form.describe,
                "Name":this.form.name,
                "ParentId":this.form.mechanismId,
                "SeqNo":this.form.no,
                "Type":this.form.mechanismType,
              }).then(res=>{
                console.log(res)
                this.$emit('closeDialog')
                this.$message.success(res.msg)
              })
            }
          }
        })
      },
      selectChange(e){
        var arrNew = [];
        var dataLength = this.mineStatusValue.length;
        var eleng = e.length;
        for(let i = 0; i< dataLength ;i++){
          for(let j = 0; j < eleng; j++){
            if(e[j] === this.mineStatusValue[i].label){
              arrNew.push(this.mineStatusValue[i])
            }
          }
        }
        this.$refs.tree.setCheckedNodes(arrNew);//设置勾选的值
      },
      handleCheckChange(data) {
       this.form.mechanismId = data.parentId||'1'
        this.form.mechanismName = data.title
        console.log(this.form)
      }
    }
  }
</script>
<style>

</style>
