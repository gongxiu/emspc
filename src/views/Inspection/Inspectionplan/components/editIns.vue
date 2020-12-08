<template>
  <el-form ref="ruleForm" :rules="rules" :model="form" label-width="120px" size="small">
    <el-row :gutter="10">
      <el-col :span="8">
        <el-form-item label="项目名称：" prop="name">
          <el-input
            v-model="form.name"
            :clearable="true"
            placeholder="请输入项目名称"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="项目编码：" prop="proNo">
          <el-input
            v-model="form.proNo"
            :clearable="true"
            placeholder="请输入项目编码"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
  export default {
    name: "editIns",
    data(){
      return{
        form:{
          proName:'',//项目名称
          proNo:'',//项目编码
          device:'',//绑定设备
          proReq:'',//项目要求
          matterItem:'',//注意事项
          detectPoints:'',//检测危险点
        },
        rules:{

        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
