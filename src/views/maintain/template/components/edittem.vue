<template>
  <div class="com-body">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="140px" size="small">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="保养项模块名称：" prop="name">
            <el-input
              v-model="form.name"
              :clearable="true"
              placeholder="请输入保养项模块名称"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="保养项模块编码：" prop="number">
            <el-input
              v-model="form.number"
              :clearable="true"
              placeholder="请输入保养项模块编码"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="状态：" prop="name">
            <el-select v-model="form.status" style="width: 100%" :clearable="true" placeholder="请选择状态">
              <el-option
                v-for="item in temBool"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
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

  import treeSelect from '@/components/tree'
  import { getbyidKeep,addnewTemp,updataTemp } from '@/api/keeptemp'
  // import {getByUrlUpkeep,getbyurlTem} from '@/api/upkeep'
  import Const from '@/utils/const'
  export default {
    components:{
      treeSelect
    },
    props:{
      data:{
        type:Object,
        default: null
      },
      selectVal:{
        type:String,
        default:null
      },
    },
    data() {
      return {
        emptyArr:[],
        orgTree: [],
        temBool:Const.temBool,
        mineStatusValue:'',
        defaultProps: {
          children: "childrens",
          label: "title",
          value:'value'
        },
        appId:'',
        form:{

          name:'',//保养项模块名称
          number:'',//保养项模块编号
          no:'',//序号
          describe:'',//描述
          status:'0',//状态
        },
        rules: {
          name: [
            { required: true, message: '必填', trigger: 'blur' }
          ],
          number:[
            { required: true, message: '必填', trigger: 'blur' }
          ],//保养项模块编号
          no:[
            { required: true, message: '必填', trigger: 'blur' }
          ],//序号
        },
      }
    },
    mounted() {
      console.log(this.data)
      this.getOrgData()
      if(this.data){
        this.getDetail()
      }else {
        this.appId = this.selectVal
      }
    },
    methods:{
      getDetail(){
        getbyidKeep(this.data.id).then(res=>{
          this.form={
            name:res.data.name,//保养项模块名称
              number:res.data.number,//保养项模块编号
              no:res.data.seqNo,//序号
              describe:res.data.describe,//描述
              status:'0',//状态
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
      handleCheckChange() {
        let res = this.$refs.tree.getCheckedNodes(true, true); //这里两个true，1. 是否只是叶子节点 2. 是否包含半选节点（就是使得选择的时候不包含父节点）
        let arrLabel = [];
        let arr = [];
        res.forEach(item => {
          arrLabel.push(item.label);
          arr.push(item);
        });
        this.mineStatusValue = arr;
        this.mineStatus = arrLabel;
        console.log('arr:'+JSON.stringify(arr))
        console.log('arrLabel:'+arrLabel)
      },
      getOrgData(){

      },
      onSubmit(){
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            if (this.data) {
              updataTemp({
                id:this.data.id,
                "Description":this.form.describe,
                "Name":this.form.name,
                "Number":this.form.number,
                "SeqNo":this.form.no,
                "Status":this.form.status,
              }).then(res=>{
                this.$message.success(res.msg)
                this.$emit('closeTemp')
              })
            } else {
              addnewTemp({
                "Description":this.form.describe,
                "Name":this.form.name,
                "Number":this.form.number,
                "SeqNo":this.form.no,
                "Status":this.form.status,
              }).then(res=>{
                this.$message.success(res.msg)
                this.$emit('closeTemp')
              })
            }
          }
        })
      },
      getValue(data){
        this.form.mechanismId = data
      },
    }
  }
</script>
<style>

</style>
