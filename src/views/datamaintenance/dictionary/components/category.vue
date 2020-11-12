<template>
  <div class="com-body">
    <el-form ref="ruleForm" :rules="rules" :model="form" label-width="120px" size="small">
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="字典类别名称：" >
            <el-input
              v-model="form.name"
              :clearable="true"
              placeholder="请输入字典类别名称"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" prop="code">
          <el-form-item label="字典类别代码：" >
            <el-input
              v-model="form.code"
              :clearable="true"
              placeholder="请输入字典类别代码"
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
      <div class="com-btn">
        <el-button type="" size="small" @click="$closFun('close')">取消</el-button>
        <el-button type="primary" size="small">确定</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "category",
    data(){
      return{
        form:{
          name:'',//字典类别名称
          code:'',//字典类别代码
          describe:'',//字典类别描述
        },
        rules:{
          name:[
            { required: true, message: '必填', trigger: 'blur' }
          ],
          code:[
            { required: true, message: '必填', trigger: 'blur' }
          ],
          describe:[
            { required: true, message: '必填', trigger: 'blur' }
          ],
        }
      }
    }
  }
</script>

<style scoped>

</style>
