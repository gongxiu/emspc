<template>
  <div class="com-body">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="100px" size="small">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="父级机构：" >
           <!-- <el-select  v-model="form.mechanismName" placeholder="请选择父级机构1" style="width: 100%" multiple
                        collapse-tags @change="selectChange">
              <el-option  :value="mineStatusValue" style="height: auto;padding: 0;">
                <el-tree :data="orgTree"   node-key="id" ref="tree" highlight-current :props="defaultProps"
                         @node-click="handleCheckChange"></el-tree>
              </el-option>
            </el-select>-->
            <!--<select-tree v-model="form.mechanismId" @selected="selected" node-key="value" :options="orgTreeorgTree"
                         :props="defaultProps"/>-->
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
          <el-form-item label="机构类型：" prop="mechanismType">
            <el-select v-model="form.mechanismType" placeholder="请选择机构类型" style="width: 100%;" filterable>
              <el-option
                v-for="(item,index) in emptyArr"
                :key="index"
                :value="item.userId"
                :label="item.companyName"
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
  import {addRole} from "@/api/roles"
  import selectTree from '@/components/selectTree/selecttree'
  import treeSelect from '@/components/tree'
  export default {
    props:{
      orgTree:{
        type:Array,
        default:null
      }
    },
    components:{
      selectTree,
      treeSelect
    },
    data() {

      return {
        emptyArr:[],
        mineStatusValue:'',
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
    methods:{
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
        this.$refs['formName'].validate((valid) => {
          if (valid) {
            if (this.data) {
            } else {
              addRole({

              }).then(res=>{

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
