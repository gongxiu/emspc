<template>
  <div class="com-body">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="100px" size="small">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="组织机构：" >
            <el-select  v-model="form.mechanismId" placeholder="请选择组织机构" style="width: 100%" multiple collapse-tags
                        @change="selectChange">
              <el-option  :value="mineStatusValue" style="height: auto;padding: 0;">
                <el-tree :data="orgTree"   node-key="id" ref="tree" highlight-current :props="defaultProps"
                         @check-change="handleCheckChange"></el-tree>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="岗位名称：" prop="name">
            <el-input
              v-model="form.name"
              :clearable="true"
              placeholder="请输入机构名称"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" >
          <el-form-item label="岗位级别：" prop="mechanismLevel">
            <el-select v-model="form.mechanismLevel" placeholder="请选择机构类型" style="width: 100%;" filterable>
              <el-option
                v-for="(item,index) in emptyArr"
                :key="index"
                :value="item.userId"
                :label="item.companyName"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" >
          <el-form-item label="岗位类型：" prop="mechanismType">
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
      <el-button type="primary" size="small">确定</el-button>
    </div>
  </div>
</template>
<script>
  import Const from '@/utils/const'
  export default {
    data() {
      return {
        emptyArr:[],
        orgTree: Const.orgTree,
        mineStatusValue:'',
        defaultProps: {
          children: "children",
          label: "title"
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
    methods:{
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
      }
    }
  }
</script>
<style>

</style>
