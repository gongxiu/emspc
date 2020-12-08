<template>
  <div class="com-body">
    <el-form
      ref="ruleForm"
      :rules="rules"
      :model="ruleForm"
      label-width="120px"
      size="small"
    >
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="字典类别名称：">
            <el-input
              v-model="ruleForm.name"
              :clearable="true"
              placeholder="请输入字典类别名称"
              style="width: 100%"
            />

          </el-form-item>
        </el-col>
        <el-col :span="24" prop="code">
          <el-form-item label="字典类别代码：">
            <el-input
              v-model="ruleForm.code"
              :clearable="true"
              placeholder="请输入字典类别代码"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" prop="seqNo">
          <el-form-item label="序号：">
            <el-input
              v-model="ruleForm.seqNo"
              :clearable="true"
              placeholder="请输入序号"
              type="number"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="描述：">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="请输入内容"
              v-model="ruleForm.describe"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="com-btn">
        <el-button type="" size="small" @click="$closFun('close')"
          >取消</el-button
        >
        <el-button type="primary" size="small" @click="submitForm('ruleForm')"
          >确定</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
  import {addNew,  dicUpdate } from "@/api/diccate";
export default {
  name: "category",
  props:{
    data:{
      type:Object,
      default:null
    }
  },
  data() {
    return {
      ruleForm: {
        name: "", //字典类别名称
        code: "", //字典类别代码
        describe: "", //字典类别描述
        seqNo:'',//序号
      },
      rules: {
        name: [{ required: true, message: "必填", trigger: "blur" }],
        code: [{ required: true, message: "必填", trigger: "blur" }],
        describe: [{ required: true, message: "必填", trigger: "blur" }],
        seqNo:[{ required: true, message: "必填", trigger: "blur" }],
      },
    };
  },
  mounted() {
    console.log(this.data)
    if(this.data){
      this.ruleForm.name = this.data.name
      this.ruleForm.code = this.data.code
      this.ruleForm.describe = this.data.remark
      this.ruleForm.seqNo=this.data.seqNo
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.data){
            dicUpdate({
              id:this.data.id,
              status:this.data.status,
              code:this.ruleForm.code,
              flag:this.data.flag,
              name:this.ruleForm.name,
              remark:this.ruleForm.describe,
              seqNo:this.ruleForm.seqNo,
            }).then(res=>{
              this.$emit('closeCate')
              this.$message.success(res.msg)
            })
          }else {
            addNew({
              code:this.ruleForm.code,
              name:this.ruleForm.name,
              remark:this.ruleForm.describe,
              seqNo:this.ruleForm.seqNo,
            }).then((res) => {
              console.log(res);
              this.$message.success(res.msg)
              this.$emit('closeCate')
            });
          }
        }
      });
    },
  },
};
</script>

<style scoped>
</style>
